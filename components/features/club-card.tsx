"use client";

import { Club } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ClubCard({ club }: { club: Club }) {
  return (
    <Link href={`/clubs/${club.id}`} className="group relative block w-full">
      <div className="relative overflow-hidden rounded-2xl bg-card border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={club.heroImage}
            alt={club.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            {/* Logo Placeholder if svg not available visually */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur">
              <img src={club.logo} alt="logo" className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white drop-shadow-md">
              {club.name}
            </h3>
          </div>
        </div>

        <div className="p-6">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {club.description}
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
            View Details &rarr;
          </div>
        </div>
      </div>
    </Link>
  );
}
