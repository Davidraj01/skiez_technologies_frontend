"use client";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";

// Import local assets so Vite hashes them correctly for Vercel
import skiezDigi from "../assets/skiez-digi.png";
import marineBD from "../assets/marine-BD.png";
import pdfApp from "../assets/pdf-app.png";
import taspef from "../assets/taspef.png";
import davidSecurity from "../assets/DavidSecurity.png";
import seaTurtle from "../assets/sea-turtle.png";
import seaTurtle2 from "../assets/sea-turtle2.png";
import ruspwak from "../assets/ruspwak.png";
import shalomPlots from "../assets/Shalomplots.png";

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}

export const products = [
  {
    title: "Skiez Digital",
    link: "https://www.skiezdigital.com/",
    thumbnail: skiezDigi,
  },
  {
    title: "Marine Biodiversity Conservartion",
    link: "https://www.marinebiodiversityconservation.com/",
    thumbnail: marineBD,
  },
  {
    title: "Skiez Digital",
    link: "https://www.skiezdigital.com/",
    thumbnail: skiezDigi,
  },
  {
    title: "Skiezpdbooks",
    link: "https://www.skiezpdfbooks.in/",
    thumbnail: pdfApp,
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "TASPEF",
    link: "https://taspef.org/",
    thumbnail: taspef,
  },
  {
    title: "David Security",
    link: "https://www.davidsecurityservices.com/",
    thumbnail: davidSecurity,
  },
  {
    title: "Sea Turtle Conservation",
    link: "https://seaturtleconservation.in/",
    thumbnail: seaTurtle,
  },
  {
    title: "TASPEF",
    link: "https://taspef.org/",
    thumbnail: taspef,
  },
  {
    title: "RuspWak",
    link: "https://ruspwak.org/",
    thumbnail: ruspwak,
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },
  {
    title: "Shalom Plots",
    link: "https://www.shalomplots.com/",
    thumbnail: shalomPlots,
  },
  {
    title: "Sea Turtle Conservation",
    link: "https://seaturtleconservation.in/",
    thumbnail: seaTurtle2,
  },
  {
    title: "RuspWak",
    link: "https://ruspwak.org/",
    thumbnail: ruspwak,
  },
  {
    title: "Skiezpdbooks",
    link: "https://www.skiezpdfbooks.in/",
    thumbnail: pdfApp,
  },
];
