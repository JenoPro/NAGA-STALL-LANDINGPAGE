<template>
    <div class="overlay" v-if="showForm">
        <!-- Step 1: Personal Information -->
        <PersonalInformation v-if="currentStep === 1" :stall="stall" @close="closeForm"
            @next="handlePersonalInfoNext" />

        <!-- Step 2: Spouse Information -->
        <SpouseInformation v-if="currentStep === 2" :stall="stall" :personalInfo="personalInfo"
            @previous="goToPreviousStep" @next="handleSpouseInfoNext" />

        <!-- Step 3: Business Information -->
        <BusinessInformation v-if="currentStep === 3" :stall="stall" :personalInfo="personalInfo"
            :spouseInfo="spouseInfo" @previous="goToPreviousStep" @next="handleBusinessInfoNext" @close="closeForm" />

        <!-- Step 4: Other Information -->
        <OtherInformation v-if="currentStep === 4" :stall="stall" :personalInfo="personalInfo" :spouseInfo="spouseInfo"
            @previous="goToPreviousStep" @next="handleOtherInfoNext" />
    </div>
</template>

<script>
import PersonalInformation from '../apply/PersonalInformation.vue';
import SpouseInformation from '../apply/SpouseInformation.vue';
import BusinessInformation from '../apply/BusinessInformation.vue';
import OtherInformation from '../apply/OtherInformation.vue';

export default {
    name: 'ApplicationForm',
    components: {
        PersonalInformation,
        SpouseInformation,
        BusinessInformation,
        OtherInformation
    },
    props: {
        stall: Object,
        showForm: {
            type: Boolean,
            default: false
        }
    },
    emits: ['close'],
    data() {
        return {
            currentStep: 1,
            personalInfo: null,
            spouseInfo: null,
            businessInfo: null,
            otherInfo: null
        };
    },
    methods: {
        closeForm() {
            this.resetForm();
            this.$emit('close');
        },

        handlePersonalInfoNext(formData) {
            this.personalInfo = formData;

            if (formData.civilStatus === 'Single') {
                this.spouseInfo = null;
                this.currentStep = 3;
            } else {
                this.currentStep = 2;
            }
        },

        handleSpouseInfoNext(spouseData) {
            this.spouseInfo = spouseData;
            this.currentStep = 3;
        },

        handleBusinessInfoNext(businessData) {
            this.businessInfo = businessData;
            this.currentStep = 4;
        },

        handleOtherInfoNext(otherInfoData) {
            this.otherInfo = otherInfoData;

            console.log('All form data:', {
                personal: this.personalInfo,
                spouse: this.spouseInfo,
                business: this.businessInfo,
                other: this.otherInfo
            });

            this.closeForm();
        },

        goToPreviousStep() {
            if (this.currentStep > 1) {
                this.currentStep--;
            }
        },

        resetForm() {
            this.currentStep = 1;
            this.personalInfo = null;
            this.spouseInfo = null;
            this.businessInfo = null;
            this.otherInfo = null;
        }
    }
};
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
</style>
