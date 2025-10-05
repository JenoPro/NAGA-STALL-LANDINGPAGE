/**
 * DataTransformService - Handles data transformation for the SubNavigation component
 * Contains methods for transforming stall data, formatting prices, and managing default images
 */

class DataTransformService {
  /**
   * Transform backend stall data to frontend format
   * @param {Object} stall - Raw stall data from backend
   * @returns {Object} Transformed stall data for frontend consumption
   */
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
      managerName: stall.manager_first_name
        ? `${stall.manager_first_name} ${stall.manager_last_name}`
        : "Unknown",
    };
  }

  /**
   * Format price display based on type
   * @param {number} price - The price amount
   * @param {string} priceType - The type of pricing (Fixed Price, Raffle, Auction)
   * @returns {string} Formatted price string
   */
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
  }

  /**
   * Get default image based on section
   * @param {string} section - The stall section
   * @returns {string} Default image URL for the section
   */
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
  }

  /**
   * Transform an array of stall data
   * @param {Array} stallsArray - Array of raw stall data from backend
   * @returns {Array} Array of transformed stall data
   */
  transformStallsArray(stallsArray) {
    return stallsArray.map(stall => this.transformStallData(stall));
  }
}

export default new DataTransformService();