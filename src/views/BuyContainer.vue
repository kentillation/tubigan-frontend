<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-row>
        <v-col cols="12">
            <div class="top-container">
                <v-btn icon size="small" variant="flat">
                    <v-icon class="top-icon" @click="goBack">mdi-chevron-left</v-icon>
                </v-btn>
                <h5>Buy Container</h5>
                <v-btn icon size="small" variant="flat">
                    <v-icon class="top-icon">mdi-help-circle-outline</v-icon>
                </v-btn>
            </div>
        </v-col>
        <v-col cols="12" class="pt-0">
            <v-container v-model="value" color="primary">
                <p class="mb-5 text-grey">Select container here</p>
                <v-btn class="item-card">
                    <span class="d-flex align-start flex-column">
                        <h4>Round Gallon</h4>
                        <h5 class="text-grey">20 liters</h5>
                        <h2 class="mt-12">100 PHP</h2>
                    </span>
                    <span class="img-container">
                        <img :src="container2" loading="lazy" alt="Container 2" />
                        <v-icon :color="favorites[1] ? 'red' : 'grey'" @click="toggleFavorite(1)">
                            {{ favorites[1] ? 'mdi-heart' : 'mdi-heart-outline' }}
                        </v-icon>
                    </span>
                </v-btn>
                <v-btn class="item-card">
                    <span class="d-flex align-start flex-column">
                        <h4>Gallon w/ Faucet</h4>
                        <h5 class="text-grey">20 liters</h5>
                        <h2 class="mt-12">150 PHP</h2>
                    </span>
                    <span class="img-container">
                        <img :src="container3" loading="lazy" alt="Container 2" />
                        <v-icon :color="favorites[2] ? 'red' : 'grey'" @click="toggleFavorite(2)">
                            {{ favorites[2] ? 'mdi-heart' : 'mdi-heart-outline' }}
                        </v-icon>
                    </span>
                </v-btn>
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
    name: 'BuyContainer',
    components: {
        Alert,
    },
    data() {
        return {
            logo: require('@/assets/Tubig-Carmelo.png'),
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
        goBack() {
            this.$router.go(-1);
        },
        showAlert(message) {
            this.$refs.alertRef.showSnackbarAlert(message, "error");
        },
    },
};
</script>

<style scoped>
.top-container {
    width: 100%;
    height: 45px;
    border-bottom: 1px solid #ccc;
    padding: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.top-icon {
    color: #1d59ff;
}

img {
    width: 80px;
    height: 110px;
}

.img-container {
    right: 20px;
    position: absolute;
}

.item-card {
    height: 170px;
    width: 100%;
    margin-bottom: 20px;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center;
    text-transform: none;
}

.item-card:hover {
    background-color: #002753;
}

.item-card .v-icon {
    margin-left: 10px;
}

</style>