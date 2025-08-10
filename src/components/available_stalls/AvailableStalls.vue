<template>
    <div class="available-stalls">
        <div class="stall-grid">
            <div class="stall-card" v-for="stall in stalls" :key="stall.id">
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

                    <!-- Popup Application Form -->
                    <Apply v-if="showApplyForm" :stall="selectedStall" @close="closeApplyForm" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Apply from '../apply/PersonalInformation.vue';
export default {
    name: "AvailableStalls",
    components: {
        Apply,
    },
    data() {
        return {
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
    }, methods: {
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

<style scoped>
.available-stalls {
    background: white;
    padding: 20px;
    border-radius: 8px;
}

.stall-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.stall-card {
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.stall-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
}

.stall-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.stall-info {
    padding: 16px;
}

.stall-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.stall-badge {
    background: white;
    border: 2px solid #002B5B;
    color: #002B5B;
    padding: 4px 10px;
    border-radius: 50px;
    font-weight: bold;
    font-size: 14px;
}

.stall-price {
    color: #002B5B;
    font-weight: bold;
}

.stall-details {
    font-size: 17px;
    color: #555;
    margin-bottom: 12px;
}

.apply-btn {
    background: #002B5B;
    color: white;
    font-weight: bold;
    border: none;
    padding: 8px 16px;
    border-radius: 7px;
    cursor: pointer;
    white-space: nowrap;
}

.size-btn-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.apply-btn:hover {
    background: #004080;
}

.stall-description {
    font-size: 17px;
    color: #666;
    margin-top: 6px;
    line-height: 1.4;
}

/* Tablet view */
@media (max-width: 1024px) {
    .stall-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Mobile view */
@media (max-width: 600px) {
    .stall-grid {
        grid-template-columns: 1fr;
    }

    .stall-image {
        height: 180px;
    }

    .stall-details {
        font-size: 15px;
    }
}
</style>
