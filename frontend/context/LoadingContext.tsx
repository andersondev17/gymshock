'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

// Define la forma del contexto
interface LoadingContextType {
    isLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
}

// Crea el contexto con valores predeterminados
const LoadingContext = createContext<LoadingContextType>({
    isLoading: false,
    startLoading: () => { },
    stopLoading: () => { },
});

// Hook personalizado para usar el contexto
export const useLoading = () => useContext(LoadingContext);

// Proveedor del contexto
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    return (
        <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};