import { Wand2, Layout, Search, Pencil, Zap, Users } from 'lucide-react';
import { featureList } from '@/data/mockData';

const iconMap: Record<string, React.ElementType> = {
  Wand2, Layout, Search, Pencil, Zap, Users,
};

export function FeatureCards() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-brand-pink uppercase tracking-widest mb-3">Features</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-950">
            Everything you need to launch
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            Webmaister combines AI copywriting, smart structure, and SEO into one seamless workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((feature, i) => {
            const Icon = iconMap[feature.icon] ?? Zap;
            return (
              <div
                key={i}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-brand-purple/30 bg-white card-hover"
              >
                <div className="w-11 h-11 rounded-xl bg-gray-50 group-hover:bg-brand-purple/10 flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-brand-purple transition-colors" />
                </div>
                <h3 className="font-display text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
