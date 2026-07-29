import React, { useMemo } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
} from "motion/react";

// wrap helper from tutorial
const wrap = (min, max, value) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

export default function MarqueeAlongPath({
  children,
  path,
  baseVelocity = 20,
  repeat = 3,
}) {
  const baseOffset = useMotionValue(0);

  // Build repeated items
  const items = useMemo(() => {
    const arr = React.Children.toArray(children);
    return arr.flatMap((child, idx) =>
      Array.from({ length: repeat }).map((_, r) => ({
        key: `${idx}-${r}`,
        child,
        itemIndex: r * arr.length + idx,
      }))
    );
  }, [children, repeat]);

  // animate
  useAnimationFrame((_, delta) => {
    const moveBy = (baseVelocity * delta) / 1000;
    baseOffset.set(baseOffset.get() + moveBy);
  });

  return (
    <div style={{ position: "relative", width: "100%", height: "300px" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 588 187"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <path d={path} fill="none" stroke="transparent" />
      </svg>

      {items.map(({ key, child, itemIndex }) => {
        const offsetVal = useTransform(baseOffset, (v) => {
          // this matches tutorial logic
          const position = (itemIndex * 100) / items.length;
          return `${wrap(0, 100, v + position)}%`;
        });

        return (
          <motion.div
            key={key}
            style={{
              position: "absolute",
              offsetPath: `path('${path}')`,
              offsetDistance: offsetVal,
              offsetRotate: "auto",
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
}
