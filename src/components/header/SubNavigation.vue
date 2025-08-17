<template>
  <div class="sub-navigation">
    <div class="sub-nav-container">
      <button class="sub-nav-item left-item" :class="{ active: selectedMarket === 'all' }"
        @click="handleMarketFilter('all')">
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

  <!-- Available stalls section with animation -->
  <transition name="popup">
    <div v-if="showAvailableStalls">
      <!-- Pass the selectedMarket as a prop to AvailableStalls -->
      <AvailableStalls :selectedMarket="selectedMarket" />
    </div>
  </transition>
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
      // if same market is clicked and popup is open, close it
      if (this.selectedMarket === market && this.showAvailableStalls) {
        this.showAvailableStalls = false;
      } else {
        // Otherwise set the market and show popup
        this.selectedMarket = market;
        this.showAvailableStalls = true;
      }
    },
  }
};
</script>

<style scoped src="../../assets/css/subnavigationstyle.css"></style>