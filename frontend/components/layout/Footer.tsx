import { FOOTER_CONFIG } from '@/constants';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const socialIcons = { Instagram, Twitter, Facebook, Youtube };

  return (
    <footer className="relative bg-gymshock-dark-900 overflow-hidden min-h-screen flex flex-col">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-[8%] w-80 h-80 rounded-full bg-gymshock-primary-500/[0.08] blur-[120px]" />
        <div className="absolute bottom-40 right-[12%] w-96 h-96 rounded-full bg-gymshock-energy-500/[0.06] blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-gymshock-primary-600/[0.04] blur-[100px]" />
      </div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/assets/images/pattern.png')] opacity-10 bg-repeat" />

      <div className="relative flex-1 flex flex-col">
        
        {/* Top Section - Social Links */}
        <div className="flex-1 flex items-start pt-16 pl-8 lg:pl-16">
          <div className="flex gap-4">
            {FOOTER_CONFIG.socials.map(({ name, href }) => {
              const Icon = socialIcons[name as keyof typeof socialIcons];
              return (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  aria-label={`Follow us on ${name}`}
                >
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-sm flex items-center justify-center transition-all duration-700 group-hover:border-gymshock-primary-500/60 group-hover:bg-gymshock-primary-500/[0.08] group-hover:scale-110">
                    <Icon
                      size={20}
                      className="text-gymshock-dark-400 group-hover:text-gymshock-primary-400 transition-colors duration-300"
                    />
                  </div>
                  
                  {/* Hover Ring Effect */}
                  <div className="absolute inset-0 rounded-full border border-gymshock-primary-500/0 group-hover:border-gymshock-primary-500/30 scale-125 transition-all duration-700" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-white/10" />

        {/* Middle Section - Copyright & Made by */}
        <div className="relative bg-gymshock-dark-900 py-8 px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            {/* Left - Copyright */}
            <div className="text-gymshock-dark-400 text-sm font-light">
              © {new Date().getFullYear()} All rights reserved
            </div>

            {/* Center - Tagline (Mobile) */}
            <div className="lg:hidden text-center text-gymshock-dark-400 text-sm max-w-md">
              {FOOTER_CONFIG.brand.tagline}
            </div>

            {/* Right - Made by */}
            <div className="text-gymshock-dark-400 text-sm font-light">
              Made with{' '}
              <span className="text-gymshock-primary-500 mx-1">❤️</span>
              {' '}by{' '}
              <a
                href="https://portfolio-deploy-ebon.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gymshock-primary-400 font-medium hover:text-white transition-colors duration-300 underline decoration-transparent hover:decoration-gymshock-primary-400 underline-offset-2"
              >
                Anderson
              </a>
            </div>
          </div>

          {/* Tagline (Desktop) */}
          <div className="hidden lg:block text-center mt-6 text-gymshock-dark-400 text-base max-w-3xl mx-auto">
            {FOOTER_CONFIG.brand.tagline}
          </div>
        </div>

        {/* Bottom Section - Massive Logo */}
        <div className="relative bg-gradient-to-b from-gymshock-dark-900 to-gymshock-dark-800 flex-1 flex items-center justify-center py-16 lg:py-24">
          
          <div className="text-center">
            <div className="relative inline-block">
              <h2 className="text-[65px] sm:text-[90px] md:text-[140px] lg:text-[190px] xl:text-[220px] font-black leading-[0.75] tracking-[-0.03em] select-none">
                <span 
                  style={{
                    WebkitTextStroke: '2px white',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                    textShadow: '0 0 40px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  GYM
                </span>
                <span 
                  className="text-red-600" 
                  style={{ 
                    WebkitTextStroke: '2px white',
                    WebkitTextFillColor: '#dc2626', 
                    color: '#dc2626',
                    textShadow: '0 0 60px rgba(220, 38, 38, 0.4)'
                  }}
                >
                  SHOCK
                </span>
              </h2>
              
              <div className="absolute -top-8 lg:-top-16 xl:-top-20 -right-8 lg:-right-16 xl:-right-20 w-12 h-12 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full border-2 lg:border-4 xl:border-[5px] border-gymshock-primary-500 flex items-center justify-center bg-gymshock-primary-500/10 backdrop-blur-sm shadow-gymshock-brand">
                <span className="text-gymshock-primary-400 text-lg lg:text-3xl xl:text-4xl font-bold">®</span>
              </div>
            </div>

            <div className="mt-8 lg:mt-12">
              <div className="inline-flex items-center gap-3 px-6 py-3  backdrop-blur-sm ">
                <div className="w-2 h-2 bg-gymshock-primary-500 rounded-full animate-gymshock-pulse" />
                <span className="text-gymshock-primary-400 text-sm lg:text-base font-medium tracking-wider uppercase">
                  FITNESS REDEFINED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Edge Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;