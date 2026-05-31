import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface BrandButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const BrandButton = forwardRef<HTMLButtonElement, BrandButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          variant === 'primary' && 'bg-gradient-to-r from-brand-pink to-brand-purple text-white hover:from-brand-pink-dark hover:to-brand-purple-dark shadow-md hover:shadow-lg',
          variant === 'outline' && 'border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white',
          variant === 'ghost' && 'text-brand-purple hover:bg-brand-purple/10',
          size === 'sm' && 'px-4 py-2 text-sm',
          size === 'md' && 'px-6 py-3 text-sm',
          size === 'lg' && 'px-8 py-4 text-base',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
BrandButton.displayName = 'BrandButton';
export default BrandButton;
