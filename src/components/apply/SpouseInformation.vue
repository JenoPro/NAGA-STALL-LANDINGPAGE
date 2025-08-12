<template>
    <div class="overlay">
        <div class="form-container">
            <h3>Spouse Information</h3>
            <form @submit.prevent>
                <label>
                    Full Name of Spouse:
                    <input type="text" v-model="spouseName" :required="personalInfo.civilStatus !== 'Single'" />
                </label>

                <label>
                    Age of Spouse:
                    <input type="number" v-model.number="spouseAge" min="0"
                        :required="personalInfo.civilStatus !== 'Single'" />
                </label>

                <label>
                    Educational Attainment of Spouse:
                    <select v-model="spouseEducation" :required="personalInfo.civilStatus !== 'Single'">
                        <option disabled value="">Please select</option>
                        <option v-for="level in educationLevels" :key="level" :value="level">
                            {{ level }}
                        </option>
                    </select>
                </label>

                <label>
                    Occupation:
                    <input type="text" v-model="occupation" :required="personalInfo.civilStatus !== 'Single'" />
                </label>

                <label>
                    Contact Number:
                    <input type="tel" v-model="spouseContact" :required="personalInfo.civilStatus !== 'Single'" />
                </label>

                <div class="buttons">
                    <button type="button" class="btn-close" @click="$emit('previous')">Back</button>
                    <button type="button" class="btn-next" @click="goNext">Next</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['previous', 'next'],
    props: {
        stall: Object,
        personalInfo: Object
    },
    data() {
        return {
            spouseName: '',
            spouseAge: null,
            spouseEducation: '',
            educationLevels: [
                'No Formal Education',
                'Elementary Graduate',
                'High School Graduate',
                'Vocational/Trade Course',
                'College Undergraduate',
                'College Graduate',
                'Postgraduate',
            ],
            occupation: '',
            spouseContact: ''
        }
    },
    methods: {
        goNext() {
            if (!this.spouseName || !this.spouseAge || !this.spouseEducation || !this.occupation || !this.spouseContact) {
                alert("Please fill in all required fields.");
                return;
            }

            if (this.spouseAge < 18) {
                alert("Spouse must be at least 18 years old.");
                return;
            }

            const phonePattern = /^09\d{9}$/;
            if (!phonePattern.test(this.spouseContact)) {
                alert("Contact number must be 11 digits and start with '09'.");
                return;
            }

            const spouseData = {
                spouseName: this.spouseName,
                spouseAge: this.spouseAge,
                spouseEducation: this.spouseEducation,
                occupation: this.occupation,
                spouseContact: this.spouseContact
            };

            this.$emit('next', spouseData);
        }
    }
}
</script>

<style scoped src="../../assets/css/applicationformstyle.css"></style>
