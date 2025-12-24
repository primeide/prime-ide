import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import WhyChoose from '@/components/home/WhyChoose';
import DemoPreviews from '@/components/home/DemoPreviews';
import Pricing from '@/components/home/Pricing';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';
import ContactSection from '@/components/home/ContactSection';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChoose />
      <DemoPreviews />
      <Pricing />
      <Testimonials />
      <CTA />
      <ContactSection />
    </>
  );
}
