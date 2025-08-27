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
                <h3>What's on your mind right now?</h3>
                <v-container class="mt-10 px-6">
                    <v-btn size="large" class="w-100 mb-5" color="primary"
                        @click="toRefilling">
                        <span>I want to refill my container</span>
                    </v-btn>
                    <v-btn size="large" class="w-100 mb-5" color="primary"
                        @click="showAlert('This feature is coming soon!')">
                        <span>I want to buy with container</span>
                    </v-btn>
                    <v-btn size="large" class="w-100 mb-5" color="primary"
                        @click="showAlert('This feature is coming soon!')">
                        <span>I want to sell water</span>
                    </v-btn>
                </v-container>
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
        toRefilling() {
            this.$router.push('/refilling');
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
</style>