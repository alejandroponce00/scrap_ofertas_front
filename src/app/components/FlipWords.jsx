"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function FlipWords({ words, duration = 2000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <div className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
  key={words[index].text}
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ y: -20, opacity: 0 }}
  transition={{ duration: 0.4 }}
  className={`absolute left-0 top-0 ${words[index].color}`}
>
  {words[index].text}
</motion.span>
      </AnimatePresence>

      {/* Invisible text to keep width */}
     <span className="invisible">{words[0].text}</span>
    </div>
  );
}