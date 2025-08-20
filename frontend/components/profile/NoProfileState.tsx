import { Target, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export const NoProfileState = () => (
    <main className="min-h-screen bg-gradient-to-br from-gymshock-dark-800 via-gymshock-dark-900 to-black">
        <article className="max-w-4xl mx-auto px-4 py-16">
            <section className="text-center space-y-8">
                <div className="bg-gymshock-primary-600/20 backdrop-blur-sm rounded-full w-32 h-32 mx-auto flex items-center justify-center border border-gymshock-primary-500/30">
                    <User className="w-16 h-16 text-gymshock-primary-600" />
                </div>
                <header>
                    <h1 className="sr-only">Completa tu perfil fitness en GymShock</h1>
                    <h2 className="text-3xl font-bold text-white mb-4">
                        ¡Completa tu perfil fitness! 🎯
                    </h2>
                    <p className="text-gymshock-dark-300 text-lg mb-6 max-w-2xl mx-auto">
                        Para ofrecerte la mejor experiencia personalizada, necesitamos conocer tus objetivos 
                        y nivel de entrenamiento.
                    </p>
                </header>
                <Link href="/programs">
                    <Button size="lg" variant="gymshock" className="gap-2">
                        <Target className="w-5 h-5" />
                        Crear Mi Perfil
                    </Button>
                </Link>
            </section>
        </article>
    </main>
);

