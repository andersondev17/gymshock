'use client';

import { AuthService } from '@/services/authService';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
type User = {
    id: string;
    username: string;
    email: string;
    role: string;
};

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
    register: (username: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
    logout: () => Promise<void>;
    error: string | null;
    clearError: () => void;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                setLoading(true);
                const response = await AuthService.getCurrentUser();

                if (response.success && response.user) {
                    setUser(response.user);
                }
            } catch (error: any) { // Usar any para simplificar el manejo
                console.error('Error checking auth status:', error.message || error);
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await AuthService.login({ username, password });

            if (!response.success) {
                setError(response.message || 'Error al iniciar sesión');
                return { success: false, message: response.message };
            }

            if (response.user) {
                setUser(response.user);
            }

            return { success: true };
        } catch (error: any) { // Usar any para simplificar el manejo
            const errorMsg = error.message || 'Error al conectar con el servidor';
            setError(errorMsg);
            return { success: false, message: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const register = async (username: string, email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await AuthService.register({ username, email, password });

            if (!response.success) {
                setError(response.message || 'Error al registrarse');
                return { success: false, message: response.message };
            }

            if (response.user) {
                setUser(response.user);
            }

            return { success: true };
        } catch (error: any) { // Usar any para simplificar el manejo
            const errorMsg = error.message || 'Error al conectar con el servidor';
            setError(errorMsg);
            return { success: false, message: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await AuthService.logout();
            setUser(null);
        } catch (error: any) { // Usar any para simplificar el manejo
            console.error('Error logging out:', error.message || error);
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => setError(null);

    const isAdmin = user?.role === 'admin';

    return (
        <AuthContext.Provider
            value={{
                user, loading, login, register, logout, error, clearError, isAdmin
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};