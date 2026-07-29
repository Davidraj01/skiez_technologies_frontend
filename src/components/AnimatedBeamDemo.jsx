"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "../lib/utils";
import { AnimatedBeam } from "./ui/animated-beam";
import { 
  Code, 
  Smartphone, 
  Layout, 
  Cloud, 
  Database, 
  User,
  Zap 
} from "lucide-react";

const Circle = forwardRef(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-700 bg-slate-800 p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] transition-transform hover:scale-110 duration-300",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamMultipleOutputDemo({ className }) {
  const containerRef = useRef(null);
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);
  const div4Ref = useRef(null);
  const div5Ref = useRef(null);
  const centerRef = useRef(null);
  const userRef = useRef(null);

  // Connection config
  const beams = [
    { from: div1Ref, to: centerRef, curve: 40, duration: 8, delay: 0 },
    { from: div2Ref, to: centerRef, curve: 20, duration: 9, delay: 2 },
    { from: div3Ref, to: centerRef, curve: 0,  duration: 7, delay: 1 },
    { from: div4Ref, to: centerRef, curve: -20, duration: 10, delay: 3 },
    { from: div5Ref, to: centerRef, curve: -40, duration: 8, delay: 1.5 },
  ];

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full items-center justify-center overflow-hidden p-10 bg-transparent",
        className
      )}
      ref={containerRef}
    >
      <div className="flex h-full w-full max-w-lg flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center gap-6"> {/* Increased gap */}
          <Circle ref={div1Ref}>
            <Code className="h-6 w-6 text-cyan-400" />
          </Circle>
          <Circle ref={div2Ref}>
            <Smartphone className="h-6 w-6 text-purple-400" />
          </Circle>
          <Circle ref={div3Ref}>
            <Layout className="h-6 w-6 text-pink-400" />
          </Circle>
          <Circle ref={div4Ref}>
            <Cloud className="h-6 w-6 text-blue-400" />
          </Circle>
          <Circle ref={div5Ref}>
            <Database className="h-6 w-6 text-orange-400" />
          </Circle>
        </div>
        
        <div className="flex flex-col justify-center">
          <Circle ref={centerRef} className="h-28 w-28 border-cyan-500 bg-slate-900/80 p-5 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl z-20">
             {/* Center Node representing Skiez */}
             <img src="/skiez-tech logo.png" alt="Skiez Technologies" className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
          </Circle>
        </div>
        
        <div className="flex flex-col justify-center">
          <Circle ref={userRef} className="h-20 w-20 border-white/20 bg-slate-800">
            <User className="h-8 w-8 text-white" />
          </Circle>
        </div>
      </div>

      {/* Inputs to Center */}
      {beams.map((beam, idx) => (
        <React.Fragment key={idx}>
            {/* Forward Flow */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={beam.from}
                toRef={beam.to}
                curvature={beam.curve}
                duration={beam.duration}
                delay={beam.delay}
                gradientStartColor="#22d3ee" // Cyan
                gradientStopColor="#8b5cf6" // Violet
                pathWidth={2}
                pathOpacity={0.1}
            />
            {/* Reverse Echo (Subtle) for complex 'pulse' effect */}
             <AnimatedBeam
                containerRef={containerRef}
                fromRef={beam.from}
                toRef={beam.to}
                curvature={beam.curve}
                duration={beam.duration * 1.5}
                delay={beam.delay + 1}
                reverse
                gradientStartColor="#8b5cf6"
                gradientStopColor="#22d3ee"
                pathWidth={2}
                pathOpacity={0.05}
            />
        </React.Fragment>
      ))}
      
      {/* Center to User (The Output) */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={userRef}
        duration={6}
        curvature={0}
        pathWidth={3}
        gradientStartColor="#ffffff"
        gradientStopColor="#22d3ee"
      />
      {/* Reverse signal from User to Center */}
       <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={userRef}
        duration={6}
        reverse
        pathWidth={2}
        pathOpacity={0.1}
        gradientStartColor="#22d3ee"
        gradientStopColor="#ffffff"
      />
    </div>
  );
}
