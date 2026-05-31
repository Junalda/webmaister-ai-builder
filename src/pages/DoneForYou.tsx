import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { CheckCircle2, Clock, FileText, Palette, Rocket, Star } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  businessName: z.string().min(2, 'Business name is required'),
  description: z.string().min(30, 'Please give us more detail (min 30 characters)'),
  budget: z.string().min(1, 'Select a budget'),
  timeline: z.string().min(1, 'Select a timeline'),
});
type FormData = z.infer<typeof schema>;

const included = [
  'Custom multi-page website design',
  'Professional AI-assisted copywriting',
  'Mobile-responsive layout',
  'On-page SEO optimisation',
  'Contact forms & integrations',
  'Google Analytics setup',
  '2 rounds of revisions',
  'Launch-day support',
];

const process = [
  { icon: FileText, step: '01', label: 'Brief', desc: 'Submit the form and tell us about your business, goals, and vision.' },
  { icon: Palette, step: '02', label: 'Design', desc: 'Our team creates a bespoke design concept based on your AI brief.' },
  { icon: Rocket, step: '03', label: 'Build', desc: 'We build and polish your complete website with copy and structure.' },
  { icon: CheckCircle2, step: '04', label: 'Deliver', desc: 'We hand over a finished, launch-ready website — you take the wheel.' },
];

const reviews = [
  { text: 'The team built exactly what I had in mind. The AI brief saved hours of back-and-forth.', name: 'Sarah V.', company: 'Bloom Florist' },
  { text: 'Professional, fast, and the result looked better than anything a freelancer had done for me before.', name: 'Marco D.', company: 'Verida Tax' },
];

export default function DoneForYou() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(_data: FormData) {
    await new Promise(r => setTimeout(r, 1200));
    toast.success('Brief submitted! We\'ll be in touch within 24 hours.');
    setSubmitted(true);
  }

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-24 bg-gray-950 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-brand-purple/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-brand-pink/10 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-brand-purple-light text-sm font-medium mb-8">
            <Clock className="w-4 h-4" />
            Delivered in 3–6 weeks
          </div>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-white leading-tight mb-6">
            We build your website.<br />
            <span className="bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text text-transparent">
              You run your business.
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Our expert team takes your AI-generated brief and crafts a fully custom, professional website — designed, copywritten, and delivered for you.
          </p>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-bold text-3xl text-gray-950 text-center mb-12">Everything included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {included.map(item => (
              <div key={item} className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50">
                <CheckCircle2 className="w-5 h-5 text-brand-purple shrink-0" />
                <span className="text-sm font-medium text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-bold text-3xl text-gray-950 text-center mb-12">How it works</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {process.map(({ icon: Icon, step, label, desc }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-pink to-brand-purple flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-xs font-bold text-gray-400 mb-1">{step}</p>
                <h3 className="font-display font-semibold text-gray-950 mb-2">{label}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-bold text-3xl text-gray-950 text-center mb-10">What clients say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reviews.map(r => (
              <div key={r.name} className="rounded-2xl border border-gray-200 p-7">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-brand-pink text-brand-pink" />)}
                </div>
                <p className="text-gray-700 leading-relaxed mb-5">"{r.text}"</p>
                <div>
                  <p className="font-semibold text-gray-950 text-sm">{r.name}</p>
                  <p className="text-xs text-gray-500">{r.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intake form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {submitted ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="font-display font-bold text-3xl text-gray-950 mb-3">Brief received</h2>
              <p className="text-gray-500 text-lg mb-2">Thank you for your interest in our Done For You service.</p>
              <p className="text-gray-500">Our team will review your brief and contact you within 24 hours.</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h2 className="font-display font-bold text-3xl text-gray-950 mb-3">Get started</h2>
                <p className="text-gray-500">Fill in your brief and we'll be in touch within one business day.</p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Your name *</label>
                      <input
                        {...register('name')}
                        placeholder="Alex Johnson"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address *</label>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Business name *</label>
                    <input
                      {...register('businessName')}
                      placeholder="Your Business Name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                    />
                    {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Describe your business and website goals *</label>
                    <textarea
                      {...register('description')}
                      rows={5}
                      placeholder="Tell us about your business, what makes you unique, who your ideal customers are, and what you want your website to achieve..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent resize-none"
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Budget range *</label>
                      <select
                        {...register('budget')}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent bg-white"
                      >
                        <option value="">Select budget</option>
                        <option value="under-1000">Under €1.000</option>
                        <option value="1000-2500">€1.000 – €2.500</option>
                        <option value="2500-5000">€2.500 – €5.000</option>
                        <option value="5000+">€5.000+</option>
                      </select>
                      {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Timeline *</label>
                      <select
                        {...register('timeline')}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent bg-white"
                      >
                        <option value="">Select timeline</option>
                        <option value="2w">2 weeks</option>
                        <option value="3-4w">3–4 weeks</option>
                        <option value="5-6w">5–6 weeks</option>
                        <option value="flexible">Flexible / no rush</option>
                      </select>
                      {errors.timeline && <p className="text-red-500 text-xs mt-1">{errors.timeline.message}</p>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white font-semibold text-sm hover:from-brand-pink-dark hover:to-brand-purple-dark transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting brief...' : 'Submit my brief'}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
