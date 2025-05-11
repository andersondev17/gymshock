'use client';

import { navItems } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { cn, getInitials } from "@/lib/utils";
import { LogOut, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

const MobileNav = ({ onClose }: { onClose?: () => void }) => {
    const { user, logout } = useAuth();
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
        await logout();
        setIsOpen(false);
        router.push('/');
    };

    const NavItem = ({ href, label }: { href: string; label: string }) => {
        const isActive = pathname === href;

        return (
            <SheetClose asChild>
                <Link
                    href={href}
                    className={cn(
                        "flex items-center h-16 px-5 text-lg font-medium rounded-xl",
                        "transition-colors duration-200",
                        isActive ? "bg-red-50 text-red-600" : "text-gray-700 hover:bg-gray-50"
                    )}
                >
                    <div className="w-full flex items-center justify-between">
                        {label}
                        {isActive && <div className="h-2 w-2 rounded-full bg-red-500" />}
                    </div>
                </Link>
            </SheetClose>
        );
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10 border-red-100 hover:bg-red-50"
                    aria-label="Toggle navigation menu"
                >
                    <Menu className="h-5 w-5 text-gray-800" />
                </Button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="w-full sm:max-w-md border-l-red-100 p-0 bg-white"
                onInteractOutside={() => setIsOpen(false)}
            >
                <SheetHeader className="p-6 border-b">
                    <SheetTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/assets/images/Logo.png"
                                alt="Logo"
                                width={32}
                                height={32}
                                className="bg-white/90 p-1 rounded-md"
                            />
                            <span className="font-bold text-xl text-red-600">
                                GymShock
                            </span>
                        </div>
                    </SheetTitle>
                </SheetHeader>

                <div className="py-8 px-6 space-y-1">
                    <nav className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <NavItem key={item.href} {...item} />
                        ))}
                    </nav>
                </div>

                <SheetFooter className="p-6 border-t bg-gray-50">
                    {user ? (
                        <div className="w-full space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-white rounded-xl border">
                                <Avatar className="h-14 w-14 border-2 border-red-500">
                                    <AvatarFallback className="bg-red-500 text-white">
                                        {getInitials(user.name || user.username)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {user.name || user.username}
                                    </p>
                                    <span className="text-xs text-gray-500">
                                        {user.role === 'admin' ? 'Admin' : 'Member'}
                                    </span>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full text-primary border-red-200 hover:bg-red-50 hover:text-red-600"
                                onClick={handleLogout}
                            >
                                <LogOut size={18} />
                                <span>Sign Out</span>
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