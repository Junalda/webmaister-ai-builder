import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const cols = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Done For You', href: '/done-for-you' },
    ],
  },
  {
    heading: 'Account',
    links: [
      { label: 'Sign up free', href: '/signup' },
      { label: 'Sign in', href: '/login' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Contact us', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-pink to-brand-purple flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Web<span className="bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text text-transparent">maister</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              AI-powered website builder for ambitious businesses. Go from idea to professional website in minutes.
            </p>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.heading}>
              <h4 className="text-white font-semibold text-sm mb-5">{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link to={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Webmaister. All rights reserved.</p>
          <p>Built with AI, made for business owners.</p>
        </div>
      </div>
    </footer>
  );
}
