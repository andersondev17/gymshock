import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/assets/images/Logo.png" 
                alt="GymShock Logo" 
                width={40} 
                height={40}
                className="object-contain"
                style={{ width: 'auto', height: 'auto' }}

              />
              <span className="text-2xl font-bold text-red-500">GymShock</span>
            </Link>
            <p className="text-gray-300 mt-2">
              Transform your body, transform your life. Join our community of fitness enthusiasts.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/exercises" className="text-gray-300 hover:text-red-500 transition-colors">
                  Exercise Library
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-gray-300 hover:text-red-500 transition-colors">
                  Training Programs
                </Link>
              </li>
              <li>
                <Link href="/nutrition" className="text-gray-300 hover:text-red-500 transition-colors">
                  Nutrition Guides
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-red-500 transition-colors">
                  Fitness Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-red-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-red-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-red-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-red-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Stay Updated</h3>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for the latest fitness tips and updates.</p>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} GymShock. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;