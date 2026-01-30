import { CLUBS } from "@/lib/data";
import { notFound } from "next/navigation";
import { MentorList } from "@/components/features/mentor-list";
import { Gallery } from "@/components/features/gallery";
import { Users, Heart, MessageSquare, Share2, Bookmark } from "lucide-react";
import { JoinButton } from "@/components/features/join-button";
import Link from "next/link";

// Posts data - should match the homepage posts
const POSTS = [
  {
    id: 0,
    club: "NIT Manipur",
    clubId: "admin",
    department: "Administration",
    author: "Prof. D. V. L. N. Somayajulu",
    avatar:
      "https://ui-avatars.com/api/?name=DVLN+Somayajulu&background=FA8112&color=FAF3E1",
    content:
      "🎓 It was an honor to address students at the Renaissance Club inauguration ceremony. Remember - innovation begins with curiosity, and excellence is a habit, not an act. Keep pushing boundaries and make NIT Manipur proud!",
    image: "/Prof_Somayajulu_director.jpeg",
    timestamp: "1 hour ago",
    likes: 456,
    comments: 89,
  },
  {
    id: 1,
    club: "Faculty Sports",
    clubId: "faculty",
    department: "Faculty",
    author: "Dr. Ujjwal Biswas",
    avatar:
      "https://ui-avatars.com/api/?name=Ujjwal+Biswas&background=FA8112&color=FAF3E1",
    content:
      "🏏 Thanks to all members for these wonderful moments! Inter-NIT Faculty Cricket Tournament was a huge success.",
    image: "/cricket_tournament.jpg",
    timestamp: "2 hours ago",
    likes: 312,
    comments: 67,
  },
  {
    id: 2,
    club: "Electrical Engineering",
    clubId: "electrical",
    department: "EE",
    author: "Prof. Manas Biswas",
    avatar:
      "https://ui-avatars.com/api/?name=Manas+Biswas&background=FA8112&color=FAF3E1",
    content:
      "⚡ Proud to organize the **Power Electronics Workshop** for our students! An intensive hands-on session covering inverters, converters, and renewable energy systems.",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop",
    timestamp: "3 hours ago",
    likes: 234,
    comments: 45,
  },
  {
    id: 3,
    club: "Quibit",
    clubId: "quibit",
    department: "CSE",
    author: "Ankit Sharma",
    avatar:
      "https://ui-avatars.com/api/?name=Ankit+Sharma&background=FA8112&color=FAF3E1",
    content:
      "🚀 Join us for the upcoming **Machine Learning Workshop**! Learn the fundamentals of ML and build your first model.",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop",
    timestamp: "5 hours ago",
    likes: 142,
    comments: 24,
  },
  {
    id: 4,
    club: "Entrepreneurship Club",
    clubId: "entrepreneurship",
    department: "All Departments",
    author: "Dr. Vikram Patel",
    avatar:
      "https://ui-avatars.com/api/?name=Vikram+Patel&background=FA8112&color=FAF3E1",
    content:
      "💡 **Startup Summit 2026** is here! Hear from successful founders, network with investors, and pitch your ideas.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    timestamp: "8 hours ago",
    likes: 267,
    comments: 45,
  },
  {
    id: 5,
    club: "Photography Club",
    clubId: "photography",
    department: "All Departments",
    author: "Priya Devi",
    avatar:
      "https://ui-avatars.com/api/?name=Priya+Devi&background=FA8112&color=FAF3E1",
    content:
      "📸 Our annual **Photography Exhibition** is coming up! Submit your best shots by this Friday.",
    image:
      "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=2058&auto=format&fit=crop",
    timestamp: "1 day ago",
    likes: 189,
    comments: 32,
  },
  {
    id: 6,
    club: "Dancing Club",
    clubId: "dancing",
    department: "All Departments",
    author: "Rahul Ningombam",
    avatar:
      "https://ui-avatars.com/api/?name=Rahul+N&background=FA8112&color=FAF3E1",
    content:
      "💃 **Cultural Fusion Night** - A celebration of dance forms from across India!",
    image:
      "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?q=80&w=2069&auto=format&fit=crop",
    timestamp: "1 day ago",
    likes: 198,
    comments: 41,
  },
  {
    id: 7,
    club: "Singing Club",
    clubId: "singing",
    department: "All Departments",
    author: "Eva Singer",
    avatar:
      "https://ui-avatars.com/api/?name=Eva+S&background=FA8112&color=FAF3E1",
    content:
      "🎤 **Open Mic Night** is back! Whether you sing, rap, or play an instrument - this is your stage.",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop",
    timestamp: "2 days ago",
    likes: 156,
    comments: 28,
  },
];

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

  // Filter posts for this club
  const clubPosts = POSTS.filter((post) => post.clubId === id);

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Hero Header */}
      <div className="relative h-[45vh] w-full overflow-hidden">
        <img
          src={club.heroImage}
          alt={club.name}
          className="h-full w-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-[#222222] via-[#222222]/70 to-[#222222]/30" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-5xl">
            <h1
              className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-3"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
            >
              {club.name}
            </h1>
            <p
              className="text-xl text-white/90 max-w-2xl"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
            >
              {club.description}
            </p>
            <span className="mt-4 inline-block rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
              {club.department}
            </span>
          </div>
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

        {/* Club Posts */}
        {clubPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {clubPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          {post.club}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {post.author}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {post.department}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={post.image}
                      alt="Post"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span className="flex items-center gap-1 text-sm">
                        <Heart className="h-4 w-4" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1 text-sm">
                        <MessageSquare className="h-4 w-4" /> {post.comments}
                      </span>
                    </div>
                    <p className="text-sm text-foreground line-clamp-2">
                      {post.content}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase">
                      {post.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

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
