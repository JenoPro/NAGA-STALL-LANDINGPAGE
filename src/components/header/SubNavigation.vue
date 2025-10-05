<template>
  <div class="sub-navigation">
    <!-- Loading State -->
    <div v-if="loading" class="loading-areas">
      <p>Loading areas...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-areas">
      <p>{{ error }}</p>
      <button @click="fetchAreas" class="retry-btn">Try Again</button>
    </div>

    <!-- Area Navigation -->
    <div v-else class="sub-nav-container">
      <div ref="scrollableContainer" class="scrollable-container" :class="{ 'overflow-scrolling': hasOverflow }">
        <button
          v-for="area in availableAreas"
          :key="area.area"
          class="sub-nav-item"
          :class="{ active: selectedArea === area.area }"
          @click="handleAreaFilter(area.area)"
        >
          {{ area.area }}
        </button>
      </div>
    </div>

    <!-- Stalls Container with Filter -->
    <transition name="fade" mode="out-in">
      <div v-if="showStallsContainer && selectedArea" class="stalls-container">
        <!-- Filter Container -->
        <StallFilter
          :selectedArea="selectedArea"
          :availableLocations="availableLocations"
          :loading="filterLoading"
          @filter-changed="handleFilterChanged"
          @search-changed="handleSearchChanged"
        />

        <!-- Available Stalls -->
        <AvailableStalls
          :filteredStalls="filteredStalls"
          :loading="stallsLoading"
          :error="stallsError"
          :key="filterKey"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import AvailableStalls from "@/components/stalls/available_stalls/AvailableStalls.vue";
import StallFilter from "@/components/stalls/filter/StallFilter.vue";

import FetchService from "./SubNavigationComponents/fetch/FetchService.js";
import DataTransformService from "./SubNavigationComponents/transforms/DataTransformService.js";
import FilterService from "./SubNavigationComponents/filters/FilterService.js";
import UIHelperService from "./SubNavigationComponents/ui-helpers/UIHelperService.js";
import ErrorHandlingService from "./SubNavigationComponents/error-handling/ErrorHandlingService.js";

export default {
  name: "SubNavigation",
  components: {
    AvailableStalls,
    StallFilter,
  },
  data() {
    return {
      availableAreas: [],
      selectedArea: null,
      showStallsContainer: false,

      availableLocations: [],
      filteredStalls: [],
      currentFilters: FilterService.getInitialFilters(),
      filterKey: 0,

      loading: false,
      filterLoading: false,
      stallsLoading: false,

      error: null,
      stallsError: null,

      hasOverflow: false,

      resizeCleanup: null,
    };
  },

  async mounted() {
    await this.fetchAreas();
    this.$nextTick(() => {
      this.checkOverflow();
      this.resizeCleanup = UIHelperService.setupResizeListener(() => {
        this.checkOverflow();
      });
    });
  },

  beforeUnmount() {
    if (this.resizeCleanup) {
      this.resizeCleanup();
    }
  },

  methods: {
    checkOverflow() {
      this.$nextTick(() => {
        const container = this.$refs.scrollableContainer;
        if (container) {
          this.hasOverflow = UIHelperService.checkOverflow(container);
        }
      });
    },

    async fetchAreas() {
      this.loading = true;
      this.error = null;

      try {
        this.availableAreas = await FetchService.fetchAreas();
        this.$nextTick(() => {
          this.checkOverflow();
        });
      } catch (error) {
        ErrorHandlingService.logError(error, 'fetchAreas');
        this.error = ErrorHandlingService.handleNetworkError(error);
      } finally {
        this.loading = false;
      }
    },

    async handleAreaFilter(area) {
      const selectionResult = UIHelperService.handleAreaSelection(
        this.selectedArea, 
        area, 
        this.showStallsContainer
      );

      this.selectedArea = selectionResult.selectedArea;
      this.showStallsContainer = selectionResult.showStallsContainer;

      if (selectionResult.shouldReset) {
        this.resetFilters();
      }

      if (this.selectedArea) {
        await Promise.all([
          this.fetchLocationsByArea(this.selectedArea),
          this.fetchStallsByArea(this.selectedArea),
        ]);
      }
    },

    async fetchLocationsByArea(area) {
      this.filterLoading = true;

      try {
        this.availableLocations = await FetchService.fetchLocationsByArea(area);
      } catch (error) {
        ErrorHandlingService.logError(error, 'fetchLocationsByArea', { area });
      } finally {
        this.filterLoading = false;
      }
    },

    async fetchStallsByArea(area) {
      this.stallsLoading = true;
      this.stallsError = null;

      try {
        const stallsData = await FetchService.fetchStallsByArea(area);
        this.filteredStalls = DataTransformService.transformStallsArray(stallsData);
      } catch (error) {
        ErrorHandlingService.logError(error, 'fetchStallsByArea', { area });
        this.stallsError = ErrorHandlingService.handleNetworkError(error);
      } finally {
        this.stallsLoading = false;
      }
    },

    async handleFilterChanged(filters) {
      this.currentFilters = FilterService.handleFilterChanged(this.currentFilters, filters);
      this.filterKey = UIHelperService.generateNewKey(this.filterKey);
      await this.applyFilters();
    },

    async handleSearchChanged(searchTerm) {
      this.currentFilters = FilterService.handleSearchChanged(this.currentFilters, searchTerm);
      this.filterKey = UIHelperService.generateNewKey(this.filterKey);
      await this.applyFilters();
    },

    async applyFilters() {
      this.stallsLoading = true;
      this.stallsError = null;

      try {
        console.log("Applying filters:", FilterService.getFilterSummary(this.currentFilters));

        const stallsData = await FetchService.fetchFilteredStalls(
          this.selectedArea, 
          this.currentFilters
        );
        
        this.filteredStalls = DataTransformService.transformStallsArray(stallsData);
      } catch (error) {
        ErrorHandlingService.logError(error, 'applyFilters', { 
          area: this.selectedArea,
          filters: this.currentFilters 
        });
        this.stallsError = ErrorHandlingService.handleNetworkError(error);
      } finally {
        this.stallsLoading = false;
      }
    },

    resetFilters() {
      this.currentFilters = FilterService.resetFilters();
      this.filteredStalls = [];
      this.availableLocations = [];
      this.filterKey = UIHelperService.generateNewKey(this.filterKey);
    },
  },
};
</script>

<style scoped src="../../assets/css/subnavigationstyle.css"></style>
