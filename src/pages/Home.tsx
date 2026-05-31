import PublicLayout from '@/components/layout/PublicLayout';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorks from '@/components/landing/HowItWorks';
import FeatureCards from '@/components/landing/FeatureCards';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTASection from '@/components/landing/CTASection';

export default function Home() {
  return (
    <PublicLayout>
      <HeroSection />
      <HowItWorks />
      <FeatureCards />
      <TestimonialsSection />
      <CTASection />
    </PublicLayout>
  );
}
