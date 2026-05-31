import { cn } from '@/lib/utils';
import type { ProjectStatus } from '@/types';

const config: Record<ProjectStatus, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'bg-gray-100 text-gray-600' },
  generating: { label: 'Generating…', className: 'bg-yellow-100 text-yellow-700 animate-pulse' },
  ready: { label: 'Ready', className: 'bg-green-100 text-green-700' },
  published: { label: 'Published', className: 'bg-blue-100 text-blue-700' },
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  const { label, className } = config[status];
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', className)}>
      {label}
    </span>
  );
}
