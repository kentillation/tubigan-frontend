import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '@/views/NotFound.vue';
import LoginPage from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import RefillWater from '@/views/RefillWater.vue';
import BuyWaterWithContainer from '@/views/BuyWaterWithContainer.vue';
import BuyContainer from '@/views/BuyContainer.vue';
import History from '@/views/History.vue';
import Schedule from '@/views/Schedule.vue';
import Profile from '@/views/Profile.vue';
import { useAuthStore } from '@/stores/auth';

const routes = [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    { path: '/', name: 'LoginPage', component: LoginPage, meta: { requiresAuth: false } },
    { path: '/home', name: 'Home', component: Home, meta: { requiresAuth: true } },
    { path: '/refill-water', name: 'RefillWater', component: RefillWater, meta: { requiresAuth: true } },
    { path: '/buy-water-with-container', name: 'BuyWaterWithContainer', component: BuyWaterWithContainer, meta: { requiresAuth: true } },
    { path: '/buy-container', name: 'BuyContainer', component: BuyContainer, meta: { requiresAuth: true } },
    { path: '/history', name: 'History', component: History, meta: { requiresAuth: true } },
    { path: '/schedule', name: 'Schedule', component: Schedule, meta: { requiresAuth: true } },
    { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach(async (to) => {
    const authStore = useAuthStore();
    authStore.checkAuth(); // Optional: Check token validity
    
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return '/';
    }
    
    if (to.path === '/' && authStore.isAuthenticated) {
        return '/home';
    }
});

export default router;
