<template>
    <div class="overlay">
        <div class="form-container">
            <h3>Provide Personal Information</h3>
            <p>The submitted application will be reviewed by the MEPO Administrator for approval.</p>
            <br>
            <form @submit.prevent>
                <label>
                    Full Name:
                    <input type="text" v-model="fullName" required />
                </label>

                <label>
                    Highest Educational Attainment:
                    <select v-model="education" required>
                        <option disabled value="">Please select</option>
                        <option v-for="level in educationLevels" :key="level" :value="level">{{ level }}</option>
                    </select>
                </label>

                <label>
                    Age:
                    <input type="number" v-model.number="age" min="0" required />
                </label>

                <label>
                    Civil Status:
                    <select v-model="civilStatus" required>
                        <option disabled value="">Please select</option>
                        <option v-for="status in civilStatusOptions" :key="status" :value="status">{{ status }}</option>
                    </select>
                </label>

                <label>
                    Contact Number:
                    <input type="tel" v-model="contactNumber" required />
                </label>

                <label>
                    Mailing Address:
                    <input type="text" v-model="mailingAddress" required />
                </label>

                <div class="buttons">
                    <button type="button" class="btn-close" @click="$emit('close')">Close</button>
                    <button type="button" class="btn-next" @click="goNext">Next</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['close', 'next'],
    props: {
        stall: Object,
    },
    data() {
        return {
            fullName: '',
            education: '',
            age: null,
            civilStatus: '',
            contactNumber: '',
            mailingAddress: '',
            educationLevels: [
                'No Formal Education',
                'Elementary Graduate',
                'High School Graduate',
                'Vocational/Trade Course',
                'College Undergraduate',
                'College Graduate',
                'Postgraduate',
            ],
            civilStatusOptions: [
                'Single',
                'Married',
                'Widowed',
                'Divorced',
                'Separated',
            ],
        };
    },
    methods: {
        goNext() {
            const name = this.fullName.trim();
            const contact = this.contactNumber.trim();
            const address = this.mailingAddress.trim();

            if (!name || !this.education || !this.age || !this.civilStatus || !contact || !address) {
                alert("Please fill in all required fields.");
                return;
            }

            if (this.age < 18) {
                alert("Applicant must be at least 18 years old.");
                return;
            }

            const phonePattern = /^09\d{9}$/;
            if (!phonePattern.test(contact)) {
                alert("Contact number must be 11 digits and start with '09'.");
                return;
            }

            const formData = {
                fullName: name,
                education: this.education,
                age: this.age,
                civilStatus: this.civilStatus,
                contactNumber: contact,
                mailingAddress: address,
                stall: this.stall
            };

            this.$emit('next', formData);
        }
    }
};
</script>

<style scoped src="../../../assets/css/applicationformstyle.css"></style>
