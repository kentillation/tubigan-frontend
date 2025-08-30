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
                <v-container class="d-flex mt-10 px-9">
                    <v-btn size="large" class="w-50 ms-0" height="90"
                        @click="toRefilling">
                        <span class="d-flex flex-column align-center">
                            <v-icon>mdi-format-color-fill</v-icon>
                            Refill
                        </span>
                    </v-btn>&nbsp;&nbsp;
                    <v-btn size="large" class="w-50" height="90"
                        @click="showAlert('This feature is coming soon!')">
                        <span class="d-flex flex-column align-center">
                            <v-icon>mdi-cash-fast</v-icon>
                            Buy
                        </span>
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