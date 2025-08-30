<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-row>
        <v-col cols="12">
            <div class="top-container">
                <div class="d-flex justify-space-between">
                    <h3 class="mt-14 ms-3">History</h3>
                    <img :src="logo" loading="lazy" alt="Poofsa Logo" />
                </div>
            </div>
        </v-col>
        <v-col cols="12">
            <v-container>
                <div class="history-content">
                    <span class="d-flex flex-column">
                        <h5 class="text-grey">1:46 PM</h5>
                        <h4 class="mb-2">Refill Water</h4>
                    </span>
                    <span>
                        <h3>100 PHP</h3>
                    </span>
                </div>
                <div class="history-content">
                    <span class="d-flex flex-column">
                        <h5 class="text-grey">5:43 PM</h5>
                        <h4 class="mb-2">Buy Water w/ Container</h4>
                    </span>
                    <span>
                        <h3>300 PHP</h3>
                    </span>
                </div>
                <div class="history-content">
                    <span class="d-flex flex-column">
                        <h5 class="text-grey">10:58 PM</h5>
                        <h4 class="mb-2">Buy Container</h4>
                    </span>
                    <span>
                        <h3>150 PHP</h3>
                    </span>
                </div>
                <div class="history-content">
                    <span class="d-flex flex-column">
                        <h5 class="text-grey">11:27 PM</h5>
                        <h4 class="mb-2">Refill Water</h4>
                    </span>
                    <span>
                        <h3>100 PHP</h3>
                    </span>
                </div>
                <div class="history-content">
                    <span class="d-flex flex-column">
                        <h5 class="text-grey">1:33 PM</h5>
                        <h4 class="mb-2">Buy Water w/ Container</h4>
                    </span>
                    <span>
                        <h3>50 PHP</h3>
                    </span>
                </div>
            </v-container>
        </v-col>
    </v-row>
    <Alert ref="alertRef" />
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import Alert from '@/components/Alert.vue';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'History',
    components: {
        Alert,
    },
    data() {
        return {
            logo: require('@/assets/Tubig-Carmelo.png'),
        }
    },
    setup() {
        const authStore = useAuthStore();
        return {
            authStore,
        };
    },
    methods: {
        showAlert(message) {
            this.$refs.alertRef.showSnackbarAlert(message, "error");
        },
    },
};
</script>

<style scoped>
.top-container {
    min-height: 85px;
    width: 100%;
    height: 85px;
    background: url('@/assets/buildings.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

img {
    width: 90px;
}

.history-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 25px;
}
</style>