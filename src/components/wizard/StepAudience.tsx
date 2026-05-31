import type { WizardData } from '@/pages/NewProject';

interface Props {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const goals = ['Generate leads', 'Online bookings', 'Brand awareness', 'E-commerce sales', 'Showcase portfolio'];

export default function StepAudience({ data, update, onNext, onBack }: Props) {
  const valid = data.targetAudience.length >= 5 && data.mainService.length >= 5 && data.websiteGoal;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-xl text-gray-950 mb-1">Your audience and goals</h2>
        <p className="text-gray-500 text-sm">Help the AI write copy that speaks to the right people.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Who is your target audience? *</label>
          <textarea
            value={data.targetAudience}
            onChange={e => update({ targetAudience: e.target.value })}
            rows={2}
            placeholder="e.g. Small business owners aged 30–55 looking to grow their online presence"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Your main service or product *</label>
          <input
            type="text"
            value={data.mainService}
            onChange={e => update({ mainService: e.target.value })}
            placeholder="e.g. Business strategy consulting for SMBs"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Primary website goal *</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {goals.map(g => (
              <button
                key={g}
                type="button"
                onClick={() => update({ websiteGoal: g })}
                className={`px-4 py-2.5 rounded-xl border text-sm font-medium text-left transition-all ${
                  data.websiteGoal === g
                    ? 'border-brand-purple bg-brand-purple/10 text-brand-purple'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
          Back
        </button>
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
