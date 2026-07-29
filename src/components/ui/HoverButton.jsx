import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HoverButton = ({ href = "/contact", text = "Start free trial" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative inline-flex items-center pl-8 pr-[72px] rounded-full 
        bg-[#ffe580] text-black font-semibold overflow-hidden
        border border-transparent whitespace-nowrap text-lg
      `}
      style={{ height: '56px' }} 
    >
      {/* Text Layer */}
      <span className={`relative z-10 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-black'}`}>
        {text}
      </span>
      
      {/* Animated Background Pill */}
      {/* We use motion.div for the cool spring animation */}
      <motion.div 
        initial={{ width: '48px', height: '48px', right: '4px' }}
        animate={{ 
            width: isHovered ? 'calc(100% - 8px)' : '48px',
            height: isHovered ? 'calc(100% - 8px)' : '48px',
            right: '4px' // Keep it pinned to right with consistent padding
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute top-1/2 -translate-y-1/2 bg-black rounded-full z-0 flex items-center justify-end"
      >
        {/* Icon Container */}
        <div className="w-12 h-12 flex items-center justify-center shrink-0">
             <motion.div
                animate={{ rotate: isHovered ? -45 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
             >
                <ArrowRight className="w-6 h-6 text-white" strokeWidth={2.5} />
             </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

export default HoverButton;
