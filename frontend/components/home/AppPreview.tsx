'use client';

import { AppPreviewProps } from '@/constants';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

const AppPreview = ({ children }: AppPreviewProps) => {
    const [isHovering, setIsHovering] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);//reference for the 3D container
    const contentRef = useRef<HTMLDivElement>(null);//reference for the inner content

    const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
        const rect = currentTarget.getBoundingClientRect();// Get dimensions of the container
        const xOffset = clientX - (rect.left + rect.width / 2);
        const yOffset = clientY - (rect.top + rect.height / 2);

        if (isHovering) {
            // slightly movement in direction of the cursor
            gsap.to(sectionRef.current, {
                x: xOffset,
                y: yOffset,
                rotationY: xOffset / 2,//3d rotation effect
                rotationX: -yOffset / 2,
                transformPerspective: 500,
                duration: 0.5,
                ease: "power2.out",
            });

            // move in opposite direction  of parallax
            gsap.to(contentRef.current, {
                x: -xOffset,
                y: -yOffset,
                duration: 0.5,
                ease: "power1.out",
            });
        }
    };

    useEffect(() => {
        //reset position when hover ends
        if (!isHovering && sectionRef.current && contentRef.current) {
            gsap.to(sectionRef.current, {
                x: 0,
                y: 0,
                rotationY: 0,
                rotationX: 0,
                duration: 1,
                ease: "power2.out",
            });

            gsap.to(contentRef.current, {
                x: 0,
                y: 0,
                duration: 1,
                ease: "power2.out",
            });
        }
    }, [isHovering]);

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="absolute z-50 size-full overflow-hidden rounded-lg transition-transform duration-300"
            style={{ perspective: "500px" }}
        >
            <div
                ref={contentRef}
                className={`h-full w-full transition-all duration-500 ${
                    isHovering ? 'shadow-2xl shadow-red-500/20' : 'shadow-xl'
                }`}
                style={{ transformStyle: "preserve-3d" }}
            >
                {children}
            </div>
        </section>
    );
};

export default AppPreview;