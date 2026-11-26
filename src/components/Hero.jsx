"use client";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";

// Import local (optimized) assets so Vite hashes them correctly for Vercel
import skiezDigi from "../assets/optimized/skiez-digi.webp";
import marineBD from "../assets/optimized/marine-BD.webp";
import pdfApp from "../assets/optimized/pdf-app.webp";
import taspef from "../assets/optimized/taspef.webp";
import davidSecurity from "../assets/optimized/DavidSecurity.webp";
import seaTurtle from "../assets/optimized/sea-turtle.webp";
import ruspwak from "../assets/optimized/ruspwak.webp";
import shalomPlots from "../assets/optimized/Shalomplots.webp";
import hopeConstruction from "../assets/optimized/hope-construction.webp";
import jeevaSchool from "../assets/optimized/jeeva-school.webp";
import rvrBuilders from "../assets/optimized/rvr-builders.webp";
import royalMatrimony from "../assets/optimized/royal-matrimony.webp";
import divineLaundry from "../assets/optimized/divine-laundry.webp";

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}

// "Our Works" — Skiez client projects.
// Client website URLs are intentionally NOT included: cards open an on-site
// preview so visitors stay on the Skiez website.
// Each project appears exactly once, in this order, in the "Our Works" grid.
export const products = [
  { title: "Hope Construction", thumbnail: hopeConstruction },
  { title: "Skiez Digital", thumbnail: skiezDigi },
  { title: "Jeeva Matric School", thumbnail: jeevaSchool },
  { title: "Marine Biodiversity Conservartion", thumbnail: marineBD },
  { title: "RVR Builders", thumbnail: rvrBuilders },
  { title: "Shalom Plots", thumbnail: shalomPlots },
  { title: "Royal Matrimony", thumbnail: royalMatrimony },
  { title: "David Security", thumbnail: davidSecurity },
  { title: "Sea Turtle Conservation", thumbnail: seaTurtle },
  { title: "Divine Laundry", thumbnail: divineLaundry },
  { title: "TASPEF", thumbnail: taspef },
  { title: "RuspWak", thumbnail: ruspwak },
  { title: "Skiezpdbooks", thumbnail: pdfApp },
];
