'use client';

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main>
             <div className="sticky top-0 z-50 transition-all duration-300 w-full">
                <Navbar />
            </div>
            
            <main className="w-full overflow-x-hidden">
                {children}
            </main>
            
            <Footer />
        </main>
    );
}
export default HomeLayout;