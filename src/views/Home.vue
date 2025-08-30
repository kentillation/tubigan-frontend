<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-row>
        <v-col cols="12">
            <div class="top-container">
                <div class="d-flex justify-space-between">
                    <h3 class="mt-14 ms-3">Home</h3>
                    <img :src="logo" loading="lazy" alt="Poofsa Logo" />
                </div>
            </div>
        </v-col>
        <v-col cols="12">
            <div class="text-center">
                <span class="text-grey">What's your transaction today?</span>
                <div class="btn-card-container mt-9 ps-5 pe-8">
                    <v-btn size="large" class="btn-card" height="130"
                        @click="toRefillWater">
                        <span style="color: #3c70ff;" class="d-flex flex-column align-center">
                            <span style="font-size: 50px;"><v-icon>mdi-basket-fill</v-icon></span>
                            <span style="font-size: 12px;" class="mt-2">Refill Water</span>
                        </span>
                    </v-btn>&nbsp;&nbsp;
                    <v-btn size="large" class="btn-card" height="130"
                        @click="toBuyWaterWithContainer">
                        <span style="color: #3c70ff;" class="d-flex flex-column align-center">
                            <span style="font-size: 50px;"><v-icon>mdi-cup-water</v-icon></span>
                            <span style="font-size: 12px;" class="mt-2">Buy Water <br /> w/ Container</span>
                        </span>
                    </v-btn>
                </div>
                <div class="btn-card-container ps-5 pe-8">
                    <v-btn size="large" class="btn-card" height="130"
                        @click="toBuyContainer">
                        <span style="color: #3c70ff;" class="d-flex flex-column align-center">
                            <span style="font-size: 50px;"><v-icon>mdi-bottle-soda-outline</v-icon></span>
                            <span style="font-size: 12px;" class="mt-2">Buy Container</span>
                        </span>
                    </v-btn>&nbsp;&nbsp;
                </div>
            </div>
        </v-col>
    </v-row>
    <Alert ref="alertRef" />
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import Alert from '@/components/Alert.vue';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Home',
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
        toRefillWater() {
            this.$router.push('/refill-water');
        },
        toBuyWaterWithContainer() {
            this.$router.push('/buy-water-with-container');
        },
        toBuyContainer() {
            this.$router.push('/buy-container');
        },
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

.btn-card-container {
    display: flex;
    margin-bottom: 12px;
}

.btn-card {
    width: 50%;
}

span {
  text-transform: none;
}

.v-btn:hover {
    background-color: #002753;
}
</style>