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
        <v-col cols="12" class="pt-0">
            <v-container>
                <v-btn @click="openAccountDialog" class="btn-list" variant="flat">
                    <h5><v-icon>mdi-account-circle-outline</v-icon>&nbsp; Account</h5>
                    <v-icon class="chevron-icon">mdi-chevron-right</v-icon>
                </v-btn>
                <v-btn @click="themeDialog = true" class="btn-list" variant="flat">
                    <h5><v-icon>mdi-theme-light-dark</v-icon>&nbsp; Theme</h5>
                    <v-icon class="chevron-icon">mdi-chevron-right</v-icon>
                </v-btn>
                <v-btn class="btn-list" variant="flat">
                    <h5><v-icon>mdi-information-outline</v-icon>&nbsp; About</h5>
                    <v-icon class="chevron-icon">mdi-chevron-right</v-icon>
                </v-btn>
                <v-btn class="btn-list" variant="flat">
                    <h5><v-icon>mdi-help-circle-outline</v-icon>&nbsp; Help</h5>
                    <v-icon class="chevron-icon">mdi-chevron-right</v-icon>
                </v-btn>
                <v-btn @click="showLogout" class="btn-list" variant="flat">
                    <h5><v-icon>mdi-door-open</v-icon>&nbsp; Signout</h5>
                    <v-icon class="chevron-icon">mdi-chevron-right</v-icon>
                </v-btn>
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
                    @click="accountDialog = false">Later</v-btn>
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

.btn-list {
    display: flex !important;
    justify-content: space-between !important;
    border-radius: 20px;
    padding: 0 !important;
    width: 100%;
    margin-bottom: 10px;
}

.chevron-icon {
    color: #1d59ff;
    position: absolute;
    right: 0px;
}
</style>