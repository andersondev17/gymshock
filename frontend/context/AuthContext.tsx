// frontend/context/AuthContext.tsx
'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import React, { createContext, ReactNode, useContext, useState } from 'react';

type User = {
    id: string;
    name?: string;
    username?: string;
    email?: string;
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
    const { data: session, status } = useSession();
    const [error, setError] = useState<string | null>(null);
    
    const loading = status === "loading";
    const user = session?.user as User | null;
    const isAdmin = user?.role === "admin";

    const login = async (username: string, password: string) => {
        try {
            setError(null);
            
            const result = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });
            
            if (result?.error) {
                setError(result.error);
                return { success: false, message: result.error };
            }
            
            return { success: true };
        } catch (error: any) {
            const errorMsg = error.message || 'Error al conectar con el servidor';
            setError(errorMsg);
            return { success: false, message: errorMsg };
        }
    };

    const register = async (username: string, email: string, password: string) => {
        try {
            setError(null);
            
            // Llamada a nuestro servicio de registro y luego iniciamos sesión
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });
            
            const data = await response.json();
            
            if (!data.success) {
                setError(data.message || 'Error al registrarse');
                return { success: false, message: data.message };
            }
            
            // Si el registro fue exitoso, iniciamos sesión
            const loginResult = await login(username, password);
            return loginResult;
        } catch (error: any) {
            const errorMsg = error.message || 'Error al conectar con el servidor';
            setError(errorMsg);
            return { success: false, message: errorMsg };
        }
    };

    const logout = async () => {
        try {
            await signOut({ redirect: false });
        } catch (error: any) {
            console.error('Error logging out:', error.message || error);
        }
    };

    const clearError = () => setError(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                error,
                clearError,
                isAdmin
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