"use client";

import { motion } from "framer-motion";
import { ClubCard } from "@/components/features/club-card";
import { RecommendationForm } from "@/components/features/recommendation-form";
import { CLUBS } from "@/lib/data";
import { MessageSquare, Heart, Share2 } from "lucide-react";

// Dummy posts data
const POSTS = [
  {
    id: 1,
    club: "Quibit",
    department: "CSE",
    author: "Ankit Sharma",
    content:
      "🚀 Excited to announce our upcoming Hackathon 2026! 48 hours of coding, innovation, and fun. Registrations open next week. Stay tuned!",
    timestamp: "2 hours ago",
    likes: 42,
    comments: 8,
  },
  {
    id: 2,
    club: "Photography Club",
    department: "All Departments",
    author: "Priya Devi",
    content:
      "📸 Check out the stunning shots from last week's campus photography walk! Our members captured the beauty of spring in Manipur.",
    timestamp: "5 hours ago",
    likes: 67,
    comments: 12,
  },
  {
    id: 3,
    club: "Entrepreneurship Club",
    department: "All Departments",
    author: "Dr. Vikram Patel",
    content:
      "💡 Congratulations to Team InnovateManipur for winning the state-level startup pitch competition! Proud moment for NIT Manipur.",
    timestamp: "1 day ago",
    likes: 128,
    comments: 24,
  },
  {
    id: 4,
    club: "Dancing Club",
    department: "All Departments",
    author: "Rahul Ningombam",
    content:
      "💃 Rehearsals in full swing for the Annual Cultural Fest! Get ready for some amazing performances this weekend.",
    timestamp: "1 day ago",
    likes: 89,
    comments: 15,
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden px-4 pt-24 text-center bg-linear-to-b from-[#F5E7C6] to-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 flex max-w-4xl flex-col items-center gap-6"
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl">
            <span className="text-primary">Renaissance</span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground font-medium">
            The heartbeat of NIT Manipur's student life. Join a club, find your
            passion, and be part of our vibrant community.
          </p>
        </motion.div>
      </section>

      {/* Director Section */}
      <section
        id="director"
        className="relative z-10 container mx-auto px-4 py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-card border border-border/50 p-8 shadow-xl flex flex-col md:flex-row items-center gap-8 md:gap-12"
        >
          <div className="relative h-48 w-48 md:h-64 md:w-64 shrink-0 overflow-hidden rounded-full border-4 border-primary/20 shadow-lg">
            <img
              src="/Prof_Somayajulu_director.jpeg"
              onError={(e) => {
                e.currentTarget.src =
                  "https://ui-avatars.com/api/?name=DVLN+Somayajulu&background=FA8112&color=FAF3E1&size=256";
              }}
              alt="Director NIT Manipur"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Our Visionary Leadership
            </h2>
            <h3 className="text-xl font-semibold text-primary">
              Prof. D. V. L. N. Somayajulu
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Under the esteemed guidance of our Director, NIT Manipur continues
              to scale new heights of academic excellence and holistic student
              development. His vision fosters an environment where "Renaissance"
              thrives—a rebirth of creativity and innovation.
            </p>
            <a
              href="https://www.nitmanipur.ac.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-primary font-bold hover:underline"
            >
              Read Message from Desk &rarr;
            </a>
          </div>
        </motion.div>
      </section>

      {/* Posts/Updates Section */}
      <section id="posts" className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center space-y-4 mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Latest Updates</h2>
          <p className="text-muted-foreground max-w-2xl">
            What's happening across our vibrant community of clubs
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl bg-card border border-border/50 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {post.club.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {post.club}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {post.author} · {post.timestamp}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {post.department}
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4">
                {post.content}
              </p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <button className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Heart className="h-4 w-4" /> {post.likes}
                </button>
                <button className="flex items-center gap-2 hover:text-primary transition-colors">
                  <MessageSquare className="h-4 w-4" /> {post.comments}
                </button>
                <button className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Explore Section */}
      <section id="explore" className="container mx-auto px-4 py-12 space-y-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-4xl font-bold tracking-tight">Explore Clubs</h2>
          <p className="text-muted-foreground max-w-2xl">
            From coding to dancing, find the community that speaks to you.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CLUBS.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </section>

      {/* Recommendation Section */}
      <section id="contact" className="container mx-auto px-4 py-20">
        <RecommendationForm />
      </section>
    </div>
  );
}
