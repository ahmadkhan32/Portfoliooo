import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    token: string;
}

interface AuthState {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            login: (userData) => set({ user: userData }),
            logout: () => set({ user: null }),
            isAuthenticated: () => !!get().user,
        }),
        {
            name: 'antigravity-auth',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
