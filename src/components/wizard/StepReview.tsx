import { Sparkles, Loader2 } from 'lucide-react';
import type { WizardData } from '@/pages/NewProject';

interface Props {
  data: WizardData;
  onBack: () => void;
  onGenerate: () => void;
  generating: boolean;
}

export default function StepReview({ data, onBack, onGenerate, generating }: Props) {
  const rows = [
    { label: 'Business', value: data.businessName },
    { label: 'Industry', value: data.industry },
    { label: 'Location', value: data.location },
    { label: 'Audience', value: data.targetAudience },
    { label: 'Main service', value: data.mainService },
    { label: 'Goal', value: data.websiteGoal },
    { label: 'Pages', value: data.desiredPages.join(', ') },
    { label: 'Tone', value: data.brandTone },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-xl text-gray-950 mb-1">Ready to generate</h2>
        <p className="text-gray-500 text-sm">Review your details below, then let AI build your website.</p>
      </div>

      <div className="rounded-xl border border-gray-200 overflow-hidden">
        {rows.map(({ label, value }, i) => (
          <div key={label} className={`flex gap-4 px-5 py-3.5 text-sm ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
            <span className="font-medium text-gray-500 w-28 shrink-0">{label}</span>
            <span className="text-gray-950">{value || '—'}</span>
          </div>
        ))}
        <div className="flex gap-4 px-5 py-3.5 text-sm bg-gray-50 items-center">
          <span className="font-medium text-gray-500 w-28 shrink-0">Brand color</span>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md border border-gray-200" style={{ backgroundColor: data.brandColor }} />
            <span className="font-mono text-gray-950">{data.brandColor}</span>
          </div>
        </div>
      </div>

      {generating && (
        <div className="rounded-xl bg-gradient-to-r from-brand-pink/10 to-brand-purple/10 border border-brand-purple/20 p-5 flex items-center gap-4">
          <Loader2 className="w-6 h-6 text-brand-purple animate-spin shrink-0" />
          <div>
            <p className="font-semibold text-gray-950 text-sm">Generating your website…</p>
            <p className="text-gray-500 text-xs mt-0.5">AI is writing copy for {data.desiredPages.length} pages. This takes about 10–30 seconds.</p>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-2">
        <button onClick={onBack} disabled={generating} className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-40">
          Back
        </button>
        <button
          onClick={onGenerate}
          disabled={generating}
          className="inline-flex items-center gap-2 px-8 py-2.5 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white font-semibold text-sm hover:from-brand-pink-dark hover:to-brand-purple-dark transition-all shadow-md disabled:opacity-60"
        >
          {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {generating ? 'Generating…' : 'Generate my website'}
        </button>
      </div>
    </div>
  );
}
