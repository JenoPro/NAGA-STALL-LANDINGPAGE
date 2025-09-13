import PersonalInformation from "./apply/PersonalInformation/PersonalInformation.vue";
import SpouseInformation from "./apply/SpouseInformation/SpouseInformation.vue";
import BusinessInformation from "./apply/BusinessInformation/BusinessInformation.vue";
import OtherInformation from "./apply/OtherInformation/OtherInformation.vue";

export default {
  name: "ApplicationForm",
  components: {
    PersonalInformation,
    SpouseInformation,
    BusinessInformation,
    OtherInformation,
  },
  props: {
    stall: Object,
    showForm: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close"],
  data() {
    return {
      currentStep: 1,
      personalInfo: null,
      spouseInfo: null,
      businessInfo: null,
      otherInfo: null,
      isSubmitting: false,
      apiBaseUrl: process.env.VUE_APP_API_URL || "http://localhost:3001/api",
    };
  },
  methods: {
    async testApiConnection() {
      try {
        console.log('Testing API connection...');
        console.log('API Base URL:', this.apiBaseUrl);
        
        // Test 1: Health check
        console.log('Testing health endpoint...');
        const healthResponse = await fetch(`${this.apiBaseUrl.replace('/api', '')}/api/health`);
        console.log('Health Status:', healthResponse.status);
        const healthData = await healthResponse.text();
        console.log('Health Response:', healthData);

        // Test 2: GET applicants
        console.log('Testing GET /api/applicants...');
        const getResponse = await fetch(`${this.apiBaseUrl}/applicants`);
        console.log('GET Applicants Status:', getResponse.status);
        const getData = await getResponse.text();
        console.log('GET Applicants Response:', getData);

        console.log(`API Test Results - Health: ${healthResponse.status}, GET Applicants: ${getResponse.status}`);
      } catch (error) {
        console.error('API Test Error:', error);
      }
    },

    closeForm() {
      this.resetForm();
      this.$emit("close");
    },

    handlePersonalInfoNext(formData) {
      this.personalInfo = formData;

      if (formData.civilStatus === "Single") {
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

    async handleOtherInfoNext(otherInfoData) {
      this.otherInfo = otherInfoData;
      this.isSubmitting = true;

      try {
        console.log('Starting application submission...');
        
        // Prepare the complete application data
        const applicationData = await this.prepareApplicationData();
        console.log('Prepared application data:', applicationData);

        // Submit to backend
        const result = await this.submitApplication(applicationData);
        console.log('Submission result:', result);

        console.log('Application submitted successfully!', result);
        
        this.closeForm();
      } catch (error) {
        console.error('Full error object:', error);
        
        let errorMessage = "Failed to submit application. Please try again.";

        // Check for network errors
        if (error.message.includes('Failed to fetch')) {
          errorMessage = "Network error: Cannot connect to server. Please check if the server is running on http://localhost:3001";
        } else if (error.message.includes('HTTP 404')) {
          errorMessage = "API endpoint not found (404). Please check server configuration.";
        } else if (error.message.includes('HTTP 500')) {
          errorMessage = "Server error (500). Please check server logs.";
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }

        console.error(`Submission failed: ${errorMessage}`, { apiBaseUrl: this.apiBaseUrl, error });
        this.isSubmitting = false;
      }
    },

    async prepareApplicationData() {
      const personal = this.personalInfo;
      const spouse = this.spouseInfo;
      const business = this.businessInfo;
      const other = this.otherInfo;

      // Map frontend field names to backend field names
      const applicationData = {
        // Personal Information
        applicant_full_name: personal.fullName,
        applicant_contact_number: personal.contactNumber,
        applicant_address: personal.mailingAddress,
        applicant_birthdate: personal.birthdate,
        applicant_civil_status: personal.civilStatus,
        applicant_educational_attainment: personal.education,

        // Spouse Information (if married)
        spouse_full_name: spouse?.spouseName || null,
        spouse_birthdate: spouse?.spouseBirthdate || null,
        spouse_educational_attainment: spouse?.spouseEducation || null,
        spouse_contact_number: spouse?.spouseContact || null,
        spouse_occupation: spouse?.occupation || null,

        // Business Information
        nature_of_business: business?.natureOfBusiness || "",
        capitalization: business?.businessCapitalization || null,
        source_of_capital: business?.sourceOfCapital || "",
        previous_business_experience: business?.previousBusiness || "",
        relative_stall_owner: business?.applicantRelative || "No",

        // Other Information
        signature_of_applicant: other?.applicantSignature?.name || null,
        house_sketch_location: other?.applicantLocation?.name || null,
        valid_id: other?.applicantValidID?.name || null,
        email_address: other?.emailAddress || "",
      };

      return applicationData;
    },

    async submitApplication(applicationData) {
      console.log('API Base URL:', this.apiBaseUrl);
      console.log('Application Data:', applicationData);
      
      // Step 1: Create the applicant record
      const applicantResponse = await fetch(
        `${this.apiBaseUrl}/applicants`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(applicationData)
        }
      );

      console.log('Applicant Response Status:', applicantResponse.status);
      console.log('Applicant Response OK:', applicantResponse.ok);

      if (!applicantResponse.ok) {
        const errorText = await applicantResponse.text();
        console.error('Applicant API Error:', errorText);
        throw new Error(`HTTP ${applicantResponse.status}: ${errorText}`);
      }

      const applicantResult = await applicantResponse.json();

      if (!applicantResult.success) {
        throw new Error(
          applicantResult.message || "Failed to create applicant"
        );
      }

      const applicantId = applicantResult.data.applicant_id;

      // Determine the correct stall ID property
      const stallId = this.stall.stall_id || this.stall.id || this.stall.ID;

      if (!stallId) {
        throw new Error("Stall ID not found in stall object");
      }

      // Step 2: Create the application for the selected stall
      const applicationPayload = {
        stall_id: stallId,
        applicant_id: applicantId,
        application_date: new Date().toISOString().split("T")[0],
      };

      const applicationResponse = await fetch(
        `${this.apiBaseUrl}/applications`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(applicationPayload)
        }
      );

      const applicationResult = await applicationResponse.json();

      if (!applicationResult.success) {
        throw new Error(
          applicationResult.message || "Failed to create application"
        );
      }

      return {
        applicant: applicantResult,
        application: applicationResult,
      };
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
      this.isSubmitting = false;
    },
  },
};