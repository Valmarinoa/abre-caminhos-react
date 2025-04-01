"use client";

import ShaderCanvas from "@/components/ShaderCanvas";
import { getChars } from "@/utils/getChars";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: [0.76, 0, 0.24, 1],
            duration: 0.3,
            delay: 0.1,
          }}
          className="w-full h-screen relative p-[5%] flex justify-center items-center"
        >
          <ShaderCanvas />

          <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              ease: [0.76, 0, 0.24, 1],
              duration: 1.7,
              delay: 0.7,
            }}
            className="origin-center hidden md:block w-full max-w-screen-lg px-[2%] shadow-[0_0_30px_5px_white] backdrop-blur-md bg-[rgba(255,255,255,0.2)] rounded-md"
          >
            <div className="w-full hidden md:flex items-center gap-[2%] justify-center leading-tight relative pb-4">
              <h1 className="text-[7vw]">{getChars("Abre")}</h1>
              <motion.span
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{
                  ease: [0.76, 0, 0.24, 1],
                  duration: 3,
                  delay: 0.7,
                }}
                className="origin-center w-full h-[1px] bg-black mt-4"
              />
              <div className="relative">
                <h1 className="text-[7vw]">{getChars("Caminhos")}</h1>
                <p className="text-md absolute right-0 bottom-0 font-baskervville-italic font-baskervville">
                  {" "}
                  (Open Ways)
                </p>
              </div>
            </div>

            <h6 className="text-left pb-6 text-sm w-[52%] leading-tight">
              Interaction experiment inspired by the moving landscapes of
              Lençoes Marenhences on Brazil’s north Atlantic coast,- known for
              its vast desert landscape of tall, white sand dunes and seasonal
              rainwater lagoons.
            </h6>
          </motion.header>
          <p className="fixed bottom-5 right-5">©2025</p>
          <p className="fixed bottom-5 right-1/2 translate-x-1/2 font-baskervville-italic">
            by Valentina Marino
          </p>
        </motion.main>
      </AnimatePresence>
    </Suspense>
  );
}
