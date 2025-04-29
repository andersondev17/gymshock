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
import MobileNav from './MobileNav';
import NavLink from './NavLink';

const Navbar = () => {
  const scrolled = useScrollPosition(20);
  const { user, logout, isAdmin } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/assets/images/Logo.png"
              alt="GymShock Logo"
              width={40}
              height={40}
              style={{ width: 'auto', height: 'auto' }}
              className="object-contain bg-white/80 rounded-s"
              priority
            />
            <span className="font-bold text-xl text-primary">
              GymShock
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-red-500 transition-all">
                    <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white font-medium">
                      {getInitials(user.name || user.username || "")}
                    </AvatarFallback>
                    <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[220px] rounded-xl shadow-lg">
                  <div className="px-4 py-3 mb-1 border-b">
                    <p className="text-sm font-medium">{user.name || user.username}</p>
                    <p className="text-xs text-muted-foreground">{user.role === 'admin' ? 'Administrador' : 'Usuario'}</p>
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
            ) : (
              <Link href="/login">
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  Join Now
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;