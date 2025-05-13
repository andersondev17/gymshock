"use client";

import { adminSideBarLinks } from "@/constants";
import { useAuth } from "@/context/AuthProvider";
import { cn } from "@/lib/utils";
import { Dumbbell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();
    const { user } = useAuth();

    return (
        <aside className="sticky left-0 top-0 h-dvh flex flex-col justify-between bg-gradient-to-b from-gray-900 to-slate-800 text-white px-4 pb-5 pt-8 shadow-xl z-10 border-r border-red-500/20">
            {/* Cabecera */}
            <div>
                <Link href="/" className="flex items-center gap-3 border-b border-dashed border-red-500/20 pb-6 group max-md:justify-center">
                    <div className="bg-red-600 p-2 rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-red-600/40">
                        <Dumbbell className="h-6 w-6 text-white" />
                    </div>
                    <div className="max-md:hidden">
                        <h1 className="text-xl font-bold text-white transition-colors duration-300">GYMSHOCK</h1>
                        <p className="text-xs text-gray-400">Admin Panel</p>
                    </div>
                </Link>

                {/* Menú Navegación */}
                <nav className="mt-8 flex flex-col gap-2">
                    {adminSideBarLinks.map((link) => {
                        const isSelected = pathname.includes(link.route);

                        return (
                            <Link
                                href={link.route}
                                key={link.route}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                                    "max-md:justify-center md:w-full",
                                    isSelected
                                        ? "bg-red-600 shadow-md shadow-red-600/20"
                                        : "hover:bg-white/5"
                                )}
                            >
                                <div className="relative w-5 h-5">
                                    <Image
                                        src={link.img}
                                        alt={link.text}
                                        fill
                                        className={cn(
                                            "object-contain transition-all",
                                            isSelected ? "brightness-0 invert" : "opacity-80"
                                        )}
                                    />
                                </div>
                                <span className="max-md:hidden font-medium">{link.text}</span>
                                {isSelected && (
                                    <div className="max-md:hidden ml-auto w-2 h-2 bg-white rounded-full" />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Perfil de Usuario */}
            {user && (
                <div className="mt-auto pt-4 border-t border-red-500/20">
                    <div className="flex items-center gap-3 p-2 max-md:justify-center">
                        <div className="bg-red-600 rounded-full h-8 w-8 flex items-center justify-center text-white font-bold shrink-0">
                            {user?.name?.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="max-md:hidden">
                            <p className="font-medium truncate">{user.name}</p>
                            <p className="text-xs text-gray-400 truncate">
                                {user.role}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;