const steps = [
  {
    num: '01',
    title: 'Tell us about your business',
    description: 'Answer a short questionnaire about your business name, industry, audience, and goals. Takes under 3 minutes.',
  },
  {
    num: '02',
    title: 'AI builds your website',
    description: 'Our AI generates a complete website structure with professional copy, page layouts, and SEO metadata — tailored to your business.',
  },
  {
    num: '03',
    title: 'Edit, refine, and launch',
    description: 'Review every section, edit any text inline, and regenerate any part you want improved. Export or go live when ready.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl text-gray-950 mb-4">
            From zero to website in minutes
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            No design skills. No copywriting experience. Just your business knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px bg-gradient-to-r from-brand-pink/30 to-brand-purple/30" />

          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center p-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-pink to-brand-purple flex items-center justify-center mb-6 shadow-lg">
                <span className="font-display font-bold text-white text-xl">{step.num}</span>
              </div>
              <h3 className="font-display font-semibold text-xl text-gray-950 mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
