const testimonials = [
  {
    quote: "I had a full website structure with professional copy in under 15 minutes. It would have taken a copywriter days to write what Webmaister produced.",
    name: 'Sarah van der Berg',
    role: 'Owner, Bloom Florist',
    initials: 'SB',
  },
  {
    quote: "As a consultant, my website was embarrassingly basic. Webmaister gave me something that actually reflects the quality of my work. Clients notice.",
    name: 'Marco de Vries',
    role: 'Business Consultant',
    initials: 'MD',
  },
  {
    quote: "I was skeptical about AI for something this important. But the copy it generated for my fitness studio was better than anything I could have written myself.",
    name: 'Lisa Janssen',
    role: 'Founder, Fit By Design',
    initials: 'LJ',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl text-gray-950 mb-4">
            Businesses that launched with Webmaister
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-8 border border-gray-200 flex flex-col gap-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-brand-pink text-brand-pink" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.285-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-pink to-brand-purple flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
