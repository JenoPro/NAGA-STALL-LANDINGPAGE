<template>
  <section class="vendor-section">
    <div class="container">
      <div class="content-wrapper">
        <div class="text-content">
          <h1 class="main-title">
            Become a <span class="highlight-blue">Vendor</span>
          </h1>
          <h2 class="sub-title">
            Grow Your <span class="highlight-blue">Business Today!</span>
          </h2>
          <p class="description">
            Start your journey as a vendor and secure your spot in a thriving marketplace.<br>
            Expand your reach, serve more customers, and build your success!
          </p>
          <button class="apply-btn">Apply Now</button>
        </div>
        
        <div class="illustration-wrapper">
          <img
            :src="require('@/assets/vendor.png')"
            alt="Vendor Cart"
            class="vendor-image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "VendorSection",
};
</script>

<style scoped>
.vendor-section {
  background: linear-gradient(135deg, #fefefe 0%, #ffffff 100%);
  padding: 80px 20px;
  min-height: 720px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 2;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  align-items: center;
}

.text-content {
  padding-right: 20px;
  z-index: 3;
  position: relative;
}

.main-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 0;
  line-height: 1.1;
}

.sub-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 30px;
  line-height: 1.1;
  margin-top: -10px;
}

.highlight-blue {
  color: #2563eb;
}

.description {
  font-size: 0.9rem;
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 500px;
  font-weight: 400;
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
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(30, 64, 175, 0.4);
}

.illustration-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

.vendor-image {
  width: 100%;
  max-width: 450px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.1));
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-title, .sub-title {
    font-size: 3.5rem;
  }
  
  .vendor-image {
    max-width: 400px;
  }
}

@media (max-width: 768px) {
  .vendor-section {
    padding: 60px 20px;
  }
  
  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: center;
  }
  
  .text-content {
    padding-right: 0;
    order: 1;
  }
  
  .illustration-wrapper {
    order: 2;
  }
  
  .main-title, .sub-title {
    font-size: 2.8rem;
  }
  
  .description {
    font-size: 1.1rem;
    max-width: 100%;
  }
  
  .vendor-image {
    max-width: 350px;
  }
}

@media (max-width: 480px) {
  .main-title, .sub-title {
    font-size: 2.2rem;
  }
  
  .description {
    font-size: 1rem;
  }
  
  .apply-btn {
    padding: 16px 36px;
    font-size: 1.1rem;
  }
  
  .vendor-image {
    max-width: 300px;
  }
}
</style>