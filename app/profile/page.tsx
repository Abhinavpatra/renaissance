"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(
    null,
  );
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, [router]);

  if (!user) return null;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-24">
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-12 text-center shadow-lg">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary text-4xl font-bold text-primary-foreground">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
        <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-accent/50 p-4">
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="font-semibold">Student</p>
          </div>
          <div className="rounded-xl bg-accent/50 p-4">
            <p className="text-sm text-muted-foreground">Member Since</p>
            <p className="font-semibold">2026</p>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            router.push("/login");
          }}
          className="mt-8 text-sm text-red-500 hover:underline"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
