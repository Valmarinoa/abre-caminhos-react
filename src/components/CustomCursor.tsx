"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for elegant movement
  const smoothX = useSpring(mouseX, {
    stiffness: 220,
    damping: 16,
    mass: 0.2,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 220,
    damping: 16,
    mass: 0.2,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 2); // offset to center the 8x8 circle
      mouseY.set(e.clientY - 2);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-10 h-10 rounded-full shadow-[0_0_30px_15px_rgba(255,255,255,0.5)] backdrop-blur-md bg-[rgba(255,255,255,0.1)] pointer-events-none z-[9999]"
      style={{
        translateX: smoothX,
        translateY: smoothY,
      }}
    />
  );
};

export default CustomCursor;
