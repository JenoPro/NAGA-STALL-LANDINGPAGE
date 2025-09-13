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
      currentFilters: {
        location: "",
        section: "",
        minPrice: "",
        maxPrice: "",
        search: "",
      },
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

      // API configuration
      apiBaseUrl: process.env.VUE_APP_API_URL || "http://localhost:3001",
    };
  },

  async mounted() {
    await this.fetchAreas();
    // Check for overflow after areas are loaded
    this.$nextTick(() => {
      this.checkOverflow();
      // Add resize listener
      window.addEventListener('resize', this.checkOverflow);
    });
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.checkOverflow);
  },

  methods: {
    // Check if content overflows and adjust layout accordingly
    checkOverflow() {
      this.$nextTick(() => {
        const container = this.$refs.scrollableContainer;
        if (container) {
          this.hasOverflow = container.scrollWidth > container.clientWidth;
        }
      });
    },

    // Fetch available areas from backend
    async fetchAreas() {
      this.loading = true;
      this.error = null;

      try {
        console.log("Fetching areas from:", `${this.apiBaseUrl}/api/stalls/areas`);

        const response = await fetch(`${this.apiBaseUrl}/api/stalls/areas`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Areas API Response:", result);

        if (result.success) {
          this.availableAreas = result.data;
          console.log(`Successfully loaded ${this.availableAreas.length} areas`);
          // Check for overflow after areas are loaded
          this.$nextTick(() => {
            this.checkOverflow();
          });
        } else {
          throw new Error(result.message || "Failed to fetch areas");
        }
      } catch (error) {
        console.error("Error fetching areas:", error);
        this.error = this.handleNetworkError(error);
      } finally {
        this.loading = false;
      }
    },

    // Handle area selection
    async handleAreaFilter(area) {
      // If same area is clicked and container is open, close it
      if (this.selectedArea === area && this.showStallsContainer) {
        this.showStallsContainer = false;
        this.selectedArea = null;
        this.resetFilters();
      } else {
        // Set the area and show container
        this.selectedArea = area;
        this.showStallsContainer = true;
        this.resetFilters();

        // Fetch locations for this area and initial stalls
        await Promise.all([
          this.fetchLocationsByArea(area),
          this.fetchStallsByArea(area),
        ]);
      }
    },

    // Fetch locations within an area
    async fetchLocationsByArea(area) {
      this.filterLoading = true;

      try {
        const response = await fetch(
          `${this.apiBaseUrl}/api/stalls/locations?area=${encodeURIComponent(area)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          this.availableLocations = result.data;
          console.log(`Loaded ${this.availableLocations.length} locations for ${area}`);
        } else {
          throw new Error(result.message || "Failed to fetch locations");
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
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
        const response = await fetch(
          `${this.apiBaseUrl}/api/stalls/by-area?area=${encodeURIComponent(area)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          this.filteredStalls = result.data.map((stall) =>
            this.transformStallData(stall)
          );
          console.log(`Loaded ${this.filteredStalls.length} stalls for ${area}`);
        } else {
          throw new Error(result.message || "Failed to fetch stalls");
        }
      } catch (error) {
        console.error("Error fetching stalls:", error);
        this.stallsError = this.handleNetworkError(error);
      } finally {
        this.stallsLoading = false;
      }
    },

    // Handle filter changes from StallFilter component
    async handleFilterChanged(filters) {
      this.currentFilters = { ...this.currentFilters, ...filters };
      this.filterKey++; // Force re-render
      await this.applyFilters();
    },

    // Handle search changes
    async handleSearchChanged(searchTerm) {
      this.currentFilters.search = searchTerm;
      this.filterKey++;
      await this.applyFilters();
    },

    // Apply all current filters
    async applyFilters() {
      this.stallsLoading = true;
      this.stallsError = null;

      try {
        // Build query parameters
        const params = new URLSearchParams();

        // Always include the selected area
        params.append("area", this.selectedArea);

        // Add other filters if they have values
        Object.keys(this.currentFilters).forEach((key) => {
          const value = this.currentFilters[key];
          if (value && value.toString().trim() !== "") {
            params.append(key, value);
          }
        });

        console.log("Applying filters:", params.toString());

        const response = await fetch(
          `${this.apiBaseUrl}/api/stalls/filter?${params.toString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          this.filteredStalls = result.data.map((stall) =>
            this.transformStallData(stall)
          );
          console.log(`Filtered results: ${this.filteredStalls.length} stalls`);
        } else {
          throw new Error(result.message || "Failed to filter stalls");
        }
      } catch (error) {
        console.error("Error applying filters:", error);
        this.stallsError = this.handleNetworkError(error);
      } finally {
        this.stallsLoading = false;
      }
    },

    // Transform backend stall data to frontend format
    transformStallData(stall) {
      return {
        id: stall.stall_id,
        stallNumber: stall.stall_no,
        price: this.formatPrice(stall.rental_price, stall.price_type),
        floor: stall.floor,
        section: stall.section,
        dimensions: stall.size || "3x3 meters",
        location: stall.stall_location,
        area: stall.area,
        branchLocation: stall.branch_location,
        description: stall.description,
        image: stall.stall_image || this.getDefaultImage(stall.section),
        isAvailable: stall.status === "Active",
        priceType: stall.price_type,
        status: stall.status,
        createdAt: stall.created_at,
        // Manager info
        managerName: stall.manager_first_name
          ? `${stall.manager_first_name} ${stall.manager_last_name}`
          : "Unknown",
      };
    },

    // Format price display based on type
    formatPrice(price, priceType) {
      const formattedPrice = `${parseFloat(price).toLocaleString()} Php`;

      switch (priceType) {
        case "Raffle":
          return `${formattedPrice} / Raffle`;
        case "Auction":
          return `${formattedPrice} Min. / Auction`;
        case "Fixed Price":
        default:
          return `${formattedPrice} / Monthly`;
      }
    },

    // Get default image based on section
    getDefaultImage(section) {
      const defaultImages = {
        "Grocery Section":
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
        "Meat Section":
          "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400",
        "Fresh Produce":
          "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
        "Clothing Section":
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
        "Electronics Section":
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
        "Food Court":
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
      };
      return (
        defaultImages[section] ||
        "https://oldspitalfieldsmarket.com/cms/2017/10/OSM_FP_Stall_sq.jpg"
      );
    },

    // Reset filters
    resetFilters() {
      this.currentFilters = {
        location: "",
        section: "",
        minPrice: "",
        maxPrice: "",
        search: "",
      };
      this.filteredStalls = [];
      this.availableLocations = [];
      this.filterKey++;
    },

    // Handle network errors
    handleNetworkError(error) {
      if (error.message.includes("fetch")) {
        return "Network connection failed. Please check your internet connection.";
      } else if (error.message.includes("500")) {
        return "Server error. Please try again later.";
      } else if (error.message.includes("404")) {
        return "API endpoint not found. Please check if the backend server is running.";
      }
      return error.message || "An unexpected error occurred";
    },
  },
};
</script>

<style scoped src="../../assets/css/subnavigationstyle.css"></style>
