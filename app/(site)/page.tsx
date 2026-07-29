import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { PainPoints } from '@/components/PainPoints';
import { Differentiators } from '@/components/Differentiators';
import { Programs } from '@/components/Programs';
import { HowItWorks } from '@/components/HowItWorks';
import { Testimonials } from '@/components/Testimonials';
import { Transformations } from '@/components/Transformations';
import { Founder } from '@/components/Founder';
import { InstagramCTA } from '@/components/InstagramCTA';
import { EnquirySection } from '@/components/EnquirySection';
import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { StructuredData } from '@/components/StructuredData';

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Hero />
      <TrustBar />
      <PainPoints />
      <Differentiators />
      <Programs />
      <HowItWorks />
      <Testimonials />
      <Transformations />
      <Founder />
      <EnquirySection />
      <InstagramCTA />
      <FAQ />
      <FinalCTA />
    </>
  );
}
