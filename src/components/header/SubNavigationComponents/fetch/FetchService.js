/**
 * FetchService - Handles all API calls for the SubNavigation component
 * Contains methods for fetching areas, locations, and stalls
 */

class FetchService {
  constructor() {
    this.apiBaseUrl = process.env.VUE_APP_API_URL || "http://localhost:3001";
  }

  /**
   * Fetch available areas from backend
   * @returns {Promise<Array>} Array of available areas
   */
  async fetchAreas() {
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
        console.log(`Successfully loaded ${result.data.length} areas`);
        return result.data;
      } else {
        throw new Error(result.message || "Failed to fetch areas");
      }
    } catch (error) {
      console.error("Error fetching areas:", error);
      throw error;
    }
  }

  /**
   * Fetch locations within an area
   * @param {string} area - The area to fetch locations for
   * @returns {Promise<Array>} Array of locations in the area
   */
  async fetchLocationsByArea(area) {
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
        console.log(`Loaded ${result.data.length} locations for ${area}`);
        return result.data;
      } else {
        throw new Error(result.message || "Failed to fetch locations");
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      throw error;
    }
  }

  /**
   * Fetch stalls by area (initial load)
   * @param {string} area - The area to fetch stalls for
   * @returns {Promise<Array>} Array of stalls in the area
   */
  async fetchStallsByArea(area) {
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
        console.log(`Loaded ${result.data.length} stalls for ${area}`);
        return result.data;
      } else {
        throw new Error(result.message || "Failed to fetch stalls");
      }
    } catch (error) {
      console.error("Error fetching stalls:", error);
      throw error;
    }
  }

  /**
   * Apply filters to fetch filtered stalls
   * @param {string} selectedArea - The currently selected area
   * @param {Object} filters - The filters to apply
   * @returns {Promise<Array>} Array of filtered stalls
   */
  async fetchFilteredStalls(selectedArea, filters) {
    try {
      // Build query parameters
      const params = new URLSearchParams();

      // Always include the selected area
      params.append("area", selectedArea);

      // Add other filters if they have values
      Object.keys(filters).forEach((key) => {
        const value = filters[key];
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
        console.log(`Filtered results: ${result.data.length} stalls`);
        return result.data;
      } else {
        throw new Error(result.message || "Failed to filter stalls");
      }
    } catch (error) {
      console.error("Error applying filters:", error);
      throw error;
    }
  }
}

// Export a singleton instance
export default new FetchService();