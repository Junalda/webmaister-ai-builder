import type { WizardData } from '@/pages/NewProject';

interface Props {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const tones = ['Professional', 'Friendly', 'Bold', 'Luxury', 'Playful', 'Technical'];

const presetColors = [
  { label: 'Purple', value: '#8b5cf6' },
  { label: 'Pink', value: '#e040a0' },
  { label: 'Blue', value: '#3b82f6' },
  { label: 'Emerald', value: '#10b981' },
  { label: 'Orange', value: '#f97316' },
  { label: 'Slate', value: '#475569' },
];

export default function StepBrand({ data, update, onNext, onBack }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-xl text-gray-950 mb-1">Brand tone and colors</h2>
        <p className="text-gray-500 text-sm">Shape how your website feels and looks.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Brand tone</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {tones.map(tone => (
            <button
              key={tone}
              type="button"
              onClick={() => update({ brandTone: tone })}
              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                data.brandTone === tone
                  ? 'border-brand-purple bg-brand-purple/10 text-brand-purple'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              {tone}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Primary accent color</label>
        <div className="flex flex-wrap gap-3 mb-4">
          {presetColors.map(c => (
            <button
              key={c.value}
              type="button"
              onClick={() => update({ brandColor: c.value })}
              title={c.label}
              className={`w-10 h-10 rounded-xl transition-all ${data.brandColor === c.value ? 'ring-2 ring-offset-2 ring-gray-950 scale-110' : 'hover:scale-105'}`}
              style={{ backgroundColor: c.value }}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Custom color:</label>
          <input
            type="color"
            value={data.brandColor}
            onChange={e => update({ brandColor: e.target.value })}
            className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200"
          />
          <span className="text-sm font-mono text-gray-500">{data.brandColor}</span>
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
          Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white font-semibold text-sm hover:from-brand-pink-dark hover:to-brand-purple-dark transition-all shadow-md"
        >
          Review
        </button>
      </div>
    </div>
  );
}
