'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { createContext, ReactNode, useContext, useMemo } from 'react';

type User = {
    id: string;
    role: string;
    username?: string;
    name?: string;
    email?: string;
};

interface AuthContextType {
    user: User | null;
    isAdmin: boolean;
    login: (username: string, password: string, name?: string) => Promise<{ success: boolean }>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode}) => {
    const { data: session } = useSession();

    const userContext = useMemo(() => {
        const user = session?.user as User | null;
        return {
            user,
            isAdmin: user?.role === "admin",
            login: async (username: string, password: string, name?: string) => {
                const result = await signIn("credentials", {
                    username,
                    password,
                    name,
                    redirect: false,
                });
                return { success: !result?.error };
            },
            logout: async () => {
                await signOut({ redirect: false });
            }
        };
    }, [session]);

    return (
        <AuthContext.Provider value={userContext}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};