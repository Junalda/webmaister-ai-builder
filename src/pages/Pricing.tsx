import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';
import { pricingTiers } from '@/data/mockData';

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="font-display font-bold text-5xl text-gray-950 mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-gray-500 mb-10">
            Start free. Upgrade when you're ready to do more.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${!annual ? 'bg-white text-gray-950 shadow-sm' : 'text-gray-500'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${annual ? 'bg-white text-gray-950 shadow-sm' : 'text-gray-500'}`}
            >
              Annual
              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-semibold">Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map(tier => {
              const price = annual ? tier.yearlyPrice : tier.price;
              return (
                <div
                  key={tier.id}
                  className={`relative rounded-2xl p-7 flex flex-col ${
                    tier.highlighted
                      ? 'bg-gradient-to-b from-gray-950 to-gray-900 text-white ring-2 ring-brand-purple shadow-2xl'
                      : 'bg-white border border-gray-200 text-gray-950'
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple text-white text-xs font-bold shadow-md">
                        Most popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className={`font-display font-bold text-xl mb-1 ${tier.highlighted ? 'text-white' : 'text-gray-950'}`}>
                      {tier.name}
                    </h3>
                    <p className={`text-sm mb-5 ${tier.highlighted ? 'text-gray-400' : 'text-gray-500'}`}>
                      {tier.description}
                    </p>
                    <div className="flex items-end gap-1">
                      <span className={`font-display font-bold text-4xl ${tier.highlighted ? 'text-white' : 'text-gray-950'}`}>
                        {price === 0 ? 'Free' : `€${price}`}
                      </span>
                      {price > 0 && (
                        <span className={`text-sm mb-1 ${tier.highlighted ? 'text-gray-400' : 'text-gray-500'}`}>
                          /mo{annual ? ', billed annually' : ''}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${tier.highlighted ? 'text-brand-pink' : 'text-brand-purple'}`} />
                        <span className={`text-sm ${tier.highlighted ? 'text-gray-300' : 'text-gray-600'}`}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={tier.id === 'agency' ? '/done-for-you' : '/signup'}
                    className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all ${
                      tier.highlighted
                        ? 'bg-gradient-to-r from-brand-pink to-brand-purple text-white hover:from-brand-pink-dark hover:to-brand-purple-dark shadow-md'
                        : 'border-2 border-gray-200 text-gray-950 hover:border-brand-purple hover:text-brand-purple'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-bold text-3xl text-gray-950 text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {[
              { q: 'Can I cancel anytime?', a: 'Yes. Cancel your subscription at any time — no questions asked. You keep access until the end of your billing period.' },
              { q: 'What are AI credits?', a: 'Credits are used when you generate or regenerate website content with AI. Each page generation uses 1 credit. Regenerating a section uses 0.5 credits.' },
              { q: 'Can I upgrade or downgrade?', a: 'Absolutely. You can change your plan at any time. Upgrades take effect immediately. Downgrades apply at the next billing cycle.' },
              { q: 'What is the Done For You service?', a: 'For businesses that want a completely hands-off experience, our team will build your website for you using the AI-generated brief as a starting point, adding custom design and polish.' },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-950 mb-2">{q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
