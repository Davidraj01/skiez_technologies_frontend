import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-3xl border border-slate-800 bg-slate-900/50 overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Aurora Border Effect - Visible on Hover */}
      <div 
        className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none z-0"
      >
          <div 
             className="absolute inset-[-100%] animate-spin-slow"
             style={{
               background: "conic-gradient(from 90deg at 50% 50%, #00000000 50%, #06b6d4 50%, #8b5cf6 70%, #00000000 100%)"
             }}
          />
      </div>

      {/* Inner Background to mask the center of the gradient (optional, if we want transparency we rely on gradient transparency or cutouts) 
          Since we used transparency in the conic gradient, we might not need a solid mask if the gradient is only at the edges? 
          No, conic gradient spins from the center. We need a mask. 
      */}
      <div className="absolute inset-[1px] bg-slate-950 rounded-[calc(1.5rem-1px)] z-0 pointer-events-none" />

      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(6,182,212,0.15), transparent 40%)`,
        }}
      />
      <div className="relative h-full z-20">{children}</div>
    </motion.div>
  );
};

export default SpotlightCard;
