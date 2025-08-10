<template>
  <section class="compliance-section">
    <div class="section-container">
      <div class="content-overlay">
        <h2 class="section-title">
          Report & Monitor Compliance
        </h2>
        <h3 class="section-subtitle">
          with <span class="highlight">Ease</span>
        </h3>
        <p class="section-description">
          Keep market running smoothly report issues, stay compliant, and ensure a better business environment.
        </p>
        <button class="member-btn">Member</button>
      </div>
      <div class="image-container">
        <img
          :src="require('@/assets/reporting.png')"
          alt="Compliance Dashboard"
          class="background-image"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ComplianceSection",
};
</script>

<style scoped>
.compliance-section {
  padding: 80px 20px;
  background: linear-gradient(135deg, #ffffff 0%, #ffffff 100%);
  min-height: 720px;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.content-overlay {
  flex: 1;
  max-width: 600px;
  text-align: left;
  margin-left: auto;
}

.image-container {
  position: absolute;
  left: -50px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  opacity: 0.9;
}

.background-image {
  width: 600px;
  height: auto;
  object-fit: contain;
}

.section-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 0;
  line-height: 1.1;
}

.section-subtitle {
  font-size: 3.5rem;
  font-weight: 700;
  color: #000000;
  line-height: 1.1;
  margin: 0 0 30px 0;
}

.highlight {
  color:#2563eb;
}

.section-description {
  font-size: 0.9rem;
  color: #4a5568;
  line-height: 1.6;
  margin: 0 0 40px 0;
  max-width: 500px;
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
  width: fit-content;
}

.member-btn:hover {
  background: #1e40af;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(29, 78, 216, 0.4);
}

.member-btn:active {
  transform: translateY(0);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .background-image {
    width: 500px;
  }
  
  .section-title,
  .section-subtitle {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .section-container {
    flex-direction: column;
    text-align: center;
    justify-content: center;
  }
  
  .content-overlay {
    text-align: center;
    max-width: 100%;
  }
  
  .image-container {
    position: relative;
    right: 0;
    top: 0;
    transform: none;
    margin-top: 40px;
    opacity: 0.7;
  }
  
  .background-image {
    width: 400px;
  }
  
  .section-title,
  .section-subtitle {
    font-size: 2.5rem;
  }
  
  .section-description {
    font-size: 1.1rem;
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .compliance-section {
    padding: 40px 20px;
  }
  
  .section-title,
  .section-subtitle {
    font-size: 2rem;
  }
  
  .section-description {
    font-size: 1rem;
  }
  
  .member-btn {
    padding: 15px 35px;
    font-size: 1.1rem;
  }
  
  .background-image {
    width: 300px;
  }
}
</style>