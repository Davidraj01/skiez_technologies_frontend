import React from 'react';
import CardDemo from '@/components/ServiceCard';
import { FeaturesAlternatingLayout01 } from '@/components/Features';
import { HeroParallaxDemo } from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import { StickyScrollRevealDemo } from '@/components/scroll-approach';
import { Seo, useSeoSettings, organizationSchema, websiteSchema } from '@/lib/seo';

const Home = () => {
  const settings = useSeoSettings();
  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden">
      <Seo page="home" jsonLd={[organizationSchema(settings), websiteSchema(settings)]} />
      <HeroParallaxDemo />
      
      <div className="relative z-10 bg-white">
        <FeaturesAlternatingLayout01 />
        <ServiceCard />
        <StickyScrollRevealDemo />
      </div>
    </div>
  );
}

export default Home;