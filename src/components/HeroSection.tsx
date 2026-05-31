import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden pt-16">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-purple/8 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-brand-pink/8 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-sm text-gray-600 mb-8 fade-up">
          <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
          AI-Powered Website Builder for Entrepreneurs
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-gray-950 fade-up animate-delay-100">
          Your Website,{' '}
          <span className="text-brand-gradient">Built by AI</span>{' '}
          in Minutes
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed fade-up animate-delay-200">
          Answer a few questions about your business. Webmaister's AI generates your full website structure,
          copy, and SEO — ready to edit and publish.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 fade-up animate-delay-300">
          <Link to="/signup">
            <Button
              size="lg"
              className="bg-brand-gradient text-white border-0 px-8 py-6 text-base font-semibold hover:opacity-90 transition-opacity glow-pink"
            >
              Start Building Free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link to="/done-for-you">
            <Button size="lg" variant="outline" className="px-8 py-6 text-base font-medium">
              Done For You →
            </Button>
          </Link>
        </div>

        {/* Social proof */}
        <p className="mt-6 text-sm text-gray-400 fade-up animate-delay-400">
          No credit card required · Free plan available · Setup in 5 minutes
        </p>

        {/* Mock browser preview */}
        <div className="mt-16 relative fade-up animate-delay-400">
          <div className="rounded-2xl border border-gray-200 shadow-2xl shadow-gray-200/60 overflow-hidden bg-white max-w-4xl mx-auto">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4 bg-white rounded-md px-3 py-1 text-xs text-gray-400 border border-gray-200 text-left">
                app.webmaister.io/preview/greenfield-consulting
              </div>
            </div>
            {/* Preview content */}
            <div className="p-8 bg-gradient-to-br from-gray-950 to-gray-800 min-h-[280px] flex flex-col items-center justify-center text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs mb-4">
                <Sparkles className="w-3 h-3" />
                AI Generated
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                Transform Your Business With Expert Strategy
              </h2>
              <p className="text-white/60 text-sm max-w-md mb-6">
                Greenfield Consulting helps ambitious SMBs scale faster with proven growth frameworks.
              </p>
              <div className="flex gap-3">
                <div className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur text-white text-sm font-medium border border-white/20">
                  Book a Free Strategy Call →
                </div>
                <div className="px-4 py-2 rounded-lg bg-white/5 text-white/60 text-sm border border-white/10">
                  Learn More
                </div>
              </div>
            </div>
          </div>
          {/* Glow underneath */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-brand-purple/20 blur-2xl rounded-full" />
        </div>
      </div>
    </section>
  );
}
