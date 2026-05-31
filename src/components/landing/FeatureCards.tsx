import { Wand2, Layout, Search, Pencil, Zap, Users, LucideIcon } from 'lucide-react';
import { featureList } from '@/data/mockData';

const iconMap: Record<string, LucideIcon> = { Wand2, Layout, Search, Pencil, Zap, Users };

export default function FeatureCards() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl text-gray-950 mb-4">
            Everything your website needs, built in
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Webmaister handles the heavy lifting so you can focus on running your business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((f) => {
            const Icon = iconMap[f.icon] ?? Wand2;
            return (
              <div key={f.title} className="p-6 rounded-2xl border border-gray-200 hover:border-brand-purple/30 hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-pink/10 to-brand-purple/10 flex items-center justify-center mb-4 group-hover:from-brand-pink/20 group-hover:to-brand-purple/20 transition-all">
                  <Icon className="w-6 h-6 text-brand-purple" />
                </div>
                <h3 className="font-display font-semibold text-lg text-gray-950 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
