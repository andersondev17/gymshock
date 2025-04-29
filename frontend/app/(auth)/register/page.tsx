// app/auth/register/page.tsx
"use client";

import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/context/AuthContext";
import { RegisterFormValues, registerSchema } from "@/schemas/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {
    const { register, user, loading, error } = useAuth();
    const router = useRouter();

    // Redireccionar si ya está autenticado
    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);

    const handleRegister = async (data: RegisterFormValues) => {
        const result = await register(data.username, data.email, data.password);

        if (result.success) {
            router.push("/");
            return { success: true };
        }

        return {
            success: false,
            error: result.message || "Error al registrarse"
        };
    };

    return (
        <AuthForm
            type="REGISTER"
            schema={registerSchema}
            defaultValues={{ username: "", email: "", password: "" }}
            onSubmit={handleRegister}
            isLoading={loading}
        />
    );
}