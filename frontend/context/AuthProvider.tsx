// context/AuthProvider.tsx - SMART: Solo las líneas que faltan
'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export type Role = 'user' | 'trainer' | 'admin';

export interface User {
  readonly id: string;
  readonly email: string;
  readonly username: string;
  readonly name: string;
  readonly role: Role;
  readonly image?: string;
}

const ROLE_PERMISSIONS: Record<Role, Set<Role>> = {
  user: new Set(['user']),
  trainer: new Set(['user', 'trainer']),
  admin: new Set(['user', 'trainer', 'admin'])
};

export const hasRole = (userRole: Role, requiredRole: Role): boolean => {
  return ROLE_PERMISSIONS[userRole].has(requiredRole);
};

class AuthService {
  static async login(username: string, password: string): Promise<{success: boolean, user?: User, message?: string}> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    return data; // ✅ Retorna la respuesta completa con .success
  }

  // ✅ NUEVA: Función register
  static async register(userData: any): Promise<{success: boolean, user?: User, message?: string}> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    return data; // ✅ Retorna la respuesta completa con .success
  }

  static async getCurrentUser(): Promise<User | null> {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        credentials: 'include',
        cache: 'no-store'
      });

      if (!response.ok) return null;
      const data = await response.json();
      return data.success && data.user ? data.user : null;
    } catch {
      return null;
    }
  }

  static async logout(): Promise<void> {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
  }

  // ✅ NUEVA: Google OAuth
  static async loginWithGoogle(): Promise<void> {
    window.location.href = `${API_URL}/auth/google`;
  }
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isTrainer: boolean;
  hasRole(role: Role): boolean;
  login(username: string, password: string): Promise<{success: boolean, user?: User, message?: string}>; // ✅ Retorna respuesta completa
  register(userData: any): Promise<{success: boolean, user?: User, message?: string}>; // ✅ Retorna respuesta completa
  loginWithGoogle(): Promise<void>;
  logout(): Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{
    user: User | null;
    loading: boolean;
  }>({
    user: null,
    loading: true
  });

  const checkAuthStatus = async () => {
    try {
      const user = await AuthService.getCurrentUser();
      setState({ user, loading: false });
    } catch {
      setState({ user: null, loading: false });
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value: AuthContextValue = {
    ...state,
    isAuthenticated: !!state.user,
    isAdmin: state.user ? hasRole(state.user.role, 'admin') : false,
    isTrainer: state.user ? hasRole(state.user.role, 'trainer') : false,

    hasRole: (role) => state.user ? hasRole(state.user.role, role) : false,

    login: async (username, password) => {
      setState(prev => ({ ...prev, loading: true }));
      try {
        const response = await AuthService.login(username, password);
        if (response.success && response.user) {
          setState({ user: response.user, loading: false });
        } else {
          setState({ user: null, loading: false });
        }
        return response; // ✅ Retorna respuesta completa para AuthForm
      } catch (error) {
        setState({ user: null, loading: false });
        throw error;
      }
    },

    // ✅ NUEVA: Método register
    register: async (userData) => {
      setState(prev => ({ ...prev, loading: true }));
      try {
        const response = await AuthService.register(userData);
        if (response.success && response.user) {
          setState({ user: response.user, loading: false });
        } else {
          setState({ user: null, loading: false });
        }
        return response; // ✅ Retorna respuesta completa para AuthForm
      } catch (error) {
        setState({ user: null, loading: false });
        throw error;
      }
    },

    // ✅ NUEVA: Método loginWithGoogle  
    loginWithGoogle: async () => {
      await AuthService.loginWithGoogle();
    },

    logout: async () => {
      setState({ user: null, loading: false });
      await AuthService.logout();
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

interface RoleGuardProps {
  role: Role;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function RoleGuard({ role, fallback = null, children }: RoleGuardProps) {
  const { hasRole } = useAuth();
  return hasRole(role) ? <>{children}</> : <>{fallback}</>;
}