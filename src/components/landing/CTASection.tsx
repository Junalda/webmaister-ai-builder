import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-brand-purple/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full bg-brand-pink/10 blur-3xl" />
      </div>
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-6">
          Build your professional website{' '}
          <span className="bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text text-transparent">
            today, for free
          </span>
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Join thousands of business owners who have already launched their AI-generated websites with Webmaister.
        </p>
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white font-semibold text-base hover:from-brand-pink-dark hover:to-brand-purple-dark transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
        >
          Start building free
          <ArrowRight className="w-5 h-5" />
        </Link>
        <p className="text-gray-600 text-sm mt-5">No credit card required. Free plan always available.</p>
      </div>
    </section>
  );
}
