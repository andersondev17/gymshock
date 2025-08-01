import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavLink = ({ href, label, className, onClick }: {
    href: string;
    label: string;
    className?: string;
    onClick?: () => void
}) => {
    const pathname = usePathname();
    const isHashLink = href.startsWith('#');
    const [isActive, setIsActive] = useState(false);
    const sectionId = isHashLink ? href.substring(1) : '';

    useEffect(() => {
        if (!isHashLink) {
            setIsActive(pathname === href);
            return;
        }

        const section = document.getElementById(sectionId);
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isHome = href === '/';
                const otherSectionActive = document.querySelector('section[id]:not(#home):not([style*="display: none"])');

                let shouldActivate = entry.isIntersecting;

                if (isHome) {
                    shouldActivate = !otherSectionActive && entry.isIntersecting;
                } else {
                    shouldActivate = entry.isIntersecting && entry.intersectionRatio >= 0.2;
                }

                setIsActive(shouldActivate);
            },
            { threshold: 0.2, rootMargin: '-80px 0px 0px 0px' }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, [pathname, href, isHashLink, sectionId]);

    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                'text-sm font-medium transition-colors relative py-2',
                isActive && 'text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-gymshock-primary-600',
                !isActive && 'text-gymshock-dark-300 hover:text-white',
                className
            )}
        >
            {label}
        </Link>
    );
};

export default NavLink;