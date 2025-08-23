import { ReactNode } from 'react';

interface ProfileStatCardProps {
    icon: ReactNode;
    value: string | number;
    description: string;
    variant: 'fitness' | 'stats';
    colorTheme: 'primary' | 'energy' | 'success' | 'warning';
    className?: string;
}

export function ProfileStatCard({
    icon,
    value,
    description,
    variant,
    colorTheme,
    className = ''
}: ProfileStatCardProps) {
    const isFitness = variant === 'fitness';
    
    const themes = {
        primary: isFitness ? 'hover:border-gymshock-primary-600/30 hover:shadow-gymshock-glow' : 'from-gymshock-primary-600/10 to-gymshock-primary-700/10 border-gymshock-primary-600/20 hover:border-gymshock-primary-600/40',
        energy: isFitness ? 'hover:border-gymshock-energy-600/30 hover:shadow-gymshock-energy' : 'from-gymshock-warning-600/10 to-gymshock-warning-700/10 border-gymshock-warning-600/20 hover:border-gymshock-warning-600/40',
        success: isFitness ? 'hover:border-gymshock-success-600/30' : 'from-gymshock-success-600/10 to-gymshock-success-700/10 border-gymshock-success-600/20 hover:border-gymshock-success-600/40',
        warning: isFitness ? 'hover:border-gymshock-warning-600/30' : 'from-gymshock-success-600/10 to-gymshock-success-700/10 border-gymshock-success-600/20 hover:border-gymshock-success-600/40'
    };

    const baseClasses = isFitness 
        ? 'from-gymshock-dark-800/50 to-gymshock-dark-900/50 border-gymshock-dark-700/50'
        : '';
        
    return (
        <div className={`group text-center p-6 bg-gradient-to-br ${baseClasses} ${themes[colorTheme]} rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${className}`}>
            <div className={`${isFitness ? 'w-16 h-16 mb-4 rounded-2xl' : 'w-12 h-12 mb-3 rounded-xl'} mx-auto flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                {icon}
            </div>
            <h4 className={`font-bold text-white ${isFitness ? 'text-lg' : 'text-3xl'} transition-colors`}>
                {value}
            </h4>
            <p className="text-gymshock-dark-400 text-xs md:text-sm mt-1 truncate overflow-hidden block md:hidden  ">{description}</p>
        </div>
    );
}