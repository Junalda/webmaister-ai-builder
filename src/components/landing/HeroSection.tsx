import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Check } from 'lucide-react';

const trustPoints = ['Free to start', 'No credit card required', 'Setup in minutes'];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-24">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-48 right-0 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-brand-pink/8 to-brand-purple/12 blur-3xl" />
        <div className="absolute top-1/2 -left-48 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-brand-purple/8 to-brand-pink/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-sm font-medium mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            Powered by AI — ready in minutes
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-gray-950 leading-[1.08] tracking-tight mb-6">
            Your professional website,{' '}
            <span className="bg-gradient-to-r from-brand-pink via-brand-purple to-brand-purple bg-clip-text text-transparent">
              built by AI
            </span>
          </h1>

          {/* Sub */}
          <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10">
            Answer a few questions about your business. Watch AI generate a complete website — with copy, structure, and SEO built in. Edit anything. Done.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white font-semibold text-base hover:from-brand-pink-dark hover:to-brand-purple-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
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

          {/* Trust */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {trustPoints.map(p => (
              <div key={p} className="flex items-center gap-1.5 text-sm text-gray-500">
                <Check className="w-4 h-4 text-brand-purple shrink-0" />
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* Browser mockup — pure Tailwind, no images */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
            {/* Chrome bar */}
            <div className="h-11 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-2 h-6 bg-white rounded-lg border border-gray-200 flex items-center px-3 gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-gray-400 text-xs font-mono">greenfield-consulting.webmaister.io</span>
              </div>
            </div>

            {/* Mock website content */}
            <div className="bg-gray-950 relative">
              {/* Fake nav */}
              <div className="flex items-center justify-between px-8 h-12 border-b border-gray-800">
                <div className="h-4 w-32 bg-gray-700 rounded" />
                <div className="flex gap-4">
                  <div className="h-3 w-14 bg-gray-700 rounded" />
                  <div className="h-3 w-14 bg-gray-700 rounded" />
                  <div className="h-3 w-14 bg-gray-700 rounded" />
                </div>
                <div className="h-7 w-24 rounded-lg bg-gradient-to-r from-brand-pink/60 to-brand-purple/60" />
              </div>

              {/* Hero area */}
              <div className="px-8 py-12 text-center space-y-4">
                <div className="h-3 w-40 bg-brand-purple/40 rounded-full mx-auto" />
                <div className="h-8 w-3/4 bg-gradient-to-r from-gray-600 to-gray-500 rounded-lg mx-auto" />
                <div className="h-6 w-2/3 bg-gray-700 rounded-lg mx-auto" />
                <div className="h-4 w-1/2 bg-gray-800 rounded mx-auto" />
                <div className="h-4 w-5/8 bg-gray-800 rounded mx-auto" />
                <div className="flex gap-3 justify-center pt-2">
                  <div className="h-10 w-40 rounded-xl bg-gradient-to-r from-brand-pink/70 to-brand-purple/70" />
                  <div className="h-10 w-32 rounded-xl border border-gray-600" />
                </div>
              </div>

              {/* Feature row */}
              <div className="grid grid-cols-3 gap-4 px-8 pb-10">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-800/60 rounded-xl p-4 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-pink/40 to-brand-purple/40" />
                    <div className="h-3.5 w-3/4 bg-gray-600 rounded" />
                    <div className="h-2.5 w-full bg-gray-700 rounded" />
                    <div className="h-2.5 w-5/6 bg-gray-700 rounded" />
                  </div>
                ))}
              </div>

              {/* AI generation overlay badge */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-xl px-3 py-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
                <span className="text-white text-xs font-medium">Generated by AI</span>
              </div>
            </div>
          </div>

          {/* Caption */}
          <p className="text-center text-sm text-gray-400 mt-4">
            Real AI-generated website preview — edit any word, change any section
          </p>
        </div>
      </div>
    </section>
  );
}
