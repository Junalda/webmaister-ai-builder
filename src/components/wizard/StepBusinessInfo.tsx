import type { WizardData } from '@/pages/NewProject';

const industries = [
  'Consulting', 'Coaching', 'Legal Services', 'Accounting', 'Real Estate',
  'Beauty & Wellness', 'Healthcare', 'Fitness & Sports', 'Restaurant & Food',
  'Retail', 'E-commerce', 'Technology', 'Marketing Agency', 'Photography',
  'Architecture & Design', 'Construction', 'Education', 'Non-profit', 'Other',
];

interface Props {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
  onNext: () => void;
}

export default function StepBusinessInfo({ data, update, onNext }: Props) {
  const valid = data.businessName.length >= 2 && data.industry && data.location.length >= 2;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-xl text-gray-950 mb-1">Tell us about your business</h2>
        <p className="text-gray-500 text-sm">This helps AI understand who you are and what you do.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Business name *</label>
          <input
            type="text"
            value={data.businessName}
            onChange={e => update({ businessName: e.target.value })}
            placeholder="e.g. Bloom Consulting"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Industry *</label>
          <select
            value={data.industry}
            onChange={e => update({ industry: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent bg-white"
          >
            <option value="">Select your industry</option>
            {industries.map(i => <option key={i}>{i}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Location *</label>
          <input
            type="text"
            value={data.location}
            onChange={e => update({ location: e.target.value })}
            placeholder="e.g. Amsterdam, Netherlands"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={onNext}
          disabled={!valid}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white font-semibold text-sm hover:from-brand-pink-dark hover:to-brand-purple-dark transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
