import { CLUBS } from "@/lib/data";
import { notFound } from "next/navigation";
import { MentorList } from "@/components/features/mentor-list";
import { Gallery } from "@/components/features/gallery";
import { Users } from "lucide-react";
import { JoinButton } from "@/components/features/join-button";
import Link from "next/link";

export async function generateStaticParams() {
  return CLUBS.map((club) => ({
    id: club.id,
  }));
}

export default async function ClubPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const club = CLUBS.find((c) => c.id === id);

  if (!club) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <img
          src={club.heroImage}
          alt={club.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-2">
            {club.name}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">{club.description}</p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-12 space-y-16">
        {/* History / About */}
        <section className="bg-card border border-border/50 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">About & History</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {club.history}
          </p>
        </section>

        {/* Chat Entry Point */}
        <section className="flex flex-col sm:flex-row gap-4 items-center justify-between rounded-2xl bg-primary/5 border border-primary/20 p-8">
          <div>
            <h3 className="text-xl font-bold">Join the Conversation</h3>
            <p className="text-muted-foreground">
              Connect with other members in the {club.name} group chat.
            </p>
            <div className="mt-4">
              <JoinButton clubId={club.id} />
            </div>
          </div>
          <Link
            href={`/clubs/${club.id}/chat`}
            className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105 hover:bg-primary/90"
          >
            <Users className="h-5 w-5" />
            Open Group Chat
          </Link>
        </section>

        {/* Mentors */}
        <MentorList mentors={club.mentors} />

        {/* contributions */}
        <Gallery images={club.contributions} />
      </div>
    </div>
  );
}
