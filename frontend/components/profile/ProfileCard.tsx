import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ProfileCardProps {
    children: ReactNode;
    className?: string;
    title?: string;
    icon?: ReactNode;
}

export function ProfileCard({ children, className, title, icon }: ProfileCardProps) {
    return (
        <div className={cn(
            "group bg-gradient-to-br from-gymshock-dark-800/40 via-gymshock-dark-800/30 to-gymshock-dark-900/40 rounded-2xl shadow-gymshock-elevated border border-gymshock-dark-700/50 p-8 backdrop-blur-sm hover:border-gymshock-primary-600/30 transition-all duration-300 hover:shadow-gymshock-glow",
            className
        )}>
            {title && (
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gymshock-dark-700/50">
                    {icon}
                    <h3 className="text-2xl font-bold text-white group-hover:text-gymshock-primary-300 transition-colors duration-300">{title}</h3>
                </div>
            )}
            {children}
        </div>
    );
}