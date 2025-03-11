'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Exercises', href: '#exercises' },
  { label: 'Programs', href: '/programs' },
  { label: 'Community', href: '/community' }
] as const;

const NavLink = ({ href, label, className }: { href: string; label: string; className?: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href === '/' && pathname === '/');

  return (
    <Link
      href={href}
      className={cn(
        'text-sm font-medium transition-colors hover:text-primary relative py-2',
        isActive && 'text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-red-500',
        !isActive && 'text-muted-foreground',
        className
      )}
    >
      {label}
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
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
              className="text-lg px-2"
            />
          ))}
          <Button className="mt-4 bg-red-600 hover:bg-red-700">
            Join Now
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const Navbar = () => {
  const scrolled = useScrollPosition(20);

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
              className="object-contain"
              priority
            />
            <span className="hidden font-bold text-xl text-primary md:block">
              GymShock
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
            <Button size="sm" className="bg-red-600 hover:bg-red-700">
              Join Now
            </Button>
          </div>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;