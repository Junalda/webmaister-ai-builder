import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AppLayout from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';

// Step components (to be created)
import StepBusinessInfo from '@/components/wizard/StepBusinessInfo';
import StepAudience from '@/components/wizard/StepAudience';
import StepPages from '@/components/wizard/StepPages';
import StepBrand from '@/components/wizard/StepBrand';
import StepReview from '@/components/wizard/StepReview';

export interface WizardData {
  businessName: string;
  industry: string;
  location: string;
  targetAudience: string;
  mainService: string;
  websiteGoal: string;
  desiredPages: string[];
  brandTone: string;
  brandColor: string;
}

const STEPS = ['Business Info', 'Audience', 'Pages', 'Brand', 'Review'];

const initialData: WizardData = {
  businessName: '',
  industry: '',
  location: '',
  targetAudience: '',
  mainService: '',
  websiteGoal: '',
  desiredPages: ['Home', 'About', 'Services', 'Contact'],
  brandTone: 'Professional',
  brandColor: '#8b5cf6',
};

export default function NewProject() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(initialData);
  const [generating, setGenerating] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  function update(patch: Partial<WizardData>) {
    setData(prev => ({ ...prev, ...patch }));
  }

  function next() { setStep(s => Math.min(s + 1, STEPS.length - 1)); }
  function prev() { setStep(s => Math.max(s - 1, 0)); }

  async function generate() {
    setGenerating(true);
    // Simulate AI generation delay
    await new Promise(r => setTimeout(r, 2500));
    toast.success('Your website has been generated!');
    // In production: create project in Supabase, then navigate to it
    // For now navigate to a mock project
    navigate('/dashboard/projects/proj_001');
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-2xl text-gray-950 mb-1">Build a new website</h1>
          <p className="text-gray-500 text-sm">Answer a few questions and AI will generate your website</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < step ? 'bg-brand-purple text-white' :
                  i === step ? 'bg-gradient-to-br from-brand-pink to-brand-purple text-white shadow-md' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {i < step ? '✓' : i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-px flex-1 w-8 sm:w-16 transition-all ${i < step ? 'bg-brand-purple' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            {STEPS.map((label, i) => (
              <span key={label} className={`text-xs font-medium ${i === step ? 'text-brand-purple' : 'text-gray-400'}`} style={{ width: `${100 / STEPS.length}%`, textAlign: i === 0 ? 'left' : i === STEPS.length - 1 ? 'right' : 'center' }}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Step panel */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          {step === 0 && <StepBusinessInfo data={data} update={update} onNext={next} />}
          {step === 1 && <StepAudience data={data} update={update} onNext={next} onBack={prev} />}
          {step === 2 && <StepPages data={data} update={update} onNext={next} onBack={prev} />}
          {step === 3 && <StepBrand data={data} update={update} onNext={next} onBack={prev} />}
          {step === 4 && <StepReview data={data} onBack={prev} onGenerate={generate} generating={generating} />}
        </div>
      </div>
    </AppLayout>
  );
}
