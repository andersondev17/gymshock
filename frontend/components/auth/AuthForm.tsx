// components/auth/AuthForm.tsx - TypeScript Fix
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthProvider';
import { Dumbbell, Eye, EyeOff, Lock, Mail, User, Users, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface AuthFormProps {
    type: 'login' | 'register';
}

interface RoleSelectorProps {
    onRoleSelect: (role: 'user' | 'trainer') => void;
    isLoading: boolean;
    onBack: () => void;
}

// ==================== ROLE SELECTOR COMPONENT ====================
function RoleSelector({ onRoleSelect, isLoading, onBack }: RoleSelectorProps) {
    const roles = [
        {
            id: 'user' as const,
            title: 'Enthusiast',
            description: 'Access exercises and track workouts',
            icon: <Dumbbell className="h-8 w-8 text-white" />,
            color: 'from-blue-600 to-blue-500',
            hoverColor: 'hover:from-blue-500 hover:to-blue-400'
        },
        {
            id: 'trainer' as const,
            title: 'Trainer',
            description: 'Create programs and manage clients',
            icon: <Users className="h-8 w-8 text-white" />,
            color: 'from-red-600 to-red-500',
            hoverColor: 'hover:from-red-500 hover:to-red-400'
        }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-white mb-2">Choose your role to get started</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8  px-4 py-2 text-sm md:text-base">
                {roles.map((role) => (
                    <div
                        key={role.id}
                        className={`
              bg-gradient-to-br ${role.color} ${role.hoverColor} 
              p-6 rounded-xl cursor-pointer transition-all duration-300 
              hover:scale-105 hover:shadow-xl
            `}
                        onClick={() => onRoleSelect(role.id)}
                    >
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                {role.icon}
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
                                <p className="text-white/90 text-sm mb-4 flex items-center">{role.description}</p>
                            </div>

                            <Button
                                className="w-full bg-white text-gray-900 hover:bg-gray-200 font-semibold shadow-sm"
                                disabled={isLoading}
                                type="button"
                            >
                                {isLoading ? 'Setting up...' : `Join`}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <button
                    onClick={onBack}
                    className="text-gray-400 hover:text-white text-sm"
                    disabled={isLoading}
                    type="button"
                >
                    ← Back to registration
                </button>
            </div>
        </div>
    );
}

// ==================== MAIN AUTH FORM ====================
export default function AuthForm({ type }: AuthFormProps) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        name: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showRoleSelector, setShowRoleSelector] = useState(false);

    const { login, register, loginWithGoogle } = useAuth();
    const router = useRouter();

    const isLogin = type === 'login';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (type === 'register') {
            // Show role selector for registration
            setShowRoleSelector(true);
            return;
        }

        // Handle login
        setIsLoading(true);
        try {
            const result = await login(formData.username, formData.password);

            if (result.success) {
                router.push('/');
            } else {
                setError(result.message || 'Login failed');
            }
        } catch (error) {
            // ✅ Fixed: Replace 'any' with proper error handling
            const message = error instanceof Error ? error.message : 'An unexpected error occurred';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRoleSelect = async (role: 'user' | 'trainer') => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await register({
                ...formData,
                role
            });

            if (result.success) {
                router.push('/');
            } else {
                setError(result.message || 'Registration failed');
                setShowRoleSelector(false);
            }
        } catch (error) {
            // ✅ Fixed: Replace 'any' with proper error handling
            const message = error instanceof Error ? error.message : 'An unexpected error occurred';
            setError(message);
            setShowRoleSelector(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Show role selector during registration
    if (showRoleSelector) {
        return (
            <RoleSelector
                onRoleSelect={handleRoleSelect}
                isLoading={isLoading}
                onBack={() => setShowRoleSelector(false)}
            />
        );
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-white mb-6 text-center">
                {isLogin ? 'Welcome Back' : 'Create Your Account'}
            </h1>

            {error && (
                <div className="bg-red-500/10 border-l-4 border-red-500 text-red-400 p-3 mb-4 rounded flex items-start gap-2">
                    <XCircle className="mt-0.5 w-5 h-5" />
                    <span>{error}</span>
                </div>

            )}

            {/* Google OAuth Button */}
            <Button
                onClick={loginWithGoogle}
                variant="outline"
                className="w-full mb-4 flex items-center justify-center gap-2 bg-white text-gray-900  hover:bg-gray-100 border-gray-300 hover:text-black font-medium"
                type="button"
                disabled={isLoading}
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
            </Button>

            <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-gray-900 px-2 text-gray-400">Or continue with email</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-gray-300 text-sm mb-1 block">Username</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            value={formData.username}
                            onChange={(e) => handleChange('username', e.target.value)}
                            className="pl-10 bg-gray-800/50 border-gray-700 text-white focus:border-red-500"
                            required
                            disabled={isLoading}
                            placeholder="Enter your username"
                        />
                    </div>
                </div>

                {!isLogin && (
                    <>
                        <div>
                            <label className="text-gray-300 text-sm mb-1 block">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className="pl-10 bg-gray-800/50 border-gray-700 text-white focus:border-red-500"
                                    required
                                    disabled={isLoading}
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-gray-300 text-sm mb-1 block">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className="pl-10 bg-gray-800/50 border-gray-700 text-white focus:border-red-500"
                                    required
                                    disabled={isLoading}
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>
                    </>
                )}

                <div>
                    <label className="text-gray-300 text-sm mb-1 block">must be at least 8 characters</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            className="pl-10 pr-10 bg-gray-800/50 border-gray-700 text-white focus:border-red-500"
                            required
                            disabled={isLoading}
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-medium"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center space-x-2">
                            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                            <span>Processing...</span>
                        </span>
                    ) : (
                        isLogin ? 'Sign In' : 'Continue'
                    )}
                </Button>

                <p className="text-center text-gray-400 mt-4">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                    <Link
                        href={isLogin ? '/register' : '/login'}
                        className="text-red-400 hover:text-red-300 font-medium"
                    >
                        {isLogin ? 'Sign up' : 'Sign in'}
                    </Link>
                </p>
            </form>
        </div>
    );
}