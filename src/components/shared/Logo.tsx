import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  light?: boolean;
  className?: string;
}

const sizes = { sm: 'text-lg', md: 'text-xl', lg: 'text-3xl' };

export default function Logo({ size = 'md', light = false, className }: LogoProps) {
  return (
    <Link to="/" className={cn('font-display font-bold tracking-tight', sizes[size], className)}>
      <span className={light ? 'text-white' : 'text-gray-950'}>Web</span>
      <span className="bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text text-transparent">maister</span>
    </Link>
  );
}
