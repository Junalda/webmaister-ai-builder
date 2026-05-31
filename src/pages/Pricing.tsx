import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Zap } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';
import CTASection from '@/components/landing/CTASection';
import { pricingTiers } from '@/data/mockData';

const faqs = [
  { q: 'Can I cancel anytime?', a: 'Yes — cancel at any time. No questions asked. You keep access until the end of your billing period.' },
  { q: 'What are AI credits?', a: 'Credits are consumed when you generate or regenerate content with AI. Each full page generation uses 1 credit; regenerating a section uses 0.5 credits.' },
  { q: 'Can I switch plans?', a: 'Absolutely. Upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.' },
  { q: 'What is the Done For You service?', a: 'Our team takes your AI-generated brief and builds a fully custom website for you — design, copywriting, and launch support included.' },
  { q: 'Do unused credits roll over?', a: 'Credits reset each billing cycle and do not roll over. Make sure to use them before your renewal date.' },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="font-bold text-5xl sm:text-6xl text-gray-950 leading-tight mb-5">
            Simple, transparent<br />pricing
          </h1>
          <p className="text-lg text-gray-500 mb-10">
            Start free. Upgrade when you're ready to scale.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center p-1 bg-gray-100 rounded-2xl gap-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${!annual ? 'bg-white text-gray-950 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${annual ? 'bg-white text-gray-950 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Annual
              <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">-20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="pb-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pricingTiers.map(tier => {
              const price = annual ? tier.yearlyPrice : tier.price;
              return (
                <div
                  key={tier.id}
                  className={`relative rounded-2xl p-7 flex flex-col ${
                    tier.highlighted
                      ? 'bg-gray-950 ring-2 ring-[#8b5cf6] shadow-2xl'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#e040a0] to-[#8b5cf6] text-white text-xs font-bold shadow-lg">
                        <Zap className="w-3 h-3" />
                        Most popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className={`font-bold text-xl mb-1 ${tier.highlighted ? 'text-white' : 'text-gray-950'}`}>
                      {tier.name}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-5 ${tier.highlighted ? 'text-gray-400' : 'text-gray-500'}`}>
                      {tier.description}
                    </p>
                    <div className="flex items-end gap-1.5">
                      {price === 0 ? (
                        <span className={`font-bold text-4xl ${tier.highlighted ? 'text-white' : 'text-gray-950'}`}>Free</span>
                      ) : (
                        <>
                          <span className={`font-bold text-4xl leading-none ${tier.highlighted ? 'text-white' : 'text-gray-950'}`}>
                            €{price}
                          </span>
                          <span className={`text-sm pb-1 ${tier.highlighted ? 'text-gray-400' : 'text-gray-500'}`}>
                            /mo{annual ? ', billed yearly' : ''}
                          </span>
                        </>
                      )}
                    </div>
                    {annual && price > 0 && (
                      <p className={`text-xs mt-1 ${tier.highlighted ? 'text-green-400' : 'text-green-600'}`}>
                        Save €{(tier.price - tier.yearlyPrice) * 12}/yr
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 flex-1 mb-7">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${tier.highlighted ? 'text-[#e040a0]' : 'text-[#8b5cf6]'}`} />
                        <span className={`text-sm leading-snug ${tier.highlighted ? 'text-gray-300' : 'text-gray-600'}`}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={tier.id === 'agency' ? '/done-for-you' : '/signup'}
                    className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all ${
                      tier.highlighted
                        ? 'bg-gradient-to-r from-[#e040a0] to-[#8b5cf6] text-white hover:opacity-90 shadow-lg'
                        : 'border-2 border-gray-200 text-gray-800 hover:border-[#8b5cf6]/40 hover:text-[#8b5cf6]'
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
          <h2 className="font-bold text-3xl text-gray-950 text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-950 mb-2">{q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </PublicLayout>
  );
}
