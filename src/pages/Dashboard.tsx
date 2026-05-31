import { useNavigate } from 'react-router-dom';
import { Plus, Globe, Zap, Layout } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import StatusBadge from '@/components/shared/StatusBadge';
import EmptyState from '@/components/shared/EmptyState';
import { useAuth } from '@/contexts/AuthContext';
import { mockProjects } from '@/data/mockData';
import { formatDate, truncate } from '@/lib/utils';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const projects = mockProjects.filter(p => p.userId === user?.id);

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-950">
            Welcome back, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage and build your AI websites</p>
        </div>
        <button
          onClick={() => navigate('/dashboard/new-project')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white font-semibold text-sm hover:from-brand-pink-dark hover:to-brand-purple-dark transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          New website
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Layout, label: 'Projects', value: projects.length },
          { icon: Zap, label: 'Credits remaining', value: user?.credits ?? 0 },
          { icon: Globe, label: 'Current plan', value: user?.plan ?? 'free', capitalize: true },
        ].map(({ icon: Icon, label, value, capitalize }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-200 px-6 py-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-pink/10 to-brand-purple/10 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-brand-purple" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">{label}</p>
              <p className={`font-bold text-gray-950 text-lg ${capitalize ? 'capitalize' : ''}`}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="mb-4 flex items-center justify-between">
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
          {projects.map(project => (
            <div
              key={project.id}
              onClick={() => navigate(`/dashboard/projects/${project.id}`)}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-brand-purple/30 hover:shadow-md transition-all cursor-pointer group"
            >
              {/* Preview placeholder */}
              <div className="h-36 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/5 to-brand-purple/5" />
                <Globe className="w-10 h-10 text-gray-300 group-hover:text-brand-purple/40 transition-colors" />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display font-semibold text-gray-950 text-sm leading-tight">{project.name}</h3>
                  <StatusBadge status={project.status} />
                </div>
                <p className="text-xs text-gray-500 mb-3">{truncate(project.intake.industry, 50)}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{project.pages.length} page{project.pages.length !== 1 ? 's' : ''}</span>
                  <span>Updated {formatDate(project.updatedAt)}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Add new card */}
          <button
            onClick={() => navigate('/dashboard/new-project')}
            className="bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-brand-purple/40 hover:bg-brand-purple/5 transition-all flex flex-col items-center justify-center gap-3 p-8 min-h-[200px] text-gray-400 hover:text-brand-purple"
          >
            <Plus className="w-8 h-8" />
            <span className="text-sm font-medium">New website</span>
          </button>
        </div>
      )}
    </AppLayout>
  );
}
