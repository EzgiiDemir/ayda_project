import apiClient from '@/lib/api-client';
import { jwtDecode } from 'jwt-decode';

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'super_admin' | 'admin' | 'editor';
    is_active: boolean;
    avatar?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface AuthResponse {
    success: boolean;
    data: {
        user: User;
        token: string;
        token_type: string;
        expires_in: number;
    };
}

export interface JWTPayload {
    sub: number;
    role: 'super_admin' | 'admin' | 'editor';
    name: string;
    exp: number;
}

class AuthService {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/auth/login', credentials);

        if (response.data.success) {
            this.setToken(response.data.data.token);
            this.setUser(response.data.data.user);
        }

        return response.data;
    }

    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/auth/register', data);

        if (response.data.success) {
            this.setToken(response.data.data.token);
            this.setUser(response.data.data.user);
        }

        return response.data;
    }

    async logout(): Promise<void> {
        try {
            await apiClient.post('/auth/logout');
        } finally {
            this.clearAuth();
        }
    }

    async me(): Promise<User> {
        const response = await apiClient.get<{ success: boolean; data: User }>('/auth/me');
        return response.data.data;
    }

    async refreshToken(): Promise<string> {
        const response = await apiClient.post<{ success: boolean; data: { token: string } }>('/auth/refresh');
        const newToken = response.data.data.token;
        this.setToken(newToken);
        return newToken;
    }

    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    setUser(user: User): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): User | null {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    clearAuth(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;

        try {
            const decoded = jwtDecode<JWTPayload>(token);
            return decoded.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    }

    getDecodedToken(): JWTPayload | null {
        const token = this.getToken();
        if (!token) return null;

        try {
            return jwtDecode<JWTPayload>(token);
        } catch {
            return null;
        }
    }

    hasRole(roles: string[]): boolean {
        const decoded = this.getDecodedToken();
        return decoded ? roles.includes(decoded.role) : false;
    }

    isSuperAdmin(): boolean {
        return this.hasRole(['super_admin']);
    }

    isAdmin(): boolean {
        return this.hasRole(['super_admin', 'admin']);
    }

    canEdit(): boolean {
        return this.hasRole(['super_admin', 'admin', 'editor']);
    }
}

export const authService = new AuthService();