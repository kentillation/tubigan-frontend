<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-row>
        <v-col cols="12">
            <div class="top-container">
                <div class="d-flex justify-space-between">
                    <h3 class="mt-14 ms-3">Profile</h3>
                    <img :src="logo" loading="lazy" alt="Poofsa Logo" />
                </div>
            </div>
        </v-col>
        <v-col cols="12">
            <v-container>
                <div class="d-flex justify-space-between mb-3">
                    <h5><v-icon size="small">mdi-account-circle-outline</v-icon>&nbsp; Account</h5>
                    <v-icon size="small" @click="openAccountDialog" class="text-info">mdi-chevron-right</v-icon>
                </div>
                <div class="d-flex justify-space-between mb-3">
                    <h5><v-icon size="small">mdi-theme-light-dark</v-icon>&nbsp; Theme</h5>
                    <v-icon size="small" @click="themeDialog = true" class="text-info">mdi-chevron-right</v-icon>
                </div>
                <div class="d-flex justify-space-between mb-3">
                    <h5><v-icon size="small">mdi-information-outline</v-icon>&nbsp; About</h5>
                    <v-icon size="small" class="text-info">mdi-chevron-right</v-icon>
                </div>
                <div class="d-flex justify-space-between mb-3">
                    <h5><v-icon size="small">mdi-help-circle-outline</v-icon>&nbsp; Help</h5>
                    <v-icon size="small" class="text-info">mdi-chevron-right</v-icon>
                </div>
                <div class="d-flex justify-space-between mb-3">
                    <h5><v-icon size="small">mdi-door-open</v-icon>&nbsp; Signout</h5>
                    <v-icon @click="showLogout" size="small" class="text-info">mdi-chevron-right</v-icon>
                </div>
            </v-container>
        </v-col>
    </v-row>
    <v-dialog v-model="accountDialog" width="500">
        <v-card class="pa-2">
            <v-card-title>
                <h3>Account settings</h3>
            </v-card-title>
            <v-card-text>
                <h3>Hello, World!</h3>
            </v-card-text>
            <v-spacer></v-spacer>
            <div class="d-flex justify-space-between pa-3">
                <v-btn prepend-icon="mdi-magic-staff" color="primary" variant="tonal">Apply</v-btn>
                <v-btn prepend-icon="mdi-information-outline" color="error" variant="tonal"
                    @click="accountDialog = false">Change later</v-btn>
            </div>
        </v-card>
    </v-dialog>
    <v-dialog v-model="themeDialog" width="500">
        <v-card class="pa-2">
            <v-card-title>
                <h3>Theme settings</h3>
            </v-card-title>
            <v-card-text>
                <div class="d-flex flex-column">
                    <v-radio-group v-model="selectedTheme" class="ms-5">
                        <v-radio label="Dark" value="dark"></v-radio>
                        <v-radio label="Light" value="light"></v-radio>
                    </v-radio-group>
                </div>
            </v-card-text>
            <v-spacer></v-spacer>
            <div class="d-flex justify-space-between pa-3">
                <v-btn prepend-icon="mdi-magic-staff" color="primary" variant="tonal" @click="applyTheme">Apply</v-btn>
                <v-btn prepend-icon="mdi-information-outline" color="error" variant="tonal"
                    @click="themeDialog = false">
                    <span class="to-hide">Change later</span>
                    <span class="to-show">Later</span>
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
    <Alert ref="alertRef" />
</template>

<script>
import { useTheme } from 'vuetify';
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import Alert from '@/components/Alert.vue';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Settings',
    components: {
        Alert,
    },
    data() {
        return {
            logo: require('@/assets/Tubig-Carmelo.png'),
            accountDialog: false,
        }
    },
    setup() {
        const authStore = useAuthStore();
        const theme = useTheme();
        const themeDialog = ref(false);
        const selectedTheme = ref(theme.global.name.value);
        const currentThemeName = computed(() => {
            return theme.global.name.value === 'dark' ? 'Dark' : 'Light';
        });
        const applyTheme = () => {
            theme.global.name.value = selectedTheme.value;
            localStorage.setItem('theme', selectedTheme.value);
            themeDialog.value = false;
        };

        return {
            authStore,
            theme,
            themeDialog,
            selectedTheme,
            currentThemeName,
            applyTheme,
        };
    },
    methods: {
        openAccountDialog() {
            this.accountDialog = true;
        },
        showAlert(message) {
            this.$refs.alertRef.showSnackbarAlert(message, "error");
        },
        async showLogout() {
            await this.authStore.logout();
        },
    },
};
</script>

<style scoped>
.descriptionColor {
    color: #a3a3a3;
}

.v-icon {
  padding: 20px !important;
}

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