<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-row>
        <v-col cols="12">
            <div class="top-container">
                <div class="d-flex justify-space-between">
                    <h3 class="mt-14 ms-3">Refilling</h3>
                    <img :src="logo" loading="lazy" alt="Poofsa Logo" />
                </div>
            </div>
        </v-col>
        <v-col cols="12">
            <v-container v-model="value" color="primary" horizontal>
                <p class="mb-5">Select your preffered container</p>
                <v-card class="pa-3 mb-5">
                    <div class="d-flex justify-space-between">
                        <span>
                            <h4>Bottled Water</h4>
                            <h4>500 milliliters</h4>
                            <h2 class="mt-12">25 PHP</h2>
                        </span>
                        <span>
                            <img :src="container1" style="width: 70px; height: 140px;" loading="lazy"
                                alt="Container 1" />
                            <v-icon :color="favorites[0] ? 'red' : 'grey'" @click="toggleFavorite(0)">
                                {{ favorites[0] ? 'mdi-heart' : 'mdi-heart-outline' }}
                            </v-icon>
                        </span>
                    </div>
                </v-card>
                <v-card class="pa-3 mb-5">
                    <div class="d-flex justify-space-between">
                        <span>
                            <h4>Round Gallon</h4>
                            <h4>20 liters</h4>
                            <h2 class="mt-12">100 PHP</h2>
                        </span>
                        <span>
                            <img :src="container2" style="width: 100px; height: 140px;" loading="lazy"
                                alt="Container 2" />
                            <v-icon :color="favorites[1] ? 'red' : 'grey'" @click="toggleFavorite(1)">
                                {{ favorites[1] ? 'mdi-heart' : 'mdi-heart-outline' }}
                            </v-icon>
                        </span>
                    </div>
                </v-card>
                <v-card class="pa-3 mb-5">
                    <div class="d-flex justify-space-between">
                        <span>
                            <h4>Gallon with Faucet</h4>
                            <h4>20 liters</h4>
                            <h2 class="mt-12">150 PHP</h2>
                        </span>
                        <span>
                            <img :src="container3" style="width: 100px; height: 140px;" loading="lazy"
                                alt="Container 3" />
                            <v-icon :color="favorites[2] ? 'red' : 'grey'" @click="toggleFavorite(2)">
                                {{ favorites[2] ? 'mdi-heart' : 'mdi-heart-outline' }}
                            </v-icon>
                        </span>
                    </div>
                </v-card>
            </v-container>
        </v-col>
    </v-row>
    <Alert ref="alertRef" />
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth';
import Alert from '@/components/Alert.vue';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Refill',
    components: {
        Alert,
    },
    data() {
        return {
            logo: require('@/assets/Tubig-Carmelo.png'),
            container1: require('@/assets/Containers/Container-1.png'),
            container2: require('@/assets/Containers/Container-2.png'),
            container3: require('@/assets/Containers/Container-3.png'),
        }
    },
    setup() {
        const value = ref(1)
        const authStore = useAuthStore();
        const favorites = ref([false, false, false]);
        function toggleFavorite(index) {
            favorites.value[index] = !favorites.value[index];
        }
        return {
            authStore,
            value,
            favorites,
            toggleFavorite,
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
</style>