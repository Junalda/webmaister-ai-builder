import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Plus, DollarSign, Headphones,
  LogOut, ShieldCheck, Zap,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { initials } from '@/lib/utils';
import type { Plan } from '@/types';

const PLAN_COLORS: Record<Plan, string> = {
  free: 'text-gray-400',
  starter: 'text-blue-400',
  pro: 'text-violet-400',
  agency: 'text-pink-400',
};

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, exact: true },
  { label: 'New Website', href: '/dashboard/new-project', icon: Plus, exact: false },
  { label: 'Pricing', href: '/pricing', icon: DollarSign, exact: false },
  { label: 'Done For You', href: '/done-for-you', icon: Headphones, exact: false },
];

export default function DashboardSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <aside className="w-60 min-h-screen bg-gray-950 flex flex-col shrink-0 border-r border-gray-800">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-gray-800 gap-2.5">
        <div className="w-7 h-7 rounded-lg shrink-0 overflow-hidden">
          <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="sidebar-logo-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#e040a0" />
                <stop offset="1" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <rect width="28" height="28" rx="7" fill="url(#sidebar-logo-grad)" />
            <path d="M7 10l4 8 3-5 3 5 4-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="font-display font-bold text-xl text-white leading-none">
          Web
          <span
            style={{
              background: 'linear-gradient(to right, #e040a0, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            maister
          </span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-0.5">
        {navItems.map(({ label, href, icon: Icon, exact }) => (
          <NavLink
            key={href}
            to={href}
            end={exact}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </NavLink>
        ))}

        {user?.isAdmin && (
          <div className="pt-4 mt-4 border-t border-gray-800">
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-violet-500/20 text-violet-400'
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              Admin
            </NavLink>
          </div>
        )}
      </nav>

      {/* Credits pill */}
      {user && (
        <div className="mx-3 mb-3 px-3 py-2.5 bg-white/5 rounded-xl flex items-center gap-2.5">
          <Zap className="w-4 h-4 text-violet-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500">Credits remaining</p>
            <p className="text-sm font-semibold text-white">{user.credits}</p>
          </div>
          <span className={`text-xs font-medium capitalize ${PLAN_COLORS[user.plan]}`}>
            {user.plan}
          </span>
        </div>
      )}

      {/* User */}
      <div className="p-3 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
          <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="sidebar-avatar-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#e040a0" />
                  <stop offset="1" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <rect width="32" height="32" rx="16" fill="url(#sidebar-avatar-grad)" />
              <text
                x="16"
                y="21"
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
              >
                {user ? initials(user.name) : 'U'}
              </text>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name ?? 'User'}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full mt-1 flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
