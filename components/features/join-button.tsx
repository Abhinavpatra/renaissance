"use client";

import { useState, useEffect } from "react";
import { UserPlus, UserMinus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function JoinButton({ clubId }: { clubId: string }) {
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const u = JSON.parse(stored);
      setUser(u);
      checkStatus(u.email);
    } else {
      setLoading(false);
    }
  }, [clubId]);

  const checkStatus = async (email: string) => {
    try {
      // We can check via a specific API or list clubs. Listing clubs is easier for now.
      const res = await fetch("/api/clubs", {
        headers: { "x-user-email": email },
      });
      const data = await res.json();
      const club = data.find((c: any) => c.id === clubId);
      if (club && club.isJoined) {
        setIsJoined(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleJoin = async () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    setLoading(true);
    const method = isJoined ? "DELETE" : "POST";

    await fetch(`/api/clubs/${clubId}/join`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email }),
    });

    setIsJoined(!isJoined);
    setLoading(false);
  };

  if (loading)
    return (
      <button className="px-6 py-3 bg-secondary rounded-full">
        <Loader2 className="animate-spin h-5 w-5" />
      </button>
    );

  return (
    <button
      onClick={toggleJoin}
      className={cn(
        "flex items-center gap-2 rounded-full px-6 py-3 font-semibold shadow-lg transition-transform hover:scale-105",
        isJoined
          ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
          : "bg-primary text-primary-foreground hover:bg-primary/90",
      )}
    >
      {isJoined ? (
        <>
          <UserMinus className="h-5 w-5" /> Leave Club
        </>
      ) : (
        <>
          <UserPlus className="h-5 w-5" /> Join Club
        </>
      )}
    </button>
  );
}
