import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { IntakeFormData } from '@/types';

const schema = z.object({
  businessName: z.string().min(2, 'Enter your business name'),
  industry: z.string().min(2, 'Enter your industry'),
  targetAudience: z.string().min(5, 'Describe your target audience'),
  mainService: z.string().min(5, 'Describe your main service or product'),
  location: z.string().min(2, 'Enter your location'),
  websiteGoal: z.string().min(10, 'What is the main goal of your website?'),
  brandTone: z.string().min(2, 'Describe your brand tone'),
});

type SchemaType = z.infer<typeof schema>;

const PAGES_OPTIONS = ['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Pricing', 'Contact', 'Booking', 'FAQ', 'Team'];
const TONE_OPTIONS = ['Professional', 'Friendly', 'Luxurious', 'Playful', 'Technical', 'Inspirational', 'Bold', 'Minimalist'];
const COLOR_PRESETS = [
  { label: 'Midnight', colors: ['#0a0a1a', '#1e3a5f', '#00b4d8'] },
  { label: 'Forest', colors: ['#1a2e1a', '#2d5a27', '#6db33f'] },
  { label: 'Rose', colors: ['#2e1a1a', '#8b0000', '#e83e4a'] },
  { label: 'Sand', colors: ['#1a1510', '#8b6914', '#d4a853'] },
  { label: 'Violet', colors: ['#1a0a2e', '#6b21a8', '#a855f7'] },
  { label: 'Slate', colors: ['#0f172a', '#334155', '#94a3b8'] },
];

interface IntakeFormProps {
  onSubmit: (data: IntakeFormData) => void;
  isLoading?: boolean;
}

export function IntakeForm({ onSubmit, isLoading }: IntakeFormProps) {
  const [step, setStep] = useState(0);
  const [selectedPages, setSelectedPages] = useState<string[]>(['Home', 'About', 'Services', 'Contact']);
  const [selectedColors, setSelectedColors] = useState<string[]>(COLOR_PRESETS[0].colors);

  const { register, handleSubmit, formState: { errors }, trigger, getValues } = useForm<SchemaType>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const steps = [
    { title: 'Your Business', description: 'Tell us about what you do' },
    { title: 'Your Audience', description: 'Who are you trying to reach?' },
    { title: 'Website Pages', description: 'What pages do you need?' },
    { title: 'Brand Identity', description: 'Tone, colors and goals' },
  ];

  const stepFields: (keyof SchemaType)[][] = [
    ['businessName', 'industry', 'location'],
    ['targetAudience', 'mainService'],
    [],
    ['brandTone', 'websiteGoal'],
  ];

  async function nextStep() {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep(s => s + 1);
  }

  function togglePage(page: string) {
    setSelectedPages(prev =>
      prev.includes(page) ? prev.filter(p => p !== page) : [...prev, page]
    );
  }

  function handleFormSubmit(data: SchemaType) {
    onSubmit({
      ...data,
      desiredPages: selectedPages,
      brandColors: selectedColors,
    });
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Progress */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-50">
        <div className="flex items-center justify-between mb-4">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
                i < step ? 'bg-brand-purple text-white' :
                i === step ? 'bg-brand-gradient text-white' :
                'bg-gray-100 text-gray-400'
              )}>
                {i < step ? '✓' : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={cn('flex-1 h-0.5 transition-colors', i < step ? 'bg-brand-purple' : 'bg-gray-100')} />
              )}
            </div>
          ))}
        </div>
        <h2 className="font-display font-bold text-lg text-gray-900">{steps[step].title}</h2>
        <p className="text-sm text-gray-500">{steps[step].description}</p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
        {/* Step 0: Business info */}
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Input id="businessName" {...register('businessName')} placeholder="e.g. Greenfield Consulting" className="mt-1" />
              {errors.businessName && <p className="text-xs text-red-500 mt-1">{errors.businessName.message}</p>}
            </div>
            <div>
              <Label htmlFor="industry">Industry *</Label>
              <Input id="industry" {...register('industry')} placeholder="e.g. Business Consulting, Beauty, IT Services" className="mt-1" />
              {errors.industry && <p className="text-xs text-red-500 mt-1">{errors.industry.message}</p>}
            </div>
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input id="location" {...register('location')} placeholder="e.g. Amsterdam, Netherlands" className="mt-1" />
              {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location.message}</p>}
            </div>
          </div>
        )}

        {/* Step 1: Audience */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="targetAudience">Target Audience *</Label>
              <Textarea
                id="targetAudience"
                {...register('targetAudience')}
                placeholder="e.g. Small business owners aged 30–50 looking to grow their operations"
                rows={3}
                className="mt-1"
              />
              {errors.targetAudience && <p className="text-xs text-red-500 mt-1">{errors.targetAudience.message}</p>}
            </div>
            <div>
              <Label htmlFor="mainService">Main Service or Product *</Label>
              <Textarea
                id="mainService"
                {...register('mainService')}
                placeholder="e.g. Business strategy consulting, financial planning, and growth workshops"
                rows={3}
                className="mt-1"
              />
              {errors.mainService && <p className="text-xs text-red-500 mt-1">{errors.mainService.message}</p>}
            </div>
          </div>
        )}

        {/* Step 2: Pages */}
        {step === 2 && (
          <div>
            <p className="text-sm text-gray-500 mb-4">Select the pages you need (at least 2):</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PAGES_OPTIONS.map(page => (
                <button
                  key={page}
                  type="button"
                  onClick={() => togglePage(page)}
                  className={cn(
                    'px-3 py-2.5 rounded-xl text-sm font-medium border transition-all',
                    selectedPages.includes(page)
                      ? 'bg-brand-purple/10 border-brand-purple/50 text-brand-purple'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                  )}
                >
                  {page}
                </button>
              ))}
            </div>
            {selectedPages.length < 2 && (
              <p className="text-xs text-red-500 mt-3">Please select at least 2 pages.</p>
            )}
          </div>
        )}

        {/* Step 3: Brand */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <Label className="mb-2 block">Brand Tone *</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TONE_OPTIONS.map(tone => (
                  <button
                    key={tone}
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('brandTone') as HTMLInputElement;
                      if (input) input.value = tone;
                    }}
                    className={cn(
                      'px-3 py-2 rounded-xl text-xs font-medium border transition-all',
                      getValues('brandTone') === tone
                        ? 'bg-brand-purple/10 border-brand-purple/50 text-brand-purple'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                    )}
                  >
                    {tone}
                  </button>
                ))}
              </div>
              <Input id="brandTone" {...register('brandTone')} placeholder="Or type your own tone..." className="mt-2" />
              {errors.brandTone && <p className="text-xs text-red-500 mt-1">{errors.brandTone.message}</p>}
            </div>

            <div>
              <Label className="mb-2 block">Brand Color Palette</Label>
              <div className="grid grid-cols-3 gap-2">
                {COLOR_PRESETS.map(preset => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setSelectedColors(preset.colors)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all',
                      JSON.stringify(selectedColors) === JSON.stringify(preset.colors)
                        ? 'border-brand-purple bg-brand-purple/5'
                        : 'border-gray-100 hover:border-gray-200'
                    )}
                  >
                    <div className="flex gap-0.5">
                      {preset.colors.map(c => (
                        <div key={c} className="w-4 h-4 rounded-sm" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="websiteGoal">Website Goal *</Label>
              <Textarea
                id="websiteGoal"
                {...register('websiteGoal')}
                placeholder="e.g. Generate qualified leads, drive online bookings, showcase my portfolio"
                rows={3}
                className="mt-1"
              />
              {errors.websiteGoal && <p className="text-xs text-red-500 mt-1">{errors.websiteGoal.message}</p>}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-50">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={() => setStep(s => s - 1)}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          ) : <div />}

          {step < steps.length - 1 ? (
            <Button type="button" onClick={nextStep} className="bg-gray-950 text-white hover:bg-gray-800">
              Continue
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isLoading || selectedPages.length < 2}
              className="bg-brand-gradient text-white border-0 hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate My Website
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
