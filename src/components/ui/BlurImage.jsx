import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const BlurImage = ({ src, alt, className, ...props }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className={cn("overflow-hidden bg-slate-800/50 relative", className)}>
        <motion.img
          initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          animate={{ 
            opacity: isLoading ? 0 : 1,
            scale: isLoading ? 1.05 : 1,
            filter: isLoading ? "blur(10px)" : "blur(0px)"
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          src={src}
          alt={alt}
          loading="lazy"
          className={cn(
            "duration-700 ease-in-out w-full h-full object-cover",
            isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0"
          )}
          onLoad={() => setLoading(false)}
          {...props}
        />
    </div>
  );
};

export default BlurImage;
