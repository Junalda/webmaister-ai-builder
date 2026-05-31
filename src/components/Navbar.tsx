import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const links = [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Done For You', href: '/done-for-you' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-display font-bold text-xl tracking-tight">
            <span className="text-gray-950">Web</span>
            <span className="bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text text-transparent">maister</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link key={l.label} to={l.href} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white text-sm font-semibold hover:from-brand-pink-dark hover:to-brand-purple-dark transition-all shadow-sm"
              >
                Dashboard
              </button>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white text-sm font-semibold hover:from-brand-pink-dark hover:to-brand-purple-dark transition-all shadow-sm"
                >
                  Get started free
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-2">
            {links.map(l => (
              <Link
                key={l.label}
                to={l.href}
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-2 px-4 flex flex-col gap-2">
              {isAuthenticated ? (
                <button
                  onClick={() => { navigate('/dashboard'); setOpen(false); }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white text-sm font-semibold"
                >
                  Dashboard
                </button>
              ) : (
                <>
                  <Link to="/login" className="block text-center py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50" onClick={() => setOpen(false)}>
                    Sign in
                  </Link>
                  <Link to="/signup" className="block text-center py-2.5 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white text-sm font-semibold" onClick={() => setOpen(false)}>
                    Get started free
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
