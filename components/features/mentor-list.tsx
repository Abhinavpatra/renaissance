"use client";

import { Mentor } from "@/lib/data";
import { MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";

export function MentorList({ mentors }: { mentors: Mentor[] }) {
  const openWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone}`, "_blank");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold tracking-tight">Mentors</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {mentors.map((mentor, i) => (
          <motion.div
            key={mentor.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
              {mentor.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{mentor.name}</h4>
              <p className="text-sm text-muted-foreground">{mentor.role}</p>
            </div>
            <button
              onClick={() => openWhatsApp(mentor.phone)}
              className="rounded-full p-2 text-green-500 hover:bg-green-500/10 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
