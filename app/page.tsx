"use client";

import { motion } from "framer-motion";
import { CLUBS } from "@/lib/data";
import { ClubCard } from "@/components/features/club-card";
import { SearchBar } from "@/components/features/search-bar";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-background px-4 pt-16 text-center md:pt-24">
        <BackgroundGradientAnimation containerClassName="absolute inset-0 -z-10 h-full w-full opacity-40">
          <div className="absolute inset-0 z-50 flex items-center justify-center px-4 w-full text-center font-bold text-white pointer-events-none" />
        </BackgroundGradientAnimation>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 flex max-w-4xl flex-col items-center gap-6"
        >
          <h1 className="bg-linear-to-b from-white to-white/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl">
            Renaissance
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
            Connect, Collaborate, and Conquer. The ultimate platform for clubs
            at NIT Manipur.
          </p>

          <div className="mt-8 w-full max-w-sm">
            <SearchBar />
          </div>
        </motion.div>
      </section>

      {/* Explore Section */}
      <section className="container mx-auto max-w-6xl px-4 py-24">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Explore Clubs</h2>
          <div className="h-px flex-1 bg-linear-to-r from-border to-transparent ml-8" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CLUBS.map((club, index) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ClubCard club={club} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
