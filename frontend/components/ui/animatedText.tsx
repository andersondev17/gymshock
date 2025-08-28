'use client';

interface AnimatedTextProps {
    children: React.ReactNode;
    className?: string;
    baseColor?: string;
    hoverColor?: string;
    underline?: boolean;
}

export const AnimatedText = ({
    children,
    className = '',
    baseColor,
    hoverColor = '#dc2626',
    underline = false,
}: AnimatedTextProps) => {
    const containerClass = [
        'overflow-hidden inline-block relative group',
        className
    ].filter(Boolean).join(' ');

    return (
        <span className={containerClass}>
            <span
                className="inline-block transition-all duration-300 group-hover:-translate-y-3 group-hover:opacity-0"
                style={{ color: baseColor || 'inherit' }}
            >
                {children}
            </span>
            <span
                className="absolute top-0 left-0 inline-block transition-all duration-300 delay-75 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                style={{ color: hoverColor }}
            >
                {children}
            </span>
            {underline && (
                <span
                    className="absolute -bottom-1 left-0 h-0.5 bg-current w-0 group-hover:w-full transition-all duration-300"
                    style={{ color: hoverColor }}
                />
            )}
        </span>
    );
};

