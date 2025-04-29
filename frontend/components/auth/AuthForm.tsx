// components/auth/AuthForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type AuthFormProps = {
    type: "LOGIN" | "REGISTER";
    schema: z.ZodType<any, any>;
    defaultValues: Record<string, string>;
    onSubmit: (data: any) => Promise<{ success: boolean; error?: string }>;
    isLoading: boolean;
};

const AuthForm = ({
    type,
    schema,
    defaultValues,
    onSubmit,
    isLoading,
}: AuthFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const handleFormSubmit = async (data: any) => {
        setIsSubmitting(true);
        setFormError(null);

        try {
            const result = await onSubmit(data);
            if (!result.success && result.error) {
                setFormError(result.error);
            }
        } catch (error) {
            setFormError("Ocurrió un error inesperado. Intenta nuevamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const isLogin = type === "LOGIN";
    const formTitle = isLogin ? "Inicia sesión" : "Crea tu cuenta";
    const buttonText = isLogin ? "Iniciar sesión" : "Registrarse";
    const footerLinkHref = isLogin ? "/register" : "/login";
    const footerLinkText = isLogin ? "Regístrate" : "Inicia sesión";

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold text-white mb-6">{formTitle}</h1>

            {formError && (
                <div className="bg-red-500/10 border-l-4 border-red-500 text-red-400 p-3 mb-4 rounded">
                    {formError}
                </div>
            )}

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
                <div>
                    <div className="relative">
                        <label className="text-gray-300 text-sm mb-1 block">Usuario</label>
                        <div className="flex items-center bg-gray-800/50 border border-gray-700 rounded-md focus-within:border-red-500 transition-colors">
                            <span className="px-3 text-gray-400">
                                <User size={18} />
                            </span>
                            <input
                                {...register("username")}
                                type="text"
                                className="bg-transparent w-full p-3 text-white outline-none"
                                disabled={isSubmitting}
                            />
                        </div>
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.username.message as string}
                            </p>
                        )}
                    </div>
                </div>

                {!isLogin && (
                    <div>
                        <label className="text-gray-300 text-sm mb-1 block">Correo electrónico</label>
                        <div className="flex items-center bg-gray-800/50 border border-gray-700 rounded-md focus-within:border-red-500 transition-colors">
                            <span className="px-3 text-gray-400">
                                <Mail size={18} />
                            </span>
                            <input
                                {...register("email")}
                                type="email"
                                className="bg-transparent w-full p-3 text-white outline-none"
                                disabled={isSubmitting}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message as string}
                            </p>
                        )}
                    </div>
                )}

                <div>
                    <label className="text-gray-300 text-sm mb-1 block">Contraseña</label>
                    <div className="flex items-center bg-gray-800/50 border border-gray-700 rounded-md focus-within:border-red-500 transition-colors">
                        <span className="px-3 text-gray-400">
                            <Lock size={18} />
                        </span>
                        <input
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            className="bg-transparent w-full p-3 text-white outline-none"
                            disabled={isSubmitting}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="px-3 text-gray-400 hover:text-white"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message as string}
                        </p>
                    )}
                </div>

                {isLogin && (
                    <div className="flex justify-end">
                        <Link href="/auth/forgot-password" className="text-sm text-red-400 hover:text-red-300">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-medium p-3 rounded-md hover:from-red-500 hover:to-red-400 transition-all transform hover:translate-y-[-2px] focus:outline-none disabled:opacity-70"
                    disabled={isSubmitting || isLoading}
                >
                    {isSubmitting || isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Procesando...
                        </span>
                    ) : (
                        buttonText
                    )}
                </button>

                <p className="text-center text-gray-400 mt-4">
                    {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}{" "}
                    <Link href={footerLinkHref} className="text-red-400 hover:text-red-300 font-medium">
                        {footerLinkText}
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default AuthForm;