// types/auth.ts
import { DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";

// Definimos el rol de usuario como union type
export type UserRole = "user" | "admin";

// Extendemos los tipos de next-auth correctamente
declare module "next-auth" {
    interface User {
        id: string;
        role: UserRole;
        username: string;
    }

    // Extendemos la sesión
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role: UserRole;
            username: string;
        };
    }
}

// Extendemos el JWT con la importación correcta
declare module "next-auth/jwt" {
    interface JWT {
        role?: UserRole;
        id?: string;
        username?: string;
    }
}

// Interfaces para las peticiones de autenticación
export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    user?: {
        id: string;
        username: string;
        email: string;
        role: UserRole;
    };
    token?: string;
    message?: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    success: boolean;
    user?: {
        id: string;
        username: string;
        email: string;
        role: UserRole;
    };
    message?: string;
}