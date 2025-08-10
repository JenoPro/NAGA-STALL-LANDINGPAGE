<template>
  <section class="hero-section">
    <div class="hero-background">
      <img
        :src="require('@/assets/market.png')"
        alt="Naga People's Mall"
        class="hero-image"
      />
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
</template>

<script>
export default {
  name: "StallSection",
};
</script>

<style scoped>
/* Copy HERO SECTION styles from your main file */
.hero-section {
  position: relative;
  min-height: 720px;
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
  background: linear-gradient(
    to right,
    rgb(255, 255, 255) 0%,
    rgb(255, 255, 255) 35%,
    rgba(255, 255, 255, 0) 60%,
    transparent 100%
  );
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
</style>

<style scoped src="../Global.css"></style>
