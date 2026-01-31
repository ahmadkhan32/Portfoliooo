import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
    // For client-side requests, get token from store
    // Note: accessing store outside hook might need care, but zustand state is accessible via getState() if exported or persisted
    // However, direct localStorage access is safer for the interceptor if store isn't ready
    const storageParams = localStorage.getItem('antigravity-auth');
    if (storageParams) {
        const { state } = JSON.parse(storageParams);
        if (state?.user?.token) {
            config.headers.Authorization = `Bearer ${state.user.token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
