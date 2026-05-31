import { useNavigate } from 'react-router-dom';
import { Plus, Globe, Zap, Layout, ArrowRight } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import StatusBadge from '@/components/shared/StatusBadge';
import EmptyState from '@/components/shared/EmptyState';
import { useAuth } from '@/contexts/AuthContext';
import { mockProjects } from '@/data/mockData';
import { formatDate, truncate } from '@/lib/utils';
import { previewGradient } from '@/data/images';
import type { Plan } from '@/types';

const PLAN_LIMIT: Record<Plan, number | string> = {
  free: 1,
  starter: 3,
  pro: 'Unlimited',
  agency: 'Unlimited',
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const projects = mockProjects.filter(p => p.userId === user?.id);
  const atLimit =
    typeof PLAN_LIMIT[user?.plan ?? 'free'] === 'number' &&
    projects.length >= (PLAN_LIMIT[user?.plan ?? 'free'] as number);

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-950">
            Good {getGreeting()}, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-gray-500 text-sm mt-1">Here are your AI-generated websites</p>
        </div>
        <button
          onClick={() => navigate('/dashboard/new-project')}
          disabled={atLimit}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          style={{ background: 'linear-gradient(to right, #e040a0, #8b5cf6)' }}
        >
          <Plus className="w-4 h-4" />
          New website
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            icon: Layout,
            label: 'Websites',
            value: `${projects.length} / ${PLAN_LIMIT[user?.plan ?? 'free']}`,
          },
          { icon: Zap, label: 'Credits left', value: user?.credits ?? 0 },
          {
            icon: Globe,
            label: 'Current plan',
            value: user?.plan ?? 'free',
            capitalize: true,
          },
        ].map(({ icon: Icon, label, value, capitalize }, idx) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-gray-200 px-6 py-5 flex items-center gap-4"
          >
            <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-10 h-10"
              >
                <defs>
                  <linearGradient
                    id={`stat-icon-grad-${idx}`}
                    x1="0"
                    y1="0"
                    x2="40"
                    y2="40"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#e040a0" stopOpacity="0.12" />
                    <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.12" />
                  </linearGradient>
                </defs>
                <rect width="40" height="40" rx="12" fill={`url(#stat-icon-grad-${idx})`} />
              </svg>
              <Icon className="relative z-10 w-5 h-5 text-violet-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">{label}</p>
              <p
                className={`font-bold text-gray-950 text-lg leading-tight ${
                  capitalize ? 'capitalize' : ''
                }`}
              >
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Upgrade banner for free users at limit */}
      {atLimit && (
        <div
          className="mb-6 rounded-2xl border p-5 flex items-center justify-between gap-4"
          style={{
            background: 'linear-gradient(to right, rgba(224,64,160,0.07), rgba(139,92,246,0.07))',
            borderColor: 'rgba(139,92,246,0.2)',
          }}
        >
          <div>
            <p className="font-semibold text-gray-950 text-sm">
              You have reached the Free plan limit
            </p>
            <p className="text-gray-500 text-sm mt-0.5">
              Upgrade to create unlimited websites and get more AI credits.
            </p>
          </div>
          <button
            onClick={() => navigate('/pricing')}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-white text-sm font-semibold shrink-0 transition-all shadow-md"
            style={{ background: 'linear-gradient(to right, #e040a0, #8b5cf6)' }}
          >
            Upgrade
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Projects grid */}
      <div className="mb-4">
        <h2 className="font-display font-semibold text-lg text-gray-950">Your websites</h2>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon={Globe}
          title="No websites yet"
          description="Build your first AI-generated website in minutes. Just answer a few questions about your business."
          ctaLabel="Build my first website"
          onCta={() => navigate('/dashboard/new-project')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map(project => {
            const grad = previewGradient(project.id);
            return (
              <div
                key={project.id}
                onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-violet-400/30 hover:shadow-lg transition-all cursor-pointer group"
              >
                {/* Abstract gradient preview — no real images */}
                <div
                  className={`h-36 bg-gradient-to-br ${grad} flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="w-4/5 bg-white/20 backdrop-blur-sm rounded-lg p-3 space-y-1.5">
                    <div className="h-2 w-1/2 bg-white/60 rounded" />
                    <div className="h-1.5 w-3/4 bg-white/40 rounded" />
                    <div className="h-1.5 w-2/3 bg-white/40 rounded" />
                    <div className="h-5 w-1/3 bg-white/30 rounded mt-2" />
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-display font-semibold text-gray-950 text-sm leading-tight line-clamp-1">
                      {project.name}
                    </h3>
                    <StatusBadge status={project.status} />
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    {truncate(project.intake.industry, 50)}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>
                      {project.pages.length} page{project.pages.length !== 1 ? 's' : ''}
                    </span>
                    <span>Updated {formatDate(project.updatedAt)}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add new tile */}
          {!atLimit && (
            <button
              onClick={() => navigate('/dashboard/new-project')}
              className="bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-violet-400/40 hover:bg-violet-50/50 transition-all flex flex-col items-center justify-center gap-3 p-8 min-h-[200px] text-gray-400 hover:text-violet-500 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-violet-100 flex items-center justify-center transition-colors">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">New website</span>
            </button>
          )}
        </div>
      )}
    </AppLayout>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}
