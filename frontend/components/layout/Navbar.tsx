'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { navItems } from '@/constants/index';
import { useAuth } from '@/context/AuthContext';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { cn, getInitials } from '@/lib/utils';
import { LogOut, Settings, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AnimatedText from '../ui/animatedText';
import MobileNav from './MobileNav';
import NavLink from './NavLink';

const Navbar = () => {
  const scrolled = useScrollPosition(20);
  const [compactMode, setCompactMode] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { user, logout, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrollingDown = currentScrollPos > prevScrollPos;

      if (scrollingDown && currentScrollPos > 120) {
        setCompactMode(true);
      } else if (!scrollingDown && compactMode) {
        setTimeout(() => setCompactMode(false), 200);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, compactMode]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  // Componentes compartidos para evitar duplicación
  const UserMenu = ({ mobile = false }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar
          className={cn(
            "cursor-pointer hover:ring-2 hover:ring-red-500 transition-all",
            mobile ? "h-8 w-8" : "h-9 w-9"
          )}
        >
          <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white font-medium">
            {getInitials(user?.name || user?.username || "")}
          </AvatarFallback>
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={mobile ? "center" : "end"} className="min-w-[220px] rounded-xl shadow-lg">
        <div className="px-4 py-3 mb-1 border-b">
          <p className="text-sm font-medium">{user?.name || user?.username}</p>
          <p className="text-xs text-muted-foreground">{user?.role === 'admin' ? 'Administrador' : 'Usuario'}</p>
        </div>

        <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/profile')}>
          <User size={16} className="mr-2" />
          Mi Perfil
        </DropdownMenuItem>

        {isAdmin && (
          <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/admin')}>
            <Settings size={16} className="mr-2" />
            Panel de Admin
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-500" onClick={handleLogout}>
          <LogOut size={16} className="mr-2" />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const LoginButton = ({ mobile = false }) => (
    <Link href="/login">
      <Button
        size={mobile ? "default" : "sm"}
        className={cn(
          "bg-red-600 hover:bg-red-700 transition-all",
          mobile && "w-full"
        )}
      >
        <AnimatedText baseColor="#ffffff" hoverColor="#ffffff">
          Join Now
        </AnimatedText>
      </Button>
    </Link>
  );

  // Elementos de navegación normales
  const NavItems = () => (
    <>
      {navItems.map((item) => (
        <AnimatedText
          key={item.href}
          className="relative"
          hoverColor="#ff4d4d"
          underline
        >
          <NavLink {...item} />
        </AnimatedText>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent',
        scrolled ? 'backdrop-blur-md shadow-sm bg-white/90' : '',
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 z-10">
            <div className="relative w-10 h-10 overflow-hidden rounded-md flex-shrink-0">
              <Image
                src="/assets/images/Logo.png"
                alt="GymShock Logo"
                fill
                className="object-contain p-1 bg-white/80"
                priority
              />
            </div>
            <span className="font-bold text-xl text-primary">
              GymShock
            </span>
          </Link>

          {/* Navegación Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {compactMode ? (
              <div className="flex items-center gap-3">
               
                {user ? <UserMenu /> : <LoginButton />}
                <MobileNav onClose={() => setCompactMode(false)} />
              </div>
            ) : (
              <>
                {/* NavItems solo visible cuando NO se ha hecho scroll */}
                {!scrolled ? (
                  <div className="flex items-center space-x-6">
                    <NavItems />
                  </div>
                ) : null}
                <div className="flex items-center gap-3">
                  {user ? <UserMenu /> : <LoginButton />}
                  {/* MobileNav visible solo cuando SE HA hecho scroll */}
                  {scrolled && <MobileNav />}
                </div>
              </>
            )}
          </div>

          {/* Mobile navigation - always compact */}
          <div className="md:hidden flex items-center gap-3">
            {user ? <UserMenu mobile /> : <LoginButton mobile />}
            {/* Solo mostrar el MobileNav cuando se ha hecho scroll */}
            {scrolled && <MobileNav onClose={() => setCompactMode(false)} />}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;