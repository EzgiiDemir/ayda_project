import { create } from 'zustand';
import { authService, User } from '@/lib/services/auth.service';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;

    // Role checks
    isSuperAdmin: () => boolean;
    isAdmin: () => boolean;
    canEdit: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    login: async (email: string, password: string) => {
        try {
            const response = await authService.login({ email, password });
            set({
                user: response.data.user,
                isAuthenticated: true,
            });
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    register: async (name: string, email: string, password: string, passwordConfirmation: string) => {
        try {
            const response = await authService.register({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            set({
                user: response.data.user,
                isAuthenticated: true,
            });
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    },

    logout: async () => {
        try {
            await authService.logout();
        } finally {
            set({
                user: null,
                isAuthenticated: false,
            });
        }
    },

    checkAuth: async () => {
        set({ isLoading: true });
        try {
            if (authService.isAuthenticated()) {
                const user = await authService.me();
                set({
                    user,
                    isAuthenticated: true,
                });
            } else {
                set({
                    user: null,
                    isAuthenticated: false,
                });
            }
        } catch (error) {
            authService.clearAuth();
            set({
                user: null,
                isAuthenticated: false,
            });
        } finally {
            set({ isLoading: false });
        }
    },

    isSuperAdmin: () => {
        const { user } = get();
        return user?.role === 'super_admin';
    },

    isAdmin: () => {
        const { user } = get();
        return user?.role === 'super_admin' || user?.role === 'admin';
    },

    canEdit: () => {
        const { user } = get();
        return user?.role === 'super_admin' || user?.role === 'admin' || user?.role === 'editor';
    },
}));