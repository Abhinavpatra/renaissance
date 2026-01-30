"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SearchBar } from "@/components/features/search-bar";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(
    null,
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-md py-2 border-b border-border/40"
            : "bg-transparent py-4",
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className={cn(
                "text-2xl font-bold tracking-tight transition-colors",
                isScrolled ? "text-foreground" : "text-foreground",
                // User asked for "primary as light", so text should be dark/foreground even on transparent if background is light.
                // If hero background is dark/image, we might need white text.
                // Assuming hero is light/warm as per palette request.
              )}
            >
              Renaissance
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#explore"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Explore
            </Link>
            <Link
              href="/sessions"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Sessions
            </Link>

            {/* Search in Navbar - Visible when scrolled or always? User said "Explore search part within navbar" */}
            <div
              className={cn(
                "transition-all duration-300",
                isScrolled ? "opacity-100 scale-100" : "opacity-100 scale-100",
              )}
            >
              <SearchBar />
            </div>

            {user ? (
              <Link
                href="/profile"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary"
              >
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {user.name.charAt(0)}
                </div>
              </Link>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-16 z-40 border-b border-border bg-background px-4 py-4 md:hidden shadow-lg"
          >
            <div className="flex flex-col gap-4">
              <SearchBar />
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 hover:text-primary"
              >
                Home
              </Link>
              <Link
                href="/#explore"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 hover:text-primary"
              >
                Explore
              </Link>
              <Link
                href="/sessions"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 hover:text-primary"
              >
                Sessions
              </Link>
              {user ? (
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 font-bold hover:text-primary"
                >
                  My Profile ({user.name})
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 font-bold text-primary"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
