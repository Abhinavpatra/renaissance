"use client";

import { useEffect, useState, useRef } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CLUBS } from "@/lib/data";
import Link from "next/link";
import { createPortal } from "react-dom";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const filteredClubs = CLUBS.filter(
    (club) =>
      club.name.toLowerCase().includes(query.toLowerCase()) ||
      club.description.toLowerCase().includes(query.toLowerCase()) ||
      club.department.toLowerCase().includes(query.toLowerCase()),
  );

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#222222]/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center border-b border-border px-4 py-3">
              <Search className="mr-3 h-5 w-5 text-primary shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search clubs, departments..."
                className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={handleClose}
                className="ml-2 rounded-full p-2 hover:bg-muted transition-colors shrink-0"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto p-3">
              {query.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-muted-foreground mb-4">
                    Start typing to search clubs
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {CLUBS.slice(0, 4).map((club) => (
                      <Link
                        key={club.id}
                        href={`/clubs/${club.id}`}
                        onClick={handleClose}
                        className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                      >
                        {club.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : filteredClubs.length === 0 ? (
                <p className="p-6 text-center text-muted-foreground">
                  No clubs found for "{query}"
                </p>
              ) : (
                <div className="space-y-1">
                  {filteredClubs.map((club) => (
                    <Link
                      key={club.id}
                      href={`/clubs/${club.id}`}
                      onClick={handleClose}
                      className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-muted"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                        <img src={club.logo} alt="" className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground">
                          {club.name}
                        </h4>
                        <p className="text-sm text-muted-foreground truncate">
                          {club.description}
                        </p>
                      </div>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary shrink-0">
                        {club.department}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border px-4 py-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Press{" "}
                <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">
                  ESC
                </kbd>{" "}
                to close
              </span>
              <span>{filteredClubs.length} results</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-all hover:bg-muted hover:text-foreground hover:border-primary/50"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search clubs...</span>
        <kbd className="hidden md:inline-flex ml-2 px-1.5 py-0.5 text-xs bg-muted rounded border border-border">
          ⌘K
        </kbd>
      </button>

      {/* Portal the modal to body */}
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
