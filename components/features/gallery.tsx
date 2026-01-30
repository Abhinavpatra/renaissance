"use client";

import { motion } from "framer-motion";

export function Gallery({ images }: { images: string[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold tracking-tight">
        Contributions & Gallery
      </h3>
      <div className="columns-1 gap-4 sm:columns-2 md:columns-3 space-y-4">
        {images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="relative overflow-hidden rounded-xl break-inside-avoid"
          >
            <img
              src={src}
              alt={`Contribution ${i + 1}`}
              className="w-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
