'use client';

import { navItems } from "@/constants";
import { useAuth } from "@/context/AuthProvider";
import { cn, getInitials } from "@/lib/utils";
import { LogOut, Menu, Settings, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

const MobileNav = ({ onClose }: { onClose?: () => void }) => {
    // ✅ Single hook with everything needed
    const { user, logout, isAdmin, isTrainer } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const closeMenu = () => {
            setIsOpen(false);
            onClose?.();
        }

        closeMenu();
    }, [pathname, onClose]);

    const handleLogout = async () => {
        try {
            await logout();
            setIsOpen(false);
            router.push('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // ✅ Simplified NavItem - Single Responsibility
    const NavItem = ({ href, label, isActive = false }: { 
        href: string; 
        label: string; 
        isActive?: boolean;
    }) => (
        <SheetClose asChild>
            <Link
                href={href}
                className={cn(
                    "flex items-center justify-between h-11 px-4 rounded-lg font-medium transition-colors",
                    isActive 
                        ? "bg-red-50 text-red-600" 
                        : "text-gray-700 hover:bg-gray-50"
                )}
            >
                {label}
                {isActive && <div className="w-2 h-2 bg-red-500 rounded-full" />}
            </Link>
        </SheetClose>
    );

    // ✅ Role Badge - Visual Hierarchy
    const RoleBadge = () => {
        if (!user) return null;
        
        const roleConfig: Record<string, { color: string; label: string }> = {
            admin: { color: 'bg-red-500', label: 'Admin' },
            trainer: { color: 'bg-blue-500', label: 'Trainer' },
            user: { color: 'bg-gray-500', label: 'Member' }
        };
        
        const config = roleConfig[user.role] || roleConfig.user;
        
        return (
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold", config.color)}>
                {getInitials(user.name || user.username)}
            </div>
        );
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-10 h-10 border-gray-200 hover:bg-gray-50"
                    aria-label="Toggle navigation menu"
                >
                    <Menu className="w-5 h-5" />
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:max-w-sm p-0">
                {/* ✅ Header - Minimal + Branded */}
                <SheetHeader className="p-6 border-b">
                    <SheetTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Image src="/assets/images/Logo.png" alt="Logo" width={28} height={28} />
                            <span className="font-bold text-lg text-red-600">GymShock</span>
                        </div>
                        {isAdmin && (
                            <div className="flex items-center gap-1 bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                                <Shield size={10} />
                                Admin
                            </div>
                        )}
                    </SheetTitle>
                </SheetHeader>

                {/* ✅ Navigation - Dynamic Based on RBAC */}
                <div className="flex-1 p-6">
                    <nav className="space-y-2">
                        {/* Public Navigation */}
                        {navItems.map((item) => (
                            <NavItem 
                                key={item.href} 
                                href={item.href}
                                label={item.label}
                                isActive={pathname === item.href}
                            />
                        ))}
                        
                        {/* RBAC-Protected Navigation */}
                        {user && (
                            <>
                                <div className="border-t my-4" />
                                
                                {/* Dashboard for all users */}
                                <NavItem 
                                    href="/dashboard" 
                                    label="Dashboard" 
                                    isActive={pathname.startsWith('/dashboard')}
                                />

                                {/* Trainer Dashboard - For trainers and admins */}
                                {isTrainer && (
                                    <div className="relative">
                                        <NavItem 
                                            href="/trainer" 
                                            label="Trainer Hub" 
                                            isActive={pathname.startsWith('/trainer')}
                                        />
                                        {pathname.startsWith('/trainer') && (
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                <Settings size={14} className="text-blue-500" />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Admin Panel - Admins only */}
                                {isAdmin && (
                                    <div className="relative">
                                        <NavItem 
                                            href="/admin" 
                                            label="Admin Panel" 
                                            isActive={pathname.startsWith('/admin')}
                                        />
                                        {pathname.startsWith('/admin') && (
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                <Shield size={14} className="text-red-500" />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </nav>
                </div>

                {/* ✅ Footer - User Info + Actions */}
                <SheetFooter className="p-6 border-t bg-gray-50">
                    {user ? (
                        <div className="w-full space-y-3">
                            {/* User Card - Simplified */}
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                                <RoleBadge />
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">{user.name || user.username}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <span className={cn(
                                            "text-xs px-2 py-0.5 rounded-full",
                                            isAdmin ? "bg-red-100 text-red-600" : 
                                            isTrainer ? "bg-blue-100 text-blue-600" : 
                                            "bg-gray-100 text-gray-600"
                                        )}>
                                            {user.role}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Logout */}
                            <Button
                                variant="outline"
                                className="w-full text-red-600 border-red-200 hover:bg-red-50"
                                onClick={handleLogout}
                            >
                                <LogOut size={16} />
                                Sign Out
                            </Button>
                        </div>
                    ) : (
                        <Link href="/login" className="w-full">
                            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                                Join Now
                            </Button>
                        </Link>
                    )}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;