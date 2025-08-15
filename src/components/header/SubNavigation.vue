<template>
  <div class="sub-navigation">
      <div class="sub-nav-container">
        <button class="sub-nav-item left-item" :class="{ active: selectedMarket === 'all' }" @click="handleMarketFilter('all')">
          View Available Stall
        </button>
        <button class="sub-nav-item center-item" :class="{ active: selectedMarket === 'Naga City People\'s Market' }"
          @click="handleMarketFilter('Naga City People\'s Market')">
          Naga City People's Mall
        </button>
        <button class="sub-nav-item right-item" :class="{ active: selectedMarket === 'Satellite Market' }"
          @click="handleMarketFilter('Satellite Market')">
          Satellite Market
        </button>
      </div>
    </div>

<!--Available stalls section-->
  <div v-if="showAvailableStalls">
    <!-- Pass the selectedMarket as a prop to AvailableStalls -->
    <AvailableStalls :selectedMarket="selectedMarket" />
  </div>
</template>

<script>

import AvailableStalls from '@/components/stalls/available_stalls/AvailableStalls.vue'

export default {
  name: "SubNavigation",
  components: {
    AvailableStalls,
  },
  data() {
    return {
      showAvailableStalls: false,
      selectedMarket: 'all'
    };
  },
  methods: {
    toggleAvailableStalls() {
      this.showAvailableStalls = !this.showAvailableStalls;
    },
    handleMarketFilter(market) {
      // Toggle behavior: if same market is clicked and popup is open, close it
      if (this.selectedMarket === market && this.showAvailableStalls) {
        this.showAvailableStalls = false;
      } else {
        // Otherwise, set the market and show popup
        this.selectedMarket = market;
        this.showAvailableStalls = true;
      }
    },
  }
};
</script>

<style scoped>
.sub-navigation {
  background: #d6d8db;
  border-top: 1px solid #bbb;
}

.sub-nav-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
}

.sub-nav-item {
  background: none;
  border: none;
  color: #333;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  padding: 12px 20px;
  transition: all 0.2s ease;
}

.left-item {
  text-align: left;
  margin-right: auto;
}

.center-item {
  text-align: center;
  flex: 0 0 auto;
}

.right-item {
  text-align: right;
  margin-left: auto;
}

.sub-nav-item:hover {
  background: #bbbdc1;
  color: #000;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .sub-nav-container {
    padding: 0 30px;
  }
}

@media (max-width: 768px) {
  .sub-nav-container {
    flex-direction: column;
    gap: 0;
  }
  
  .sub-nav-item {
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #bbb;
    margin: 0;
  }
  
  .sub-nav-item:last-child {
    border-bottom: none;
  }
}

@media (max-width: 480px) {
  .sub-nav-container {
    padding: 0 10px;
  }
  
  .sub-nav-item {
    font-size: 13px;
    padding: 10px 15px;
  }
}
</style>