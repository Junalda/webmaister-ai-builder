import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Done For You', href: '/done-for-you' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <nav className={`sticky top-0 z-50 border-b transition-colors ${isHome ? 'bg-white/95 backdrop-blur border-gray-100' : 'bg-white border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-pink to-brand-purple flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              <span className="text-gray-950">Web</span>
              <span className="bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text text-transparent">maister</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <Link
                key={l.label}
                to={l.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white text-sm font-semibold hover:from-brand-pink-dark hover:to-brand-purple-dark transition-all shadow-sm hover:shadow-md"
              >
                Dashboard
              </button>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all">
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white text-sm font-semibold hover:from-brand-pink-dark hover:to-brand-purple-dark transition-all shadow-sm hover:shadow-md"
                >
                  Get started free
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-1">
            {navLinks.map(l => (
              <Link
                key={l.label}
                to={l.href}
                className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-3 px-1 flex flex-col gap-2">
              {isAuthenticated ? (
                <button
                  onClick={() => { navigate('/dashboard'); setOpen(false); }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white text-sm font-semibold"
                >
                  Dashboard
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-center py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="block text-center py-2.5 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white text-sm font-semibold"
                    onClick={() => setOpen(false)}
                  >
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
