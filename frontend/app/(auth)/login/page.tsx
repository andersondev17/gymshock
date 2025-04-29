// app/auth/login/page.tsx
"use client";

import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/context/AuthContext";
import { LoginFormValues, loginSchema } from "@/schemas/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const { login, user, loading, error } = useAuth();
    const router = useRouter();

    // Redireccionar si ya está autenticado
    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);

    const handleLogin = async (data: LoginFormValues) => {
        const result = await login(data.username, data.password);

        if (result.success) {
            router.push("/");
            return { success: true };
        }

        return {
            success: false,
            error: result.message || "Error al iniciar sesión"
        };
    };

    return (
        <AuthForm
            type="LOGIN"
            schema={loginSchema}
            defaultValues={{ username: "", password: "" }}
            onSubmit={handleLogin}
            isLoading={loading}
        />
    );
}