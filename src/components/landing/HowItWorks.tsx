const steps = [
  {
    num: '01',
    title: 'Tell us about your business',
    desc: 'Answer a short questionnaire — business name, industry, audience, and goals. It takes under 3 minutes.',
  },
  {
    num: '02',
    title: 'AI builds your website',
    desc: 'Our AI generates a complete website structure with professional copy, SEO metadata, and page layouts tailored to your business.',
  },
  {
    num: '03',
    title: 'Edit, refine, and launch',
    desc: 'Review every section, edit any text inline, regenerate anything you want improved, and export when you\'re ready.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl text-gray-950 mb-4">
            From zero to website in minutes
          </h2>
          <p className="text-lg text-gray-500 max-w-lg mx-auto">
            No design skills. No copywriting. Just your business knowledge and a few minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector */}
          <div className="hidden md:block absolute top-10 left-[calc(33%-1px)] right-[calc(33%-1px)] h-px bg-gradient-to-r from-brand-pink/40 via-brand-purple/40 to-brand-pink/40" />

          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-pink to-brand-purple flex items-center justify-center mb-6 shadow-xl relative z-10">
                <span className="font-display font-bold text-white text-2xl">{step.num}</span>
              </div>
              <h3 className="font-display font-semibold text-xl text-gray-950 mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
