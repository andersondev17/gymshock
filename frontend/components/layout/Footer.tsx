import { FOOTER_CONFIG } from '@/constants';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const socialIcons = { Instagram, Twitter, Facebook, Youtube };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <Image src={FOOTER_CONFIG.brand.logo} alt={FOOTER_CONFIG.brand.name} width={40} height={40} />
              <span className="text-2xl font-bold text-red-500">{FOOTER_CONFIG.brand.name}</span>
            </Link>
            <p className="text-gray-300">{FOOTER_CONFIG.brand.tagline}</p>
            <div className="flex gap-4">
              {FOOTER_CONFIG.socials.map(({ name, href }) => {
                const Icon = socialIcons[name as keyof typeof socialIcons];
                return (
                  <a key={name} href={href} className="text-gray-300 hover:text-red-500">
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2 text-gray-300">
              {FOOTER_CONFIG.links.quickLinks.map(({ text, href }) => (
                <Link key={text} href={href} className="block hover:text-red-500">{text}</Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <div className="space-y-2 text-gray-300">
              {FOOTER_CONFIG.links.support.map(({ text, href }) => (
                <Link key={text} href={href} className="block hover:text-red-500">{text}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          © {new Date().getFullYear()} {FOOTER_CONFIG.brand.name}
        </div>
      </div>
    </footer>
  );
};

export default Footer;