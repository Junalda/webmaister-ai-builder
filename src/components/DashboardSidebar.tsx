import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Settings, CreditCard, LogOut, Zap, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Projects' },
  { to: '/dashboard/new-project', icon: PlusCircle, label: 'New Project' },
  { to: '/pricing', icon: CreditCard, label: 'Upgrade Plan' },
  { to: '/done-for-you', icon: Settings, label: 'Done For You' },
];

export function DashboardSidebar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  const planColors: Record<string, string> = {
    free: 'bg-gray-100 text-gray-600',
    starter: 'bg-blue-50 text-blue-700',
    pro: 'bg-purple-50 text-brand-purple',
    agency: 'bg-pink-50 text-brand-pink',
  };

  return (
    <aside className="w-64 min-h-screen bg-gray-950 flex flex-col text-white">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <div className="w-7 h-7 rounded-lg bg-brand-gradient flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          Webmaister
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
              pathname === to
                ? 'bg-white/10 text-white'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}

        {/* Admin link — only shown if user is admin (mock: check email) */}
        {user?.email?.includes('webmaister') && (
          <Link
            to="/admin"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
              pathname === '/admin'
                ? 'bg-white/10 text-white'
                : 'text-white/30 hover:text-white hover:bg-white/5'
            )}
          >
            <Shield className="w-4 h-4" />
            Admin
          </Link>
        )}
      </nav>

      {/* Credits & user info */}
      <div className="p-4 border-t border-white/10 space-y-3">
        {/* Credits bar */}
        <div className="px-3 py-3 rounded-xl bg-white/5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-white/50">AI Credits</span>
            <span className="text-xs font-semibold text-white">{user?.credits ?? 0}</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-brand-gradient transition-all"
              style={{ width: `${Math.min(100, ((user?.credits ?? 0) / 200) * 100)}%` }}
            />
          </div>
        </div>

        {/* User row */}
        <div className="flex items-center gap-3 px-1">
          <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user?.name?.charAt(0) ?? '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <Badge className={cn('text-xs font-medium mt-0.5', planColors[user?.plan ?? 'free'])}>
              {user?.plan ?? 'free'}
            </Badge>
          </div>
          <button onClick={handleLogout} className="text-white/30 hover:text-white/70 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
