<template>
  <div class="sub-navigation">
    <div class="sub-nav-container">
      <button class="sub-nav-item">View Available Stall</button>
      <button class="sub-nav-item">Naga City People's Mall</button>
      <button class="sub-nav-item">Satellite Market</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubNavigation",
};
</script>

<style scoped>
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
  transition: all 0.2s ease;
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
  .sub-nav-container {
    padding: 0 30px;
    gap: 30px;
  }
}

@media (max-width: 768px) {
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
  .sub-nav-container {
    gap: 10px;
  }
  
  .sub-nav-item {
    font-size: 13px;
    padding: 10px 15px;
  }
}
</style>