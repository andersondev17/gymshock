'use client';

import { useEffect, useState } from 'react';

export const LoadingBar = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (progress < 90) {
                // Incremento más rápido al inicio, más lento cuando se acerca a 90
                const increment = progress < 60 ? 15 : progress < 80 ? 5 : 1;
                setProgress(prevProgress => Math.min(prevProgress + increment, 90));
            }
        }, 200);

        return () => {
            clearTimeout(timer);
            // (carga completa), mostrar 100% brevemente
            setProgress(100);
        };
    }, [progress]);

    return (
        <div className="w-full h-1 bg-gray-200 fixed top-0 left-0 z-50">
            <div
                className="h-full bg-red-600 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};