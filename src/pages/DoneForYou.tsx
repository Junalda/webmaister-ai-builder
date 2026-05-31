import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { CheckCircle, Clock, FileCheck, Palette, Rocket } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

const schema = z.object({
  name: z.string().min(2, 'Required'),
  email: z.string().email('Valid email required'),
  businessName: z.string().min(2, 'Required'),
  description: z.string().min(20, 'Please describe your business in more detail'),
  budget: z.string().min(1, 'Please select a budget'),
  timeline: z.string().min(1, 'Please select a timeline'),
});

type FormData = z.infer<typeof schema>;

const process = [
  { icon: FileCheck, label: 'Brief', desc: 'Fill in the form and tell us about your vision' },
  { icon: Palette, label: 'Design', desc: 'Our team creates a bespoke design concept' },
  { icon: Rocket, label: 'Build', desc: 'We build and polish your complete website' },
  { icon: CheckCircle, label: 'Deliver', desc: 'We hand over a finished, launch-ready website' },
];

export default function DoneForYou() {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(_data: FormData) {
    await new Promise(r => setTimeout(r, 1000));
    toast.success('Request submitted successfully');
    setSubmitted(true);
  }

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 bg-gray-950 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-brand-purple/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-brand-pink/10 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/20 text-brand-purple-light text-sm font-medium mb-8">
            <Clock className="w-4 h-4" />
            Delivery in 3–6 weeks
          </div>
          <h1 className="font-display font-bold text-5xl mb-6 leading-tight">
            We build your website.<br />
            <span className="bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text text-transparent">You focus on your business.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our expert team takes your AI-generated brief and crafts a fully custom, professional website — designed, written, and delivered for you.
          </p>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-bold text-3xl text-gray-950 text-center mb-12">What's included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Custom multi-page website design',
              'AI-assisted professional copywriting',
              'Mobile-responsive layout',
              'SEO optimization on all pages',
              'Contact forms and integrations',
              'Google Analytics setup',
              '2 rounds of revision',
              'Launch support',
            ].map(item => (
              <div key={item} className="flex items-center gap-3 p-4 rounded-xl border border-gray-200">
                <CheckCircle className="w-5 h-5 text-brand-purple shrink-0" />
                <span className="text-sm font-medium text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-bold text-3xl text-gray-950 text-center mb-12">How it works</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {process.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-pink to-brand-purple flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-semibold text-gray-950 mb-1">{label}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {submitted ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="font-display font-bold text-3xl text-gray-950 mb-4">Request received</h2>
              <p className="text-gray-500 text-lg mb-2">Thank you for your interest in our Done For You service.</p>
              <p className="text-gray-500">Our team will review your brief and get back to you within 24 hours.</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h2 className="font-display font-bold text-3xl text-gray-950 mb-3">Get started</h2>
                <p className="text-gray-500">Fill in the form and we'll be in touch within one business day.</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Your name</label>
                      <input {...register('name')} placeholder="Alex Johnson" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent" />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                      <input {...register('email')} type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent" />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Business name</label>
                    <input {...register('businessName')} placeholder="Acme Corp" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent" />
                    {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Tell us about your business and website goals</label>
                    <textarea {...register('description')} rows={4} placeholder="Describe your business, what makes you unique, who your customers are, and what you'd like your website to achieve..." className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent resize-none" />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Budget range</label>
                      <select {...register('budget')} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent bg-white">
                        <option value="">Select budget</option>
                        <option>Under €1.000</option>
                        <option>€1.000 – €2.500</option>
                        <option>€2.500 – €5.000</option>
                        <option>€5.000+</option>
                      </select>
                      {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Timeline</label>
                      <select {...register('timeline')} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent bg-white">
                        <option value="">Select timeline</option>
                        <option>2 weeks</option>
                        <option>3–4 weeks</option>
                        <option>5–6 weeks</option>
                        <option>No rush</option>
                      </select>
                      {errors.timeline && <p className="text-red-500 text-xs mt-1">{errors.timeline.message}</p>}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white font-semibold text-sm hover:from-brand-pink-dark hover:to-brand-purple-dark transition-all shadow-md disabled:opacity-60"
                  >
                    {isSubmitting ? 'Submitting…' : 'Submit my brief'}
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
