import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-28">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-brand-pink/10 to-brand-purple/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-brand-purple/8 to-brand-pink/8 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/10 text-brand-purple text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          AI-Powered Website Builder
        </div>

        {/* Headline */}
        <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-gray-950 leading-[1.1] mb-6">
          Your business website,<br />
          <span className="bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text text-transparent">
            built by AI
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Answer a few questions about your business and watch AI generate a complete, professional website in minutes — with copy, structure, and SEO built in.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white font-semibold text-base hover:from-brand-pink-dark hover:to-brand-purple-dark transition-all shadow-lg hover:shadow-xl"
          >
            Build my website free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-base hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            See pricing
          </Link>
        </div>

        {/* Social proof */}
        <p className="text-sm text-gray-400 mt-6">
          Free to start — no credit card required
        </p>

        {/* Browser mockup */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gray-950 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 h-10 border-b border-gray-800">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <div className="flex-1 mx-4 bg-gray-800 rounded-md h-5 flex items-center px-3">
                <span className="text-gray-500 text-xs">webmaister.io/preview</span>
              </div>
            </div>
            {/* Preview content */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 p-8 min-h-[320px] flex flex-col items-center justify-center gap-4">
              <div className="w-full max-w-lg space-y-3">
                <div className="h-8 bg-gradient-to-r from-brand-pink/30 to-brand-purple/30 rounded-lg animate-pulse" />
                <div className="h-4 bg-gray-800 rounded-md w-3/4 mx-auto animate-pulse" />
                <div className="h-4 bg-gray-800 rounded-md w-2/3 mx-auto animate-pulse" />
                <div className="flex gap-3 justify-center pt-2">
                  <div className="h-10 w-36 bg-gradient-to-r from-brand-pink/50 to-brand-purple/50 rounded-xl animate-pulse" />
                  <div className="h-10 w-28 bg-gray-800 rounded-xl animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
