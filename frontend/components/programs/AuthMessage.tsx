'use client';

import { LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

interface AuthMessageProps {
    onBack?: () => void;
}

export default function AuthMessage({ onBack }: AuthMessageProps) {
    return (
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <div className="text-center space-y-6">
                <div className="bg-gymshock-primary-600/20 backdrop-blur-sm rounded-full w-20 h-20 mx-auto flex items-center justify-center border border-red-500/30">
                    <LogIn className="w-10 h-10 text-gymshock-primary-600" />
                </div>

                <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                        ¡Casi listo! 🎯
                    </h3>
                    <p className="text-gymshock-dark-300 mb-4">
                        Para guardar tu programa personalizado y acceder a todas las funciones,
                        necesitas iniciar sesión o crear una cuenta gratuita.
                    </p>
                    <p className="text-sm text-gymshock-dark-300">
                        Tu evaluación está lista, solo falta asociarla a tu perfil
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/login?redirect=/programs">
                        <Button size="lg" variant="gymshock">
                            <LogIn className="w-5 h-5" />
                            Iniciar Sesión
                        </Button>
                    </Link>
                    <Link href="/register?redirect=/programs">
                        <Button size="lg" variant="secondary">
                            <UserPlus className="w-5 h-5" />
                            Crear Cuenta
                        </Button>
                    </Link>
                </div>

                {onBack && (
                    <Button
                        onClick={onBack}
                     variant="link" 
                    >
                        Volver a mi resumen
                    </Button>
                )}
            </div>
        </div>
    );
}