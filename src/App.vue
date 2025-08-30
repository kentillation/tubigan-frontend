<template>
  <v-app dark>
    <div v-if="connectionStatus !== 'online'" class="connection-container">
      <div class="connection-banner" :class="connectionStatus">
        <v-icon left>
          {{ connectionStatusIcon }}
        </v-icon>
        <span>&nbsp;{{ connectionStatusText }}</span>
      </div>
    </div>
    <v-main>
      <template v-if="!isNotFoundPage">
        <v-app-bar v-if="showMenu && ['Home','History','Schedule','Profile'].includes(currentPage)" class="px-3" location="bottom" prominent>
          <div @click="toHome" class="d-flex align-center flex-column" icon>
            <v-icon class="text-grey" 
            :class="{ 'active-icon': currentPage === 'Home'}">
              mdi-home-outline
            </v-icon>
            <span class="nav-text" :class="{ 'inactive-nav-text': currentPage === 'Home' }">Home</span>
          </div>

          <v-spacer></v-spacer>
          
          <div @click="toHistory" class="d-flex align-center flex-column" icon>
            <v-icon class="text-grey" :class="{ 'active-icon': currentPage === 'History' }">mdi-history</v-icon>
            <span class="nav-text" :class="{ 'active-nav-text': currentPage === 'History' }">History</span>
          </div>

          <v-spacer></v-spacer>

          <div @click="toSchedule" class="d-flex align-center flex-column" icon>
            <v-icon class="text-grey"  :class="{ 'active-icon': currentPage === 'Schedule' }">mdi-calendar</v-icon>
            <span class="nav-text" :class="{ 'active-nav-text': currentPage === 'Schedule' }">Schedule</span>
          </div>

          <v-spacer></v-spacer>

          <div @click="toProfile" class="d-flex align-center flex-column" icon>
            <v-icon class="text-grey" :class="{ 'active-icon': currentPage === 'Profile' }">mdi-account-circle-outline</v-icon>
            <span class="nav-text" :class="{ 'active-nav-text': currentPage === 'Profile' }">Profile</span>
          </div>

        </v-app-bar>
      </template>
      <v-layout>
        <router-view />
        <GlobalLoader />
      </v-layout>
    </v-main>
  </v-app>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useLoadingStore } from '@/stores/loading';
import { useRoute } from 'vue-router';
import GlobalLoader from '@/components/GlobalLoader.vue';

export default {
  name: 'App',
  data() {
    return {
      currentPage: '',
    }
  },
  components: {
    GlobalLoader,
  },
  setup() {
    const authStore = useAuthStore();
    const loadingStore = useLoadingStore();
    const connectionStatus = ref('online');
    const route = useRoute();
    const isNotFoundPage = computed(() => route.name === 'NotFound');

    const updateStatus = () => {
      if (!navigator.onLine) {
        connectionStatus.value = 'offline';
      } else {
        connectionStatus.value = 'online';
      }
    };

    let waitingTimeout;
    const simulateWaiting = () => {
      connectionStatus.value = 'waiting';
      waitingTimeout = setTimeout(() => {
        connectionStatus.value = navigator.onLine ? 'online' : 'offline';
      }, 3000);
    };

    onMounted(() => {
      window.addEventListener('online', updateStatus);
      window.addEventListener('offline', updateStatus);

      simulateWaiting();

      if ('connection' in navigator) {
        navigator.connection.addEventListener('change', () => {
          if (navigator.connection.downlink < 1) {
            connectionStatus.value = 'slow';
          } else if (navigator.onLine) {
            connectionStatus.value = 'online';
          }
        });
      }
    });

    onBeforeUnmount(() => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
      if (waitingTimeout) clearTimeout(waitingTimeout);
    });

    const connectionStatusText = computed(() => {
      switch (connectionStatus.value) {
        case 'offline':
          return 'No internet connection';
        case 'slow':
          return 'Low internet connection';
        case 'waiting':
          return 'Waiting for connection...';
        default:
          return '';
      }
    });

    const connectionStatusIcon = computed(() => {
      switch (connectionStatus.value) {
        case 'offline':
          return 'mdi-wifi-off';
        case 'slow':
          return 'mdi-wifi-alert';
        case 'waiting':
          return 'mdi-timer-sand';
        default:
          return '';
      }
    });

    return {
      authStore,
      loadingStore,
      drawer: ref(true),
      open: ref(false),
      connectionStatus,
      connectionStatusText,
      connectionStatusIcon,
      isNotFoundPage,
    };
  },
  mounted() {
    this.currentPage = 'Home';
  },
  computed: {
    showSidebar() {
      return this.$route.name !== 'LoginPage' && !this.isNotFoundPage;
    },
    showMenu() {
      return this.$route.name !== 'LoginPage' && !this.isNotFoundPage;
    },
  },
  methods: {
    toHome() {
      this.$router.push('/home');
      this.currentPage = 'Home';
    },
    toHistory() {
      this.$router.push('/history');
      this.currentPage = 'History';
    },
    toSchedule() {
      this.$router.push('/schedule');
      this.currentPage = 'Schedule';
    },
    toProfile() {
      this.$router.push('/profile');
      this.currentPage = 'Profile';
    },
  }
};
</script>

<style scoped>
.v-badge__badge {
  font-weight: 700 !important;
  padding: 2px 4px !important;
  min-width: 0 !important;
}

.v-icon {
  border-radius: 30px;
}

.active-icon {
  transition: all 0.3s ease;
  border-radius: 30px;
  background-color: #001346 !important;
  color: #fff !important;
}

.inactive-icon {
  background-color: none !important;
}

.inactive-nav-text {
  color: #5f5f5f !important;
  font-weight: 600;
}

.active-nav-text {
  color: #001346 !important;
  font-weight: 600;
}

.nav-text {
  text-transform: none;
  font-size: 10px;
}
</style>