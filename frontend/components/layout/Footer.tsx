import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <Image
                src="/assets/images/Logo.png"
                alt="GymShock Logo"
                width={40}
                height={40}
                className="object-contain w-auto h-auto"
                priority
                placeholder="blur"
                blurDataURL="data:image/png;base64,..."
                style={{ aspectRatio: '1/1' }}
              />
              <span className="text-2xl font-bold text-red-500">GymShock</span>
            </Link>
            <p className="text-gray-300 mt-2 min-h-[60px]"> {/* Altura fija */}
              Transform your body, transform your life. Join our community.
            </p>
            <div className="flex gap-4 mt-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-gray-300 hover:text-red-500 transition-colors"
                  aria-label={`Social link ${i}`}
                >
                  <Icon size={20} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {['Quick Links', 'Support', 'Newsletter'].map((title, i) => (
            <div key={title} className="min-h-[200px]"> {/* Altura preventiva */}
              <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>
              {i === 2 ? (
                <>
                  <p className="text-gray-300 mb-4 min-h-[72px]">
                    Subscribe for latest fitness tips
                  </p>
                  <form className="flex flex-col gap-2">
                    <input
                      type="email"
                      placeholder="Email address"
                      className="px-4 py-2 rounded-md text-gray-900 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                </>
              ) : (
                <ul className="flex flex-col gap-2">
                  {[...Array(2)].map((_, j) => (
                    <li key={j}>
                      <Link
                        href="#"
                        className="text-gray-300 hover:text-red-500 block py-1"
                      >
                        {`Link ${j + 1}`}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} GymShock
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;