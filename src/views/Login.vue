<template>
    <div class="login-bg">
        <v-container class="d-flex align-center justify-center">
            <v-sheet>
                <div class="d-flex justify-center">
                    <img :src="logo" loading="lazy" alt="Logo" />
                </div>
                <v-form ref="form" @submit.prevent="handleLogin" v-model="isFormValid" class="pa-4">
                    <span class="text-white">Email</span>
                    <v-text-field v-model="dev_email" 
                        :rules="[requiredRule, emailFormatRule]"
                        placeholder="Type here..."
                        class="text-info"
                        prepend-inner-icon="mdi-email-outline"
                        variant="outlined"
                        density="compact"
                        autocomplete="username" />

                    <span class="text-white">Password</span>
                    <v-text-field v-model="dev_password" 
                        :rules="[requiredRule]"
                        placeholder="Type here..."
                        class="text-info"
                        prepend-inner-icon="mdi-lock-outline" 
                        variant="outlined"
                        density="compact" 
                        autocomplete="current-password"
                        :type="showPassword ? 'text' : 'password'"
                        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye-outline'" 
                        @click:append-inner="showPassword = !showPassword" />

                    <v-btn :disabled="!isFormValid || loading" type="submit" color="#004fb6" size="large" class="mt-3" height="45" block rounded>
                        Proceed
                    </v-btn>
                    <p class="forgot-pass text-white ms-2" @click="$router.push('/forgot-password')">Forgot password?</p>
                    <h6 class="system-version text-center text-grey-darken-2">Tubig Carmelo Ordering System UAT v1.0.0</h6>
                </v-form>
            </v-sheet>
            <v-snackbar v-model="snackbar.visible" :color="snackbar.color" timeout="4000" top>
                {{ snackbar.message }}
            </v-snackbar>
        </v-container>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { useLoadingStore } from '@/stores/loading';
import { shallowRef } from 'vue';

export default {
    name: 'LoginPage',
    setup() {
        const loadingStore = useLoadingStore();
        return {
            mpin: shallowRef(''),
            loadingStore,
        };
    },
    data() {
        return {
            logo: require('@/assets/Tubig-Carmelo.png'),
            dev_email: '',
            dev_password: '',
            showPassword: false,
            isFormValid: false,
            loading: false,
            snackbar: {
                visible: false,
                message: '',
                color: ''
            },
        };
    },
    methods: {
        requiredRule(v) {
            return !!v || 'This field is required';
        },
        emailFormatRule(v) {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return pattern.test(v) || 'Invalid email format';
        },
        async handleLogin() {
            const isValid = await this.$refs.form.validate();
            if (!isValid) return;

            this.loading = true;
            try {
                this.loadingStore.show('');
                const authStore = useAuthStore();
                await authStore.login({ dev_email: this.dev_email, dev_password: this.dev_password });
                window.location.href = '/home';
            } catch (error) {
                this.loadingStore.hide();
                this.showSnackbar(error || 'Login failed. Please try again!', 'error');
            } finally {
                this.loading = false;
            }
        },
        showSnackbar(message, color) {
            this.snackbar.message = message;
            this.snackbar.color = color;
            this.snackbar.visible = true;
        }
    }
};
</script>

<style scoped>
* {
    margin: 0 !important;
    padding: 0 !important;
}
.login-bg {
    width: 100dvw;
    height: 100dvh;
}

.v-container {
    align-items: center;
}

.v-sheet {
    margin-left: 0 !important;
}

.v-form {
    padding: 50px !important;
    background-color: #000f50;
    border-radius: 50px;
    height: 100dvh;
}

img {
    min-width: 70px;
    width: 40%;
    border-radius: 10px;
    padding: 50px;
    margin-top: 25px !important;
    margin-bottom: 25px !important;
}

.forgot-pass {
    margin-top: 8px !important;
    font-size: 14px;
}

.v-input__details {
    display: flex;
}

.system-version {
    margin-top: 220px !important;
}
</style>