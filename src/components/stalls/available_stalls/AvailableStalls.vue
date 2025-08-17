<template>
    <div class="available-stalls">
        <div class="stalls-header">
            <div class="market-info" v-if="internalMarket !== 'all'">
                <span class="current-filter">Showing: {{ internalMarket }}</span>
            </div>
        </div>

        <!-- Stalls Grid -->
        <div class="stall-grid">
            <div class="stall-card" v-for="stall in filteredStalls" :key="stall.id">
                <div class="stall-image">
                    <img :src="stall.image" :alt="stall.name" />
                </div>
                <div class="stall-info">
                    <div class="stall-header">
                        <span class="stall-badge">STALL# {{ stall.id.toString().padStart(2, '0') }}</span>
                        <span class="stall-price">{{ stall.price }}</span>
                    </div>
                    <div class="stall-details">
                        <p>{{ stall.location }}</p>
                        <div class="size-btn-row">
                            <p>{{ stall.size }}</p>
                            <button class="apply-btn" @click="openApplyForm(stall)">APPLY NOW!</button>
                        </div>
                        <p>{{ stall.market }}</p>
                        <p class="stall-description">{{ stall.description }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- No Results Message -->
        <div v-if="filteredStalls.length === 0" class="no-results">
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
            stalls: [
                {
                    id: 1,
                    image: "https://oldspitalfieldsmarket.com/cms/2017/10/OSM_FP_Stall_sq.jpg",
                    price: "1,500 Php / Monthly",
                    location: "2nd Floor / Grocery Section",
                    size: "3x3 meters",
                    market: "Naga City People's Market",
                    description: "Ideal for selling fresh produce or packaged goods with high foot traffic."
                },
                {
                    id: 2,
                    image: "https://www.citybmarquees.com/assets/bulkUpload/skipton-3.JPG",
                    price: "1,800 Php / Monthly",
                    location: "Ground Floor / Clothes Section",
                    size: "3x4 meters",
                    market: "Satellite Market",
                    description: "Spacious stall suited for clothing, bags, and accessories."
                },
                {
                    id: 3,
                    image: "https://i.pinimg.com/originals/60/17/ec/6017ec3acc17f3e0d729d882026f92eb.jpg",
                    price: "2,000 Php / Monthly",
                    location: "2nd Floor / Electronics Section",
                    size: "2x3 meters",
                    market: "Naga City People's Market",
                    description: "Perfect for selling gadgets, phone accessories, and electronics."
                },
                {
                    id: 4,
                    image: "https://i.pinimg.com/originals/a1/f8/48/a1f848bbc36c70d936953841f1353f96.jpg",
                    price: "1,500 Php / Monthly",
                    location: "1st Floor / Grocery Section",
                    size: "3x3 meters",
                    market: "Satellite Market",
                    description: "Great for fresh fruits, vegetables, and snacks."
                },
                {
                    id: 5,
                    image: "https://static.vecteezy.com/system/resources/previews/031/716/260/non_2x/the-street-of-organic-food-markets-marketplace-stalls-selling-fruits-and-vegetables-ai-generative-photo.jpg",
                    price: "2,000 Php / Monthly",
                    location: "2nd Floor / Grocery Section",
                    size: "3x3 meters",
                    market: "Naga City People's Market",
                    description: "Strategic location for specialty food and beverages."
                },
                {
                    id: 6,
                    image: "https://live.staticflickr.com/8182/8034543792_42cbc0ff26_b.jpg",
                    price: "1,500 Php / Monthly",
                    location: "2nd Floor / Grocery Section",
                    size: "3x3 meters",
                    market: "Satellite Market",
                    description: "Good spot for local delicacies and small retail items."
                },
            ],
            showApplyForm: false,
            selectedStall: null,
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
    methods: {
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
