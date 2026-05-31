import { Link } from 'react-router-dom';
import { ArrowRight, Clock, CheckCircle2, Loader2, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';

const statusConfig = {
  draft: { label: 'Draft', icon: FileText, color: 'bg-gray-100 text-gray-600' },
  generating: { label: 'Generating', icon: Loader2, color: 'bg-yellow-50 text-yellow-700' },
  ready: { label: 'Ready', icon: CheckCircle2, color: 'bg-green-50 text-green-700' },
  published: { label: 'Published', icon: CheckCircle2, color: 'bg-blue-50 text-blue-700' },
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const config = statusConfig[project.status];
  const StatusIcon = config.icon;
  const pageCount = project.pages.length;
  const date = new Date(project.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <Link
      to={`/dashboard/projects/${project.id}`}
      className="group block bg-white rounded-2xl border border-gray-100 hover:border-brand-purple/30 p-6 card-hover"
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-pink/10 to-brand-purple/10 flex items-center justify-center">
          <span className="font-display font-bold text-brand-purple text-sm">
            {project.name.charAt(0)}
          </span>
        </div>
        <Badge className={cn('text-xs font-medium', config.color)}>
          <StatusIcon className={cn('w-3 h-3 mr-1', project.status === 'generating' && 'animate-spin')} />
          {config.label}
        </Badge>
      </div>

      {/* Name */}
      <h3 className="font-display font-bold text-gray-900 text-lg mb-1 group-hover:text-brand-purple transition-colors">
        {project.name}
      </h3>

      {/* Meta */}
      <p className="text-sm text-gray-400 mb-1">{project.intake.industry}</p>
      <p className="text-xs text-gray-400 mb-4">{project.intake.location}</p>

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-gray-400 border-t border-gray-50 pt-4">
        <span className="flex items-center gap-1">
          <FileText className="w-3.5 h-3.5" />
          {pageCount} {pageCount === 1 ? 'page' : 'pages'}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {date}
        </span>
        <span className="ml-auto flex items-center gap-1 text-brand-purple opacity-0 group-hover:opacity-100 transition-opacity font-medium">
          Open <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
