<template>
  <div class="header-wrapper">
    <!-- Main Header -->
    <header class="main-header">
      <div class="header-container">
        <!-- Left side: Logo and text -->
        <div class="header-left">
          <div class="logo-section">
            <img
              :src="require('@/assets/naga-city-logo.png')"
              alt="Naga City Logo"
              class="logo"
            />
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
    </header>

    <!-- Sub Navigation -->
    <div class="sub-navigation">
      <div class="sub-nav-container">
        <button class="sub-nav-item">View Available Stall</button>
        <button class="sub-nav-item">Naga City People's Mall</button>
        <button class="sub-nav-item">Satellite Market</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderSection",
};
</script>

<style scoped>
.header-wrapper {
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.main-header {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 12px 0;
  border-bottom: 1px solid #dee2e6;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 18px;
}

.logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.republic-text {
  font-size: 14px;
  color: #6c757d;
  font-weight: 500;
  letter-spacing: 0.3px;
  margin: 0;
}

.text-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, #dee2e6, transparent);
  margin: 3px 0;
}

.city-text {
  font-size: 19px;
  font-weight: 700;
  color: #343a40;
  letter-spacing: 0.2px;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
}

.nav-menu {
  display: flex;
  gap: 35px;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #495057;
  font-weight: 600;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #007bff;
  background: rgba(0, 123, 255, 0.08);
  transform: translateY(-1px);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  background: #007bff;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after {
  width: 80%;
}

.sub-navigation {
  background: #d6d8db;
  padding: 0;
  border-top: 1px solid #bbb;
}

.sub-nav-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  padding: 0;
}

.sub-nav-item {
  flex: 1;
  background: none;
  border: none;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 12px 20px;
  text-align: center;
  transition: all 0.2s ease;;
}

.sub-nav-item:last-child {
  border-right: none;
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
  .header-container,
  .sub-nav-container {
    padding: 0 30px;
  }
  
  .nav-menu {
    gap: 25px;
  }
  
  .sub-nav-container {
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 15px;
    padding: 0 20px;
  }
  
  .logo-section {
    gap: 12px;
  }
  
  .logo-placeholder {
    width: 50px;
    height: 50px;
  }
  
  .logo-circle {
    width: 45px;
    height: 45px;
  }
  
  .republic-text {
    font-size: 12px;
  }
  
  .city-text {
    font-size: 16px;
  }
  
  .nav-menu {
    gap: 20px;
  }
  
  .nav-link {
    font-size: 14px;
    padding: 6px 12px;
  }
  
  .sub-nav-container {
    flex-direction: column;
  }
  
  .sub-nav-item {
    border-right: none;
    border-bottom: 1px solid #bbb;
  }
  
  .sub-nav-item:last-child {
    border-bottom: none;
  }
}

@media (max-width: 480px) {
  .main-header {
    padding: 8px 0;
  }
  
  .header-container {
    padding: 0 15px;
  }
  
  .logo-section {
    gap: 10px;
  }
  
  .nav-menu {
    gap: 15px;
  }
  
  .nav-link {
    font-size: 13px;
    padding: 5px 10px;
  }
  
  .sub-nav-container {
    gap: 10px;
  }
  
  .sub-nav-item {
    font-size: 13px;
    padding: 10px 15px;
  }
}
</style>