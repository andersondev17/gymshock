'use client';

import { Button, Input } from '@/components/ui';
import { roles } from '@/constants';
import { useAuth } from '@/context/AuthProvider';
import { Eye, EyeOff, Lock, Mail, User, XCircle } from 'lucide-react';
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

function RoleSelector({ onRoleSelect, isLoading, onBack }: RoleSelectorProps) {
    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-[32px] md:text-[48px] font-bold leading-[0.9] tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gymshock-dark-300">
                    CHOOSE YOUR{' '}
                    <span className="text-transparent bg-clip-text bg-gymshock-primary">
                        PATH
                    </span>
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {roles.map((role) => (
                    <div
                        key={role.id}
                        className={`
                            bg-gradient-to-br ${role.bgClass} ${role.hoverClass}
                            backdrop-blur-md border border-gymshock-dark-400 p-8 rounded-2xl 
                            cursor-pointer transition-all duration-300 
                            hover:scale-105 hover:shadow-2xl hover:border-gymshock-dark-500
                        `}
                        onClick={() => onRoleSelect(role.id)}
                    >
                        <div className="text-center space-y-6">
                            <h3 className="text-2xl font-bold mb-3 text-white">
                                {role.title}
                            </h3>
                            <p className="text-gymshock-dark-300 text-sm leading-relaxed">
                                {role.description}
                            </p>

                            <Button
                                className="w-full bg-gymshock-dark-700 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-gymshock-dark-900 font-bold transition-all duration-300"
                                disabled={isLoading}
                                type="button"
                            >
                                {isLoading ? 'Setting up...' : 'JOIN'}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <button
                    onClick={onBack}
                    className="text-gymshock-dark-400 hover:text-white text-sm transition-colors"
                    disabled={isLoading}
                    type="button"
                >
                    ← Back to registration
                </button>
            </div>
        </div>
    );
}

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
            setShowRoleSelector(true);
            return;
        }

        setIsLoading(true);
        try {
            const result = await login(formData.username, formData.password);

            if (result.success) {
                router.push('/');
            } else {
                setError(result.message || 'Login failed');
            }
        } catch (error) {
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
            <div className="text-center mb-8">
                <h1 className="text-[28px] md:text-[36px] font-bold leading-[0.9] tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-gymshock-dark-300">
                    {isLogin ? (
                        <>
                            WELCOME{' '}
                            <span className="text-transparent bg-clip-text bg-gymshock-primary">
                                BACK
                            </span>
                        </>
                    ) : (
                        <>
                            JOIN THE{' '}
                            <span className="text-transparent bg-clip-text bg-gymshock-primary">
                                MOVEMENT
                            </span>
                        </>
                    )}
                </h1>
            </div>

            {error && (
                <div className="bg-gymshock-primary-500/20 backdrop-blur-md border border-gymshock-primary-500/30 text-gymshock-primary-300 p-4 mb-6 rounded-xl flex items-start gap-3">
                    <XCircle className="mt-0.5 w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                </div>
            )}

            {/* Google OAuth Button */}
            <Button
                onClick={loginWithGoogle}
                className="w-full mb-6 bg-gymshock-dark-800 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-gymshock-dark-900 font-medium py-3 transition-all duration-300"
                type="button"
                disabled={isLoading}
            >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
            </Button>

            <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gymshock-dark-500" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-gymshock-dark-900/90 backdrop-blur-md px-4 text-gymshock-dark-400 font-medium">
                        Or continue with email
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="text-gymshock-dark-300 text-sm mb-1 block">Username</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gymshock-dark-400 w-5 h-5" />
                        <Input
                            value={formData.username}
                            onChange={(e) => handleChange('username', e.target.value)}
                            className="pl-12 h-12 bg-gymshock-dark-900/10 backdrop-blur-md border border-gymshock-dark-400 text-white placeholder-gymshock-dark-400 focus:border-gymshock-primary-500 focus:ring-1 focus:ring-gymshock-primary-500 rounded-xl"
                            required
                            disabled={isLoading}
                            placeholder="Enter your username"
                        />
                    </div>
                </div>

                {!isLogin && (
                    <>
                        <div>
                            <label className="text-gymshock-dark-300 text-sm font-medium mb-2 block">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gymshock-dark-400" size={18} />
                                <Input
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className="pl-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gymshock-dark-400 focus:border-gymshock-primary-500 focus:ring-1 focus:ring-gymshock-primary-500 rounded-xl"
                                    required
                                    disabled={isLoading}
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-gymshock-dark-300 text-sm font-medium mb-2 block">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gymshock-dark-400" size={18} />
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className="pl-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gymshock-dark-400 focus:border-gymshock-primary-500 focus:ring-1 focus:ring-gymshock-primary-500 rounded-xl"
                                    required
                                    disabled={isLoading}
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>
                    </>
                )}

                <div>
                    <label className="text-gymshock-dark-300 text-sm font-medium mb-2 block">Password</label>
                    <p className="text-gymshock-dark-400 text-xs mb-2">Must be at least 8 characters</p>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gymshock-dark-400" size={18} />
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            className="pl-12 pr-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gymshock-dark-400 focus:border-gymshock-primary-500 focus:ring-1 focus:ring-gymshock-primary-500 rounded-xl"
                            required
                            disabled={isLoading}
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gymshock-dark-400 hover:text-white transition-colors"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <Button
                    type="submit"
                    variant="gymshock"
                    className='w-full'
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                            <span>Processing...</span>
                        </span>
                    ) : (
                        isLogin ? 'SIGN IN' : 'CONTINUE'
                    )}
                </Button>

                <p className="text-center text-gymshock-dark-400 mt-6">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                    <Link
                        href={isLogin ? '/register' : '/login'}
                        className="text-gymshock-primary-400 hover:text-gymshock-primary-300 font-medium transition-colors"
                    >
                        {isLogin ? 'Sign up' : 'Sign in'}
                    </Link>
                </p>
            </form>

            <div className="flex justify-center items-center gap-3 mt-8 text-gymshock-dark-400">
                <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gymshock-social-blue to-blue-600 border-2 border-white/20"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gymshock-success-500 to-green-600 border-2 border-white/20"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gymshock-social-purple to-purple-600 border-2 border-white/20"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gymshock-energy-500 to-gymshock-primary-500 border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white">+</div>
                </div>
                <span className="text-sm">Join 10k+ athletes</span>
            </div>
        </div>
    );
}