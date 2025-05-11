'use client';

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { usePathname } from "next/navigation";
import { ReactNode, startTransition, useEffect, useState } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {
        startTransition(() => {
            setPageLoaded(true);
        });
        // Reset scroll position on page change
        requestAnimationFrame(() => window.scrollTo(0, 0));
    }, [pathname]);
    return (

        <main className={`flex flex-col min-h-screen ${pageLoaded ? 'animate-fadeIn' : 'opacity-0'}`}>
            <div className="sticky top-0 z-50 transition-all duration-300 w-full">
                <Navbar />
            </div>

            <main className="flex-grow relative">
                {children}
            </main>

            <Footer />
        </main>
    );
}
export default HomeLayout;