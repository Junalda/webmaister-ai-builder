import type { WizardData } from '@/pages/NewProject';

interface Props {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const allPages = ['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact', 'Pricing', 'Booking', 'Case Studies', 'FAQ', 'Team', 'Testimonials'];

export default function StepPages({ data, update, onNext, onBack }: Props) {
  function toggle(page: string) {
    const current = data.desiredPages;
    const next = current.includes(page) ? current.filter(p => p !== page) : [...current, page];
    update({ desiredPages: next });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-xl text-gray-950 mb-1">Which pages do you need?</h2>
        <p className="text-gray-500 text-sm">Select all the pages you'd like AI to generate for your website.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {allPages.map(page => {
          const selected = data.desiredPages.includes(page);
          return (
            <button
              key={page}
              type="button"
              onClick={() => toggle(page)}
              className={`px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all ${
                selected
                  ? 'border-brand-purple bg-brand-purple/10 text-brand-purple'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              {selected && <span className="mr-2 text-brand-purple">✓</span>}
              {page}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-gray-400">{data.desiredPages.length} page{data.desiredPages.length !== 1 ? 's' : ''} selected</p>

      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
          Back
        </button>
        <button
          onClick={onNext}
          disabled={data.desiredPages.length === 0}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white font-semibold text-sm hover:from-brand-pink-dark hover:to-brand-purple-dark transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
