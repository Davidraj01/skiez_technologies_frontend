import React from "react";
import MarqueeAlongPath from "./MarqueeAlongPath";

const pathData =
  "M0 186.219C138.5 186.219 305.5 194.719 305.5 49.7188C305.5 -113.652 -75 186.219 484.5 186.219H587.5";

const Marquee = () => {
  return (
    <div style={{ width: "100vw", height: "350px" }}>
      <MarqueeAlongPath path={pathData} baseVelocity={12} repeat={4}>
        <Card label="Hello Marquee" color="#0ea5a4" />
        <Card label="Item Two" color="#9ca3af" />
        <Card label="Item Three" color="#000000" />
      </MarqueeAlongPath>
    </div>
  );
};

const Card = ({ label, color }) => (
  <div
    style={{
      padding: "10px 16px",
      background: color,
      color: "white",
      borderRadius: "8px",
      fontWeight: "600",
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </div>
);

export default Marquee;
