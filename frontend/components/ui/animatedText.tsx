'use client';
import { animate } from 'animejs';
import { useEffect, useRef, useState } from 'react';

interface AnimatedTextProps {
    children: React.ReactNode;
    className?: string;
    baseColor?: string;
    hoverColor?: string;
    underline?: boolean;
    onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
    href?: string;
    asLink?: boolean;
    disabled?: boolean;
}


const AnimatedText = ({
    children,
    className = "",
    baseColor = "",
    hoverColor = "#1E88E5",
    underline = false,
    onClick,
    href,
    asLink = false,
    disabled = false,
}: AnimatedTextProps) => {
    const elementRef = useRef<HTMLSpanElement | HTMLAnchorElement>(null);
    const baseTextRef = useRef<HTMLSpanElement>(null);
    const hoverTextRef = useRef<HTMLSpanElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (disabled || !elementRef.current) return;

        const element = elementRef.current;

        // Configuración de animaciones
        const handleMouseEnter = () => {
            setIsHovering(true);
            
            if (!baseTextRef.current || !hoverTextRef.current) return;
            
            // Animación de salida del texto base
            animate(baseTextRef.current, {
                translateY: [0, -15], // De posición actual a -15px
                opacity: [1, 0],      // De visible a invisible
                duration: 250,
                easing: 'easeOutExpo'
            });
            
            // Animación de entrada del texto hover
            animate(hoverTextRef.current, {
                translateY: [15, 0],  // De 15px abajo a posición normal
                opacity: [0, 1],      // De invisible a visible
                duration: 300,
                easing: 'easeOutExpo',
                delay: 100 // Retraso leve para efecto secuencial
            });
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            
            if (!baseTextRef.current || !hoverTextRef.current) return;
            
            // Animación de salida del texto hover
            animate(hoverTextRef.current, {
                translateY: [0, -15],
                opacity: [1, 0],
                duration: 250,
                easing: 'easeOutExpo'
            });
            
            // Animación de entrada del texto base
            animate(baseTextRef.current, {
                translateY: [15, 0],
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutExpo',
                delay: 100
            });
        };

        // Agregar event listeners
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup
        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [baseColor, hoverColor, disabled]);

    // Estilos iniciales y clases
    const baseTextStyle = {
        color: baseColor || 'inherit',
        willChange: 'transform, opacity'
    };
    
    const hoverTextStyle = {
        color: hoverColor,
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0,
        willChange: 'transform, opacity'
    };

    const containerClass = `overflow-hidden inline-block relative ${className} ${underline ? "group" : ""} ${onClick ? "cursor-pointer" : ""}`;

    // Contenido común para ambos tipos de renderizado
    const content = (
        <>
            <span
                ref={baseTextRef}
                className="inline-block"
                style={baseTextStyle}
            >
                {children}
            </span>
            <span
                ref={hoverTextRef}
                className="inline-block"
                style={hoverTextStyle as React.CSSProperties}
            >
                {children}
            </span>
            {underline && (
                <span 
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary-200 transition-all duration-300 ${
                        isHovering ? 'w-full' : 'w-0'
                    }`}
                />
            )}
        </>
    );

    // Renderizado condicional según el tipo (link o span)
    if (asLink) {
        return (
            <a
                ref={elementRef as React.RefObject<HTMLAnchorElement>}
                href={href || "#"}
                onClick={onClick as any}
                className={containerClass}   
            >
                {content}
            </a>
        );
    }

    return (
        <span
            ref={elementRef as React.RefObject<HTMLSpanElement>}
            className={containerClass}
            onClick={onClick}
        >
            {content}
        </span>
    );
};

export default AnimatedText;