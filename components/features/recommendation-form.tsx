"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function RecommendationForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setSubmitted(true), 1000);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-8 text-center bg-card rounded-2xl border border-primary/20"
      >
        <div className="h-12 w-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-bold mb-2">Thank You!</h3>
        <p className="text-muted-foreground">
          Your recommendation has been sent to our team.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-primary hover:underline"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <section className="bg-card rounded-2xl p-8 border border-border shadow-sm">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">
          Have a Suggestion?
        </h2>
        <p className="text-muted-foreground">
          We'd love to hear your ideas for new clubs or events!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              required
              placeholder="Your name"
              className="w-full rounded-lg border border-input bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="student@nitmanipur.ac.in"
              className="w-full rounded-lg border border-input bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="suggestion" className="text-sm font-medium">
            Recommendation
          </label>
          <textarea
            id="suggestion"
            required
            rows={4}
            placeholder="Tell us what you'd like to see..."
            className="w-full rounded-lg border border-input bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Send className="h-4 w-4" />
          Send Recommendation
        </button>
      </form>
    </section>
  );
}
