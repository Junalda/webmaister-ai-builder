import { cn } from '@/lib/utils';
import type { Plan } from '@/types';

const config: Record<Plan, { label: string; className: string }> = {
  free: { label: 'Free', className: 'bg-gray-100 text-gray-600' },
  starter: { label: 'Starter', className: 'bg-blue-100 text-blue-700' },
  pro: { label: 'Pro', className: 'bg-purple-100 text-purple-700' },
  agency: { label: 'Agency', className: 'bg-pink-100 text-pink-700' },
};

export default function PlanBadge({ plan }: { plan: Plan }) {
  const { label, className } = config[plan];
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide', className)}>
      {label}
    </span>
  );
}
