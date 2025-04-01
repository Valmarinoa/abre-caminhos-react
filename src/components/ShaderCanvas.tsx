"use client";
import { useEffect, useRef } from "react";

export default function ShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const load = async () => {
      const GlslCanvas = (await import("glslCanvas")).default;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const sandbox = new GlslCanvas(canvas);

      const res = await fetch("/frag.glsl");
      const frag = await res.text();

      sandbox.load(frag);
      sandbox.setUniform("seed", Math.random());

      const resize = () => {
        const s = Math.max(window.innerWidth, window.innerHeight);
        const dpi = window.devicePixelRatio;
        canvas.width = s * dpi;
        canvas.height = s * dpi;
        canvas.style.width = `${s}px`;
        canvas.style.height = `${s}px`;
      };

      resize();
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    };

    load();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none bg-red-800"
    />
  );
}
