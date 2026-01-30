"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Check auth
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (pathname === "/login") return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/60 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500" />
          <span className="hidden sm:inline-block">Renaissance</span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10 transition-colors"
            >
              <span className="text-sm font-medium">{user.name}</span>
              <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
