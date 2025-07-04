// components/Navbar.tsx
'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { navItems } from '@/constants/index';
import { useAuth } from '@/context/AuthProvider';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { cn, getInitials } from '@/lib/utils';
import { LogOut, Settings, Shield, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AnimatedText from '../ui/animatedText';
import MobileNav from './MobileNav';
import NavLink from './NavLink';

const Navbar = () => {
  const { user, logout, loading, isAdmin, isTrainer } = useAuth();
  const router = useRouter();
  const scrolled = useScrollPosition(20);
  const [compactMode, setCompactMode] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrollingDown = currentScrollPos > prevScrollPos;

      setCompactMode(scrollingDown && currentScrollPos > 120);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const UserMenu = ({ mobile = false }: { mobile?: boolean }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className={cn(
          "cursor-pointer hover:ring-4 hover:ring-red-500/20 transition-all",
          mobile ? "h-8 w-8" : "h-9 w-9"
        )}>
          <AvatarFallback className="bg-red-500 text-white">
            {getInitials(user?.name || user?.username || 'U')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={mobile ? "center" : "end"}
        className="min-w-[220px] rounded-lg shadow-lg border border-gray-200"
      >
        <div className="px-3 py-3 border-b bg-gray-50/50">
          <p className="font-medium text-gray-900">
            {user?.name || user?.username}
          </p>
          <p className="text-xs text-gray-500">{user?.email}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full font-medium",
              isAdmin ? "bg-red-100 text-red-700" :
              isTrainer ? "bg-blue-100 text-blue-700" :
              "bg-gray-100 text-gray-700"
            )}>
              {user?.role?.charAt(0).toUpperCase()}{user?.role?.slice(1)}
            </span>
            {isAdmin && (
              <Shield size={12} className="text-red-600"  />
            )}
          </div>
        </div>

        <DropdownMenuItem onClick={() => router.push('/profile')}>
          <User size={16} className="mr-2" />
          My Profile
        </DropdownMenuItem>

        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => router.push('/admin')}
              className="text-red-600 hover:bg-red-50 hover:text-red-700 font-medium"
            >
              <Shield size={16} className="mr-2" />
              Admin Panel
            </DropdownMenuItem>
          </>
        )}

        {isTrainer && (
          <DropdownMenuItem onClick={() => router.push('/trainer')}>
            <Settings size={16} className="mr-2 text-blue-600" />
            Trainer Dashboard
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-red-600 hover:bg-red-50 hover:text-red-700 font-medium" 
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const LoginButton = ({ mobile = false }: { mobile?: boolean }) => (
    <Link href="/login">
      <Button
        size={mobile ? "default" : "sm"}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-200"
      >
        Join Now
      </Button>
    </Link>
  );

  if (loading) {
    return (
      <header className={cn(
        'fixed top-0 w-full z-50 transition-all',
        scrolled && 'bg-white/90 backdrop-blur-md shadow-sm'
      )}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
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
              <span className="font-bold text-xl text-red-600">GymShock</span>
            </Link>
            <div className="animate-pulse h-8 w-20 bg-gray-200 rounded"></div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className={cn(
      'fixed top-0 w-full z-50 transition-all',
      scrolled && 'bg-white/90 backdrop-blur-md shadow-sm'
    )}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
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
            <span className="font-bold text-xl text-red-600">GymShock</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {!compactMode && !scrolled && (
              <div className="flex items-center gap-6">
                {navItems.map((item) => (
                  <AnimatedText
                    key={item.href}
                    className="relative"
                    hoverColor="#ef4444"
                    underline
                  >
                    <NavLink {...item} />
                  </AnimatedText>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3">
              {user ? <UserMenu /> : <LoginButton />}
              {(compactMode || scrolled) && <MobileNav onClose={() => setCompactMode(false)} />}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-3">
            {user ? <UserMenu mobile /> : <LoginButton mobile />}
            {scrolled && <MobileNav onClose={() => setCompactMode(false)} />}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;