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
    // If the stall data is already in frontend format (from new backend), use it as-is
    // Otherwise, transform from old backend format
    const isAlreadyFormatted = stall.stallNumber && stall.branch && stall.branchLocation;
    
    if (isAlreadyFormatted) {
      // Data is already properly formatted by backend
      return {
        ...stall,
        imageUrl: stall.imageUrl || this.getDefaultImage(stall.section),
        managerName: stall.managerName || "Unknown"
      };
    }

    // Transform from old backend format
    return {
      id: stall.stall_id || stall.id,
      stallNumber: stall.stall_no || stall.stallNumber,
      price: stall.price || this.formatPrice(stall.rental_price, stall.price_type),
      floor: stall.floor,
      section: stall.section,
      dimensions: stall.size || stall.dimensions || "3x3 meters",
      location: stall.stall_location || stall.location,
      branch: stall.branch_name || stall.branch,
      branchLocation: stall.branch_location || stall.branchLocation,
      description: stall.description,
      imageUrl: stall.stall_image || stall.imageUrl || this.getDefaultImage(stall.section),
      isAvailable: stall.status === "Active" || stall.isAvailable,
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
    if (!price || isNaN(price) || price <= 0) {
      return "Contact for pricing";
    }

    const formattedPrice = `₱${parseFloat(price).toLocaleString('en-PH', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })}`;

    switch (priceType) {
      case "Raffle":
        return `${formattedPrice} / Raffle`;
      case "Auction":
        return `${formattedPrice} Min. / Auction`;
      case "Fixed Price":
      default:
        return `${formattedPrice}/month`;
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