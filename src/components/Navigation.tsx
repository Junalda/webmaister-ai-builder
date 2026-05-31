import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { IMG } from '@/data/images';

const links = [
  { to: '/', label: 'Home' },
  { to: '/over-ons', label: 'Over Ons' },
  { to: '/diensten', label: 'Diensten' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Kennismaking' },
];

const Navigation: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  // Hero pages where nav starts on dark image
  const isHomeAtTop = location.pathname === '/' && !scrolled;
  const transparent = !scrolled;

  // Light text when over hero image, charcoal when scrolled
  const textOnDark = transparent;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ivory/95 backdrop-blur-md border-b border-gold-soft shadow-[0_1px_24px_rgba(184,152,90,0.08)]'
          : 'bg-gradient-to-b from-black/35 via-black/15 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-24">
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <img
            src={IMG.logo}
            alt="Wedding & Events"
            className={`h-12 lg:h-14 w-auto transition-all duration-500 ${
              textOnDark ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]' : ''
            }`}
          />
          <div className="hidden xl:flex flex-col leading-none">
            <span
              className={`font-serif text-xl lg:text-2xl tracking-tight transition-colors duration-500 ${
                textOnDark ? 'text-ivory text-shadow-soft' : 'text-charcoal'
              }`}
            >
              Wedding &amp; Events
            </span>
            <span className={`kerning-wide mt-1 transition-colors duration-500 ${textOnDark ? 'text-gold-soft' : 'text-gold-deep'}`}>
              Luxury Event Studio
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 flex-nowrap">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`whitespace-nowrap text-sm tracking-[0.12em] uppercase transition-colors duration-300 relative group ${
                  textOnDark
                    ? active
                      ? 'text-ivory text-shadow-soft'
                      : 'text-ivory/90 hover:text-gold-soft text-shadow-soft'
                    : active
                    ? 'text-charcoal'
                    : 'text-warm-gray hover:text-gold-deep'
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-[#c9a96a] to-transparent transition-all duration-500 ${
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
          <Link
            to="/contact"
            className={`whitespace-nowrap ml-2 px-6 py-3 text-xs tracking-[0.18em] uppercase transition-all duration-500 border ${
              textOnDark
                ? 'border-gold-soft text-ivory hover:bg-gold-soft hover:text-charcoal text-shadow-soft'
                : 'border-[#c9a96a] text-charcoal hover:bg-gold-gradient hover:border-transparent'
            }`}
          >
            Plan een gesprek
          </Link>
        </nav>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden p-2 transition-colors ${textOnDark ? 'text-ivory' : 'text-charcoal'}`}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-ivory/98 backdrop-blur-md border-t border-gold-soft px-6 py-10 space-y-6 shadow-lg">
          <div className="flex justify-center mb-6">
            <img src={IMG.logo} alt="Wedding & Events" className="h-16 w-auto" />
          </div>
          <div className="divider-gold mb-6" />
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`block text-xl font-serif transition-colors ${
                location.pathname === l.to ? 'text-gold-deep' : 'text-charcoal hover:text-gold-deep'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="inline-block mt-4 px-7 py-3 btn-gold text-xs tracking-[0.22em] uppercase"
          >
            Plan een gesprek
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navigation;
