'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/src/components/ui/menu-toggle-icon';
import { useScroll } from '@/hooks/use-scroll';

export const Header = () => {
  const [open, setOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>('');
  const [isGalleryIntro, setIsGalleryIntro] = React.useState(true);
  const [isHeroFinished, setIsHeroFinished] = React.useState(false);
  const scrolled = useScroll(10);

  React.useEffect(() => {
    // Show navbar shortly after page loads (no hero letter sequence in Zinnia)
    const timer = setTimeout(() => {
      setIsHeroFinished(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const links = [
    { label: 'OVERVIEW', href: '#overview' },
    { label: 'AMENITIES', href: '#amenities' },
    { label: 'PLANS', href: '#plans' },
    { label: 'GALLERY', href: '#gallery' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);

    const performScroll = () => {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;

        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth',
        });
      }
    };

    if (window.scrollY > 50) {
      performScroll();
    } else {
      setTimeout(performScroll, 300);
    }
  };

  React.useEffect(() => {
    const handleGalleryIntro = (e: any) => {
      setIsGalleryIntro(e.detail);
    };
    window.addEventListener('gallery-intro', handleGalleryIntro);
    return () => window.removeEventListener('gallery-intro', handleGalleryIntro);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = [...links.map((link) => link.href.replace('#', ''))];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed z-[1000] mx-auto w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
          {
            'opacity-0 -translate-y-full pointer-events-none':
              !isHeroFinished ||
              (activeSection === 'gallery' && !isGalleryIntro && !open),
            'bg-gradient-to-r from-[#FDFBF7]/95 via-white/95 to-[#E8F5E9]/95 border-[#1B5E20]/15 backdrop-blur-2xl top-0 md:top-6 md:max-w-5xl md:rounded-full md:border md:shadow-[0_8px_32px_rgba(27,94,32,0.1)] md:left-1/2 md:-translate-x-1/2':
              isHeroFinished && scrolled && !open,
            'bg-white/95 backdrop-blur-xl top-0': isHeroFinished && open,
            'bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm top-0':
              isHeroFinished && !scrolled && !open,
          }
        )}
      >
        <nav
          className={cn(
            'flex h-16 w-full items-center justify-between px-6 md:h-14 transition-all ease-out',
            {
              'md:px-8': scrolled,
            }
          )}
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                src="https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-logo-700x412.jpg"
                alt="Zinnia"
                width={120}
                height={36}
                className={cn(
                  'h-9 md:h-10 w-auto object-contain transition-all duration-300 rounded',
                  !scrolled ? 'brightness-0 invert opacity-90' : ''
                )}
              />
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex mr-4 font-serif">
            {links.map((link, i) => {
              const linkId = link.href.replace('#', '');
              const isActive = activeSection === linkId;

              return (
                <a
                  key={i}
                  className={cn(
                    'text-[11px] md:text-xs tracking-[0.3em] font-bold uppercase transition-all duration-300 cursor-pointer relative',
                    isActive
                      ? scrolled
                        ? 'text-forest font-bold'
                        : 'text-white font-bold'
                      : scrolled
                      ? 'text-forest/60 hover:text-forest/90'
                      : 'text-white/70 hover:text-white'
                  )}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.label}

                  {isActive && (
                    <span
                      className={cn(
                        'absolute -bottom-1 left-0 right-0 h-0.5 rounded-full transition-colors duration-300',
                        scrolled
                          ? 'bg-gradient-to-r from-primary to-forest'
                          : 'bg-white/50'
                      )}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              'md:hidden p-3 transition-colors duration-300',
              scrolled ? 'text-forest' : 'text-white'
            )}
            aria-label="Toggle menu"
          >
            <MenuToggleIcon open={open} className="size-6" duration={300} />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 top-[64px] z-[999] bg-white/90 backdrop-blur-lg flex flex-col overflow-hidden transition-all duration-500 md:hidden',
          open
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <div className="flex h-full w-full flex-col justify-between p-8">
          <div className="grid gap-y-8 mt-12">
            {links.map((link) => (
              <a
                key={link.label}
                className="text-2xl font-serif italic text-forest/60 hover:text-forest transition-colors"
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
