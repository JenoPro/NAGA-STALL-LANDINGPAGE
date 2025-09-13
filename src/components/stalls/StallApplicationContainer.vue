<template>
    <div class="overlay" v-if="showForm">
        <!-- Loading Overlay -->
        <div v-if="isSubmitting" class="loading-overlay">
            <div class="loading-content">
                <div class="spinner"></div>
                <p>Submitting your application...</p>
                <p>Please wait while we process your information.</p>
            </div>
        </div>

        <!-- Step 1: Personal Information -->
        <PersonalInformation v-if="currentStep === 1 && !isSubmitting" :stall="stall" @close="closeForm"
            @next="handlePersonalInfoNext" />

        <!-- Step 2: Spouse Information -->
        <SpouseInformation v-if="currentStep === 2 && !isSubmitting" :stall="stall" :personalInfo="personalInfo"
            @previous="goToPreviousStep" @next="handleSpouseInfoNext" />

        <!-- Step 3: Business Information -->
        <BusinessInformation v-if="currentStep === 3 && !isSubmitting" :stall="stall" :personalInfo="personalInfo"
            :spouseInfo="spouseInfo" @previous="goToPreviousStep" @next="handleBusinessInfoNext" @close="closeForm" />

        <!-- Step 4: Other Information -->
        <OtherInformation v-if="currentStep === 4 && !isSubmitting" :stall="stall" :personalInfo="personalInfo"
            :spouseInfo="spouseInfo" @previous="goToPreviousStep" @next="handleOtherInfoNext" />
    </div>
</template>

<script>
import StallApplicationContainerScript from './StallApplicationContainer.js';
export default StallApplicationContainerScript;
</script>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
}

.loading-content {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    max-width: 300px;
}

.spinner {
    width: 40px;
    height: 40px;
    margin: 0 auto 1rem;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.loading-content p {
    margin: 0.5rem 0;
    color: #333;
}

.loading-content p:first-of-type {
    font-weight: bold;
    font-size: 1.1rem;
}

.loading-content p:last-of-type {
    font-size: 0.9rem;
    color: #666;
}</style>