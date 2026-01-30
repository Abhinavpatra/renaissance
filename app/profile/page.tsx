"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CLUBS } from "@/lib/data";
import Link from "next/link";
import { ClubCard } from "@/components/features/club-card";
import { Club } from "@/lib/data";

export default function ProfilePage() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(
    null,
  );
  const [joinedClubs, setJoinedClubs] = useState<Club[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
      return;
    }
    const u = JSON.parse(stored);
    setUser(u);

    // Fetch joined clubs
    fetch("/api/clubs", {
      headers: { "x-user-email": u.email },
    })
      .then((res) => res.json())
      .then((data) => {
        const joined = data.filter((c: any) => c.isJoined);
        setJoinedClubs(joined);
      });
  }, [router]);

  if (!user) return null;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-24">
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-12 text-center shadow-lg mb-12">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary text-4xl font-bold text-primary-foreground">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("user");
            router.push("/login");
          }}
          className="text-sm text-destructive hover:underline"
        >
          Sign Out
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6">Your Memberships</h2>
      {joinedClubs.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {joinedClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center">
          You haven't joined any clubs yet.
        </p>
      )}
    </div>
  );
}
