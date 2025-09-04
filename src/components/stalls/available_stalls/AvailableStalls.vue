<template>
    <div class="available-stalls">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
            <p>Loading available stalls...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
            <p>{{ error }}</p>
            <button @click="fetchStalls" class="retry-btn">Try Again</button>
        </div>

        <!-- Stalls Grid -->
        <div v-else class="stall-grid">
            <div class="stall-card" v-for="stall in filteredStalls" :key="stall.id">
                <div class="stall-image">
                    <img :src="stall.image" :alt="`Stall ${stall.stallNumber}`" @error="handleImageError" />
                </div>
                <div class="stall-info">
                    <div class="stall-header">
                        <span class="stall-badge">{{ stall.stallNumber }}</span>
                        <span class="stall-price">{{ stall.price }}</span>
                    </div>
                    <div class="stall-details">
                        <p>{{ stall.floor }} / {{ stall.section }}</p>
                        <div class="size-btn-row">
                            <p>{{ stall.dimensions }}</p>
                            <button class="apply-btn" @click="openApplyForm(stall)">APPLY NOW!</button>
                        </div>
                        <p>{{ stall.location }}</p>
                        <p class="stall-description">{{ stall.description }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- No Results Message -->
        <div v-if="!loading && !error && filteredStalls.length === 0" class="no-results">
            <p>No stalls available for the selected market.</p>
        </div>

        <!-- StallApplicationContainer.vue -->
        <StallApplicationContainer v-if="showApplyForm" :stall="selectedStall" :showForm="showApplyForm"
            @close="closeApplyForm" />
    </div>
</template>

<script>
import StallApplicationContainer from '../apply/StallApplicationContainer.vue';

export default {
    name: "AvailableStalls",
    components: {
        StallApplicationContainer,
    },
    props: {
        selectedMarket: {
            type: String,
            default: 'all'
        }
    },
    data() {
        return {
            internalMarket: 'all',
            stalls: [],
            loading: false,
            error: null,
            showApplyForm: false,
            selectedStall: null,
            // API configuration
            apiBaseUrl: process.env.VUE_APP_API_URL || 'http://localhost:3001',
        };
    },
    computed: {
        filteredStalls() {
            const market = this.internalMarket;
            if (market === 'all') {
                return this.stalls;
            }
            return this.stalls.filter(stall => stall.market === market);
        }
    },
    watch: {
        selectedMarket: {
            immediate: true,
            handler(newMarket) {
                this.internalMarket = newMarket;
            }
        }
    },
    async mounted() {
        await this.fetchStalls();
    },
    methods: {
        // Fetch stalls from backend API
        async fetchStalls() {
            this.loading = true;
            this.error = null;
            
            try {
                console.log('Fetching stalls from:', `${this.apiBaseUrl}/api/stalls`);
                
                const response = await fetch(`${this.apiBaseUrl}/api/stalls`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('API Response:', result);

                if (result.success) {
                    // Transform backend data to frontend format
                    this.stalls = result.data.map(stall => this.transformStallData(stall));
                    console.log(`Successfully loaded ${this.stalls.length} stalls`);
                } else {
                    throw new Error(result.message || 'Failed to fetch stalls');
                }

            } catch (error) {
                console.error('Error fetching stalls:', error);
                this.error = this.handleNetworkError(error);
            } finally {
                this.loading = false;
            }
        },

        // Transform backend stall data to frontend format
        transformStallData(stall) {
            return {
                id: stall.ID,
                stallNumber: stall.stall_number,
                price: this.formatPrice(stall.price, stall.price_type),
                floor: stall.floor,
                section: stall.section,
                dimensions: stall.dimensions || '3x3 meters', // Default if null
                location: stall.location,
                market: stall.location, // Use location as market for filtering
                description: stall.description,
                image: stall.image_url || stall.image_data || this.getDefaultImage(stall.section),
                isAvailable: stall.is_available,
                priceType: stall.price_type,
                status: stall.status,
                createdAt: stall.created_at,
                updatedAt: stall.updated_at,
            };
        },

        // Format price display based on type
        formatPrice(price, priceType) {
            const formattedPrice = `${parseFloat(price).toLocaleString()} Php`;
            
            switch (priceType) {
                case 'Raffle':
                    return `${formattedPrice} / Raffle`;
                case 'Auction':
                    return `${formattedPrice} Min. / Auction`;
                case 'Fixed Price':
                default:
                    return `${formattedPrice} / Monthly`;
            }
        },

        // Get default image based on section
        getDefaultImage(section) {
            const defaultImages = {
                'Grocery Section': 'https://oldspitalfieldsmarket.com/cms/2017/10/OSM_FP_Stall_sq.jpg',
                'Clothes Section': 'https://www.citybmarquees.com/assets/bulkUpload/skipton-3.JPG',
                'Electronics Section': 'https://i.pinimg.com/originals/60/17/ec/6017ec3acc17f3e0d729d882026f92eb.jpg',
                'Fresh Produce': 'https://static.vecteezy.com/system/resources/previews/031/716/260/non_2x/the-street-of-organic-food-markets-marketplace-stalls-selling-fruits-and-vegetables-ai-generative-photo.jpg',
                'Food Court': 'https://live.staticflickr.com/8182/8034543792_42cbc0ff26_b.jpg',
            };
            return defaultImages[section] || 'https://oldspitalfieldsmarket.com/cms/2017/10/OSM_FP_Stall_sq.jpg';
        },

        // Handle image loading errors
        handleImageError(event) {
            event.target.src = 'https://oldspitalfieldsmarket.com/cms/2017/10/OSM_FP_Stall_sq.jpg';
        },

        // Handle network errors gracefully
        handleNetworkError(error) {
            if (error.message.includes('fetch')) {
                return 'Network connection failed. Please check your internet connection.';
            } else if (error.message.includes('500')) {
                return 'Server error. Please try again later.';
            } else if (error.message.includes('404')) {
                return 'API endpoint not found. Please check if the backend server is running.';
            }
            return error.message || 'An unexpected error occurred';
        },

        // Fetch stalls by location (optional for future filtering)
        async fetchStallsByLocation(location = 'all') {
            this.loading = true;
            this.error = null;
            
            try {
                const url = location === 'all' 
                    ? `${this.apiBaseUrl}/api/stalls`
                    : `${this.apiBaseUrl}/api/stalls/filter?location=${encodeURIComponent(location)}`;
                
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.success) {
                    this.stalls = result.data.map(stall => this.transformStallData(stall));
                } else {
                    throw new Error(result.message || 'Failed to fetch stalls');
                }

            } catch (error) {
                console.error('Error fetching stalls by location:', error);
                this.error = this.handleNetworkError(error);
            } finally {
                this.loading = false;
            }
        },

        updateMarketFilter() {
            this.$emit('market-changed', this.internalMarket);
        },

        openApplyForm(stall) {
            this.selectedStall = stall;
            this.showApplyForm = true;
        },

        closeApplyForm() {
            this.showApplyForm = false;
            this.selectedStall = null;
        }
    }
};
</script>

<style scoped src="../../../assets/css/availablestallstyle.css"></style>