"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen({ onFinish }: { onFinish?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onFinish?.();
    }, 2000); // 2 seconds dummy load
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <div className="relative flex flex-col items-center gap-4">
        {/* Placeholder Logo / Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center"
        >
          <div className="h-10 w-10 rounded-full bg-primary" />
        </motion.div>

        <h1 className="text-2xl font-bold tracking-tighter text-foreground">
          Renaissance
        </h1>

        {/* Progress Bar */}
        <div className="h-1 w-48 overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full w-full bg-primary"
          />
        </div>
      </div>

      {/* Footer Credit as requested */}
      <div className="absolute bottom-8 text-xs text-muted-foreground uppercase tracking-widest">
        Created by Abhinav Patra and Shivam Raj
      </div>
    </motion.div>
  );
}
