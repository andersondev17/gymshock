import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <main className="min-h-screen bg-gymshock-dark-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/assets/images/pattern.png')] opacity-10 bg-repeat" />
            <div className="relative z-10 min-h-screen">
                {children}
            </div>
        </main>
    );
}