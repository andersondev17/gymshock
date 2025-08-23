import { ROLE_CONFIGS } from '@/types/profile';

interface RoleBadgeProps {
    role: string;
    size?: 'sm' | 'md' | 'lg';
}

export function RoleBadge({ role, size = 'md' }: RoleBadgeProps) {
    const config = ROLE_CONFIGS[role as keyof typeof ROLE_CONFIGS] || ROLE_CONFIGS.user;

    const sizeClasses = { 
        sm: 'px-2 py-1 text-xs', 
        md: 'px-3 py-1.5 text-sm', 
        lg: 'px-4 py-2 text-base'
    };

    return (
        <div className={`bg-gradient-to-r ${config.color} text-white rounded-full font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${sizeClasses[size]}`}>
            <span className="text-current">{config.icon}</span>
            <span>{config.label}</span>
        </div>
    );
}
