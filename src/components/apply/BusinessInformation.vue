<template>
    <div class="overlay">
        <div class="form-container">
            <h3>Business Information</h3>
            <form @submit.prevent>
                <label>
                    Capitalization:
                    <input type="number" v-model="businessCapitalization" required />
                </label>

                <label>
                    Source of Capital:
                    <select v-model="sourceOfCapital" required>
                        <option disabled value="">Please select</option>
                        <option v-for="level in capitalType" :key="level" :value="level">{{ level }}</option>
                    </select>
                </label>

                <label>
                    Previous Business Experience:
                    <input type="text" v-model="previousBusiness" required />
                </label>

                <label>
                    Relatives who is presently a stall owner @NCPM (If any):
                    <input type="tel" v-model="applicantRelative" />
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
    name: 'BusinessInformation',
    emits: ['previous', 'next', 'close'],
    props: {
        stall: Object,
        personalInfo: Object,
        spouseInfo: {
            type: Object,
            default: null
        }

    }, data() {
        return {
            businessCapitalization: null,
            sourceOfCapital: '',
            previousBusiness: '',
            applicantRelative: '',
            capitalType: [
                'Personal Savings',
                'Loan from Bank/Financial Institution',
                'Loan from Family/Friends',
                'Government Grant',
                'Investor/Partnership',
                'Other Sources'
            ]
        };
    }, methods: {
        goNext() {
            if (!this.businessCapitalization || !this.sourceOfCapital || !this.previousBusiness) {
                alert("Please fill in all required fields.");
                return;
            }

            if (this.businessCapitalization <= 0) {
                alert("Capitalization must be greater than zero.");
                return;
            }

            const businessData = {
                businessCapitalization: this.businessCapitalization,
                sourceOfCapital: this.sourceOfCapital,
                PreviousBusiness: this.previousBusiness,
                applicantRelative: this.applicantRelative
            };
            this.$emit('next', businessData);
        }
    }
}
</script>

<style scoped src="../../assets/css/applicationformstyle.css"></style>
