<template>
    <div class="overlay">
        <div class="form-container">
            <h2>Apply for Stall #{{ stall.id.toString().padStart(2, '0') }}</h2>

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
                    Complete Mailing Address:
                    <textarea v-model="mailingAddress" rows="3" required></textarea>
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
// import '../../assets/css/applicationformstyle.css';
// PS: MAY BUG DITO, HINDI VISIBLE ANG TEXT AREA KAPAG NAKA EXTERNAL CSS TAYO. LETS USE INTERNAL CSS MUNA.
export default {
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
            if (this.age < 18) {
                alert("Applicant must be at least 18 years old.");
                return;
            }
            const phonePattern = /^09\d{9}$/;
            if (!phonePattern.test(this.contactNumber)) {
                alert("Contact number must be 11 digits and start with '09'.");
                return;
            }
            if (!this.mailingAddress.includes('@gmail.com')) {
                alert("Mailing Address must contain '@gmail.com'.");
                return;
            }
            // your next step logic here
        },
    }
};

</script>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.09);
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-container {
    background: rgb(255, 243, 243);
    padding: 20px;
    border-radius: 10px;
    width: 600px;
    max-width: 100vw;
}

form {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

label {
    font-weight: 600;
    font-size: 16px;
    color: #333;
    display: flex;
    flex-direction: column;
}

input,
textarea,
select {
    margin-top: 4px;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}

.buttons {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    /* spread buttons to edges */
    gap: 12px;
}

button.btn-next {
    font-weight: bold;
    border: none;
    padding: 10px 18px;
    border-radius: 7px;
    cursor: pointer;
    background-color: #002B5B;
    color: white;
    transition: background-color 0.3s ease;
}

button.btn-next:hover {
    background-color: #12579b;
}

button.btn-close {
    font-weight: bold;
    border: none;
    padding: 10px 18px;
    border-radius: 7px;
    cursor: pointer;
    background-color: #dc3545;
    color: white;
    transition: background-color 0.3s ease;
}

button.btn-close:hover {
    background-color: #c82333;
}
</style>
