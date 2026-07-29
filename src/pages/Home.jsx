import React from 'react';
import CardDemo from '@/components/ServiceCard';
import { FeaturesAlternatingLayout01 } from '@/components/Features';
import { HeroParallaxDemo } from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import { StickyScrollRevealDemo } from '@/components/scroll-approach';

const Home = () => {
  return (
    <div className="bg-slate-900 min-h-screen w-full overflow-x-hidden selection:bg-cyan-500/30">
      <HeroParallaxDemo />
      
      <div className="relative z-10 bg-slate-900">
        <FeaturesAlternatingLayout01 />
        <ServiceCard />
        <StickyScrollRevealDemo />
      </div>
    </div>
  );
}

export default Home;