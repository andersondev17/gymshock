import { navItems } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { getInitials } from "@/lib/utils";
import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import NavLink from "./NavLink";


const MobileNav = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden"
                    aria-label="Open menu"
                >
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.href}
                            {...item}
                            className="text-lg px-2 relative tracking-widest group overflow-hidden transition-colors duration-300"
                        />
                    ))}

                    {user ? (
                        <div className="mt-4">
                            <div className="flex items-center gap-3 p-2 mb-4">
                                <Avatar className="h-10 w-10 border-2 border-red-500">
                                    <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white">
                                        {getInitials(user.name || user.username || "")}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{user.name || user.username}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                                    </p>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full text-red-500 border-red-200 hover:bg-red-50"
                                onClick={handleLogout}
                            >
                                <LogOut size={16} className="mr-2" />
                                Cerrar Sesión
                            </Button>
                        </div>
                    ) : (
                        <Link href="/login" className="w-full">
                            <Button size="sm" className="bg-red-600 hover:bg-red-700 w-full">
                                Join Now
                            </Button>
                        </Link>
                    )}
                </nav>
            </SheetContent>
        </Sheet>
    );
};
export default MobileNav;