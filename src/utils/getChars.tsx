import { motion } from "framer-motion";

// 👇 Add your base delay here (in seconds)
const baseDelay = 1.3;

export const translate = {
  initial: {
    y: "20%",
    opacity: 0,
  },
  enter: (i: number[]) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
      delay: baseDelay + i[0], // 👈 Add baseDelay here
    },
  }),
  exit: (i: number[]) => ({
    y: "20%",
    opacity: 0,
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
      delay: baseDelay + i[1], // 👈 Add baseDelay here too
    },
  }),
};

// Fisher-Yates shuffle
const shuffleArray = (arr: number[]) => {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getChars = (word: string) => {
  const length = word.length;
  const delayIndexes = shuffleArray(Array.from({ length }, (_, i) => i));

  return word.split("").map((char, i) => {
    const delayIn = delayIndexes[i] * 0.07;
    const delayOut = (length - delayIndexes[i]) * 0.03;

    return (
      <motion.span
        custom={[delayIn, delayOut]}
        variants={translate}
        initial="initial"
        animate="enter"
        exit="exit"
        key={char + i}
      >
        {char}
      </motion.span>
    );
  });
};
