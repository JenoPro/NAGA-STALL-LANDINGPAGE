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

// Import services
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
      // Area management
      availableAreas: [],
      selectedArea: null,
      showStallsContainer: false,

      // Filter management
      availableLocations: [],
      filteredStalls: [],
      currentFilters: FilterService.getInitialFilters(),
      filterKey: 0, // For forcing component re-render

      // Loading states
      loading: false,
      filterLoading: false,
      stallsLoading: false,

      // Error states
      error: null,
      stallsError: null,

      // Overflow detection
      hasOverflow: false,

      // Cleanup function for resize listener
      resizeCleanup: null,
    };
  },

  async mounted() {
    await this.fetchAreas();
    // Check for overflow after areas are loaded and setup resize listener
    this.$nextTick(() => {
      this.checkOverflow();
      // Setup resize listener with cleanup function
      this.resizeCleanup = UIHelperService.setupResizeListener(() => {
        this.checkOverflow();
      });
    });
  },

  beforeUnmount() {
    // Clean up resize listener
    if (this.resizeCleanup) {
      this.resizeCleanup();
    }
  },

  methods: {
    // Check if content overflows and adjust layout accordingly
    checkOverflow() {
      this.$nextTick(() => {
        const container = this.$refs.scrollableContainer;
        if (container) {
          this.hasOverflow = UIHelperService.checkOverflow(container);
        }
      });
    },

    // Fetch available areas from backend
    async fetchAreas() {
      this.loading = true;
      this.error = null;

      try {
        this.availableAreas = await FetchService.fetchAreas();
        // Check for overflow after areas are loaded
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

    // Handle area selection
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

      // If area is selected, fetch locations and stalls
      if (this.selectedArea) {
        await Promise.all([
          this.fetchLocationsByArea(this.selectedArea),
          this.fetchStallsByArea(this.selectedArea),
        ]);
      }
    },

    // Fetch locations within an area
    async fetchLocationsByArea(area) {
      this.filterLoading = true;

      try {
        this.availableLocations = await FetchService.fetchLocationsByArea(area);
      } catch (error) {
        ErrorHandlingService.logError(error, 'fetchLocationsByArea', { area });
        // Don't show error for locations, just log it
      } finally {
        this.filterLoading = false;
      }
    },

    // Fetch stalls by area (initial load)
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

    // Handle filter changes from StallFilter component
    async handleFilterChanged(filters) {
      this.currentFilters = FilterService.handleFilterChanged(this.currentFilters, filters);
      this.filterKey = UIHelperService.generateNewKey(this.filterKey);
      await this.applyFilters();
    },

    // Handle search changes
    async handleSearchChanged(searchTerm) {
      this.currentFilters = FilterService.handleSearchChanged(this.currentFilters, searchTerm);
      this.filterKey = UIHelperService.generateNewKey(this.filterKey);
      await this.applyFilters();
    },

    // Apply all current filters
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

    // Reset filters
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
