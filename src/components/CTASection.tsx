import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gray-950 px-8 py-16 text-center">
          {/* Background blobs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-purple/25 blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-brand-pink/25 blur-[80px]" />

          <div className="relative z-10">
            <p className="text-sm font-medium text-brand-pink uppercase tracking-widest mb-4">Get Started Today</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Your website is 10 minutes away
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
              Join entrepreneurs who already use Webmaister to launch conversion-focused websites — no designer, no developer needed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-brand-gradient text-white border-0 px-8 py-6 text-base font-semibold hover:opacity-90 transition-opacity"
                >
                  Build My Website Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/done-for-you">
                <Button size="lg" variant="outline" className="px-8 py-6 text-base border-white/20 text-white bg-transparent hover:bg-white/10">
                  Done For You Service
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
