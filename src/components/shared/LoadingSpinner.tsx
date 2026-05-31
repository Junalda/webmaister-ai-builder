import { cn } from '@/lib/utils';

export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn('w-8 h-8 rounded-full border-2 border-brand-purple border-t-transparent animate-spin', className)} />
  );
}
