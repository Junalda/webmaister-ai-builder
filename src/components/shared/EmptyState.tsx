import { LucideIcon } from 'lucide-react';
import BrandButton from './BrandButton';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel?: string;
  onCta?: () => void;
}

export default function EmptyState({ icon: Icon, title, description, ctaLabel, onCta }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-pink/20 to-brand-purple/20 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-brand-purple" />
      </div>
      <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-sm mb-6">{description}</p>
      {ctaLabel && onCta && (
        <BrandButton onClick={onCta}>{ctaLabel}</BrandButton>
      )}
    </div>
  );
}
