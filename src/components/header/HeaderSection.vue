<template>
  <div class="header-wrapper">
    <!-- Main Header -->
    <header class="main-header">
      <div class="header-container">
        <!-- Left side: Logo and text -->
        <div class="header-left">
          <div class="logo-section">
            <img :src="require('@/assets/naga-city-logo.png')" alt="Naga City Logo" class="logo" />
            <div class="header-text">
              <div class="republic-text">Republic of the Philippines</div>
              <div class="text-divider"></div>
              <div class="city-text">City Government of Naga</div>
            </div>
          </div>
        </div>

        <!-- Right side: Navigation -->
        <div class="header-right">
          <nav class="nav-menu">
            <a href="#" class="nav-link">Home</a>
            <a href="#" @click.prevent="showOrdinanceModal" class="nav-link">Ordinance</a>
            <a href="#" class="nav-link">About Us</a>
            <a href="#" class="nav-link">Contact</a>
          </nav>
        </div>
      </div>
    </header>

    <!-- Sub Navigation Component -->
    <SubNavigation />

    <!-- Ordinance Modal Component -->
    <OrdinanceSection :isVisible="isOrdinanceModalVisible" @close-modal="closeOrdinanceModal" />
  </div>
</template>

<script>
import SubNavigation from './SubNavigation.vue';
import OrdinanceSection from './Ordinance/OrinanceSection.vue';

export default {
  name: "HeaderSection",
  components: {
    SubNavigation,
    OrdinanceSection
  },
  data() {
    return {
      isOrdinanceModalVisible: false,
    };
  },
  methods: {
    showOrdinanceModal() {
      this.isOrdinanceModalVisible = true;
    },
    closeOrdinanceModal() {
      this.isOrdinanceModalVisible = false;
    },
  },
  mounted() {
    this.showOrdinanceModal();
  },
};
</script>

<style scoped src="../../assets/css/HeaderStyles.css"></style>