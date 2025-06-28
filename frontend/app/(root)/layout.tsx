'use client';

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { usePathname } from "next/navigation";
import { ReactNode, useLayoutEffect, useRef } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const setupOnce = useRef(false);

    useLayoutEffect(() => {
        // Setup once, no cleanup needed
        if (setupOnce.current) return;
        setupOnce.current = true;

        const initPageTransition = async () => {
            const { gsap } = await import('gsap');

            // timeline creation
            const tl = gsap.timeline({
                ease: "power2.out"
            });

            // ✅ Simple chaining like Midudev
            tl.set("#main-layout", { opacity: 0, y: 20 })
                .to("#main-layout", {
                    opacity: 1,
                    y: 0,
                    duration: 0.6
                });
        };

        //  Reset scroll like Midudev
        window.scrollTo(0, 0);
        initPageTransition();
    }, [pathname]);

    return (
        <main
            id="main-layout"
            className="flex flex-col min-h-screen"
            style={{ opacity: 0 }}
        >
            <div className="sticky top-0 z-50 transition-all duration-300 w-full">
                <Navbar />
            </div>

            <main className="flex-grow relative">
                {children}
            </main>

            <Footer />
        </main>
    );
};

export default HomeLayout;