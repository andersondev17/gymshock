import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <main className="min-h-screen relative flex items-center justify-center p-4">
            {/* Background img */}
            <div className="absolute inset-0">
                <Image
                    src="/assets/images/banner.png"
                    alt="GymShock Community"
                    className="object-cover"
                    fill
                    priority
                />
                <div className="absolute inset-0 bg-gymshock-dark-900/50"></div>
            </div>

            <div className="relative z-10 w-full max-w-md bg-gymshock-dark-900 backdrop-blur-xl p-8 rounded-xl shadow-2xl border border-gymshock-dark-500">
                <Link href="/" className="flex items-center gap-3 mb-8 hover:opacity-80 transition-opacity">
                    <Image src="/assets/images/Logo.png" alt="GymShock" width={40} height={40} />
                    <h1 className="text-xl font-bold text-white">GymShock</h1>
                </Link>
                {children}
            </div>
        </main>
    );
}