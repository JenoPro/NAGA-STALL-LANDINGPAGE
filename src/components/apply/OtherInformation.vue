<template>
    <div class="overlay">
        <div class="form-container">
            <h2>Other Information</h2>
            <form @submit.prevent>
                <label>
                    Signature of applicant:
                    <input type="file" accept="image/*" @change="onFileChange('applicantSignature', $event)" required />
                </label>

                <label>
                    House Sketch Location:
                    <input type="file" accept="image/*" @change="onFileChange('applicantLocation', $event)" required />
                </label>

                <label>
                    Insert a Valid ID:
                    <input type="file" accept="image/*" @change="onFileChange('applicantValidID', $event)" required />
                </label>

                <label>
                    Email Address:
                    <input type="email" v-model="emailAddress" required />
                </label>

                <div class="buttons">
                    <button type="button" class="btn-close" @click="$emit('previous')">Back</button>
                    <button type="button" class="btn-next" @click="goNext">Submit Application</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
    name: 'OtherInformation',
    emits: ['previous', 'next', 'close'],
    props: {
        stall: Object,
        personalInfo: Object,
        spouseInfo: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            applicantSignature: null,
            applicantLocation: null,
            applicantValidID: null,
            emailAddress: ''
        };
    },
    methods: {
        onFileChange(field, event) {
            const file = event.target.files[0];
            if (file) {
                this[field] = file;
            }
        },
        goNext() {
            if (!this.applicantSignature || !this.applicantLocation || !this.applicantValidID || !this.emailAddress) {
                Swal.fire("Incomplete Fields", "Please fill in all required fields.", "warning");
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(this.emailAddress)) {
                Swal.fire("Invalid Email", "Please enter a valid email address.", "error");
                return;
            }

            Swal.fire({
                title: "Application Submitted",
                text: "The admin will review your application, upon approval. The provided account will be sent directly to your contact number or email address.",
                icon: "success",
                confirmButtonText: "OK",
                customClass: {
                    popup: 'swal-custom-popup',
                    confirmButton: 'swal-custom-confirm'
                },
                buttonsStyling: false
            }).then(() => {
                const otherInfoData = {
                    applicantSignature: this.applicantSignature,
                    applicantLocation: this.applicantLocation,
                    applicantValidID: this.applicantValidID,
                    emailAddress: this.emailAddress
                };
                this.$emit('next', otherInfoData);
            });
        }
    }
};
</script>

<style scoped src="../../assets/css/applicationformstyle.css"></style>
