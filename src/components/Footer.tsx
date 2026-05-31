import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { IMG } from '@/data/images';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/crm/6a082f1ae9d59dd71e9f600e/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer_newsletter' }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-[#1f1c1a] text-[#e8e2d6] pt-24 pb-10 relative">
      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a96a] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-[#3a3530]">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-6">
              <img src={IMG.logo} alt="Wedding & Events" className="h-16 w-auto" />
              <div className="flex flex-col leading-none">
                <h3 className="font-serif text-2xl text-ivory">Wedding &amp; Events</h3>
                <span className="kerning-wide text-gold mt-1">Luxury Event Studio</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[#b8b0a3] max-w-md mb-8">
              Een Nederlandse luxury event studio die persoonlijke verhalen vertaalt naar
              onvergetelijke bruiloften en op maat gemaakte events. Met aandacht voor elk detail.
            </p>
            <form onSubmit={handleSubscribe} className="max-w-sm">

              <label className="kerning-wide text-gold block mb-3">Blijf op de hoogte</label>
              <div className="flex border-b border-[#3a3530] focus-within:border-gold transition-colors">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
                  placeholder="je@email.nl"
                  className="flex-1 bg-transparent py-3 text-sm text-ivory placeholder:text-[#6b645c] outline-none"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="text-xs tracking-[0.2em] uppercase text-gold hover:text-ivory transition-colors px-2"
                >
                  {status === 'loading' ? '...' : 'Inschrijven'}
                </button>
              </div>
              {status === 'success' && (
                <p className="text-xs text-gold mt-3">Welkom — je bent ingeschreven.</p>
              )}
              {status === 'error' && (
                <p className="text-xs text-[#c89090] mt-3">Vul een geldig e-mailadres in.</p>
              )}
            </form>
          </div>

          <div className="lg:col-span-3">
            <h4 className="kerning-wide text-gold mb-5">Navigatie</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/over-ons" className="hover:text-gold transition-colors">Over Ons</Link></li>
              <li><Link to="/diensten" className="hover:text-gold transition-colors">Diensten</Link></li>
              <li><Link to="/portfolio" className="hover:text-gold transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Kennismaking</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="kerning-wide text-gold mb-5">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-1 flex-shrink-0" />
                <span>Beneluxlaan 668<br />1363 DA Almere</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold flex-shrink-0" />
                <a href="tel:+31618084914" className="hover:text-gold transition-colors">+31 (0)61 808 4914</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold flex-shrink-0" />
                <a href="mailto:info@queenly.nl" className="hover:text-gold transition-colors">info@queenly.nl</a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram size={16} className="text-gold flex-shrink-0" />
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">@weddingandevents</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#6b645c]">
          <p>© {new Date().getFullYear()} Wedding &amp; Events. Alle rechten voorbehouden.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-gold transition-colors">Privacy</Link>
            <Link to="/algemene-voorwaarden" className="hover:text-gold transition-colors">Algemene voorwaarden</Link>
            <Link to="/cookies" className="hover:text-gold transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
