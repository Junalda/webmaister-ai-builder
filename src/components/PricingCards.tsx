import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pricingTiers } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export function PricingCards() {
  const [yearly, setYearly] = useState(false);

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <span className={cn('text-sm', !yearly ? 'text-gray-900 font-medium' : 'text-gray-400')}>Monthly</span>
        <button
          onClick={() => setYearly(!yearly)}
          className={cn(
            'relative w-12 h-6 rounded-full transition-colors',
            yearly ? 'bg-brand-gradient' : 'bg-gray-200'
          )}
        >
          <div
            className={cn(
              'absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform',
              yearly ? 'translate-x-6' : 'translate-x-0'
            )}
          />
        </button>
        <span className={cn('text-sm', yearly ? 'text-gray-900 font-medium' : 'text-gray-400')}>
          Yearly
          <span className="ml-2 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">Save 20%</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingTiers.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              'relative rounded-2xl p-6 flex flex-col',
              tier.highlighted
                ? 'bg-gray-950 text-white shadow-2xl shadow-brand-purple/20 scale-105'
                : 'bg-white border border-gray-100'
            )}
          >
            {tier.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-gradient text-white text-xs font-semibold">
                Most Popular
              </div>
            )}

            <div className="mb-6">
              <h3 className={cn(
                'font-display text-lg font-bold mb-1',
                tier.highlighted ? 'text-white' : 'text-gray-900'
              )}>
                {tier.name}
              </h3>
              <p className={cn('text-xs leading-relaxed', tier.highlighted ? 'text-white/60' : 'text-gray-500')}>
                {tier.description}
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-end gap-1">
                <span className={cn('font-display text-4xl font-bold', tier.highlighted ? 'text-white' : 'text-gray-950')}>
                  €{yearly ? tier.yearlyPrice : tier.price}
                </span>
                {tier.price > 0 && (
                  <span className={cn('text-sm mb-1', tier.highlighted ? 'text-white/50' : 'text-gray-400')}>/mo</span>
                )}
              </div>
              {yearly && tier.price > 0 && (
                <p className={cn('text-xs mt-1', tier.highlighted ? 'text-white/50' : 'text-gray-400')}>
                  Billed €{tier.yearlyPrice * 12}/year
                </p>
              )}
            </div>

            <ul className="space-y-3 flex-1 mb-8">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className={cn(
                    'w-4 h-4 mt-0.5 flex-shrink-0',
                    tier.highlighted ? 'text-brand-pink' : 'text-brand-purple'
                  )} />
                  <span className={cn('text-sm', tier.highlighted ? 'text-white/80' : 'text-gray-600')}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Link to={tier.id === 'free' ? '/signup' : '/signup'}>
              <Button
                className={cn(
                  'w-full font-semibold',
                  tier.highlighted
                    ? 'bg-brand-gradient text-white border-0 hover:opacity-90'
                    : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'
                )}
                variant={tier.highlighted ? 'default' : 'outline'}
              >
                {tier.cta}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
