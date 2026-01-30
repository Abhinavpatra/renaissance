"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CLUBS } from "@/lib/data";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredClubs = CLUBS.filter(
    (club) =>
      club.name.toLowerCase().includes(query.toLowerCase()) ||
      club.description.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative flex w-full max-w-sm items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground transition-all hover:bg-white/10 hover:text-foreground"
      >
        <Search className="h-4 w-4" />
        <span>Search clubs...</span>
        <kbd className="pointer-events-none absolute right-3 hidden h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-[20vh] backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-card shadow-2xl"
            >
              <div className="flex items-center border-b border-white/10 px-4">
                <Search className="mr-2 h-5 w-5 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search clubs..."
                  className="flex-1 bg-transparent py-4 text-lg outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
                <button onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>

              <div className="max-h-[300px] overflow-y-auto p-2">
                {filteredClubs.length === 0 ? (
                  <p className="p-4 text-center text-sm text-muted-foreground">
                    No clubs found.
                  </p>
                ) : (
                  filteredClubs.map((club) => (
                    <Link
                      key={club.id}
                      href={`/clubs/${club.id}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <img src={club.logo} alt="" className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{club.name}</h4>
                        <p className="line-clamp-1 text-xs text-muted-foreground">
                          {club.description}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
