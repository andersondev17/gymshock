// frontend/services/authService.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});

type AuthResponse = {
    success: boolean;
    user?: { id: string; username: string; email: string; role: string };
    message?: string;
};

const handleServiceError = (error: unknown): AuthResponse => {
    if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as any;
        return {
            success: false,
            message: axiosError.response?.data?.message || 'Error en el servidor'
        };
    } else {
        return { success: false, message: 'Unknown error' };
    }
}

export const AuthService = {
    login: async (credentials: { username: string | {}; password: string | {} }) => {
        try {
            // Validar y convertir los valores a strings seguros
            const safeCredentials = {
                username: typeof credentials.username === 'string' ? credentials.username : '',
                password: typeof credentials.password === 'string' ? credentials.password : ''
            };
            
            const { data } = await apiClient.post<AuthResponse>('/auth/login', safeCredentials);
            return data;
        } catch (error) {
            return handleServiceError(error);
        }
    },

    register: async (userData: { username: string | {}; email: string | {}; password: string | {} }) => {
        try {
            // Validar y convertir los valores a strings seguros
            const safeUserData = {
                username: typeof userData.username === 'string' ? userData.username : '',
                email: typeof userData.email === 'string' ? userData.email : '',
                password: typeof userData.password === 'string' ? userData.password : ''
            };
            
            const { data } = await apiClient.post<AuthResponse>('/auth/register', safeUserData);
            return data;
        } catch (error) {
            return handleServiceError(error);
        }
    },

    logout: async () => {
        try {
            await apiClient.post('/auth/logout');
            return { success: true };
        } catch (error) {
            return handleServiceError(error);
        }
    },

    getCurrentUser: async () => {
        try {
            const { data } = await apiClient.get<AuthResponse>('/auth/me');
            return data;
        } catch (error) {
            return { success: false };
        }
    }
};