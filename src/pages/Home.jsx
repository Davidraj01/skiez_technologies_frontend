import React from 'react';
import { FeaturesAlternatingLayout01 } from '@/components/Features';
import { HeroParallaxDemo } from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import { StickyScrollRevealDemo } from '@/components/scroll-approach';
import HomeGeo, { LAST_UPDATED } from '@/components/HomeGeo';
import { geoDefinition, geoFaqs, plainText } from '@/data/homeGeo';
import { Seo, useSeoSettings, organizationSchema, websiteSchema, faqSchema, absoluteUrl } from '@/lib/seo';

const Home = () => {
  const settings = useSeoSettings();

  // Home page as a WebPage about the organization, with a visible "last updated" date
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: settings?.pages?.home?.title || "Skiez Technologies",
    description: geoDefinition,
    url: absoluteUrl(settings, "/"),
    dateModified: LAST_UPDATED || undefined,
    inLanguage: "en-IN",
    about: { "@type": "Organization", name: settings?.siteName || "Skiez Technologies" },
  };

  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden">
      <Seo
        page="home"
        modifiedTime={LAST_UPDATED || undefined}
        jsonLd={[
          organizationSchema(settings),
          websiteSchema(settings),
          webPage,
          faqSchema(geoFaqs.map((f) => ({ question: f.question, answer: plainText(f.answer) }))),
        ]}
      />
      <HeroParallaxDemo />

      <div className="relative z-10 bg-white">
        <FeaturesAlternatingLayout01 />
        <ServiceCard />
        <StickyScrollRevealDemo />
        <HomeGeo />
      </div>
    </div>
  );
}

export default Home;
