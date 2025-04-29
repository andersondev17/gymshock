"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { cn, getAvatarColor, getInitials } from "@/lib/utils";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good morning");
        else if (hour < 18) setGreeting("Good afternoon");
        else setGreeting("Good evening");
    }, []);

    return (
        <header className="w-full sticky top-0 z-10 backdrop-blur-sm bg-white/90 shadow-sm py-3 sm:py-4 px-3 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg sm:text-xl font-semibold text-slate-800 lg:text-2xl truncate">
                            {greeting}, <span className="text-red-600">{user?.name} 👋</span>
                        </h2>
                        {user?.role === "admin" && (
                            <span className="bg-red-100 text-red-600 text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap">
                                Admin
                            </span>
                        )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-1 sm:line-clamp-none">
                        {user?.role === "admin"
                            ? "Welcome to GymShock admin panel"
                            : "Browse exercise information and statistics"}
                    </p>
                </div>

                <div className="flex items-center justify-end mt-2 sm:mt-0">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-2 cursor-pointer border px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300 border-gray-200 hover:border-red-200">
                                <Avatar className="h-8 w-8 sm:h-9 sm:w-9 border-2 border-white shadow-sm">
                                    <AvatarFallback className={cn(getAvatarColor(user?.name || ""))}>
                                        {getInitials(user?.name || "U")}
                                    </AvatarFallback>
                                </Avatar>
                                <Settings className="h-4 w-4 text-slate-400" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-48 sm:w-56 mt-1 border bg-white border-gray-200 py-3 shadow-sm transition-shadow duration-300 hover:shadow-md"
                        >
                            <DropdownMenuItem
                                className="hover:bg-slate-50 text-sm sm:text-base px-3 py-2"
                                onClick={() => router.push("/")}
                            >
                                Home
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="hover:bg-slate-50 text-sm sm:text-base px-3 py-2"
                                onClick={() => router.push("/admin/profile")}
                            >
                                My Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-red-500 hover:bg-slate-50 text-sm sm:text-base px-3 py-2"
                                onClick={() => router.push("/")}
                            >
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};

export default Header;
