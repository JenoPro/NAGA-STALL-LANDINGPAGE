<template>
  <div class="sub-navigation">
    <div class="sub-nav-container">
      <button class="sub-nav-item left-item" @click="toggleAvailableStalls">View Available Stall</button>
      <button class="sub-nav-item center-item">Naga City People's Mall</button>
      <button class="sub-nav-item right-item">Satellite Market</button>
    </div>
  </div>

<!--Pop-up added for available stalls 10/08/25-->
  <transition name="popup">
      <div v-if="showAvailableStalls" class="popup-overlay">
        <div class="popup-content">
          <AvailableStalls />
        </div>
      </div>
    </transition>
</template>

<script>

import AvailableStalls from '@/components/stalls/available_stalls/AvailableStalls.vue'

export default {
  name: "SubNavigation",components: {
    AvailableStalls,
  },
  data() {
    return {
      showAvailableStalls: false
    };
  },
  methods: {
    toggleAvailableStalls() {
      this.showAvailableStalls = !this.showAvailableStalls;
    }
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

.sub-nav-item.active {
  background: #c5c7ca;
  color: #000;
  font-weight: 600;
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