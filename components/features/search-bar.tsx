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
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: 99999 }}
        >
          {/* Backdrop - solid dark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#222222]"
            style={{ opacity: 0.85 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl rounded-2xl border-2 border-border shadow-2xl overflow-hidden"
            style={{ backgroundColor: "#FAF3E1" }}
          >
            {/* Search Input */}
            <div
              className="flex items-center border-b-2 border-border px-4 py-4"
              style={{ backgroundColor: "#F5E7C6" }}
            >
              <Search
                className="mr-3 h-6 w-6 shrink-0"
                style={{ color: "#FA8112" }}
              />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search clubs, departments..."
                className="flex-1 bg-transparent text-xl font-medium outline-none"
                style={{ color: "#222222" }}
              />
              <button
                onClick={handleClose}
                className="ml-2 rounded-full p-2 transition-colors shrink-0 hover:bg-[#FAF3E1]"
              >
                <X className="h-6 w-6" style={{ color: "#222222" }} />
              </button>
            </div>

            {/* Results */}
            <div
              className="max-h-[60vh] overflow-y-auto p-4"
              style={{ backgroundColor: "#FAF3E1" }}
            >
              {query.length === 0 ? (
                <div className="p-6 text-center">
                  <p
                    className="text-lg font-medium mb-4"
                    style={{ color: "#555555" }}
                  >
                    Start typing to search clubs
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {CLUBS.slice(0, 4).map((club) => (
                      <Link
                        key={club.id}
                        href={`/clubs/${club.id}`}
                        onClick={handleClose}
                        className="rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                        style={{
                          backgroundColor: "rgba(250, 129, 18, 0.15)",
                          color: "#FA8112",
                        }}
                      >
                        {club.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : filteredClubs.length === 0 ? (
                <p
                  className="p-6 text-center text-lg"
                  style={{ color: "#555555" }}
                >
                  No clubs found for "{query}"
                </p>
              ) : (
                <div className="space-y-2">
                  {filteredClubs.map((club) => (
                    <Link
                      key={club.id}
                      href={`/clubs/${club.id}`}
                      onClick={handleClose}
                      className="flex items-center gap-4 rounded-xl p-4 transition-colors"
                      style={{ backgroundColor: "#F5E7C6" }}
                    >
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-full shrink-0"
                        style={{ backgroundColor: "rgba(250, 129, 18, 0.15)" }}
                      >
                        <img src={club.logo} alt="" className="h-7 w-7" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className="font-bold text-lg"
                          style={{ color: "#222222" }}
                        >
                          {club.name}
                        </h4>
                        <p
                          className="text-sm truncate"
                          style={{ color: "#555555" }}
                        >
                          {club.description}
                        </p>
                      </div>
                      <span
                        className="rounded-full px-3 py-1 text-xs font-bold shrink-0"
                        style={{
                          backgroundColor: "rgba(250, 129, 18, 0.15)",
                          color: "#FA8112",
                        }}
                      >
                        {club.department}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              className="border-t-2 border-border px-4 py-3 flex items-center justify-between text-sm font-medium"
              style={{ backgroundColor: "#F5E7C6", color: "#555555" }}
            >
              <span>
                Press{" "}
                <kbd
                  className="px-2 py-1 rounded border-2 border-border"
                  style={{ backgroundColor: "#FAF3E1" }}
                >
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
        className="flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium transition-all"
        style={{
          borderColor: "#e0cfa0",
          backgroundColor: "#F5E7C6",
          color: "#555555",
        }}
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search clubs...</span>
        <kbd
          className="hidden md:inline-flex ml-2 px-1.5 py-0.5 text-xs rounded border"
          style={{ backgroundColor: "#FAF3E1", borderColor: "#e0cfa0" }}
        >
          ⌘K
        </kbd>
      </button>

      {/* Portal the modal to body */}
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
