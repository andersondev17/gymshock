import Image from 'next/image';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            <section className="flex items-center justify-center p-6 bg-gray-900">
                <div className="w-full max-w-lg bg-gray-800/80 backdrop-blur-sm p-8 sm:p-10 rounded-xl shadow-xl border border-gray-700/50">
                    <div className="flex items-center gap-3 mb-8">
                        <Image src="/assets/images/Logo.png" alt="GymShock" width={40} height={40} />
                        <h1 className="text-xl font-bold text-white">GymShock</h1>
                    </div>
                    {children}
                </div>
            </section>

            {/* Imagen */}
            <section className="hidden md:block relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent z-10 flex items-center p-12">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Transform your body,<br />
                            <span className="text-red-500">transform your life</span>
                        </h2>
                        <p className="text-gray-300 max-w-md">
                            Access 1,300+ professional exercises and join our fitness community.
                        </p>
                    </div>
                </div>
                <Image
                    src="/assets/images/banner.png"
                    alt="GymShock Inspiration"
                    className="object-cover"
                    priority
                    fill
                />
            </section>
        </main>
    );
}
