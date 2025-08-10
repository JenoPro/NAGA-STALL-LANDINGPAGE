<template>
  <div id="app">
    <!-- Header Section -->
    <!-- Header Section -->
    <header class="header">
      <v-container fluid class="header-container">
        <div class="header-content">
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
              <a href="#" class="nav-link">About Us</a>
              <a href="#" class="nav-link">Contact</a>
            </nav>
          </div>
        </div>
      </v-container>
    </header>

    <!-- Sub Navigation -->
    <div class="sub-nav">
      <div class="sub-nav-container">
        <button class="sub-nav-btn" @click="toggleAvailableStalls">
          View Available Stall
        </button>
        <button class="sub-nav-btn">Naga City People's Mall</button>
        <button class="sub-nav-btn">Satellite Market</button>
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

    <!-- Hero Section - Rent The Perfect Stall -->
    <section class="hero-section">
      <div class="hero-background">
        <img :src="require('@/assets/market.png')" alt="Naga People's Mall" class="hero-image" />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            Rent The <span class="highlight">Perfect Stall</span>
          </h1>
          <h2 class="hero-subtitle">With us</h2>
        </div>

        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-number">1900 +</div>
            <div class="stat-label">Stall holder</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">300 +</div>
            <div class="stat-label">Available Stall</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">60 Year's</div>
            <div class="stat-label">Of Service</div>
          </div>
        </div>

        <button class="apply-btn">Apply Now</button>
      </div>
    </section>

    <!-- Vendor Section -->
    <section class="vendor-section">
      <div class="section-container">
        <div class="content-left">
          <h2 class="section-title">Become a <span class="highlight">Vendor</span></h2>
          <h3 class="section-subtitle">
            Grow Your <span class="highlight">Business Today!</span>
          </h3>
          <p class="section-description">
            Start your journey as a vendor and secure your spot in a thriving marketplace.
            Expand your reach, serve more customers, and build your success!
          </p>
          <button class="apply-btn">Apply Now</button>
        </div>
        <div class="content-right">
          <div class="vendor-illustration">
            <!-- Vendor cart illustration will be placed here -->
            <img :src="require('@/assets/vendor.png')" alt="Vendor Cart" class="illustration-image" />
          </div>
        </div>
      </div>
    </section>

    <!-- Compliance Section -->
    <section class="compliance-section">
      <div class="section-container">
        <div class="content-left">
          <div class="compliance-illustration">
            <!-- Compliance dashboard illustration will be placed here -->
            <img :src="require('@/assets/reporting.png')" alt="Compliance Dashboard" class="illustration-image" />
          </div>
        </div>
        <div class="content-right">
          <h2 class="section-title">Report & Monitor Compliance</h2>
          <h3 class="section-subtitle">with <span class="highlight">Ease</span></h3>
          <p class="section-description">
            Keep market running smoothly report issues, stay compliant, and ensure a
            better business environment.
          </p>
          <button class="member-btn">Member</button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-contact">
          <div class="contact-item">
            <span class="contact-icon">✉</span>
            <span class="contact-text">naga.office@gmail.com</span>
          </div>
          <div class="contact-item">
            <span class="contact-icon">📍</span>
            <span class="contact-text">132 Caceres, Naga 4400 Camarines Sur</span>
          </div>
          <div class="contact-item">
            <span class="contact-icon">📞</span>
            <span class="contact-text">0548817708</span>
          </div>
        </div>

        <div class="footer-divider"></div>

        <div class="footer-about">
          <h4 class="footer-title">About the developers</h4>
          <p class="footer-description">
            We are the Naga Stall Team, dedicated to making stall renting simple and
            efficient. Our website helps vendors apply, manage, and track stalls with
            ease, ensuring a smoother market experience for everyone.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import AvailableStalls from './available_stalls/AvailableStalls.vue'

export default {
  name: "NagaCityLanding",
  components: {
    AvailableStalls
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* Header Styles */
.header {
  background: #f5f5f5;
  padding: 5px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 30px;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
  font-size: 20px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 20px;
}

.republic-text {
  font-size: 15px;
  color: #666;
  font-weight: 500;
}

.text-divider {
  width: 100%;
  height: 1px;
  background: #ccc;
  margin: 2px 0;
}

.city-text {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.nav-menu {
  display: flex;
  gap: 30px;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #666;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #1976d2;
}

/* Sub Navigation */
.sub-nav {
  background: #e0e0e0;
  padding: 10px 0;
}

.sub-nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
}

.sub-nav-btn {
  background: none;
  border: none;
  color: #666;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 16px;
  transition: color 0.3s ease;
}

.sub-nav-btn:hover {
  color: #1976d2;
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right,
      rgb(255, 255, 255) 0%,
      rgb(255, 255, 255) 35%,
      rgba(255, 255, 255, 0) 60%,
      transparent 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 50px;
}

.hero-title {
  color: black;
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 0;
}

.hero-subtitle {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 40px;
  color: black;
}

.highlight {
  color: #1976d2;
}

.stats-container {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
  color: black;
}

.stat-card {
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  min-width: 150px;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.apply-btn {
  background: #1976d2;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
}

.apply-btn:hover {
  background: #1565c0;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(25, 118, 210, 0.3);
}

/* Section Styles */
.vendor-section {
  padding: 80px 0;
  background: white;
}

.compliance-section {
  padding: 80px 0;
  background: #f8f9fa;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 60px;
}

.content-left,
.content-right {
  flex: 1;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 16px;
  line-height: 1.2;
}

.section-subtitle {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 24px;
  line-height: 1.3;
}

.section-description {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 32px;
}

.member-btn {
  background: #1976d2;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.member-btn:hover {
  background: #1565c0;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(25, 118, 210, 0.3);
}

.illustration-image {
  width: 100%;
  max-width: 400px;
  height: auto;
}

.vendor-illustration,
.compliance-illustration {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Footer */
.footer {
  background: #1976d2;
  color: white;
  padding: 40px 0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-contact {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.contact-icon {
  font-size: 18px;
}

.contact-text {
  font-size: 14px;
}

.footer-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
  margin: 30px 0;
}

.footer-about {
  text-align: center;
}

.footer-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}

.footer-description {
  font-size: 14px;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .header-left,
  .header-right {
    justify-content: center;
  }

  .sub-nav-container {
    flex-direction: column;
    gap: 10px;
  }

  .hero-title,
  .hero-subtitle {
    font-size: 2.5rem;
  }

  .stats-container {
    flex-direction: column;
    gap: 16px;
  }

  .section-container {
    flex-direction: column;
    gap: 40px;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1.5rem;
  }

  .footer-contact {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .compliance-section .section-container {
    flex-direction: column-reverse;
  }
}

@media (max-width: 480px) {

  .hero-title,
  .hero-subtitle {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .section-subtitle {
    font-size: 1.3rem;
  }
}

/* Animation for popup fade & scale added: 10/08.25 */
.popup-enter-active,
.popup-leave-active {
  transition: all 0.6s ease;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.popup-enter-to,
.popup-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
