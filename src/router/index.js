import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '@/views/NotFound.vue';
import LoginPage from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import Refilling from '@/views/Refilling.vue';
import History from '@/views/History.vue';
import Schedule from '@/views/Schedule.vue';
import Profile from '@/views/Profile.vue';
import More from '@/views/More.vue';
import { useAuthStore } from '@/stores/auth';

const routes = [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    { path: '/', name: 'LoginPage', component: LoginPage, meta: { requiresAuth: false } },
    { path: '/home', name: 'Home', component: Home, meta: { requiresAuth: true } },
    { path: '/refilling', name: 'Refilling', component: Refilling, meta: { requiresAuth: true } },
    { path: '/history', name: 'History', component: History, meta: { requiresAuth: true } },
    { path: '/schedule', name: 'Schedule', component: Schedule, meta: { requiresAuth: true } },
    { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
    { path: '/more', name: 'More', component: More, meta: { requiresAuth: true } },
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
