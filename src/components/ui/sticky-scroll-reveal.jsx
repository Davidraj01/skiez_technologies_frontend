"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index;
      }
      return acc;
    }, 0);
    setActiveCard(closestBreakpointIndex);
  });

  // Restrained, on-brand palette: deep navy surfaces with logo-blue accents
  // Dark navy panel on the white page
  const backgroundColors = [
    "#0b1f3a",
    "#0a1c35",
    "#0c2140",
  ];
  const linearGradients = [
    "linear-gradient(135deg, #ffffff, #8aa2cc)",
    "linear-gradient(135deg, #dce4f2, #3a5a92)",
    "linear-gradient(135deg, #ffffff, #5b7ab0)",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative mx-auto flex h-[34rem] max-w-7xl justify-center gap-10 overflow-y-auto overflow-x-hidden no-scrollbar rounded-3xl p-8 md:p-12 shadow-[0_40px_90px_-40px_rgba(11,31,58,0.7)]"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="flex items-center gap-4 font-display text-3xl font-bold tracking-tight text-white md:text-4xl"
              >
                <span className="font-sans text-sm font-semibold tracking-[0.2em] text-navy-300">
                  0{index + 1}
                </span>
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="mt-6 max-w-md text-base leading-relaxed text-navy-100/80 md:text-lg"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-10 hidden h-96 w-[28rem] ml-24 mb-6 overflow-hidden rounded-2xl p-[2px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] lg:block",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
