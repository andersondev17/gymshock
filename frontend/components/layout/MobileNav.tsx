import { navItems } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { cn, getInitials } from "@/lib/utils";
import { LogOut, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

const MobileNav = ({ open, onOpenChange, onClose }: {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onClose?: () => void
}) => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [localOpen, setLocalOpen] = useState(false);

    // Sincronizar estado local con prop open cuando cambia
    useEffect(() => {
        if (open !== undefined) {
            setLocalOpen(open);
        }
    }, [open]);

    // Cerrar el menú cuando cambia la ruta
    useEffect(() => {
        setLocalOpen(false);
        if (onClose) onClose();
    }, [pathname, onClose]);

    const handleLogout = async () => {
        await logout();
        setLocalOpen(false);
        if (onClose) onClose();
        router.push('/');
    };

    // Gestionar cambios de estado
    const handleOpenChange = (isOpen: boolean) => {
        setLocalOpen(isOpen);

        if (onOpenChange) {
            onOpenChange(isOpen);
        }

        if (!isOpen && onClose) {
            onClose();
        }
    };

    // Elemento de navegación personalizado con cierre automático
    const NavItem = ({ href, label }: { href: string; label: string }) => {
        const isActive = pathname === href;

        return (
            <SheetClose asChild onClick={() => {
                if (onClose) onClose();
            }}>
                <Link
                    href={href}
                    className={cn(
                        "flex items-center h-14 px-5 text-lg font-medium rounded-lg transition-all duration-300 relative overflow-hidden group",
                        isActive
                            ? "bg-red-50 text-red-600 font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                    )}
                >
                    <div className="max-w-[800px] mx-auto w-full flex">
                        {label}
                    </div>
                    {isActive && (
                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-r-md" />
                    )}
                </Link>
            </SheetClose>
        );
    };

    return (
        <Sheet
            open={open !== undefined ? open : localOpen}
            onOpenChange={handleOpenChange}
        >
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-9 w-9 border-red-100 flex items-center justify-center hover:bg-red-50 transition-all"
                    aria-label="Mobile navigation menu"
                >
                    <Menu className="h-5 w-5 text-gray-700" />
                </Button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="w-full sm:w-full md:w-full lg:w-full xl:w-full p-0 border-l-red-100 flex flex-col"
                onInteractOutside={() => {
                    handleOpenChange(false);
                }}
                onEscapeKeyDown={() => {
                    handleOpenChange(false);
                }}
            >
                <SheetHeader className="p-4 border-b relative bg-white">
                    <SheetTitle asChild className="text-center">
                        <div className="flex items-center justify-center gap-3 max-w-[800px] mx-auto w-full">
                            <div className="relative w-8 h-8 overflow-hidden rounded-md flex-shrink-0">
                                <Image
                                    src="/assets/images/Logo.png"
                                    alt="GymShock Logo"
                                    fill
                                    className="object-contain p-1 bg-white/80"
                                    priority
                                />
                            </div>
                            <span className="font-bold text-xl">GymShock</span>
                        </div>
                    </SheetTitle>
                    <SheetClose
                        className="absolute right-4 top-4 rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-100 transition-all"
                        onClick={() => {
                            if (onClose) onClose();
                        }}
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </SheetClose>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-6 px-6 bg-gradient-to-b from-white to-gray-50">
                    <nav className="flex flex-col gap-3 max-w-[800px] mx-auto w-full">
                        {navItems.map((item) => (
                            <NavItem key={item.href} {...item} />
                        ))}
                    </nav>
                </div>

                <SheetFooter className="p-6 border-t bg-gray-50 mt-auto">
                    <div className="max-w-[800px] mx-auto w-full">
                        {user ? (
                            <div className="w-full space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border">
                                    <Avatar className="h-12 w-12 border-2 border-red-500">
                                        <AvatarFallback className="bg-gradient-to-br from-red-600 to-red-500 text-white font-bold">
                                            {getInitials(user?.name || user?.username || "")}
                                        </AvatarFallback>
                                        <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{user.name || user.username}</p>
                                        <p className="text-xs text-gray-500">
                                            {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                                        </p>
                                    </div>
                                </div>

                                <SheetClose asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full text-red-500 border-red-200 hover:bg-red-50 gap-2"
                                        onClick={handleLogout}
                                    >
                                        <LogOut size={16} />
                                        Cerrar Sesión
                                    </Button>
                                </SheetClose>
                            </div>
                        ) : (
                            <SheetClose asChild className="w-full">
                                <Link href="/login" className="w-full">
                                    <Button className="bg-red-600 hover:bg-red-700 w-full text-white gap-2 py-6">
                                        Join Now
                                        <span className="animate-pulse">→</span>
                                    </Button>
                                </Link>
                            </SheetClose>
                        )}
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;