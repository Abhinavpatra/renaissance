"use client";

import { motion } from "framer-motion";
import { ClubCard } from "@/components/features/club-card";
import { CLUBS } from "@/lib/data";
import {
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  Users,
  Calendar,
  Newspaper,
  TrendingUp,
  BookOpen,
  Briefcase,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

// News items for right sidebar
const NEWS = [
  {
    id: 1,
    title: "Inter-NIT Tech Fest 2026 announced",
    time: "2h ago",
    readers: "2,100",
  },
  {
    id: 2,
    title: "Quibit wins national hackathon",
    time: "5h ago",
    readers: "1,800",
  },
  {
    id: 3,
    title: "New AI Research Lab inaugurated",
    time: "8h ago",
    readers: "1,250",
  },
  {
    id: 4,
    title: "Campus placement season begins",
    time: "1d ago",
    readers: "3,400",
  },
  {
    id: 5,
    title: "Cultural fest dates revealed",
    time: "1d ago",
    readers: "980",
  },
];

// Posts data - exported so club pages can use it
export const POSTS = [
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
    fallbackImage:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
    timestamp: "1 hour ago",
    likes: 456,
    comments: 89,
    isDirector: true,
  },
  {
    id: 1,
    club: "Electrical Engineering",
    clubId: "electrical",
    department: "EE",
    author: "Prof. Manas Biswas",
    avatar:
      "https://ui-avatars.com/api/?name=Manas+Biswas&background=FA8112&color=FAF3E1",
    content:
      "⚡ Proud to organize the **Power Electronics Workshop** for our students! An intensive hands-on session covering inverters, converters, and renewable energy systems. Special thanks to the EE department for the support.",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop",
    timestamp: "2 hours ago",
    likes: 234,
    comments: 45,
  },
  {
    id: 2,
    club: "Faculty Sports",
    clubId: "faculty",
    department: "Faculty",
    author: "Dr. Ujjwal Biswas",
    avatar:
      "https://ui-avatars.com/api/?name=Ujjwal+Biswas&background=FA8112&color=FAF3E1",
    content:
      "🏏 Thanks to all members for these wonderful moments! Inter-NIT Faculty Cricket Tournament was a huge success. Great teamwork and sportsmanship displayed by everyone. Looking forward to more such events!",
    image: "/ujjwal_biswas_cricket.png",
    timestamp: "3 hours ago",
    likes: 312,
    comments: 67,
    linkedinUrl:
      "https://www.linkedin.com/posts/dr-ujjwal-biswas-21646340_thanks-to-all-members-for-these-wonderful-activity-7412906781158342657-m-wn",
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
      "🚀 Join us for the upcoming **Machine Learning Workshop**! Learn the fundamentals of ML and build your first model. Open to all departments.",
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
      "💡 **Startup Summit 2026** is here! Hear from successful founders, network with investors, and pitch your ideas. Registration now open!",
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
      "📸 Our annual **Photography Exhibition** is coming up! Submit your best shots by this Friday. Theme: 'Life in Manipur'",
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
      "💃 **Cultural Fusion Night** - A celebration of dance forms from across India! Performances, workshops, and more. This Saturday at Main Auditorium.",
    image:
      "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?q=80&w=2069&auto=format&fit=crop",
    timestamp: "1 day ago",
    likes: 198,
    comments: 41,
  },
];

interface Post {
  id: number;
  club: string;
  clubId: string;
  department: string;
  author: string;
  avatar: string;
  content: string;
  image: string;
  fallbackImage?: string;
  timestamp: string;
  likes: number;
  comments: number;
  isDirector?: boolean;
  linkedinUrl?: string;
}

function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
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
            <p className="font-semibold text-foreground text-sm">{post.club}</p>
            <p className="text-xs text-muted-foreground">{post.author}</p>
          </div>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            post.isDirector
              ? "bg-primary text-primary-foreground"
              : "bg-primary/10 text-primary"
          }`}
        >
          {post.department}
        </span>
      </div>

      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <img
          src={imgError && post.fallbackImage ? post.fallbackImage : post.image}
          alt="Post"
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>

      {/* Actions */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLiked(!liked)}
              className={`transition-colors ${liked ? "text-red-500" : "text-foreground hover:text-muted-foreground"}`}
            >
              <Heart className={`h-6 w-6 ${liked ? "fill-current" : ""}`} />
            </button>
            <button className="text-foreground hover:text-muted-foreground transition-colors">
              <MessageSquare className="h-6 w-6" />
            </button>
            <button className="text-foreground hover:text-muted-foreground transition-colors">
              <Share2 className="h-6 w-6" />
            </button>
          </div>
          <button
            onClick={() => setSaved(!saved)}
            className={`transition-colors ${saved ? "text-primary" : "text-foreground hover:text-muted-foreground"}`}
          >
            <Bookmark className={`h-6 w-6 ${saved ? "fill-current" : ""}`} />
          </button>
        </div>

        <p className="font-semibold text-sm">
          {post.likes + (liked ? 1 : 0)} likes
        </p>

        <p className="text-sm text-foreground">
          <span className="font-semibold">{post.club}</span> {post.content}
        </p>

        {post.linkedinUrl && (
          <a
            href={post.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-primary hover:underline"
          >
            View on LinkedIn →
          </a>
        )}

        <p className="text-xs text-muted-foreground">
          View all {post.comments} comments
        </p>

        <p className="text-xs text-muted-foreground uppercase">
          {post.timestamp}
        </p>
      </div>
    </motion.div>
  );
}

// Left Sidebar - Profile Card
function LeftSidebar() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(
    null,
  );

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <div className="space-y-4 sticky top-20">
      {/* Profile Card */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="h-16 bg-linear-to-r from-primary/30 to-primary/10" />
        <div className="px-4 pb-4 -mt-8">
          <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold border-4 border-card">
            {user ? user.name.charAt(0) : "?"}
          </div>
          <h3 className="font-semibold mt-2">
            {user ? user.name : "Welcome!"}
          </h3>
          <p className="text-xs text-muted-foreground">
            {user ? user.email : "Sign in to join clubs"}
          </p>
        </div>

        {user && (
          <div className="border-t border-border/50 px-4 py-3">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Profile views</span>
              <span className="font-semibold text-primary">109</span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-muted-foreground">Post impressions</span>
              <span className="font-semibold text-primary">33</span>
            </div>
          </div>
        )}

        {!user && (
          <div className="border-t border-border/50 p-4">
            <Link
              href="/login"
              className="block w-full text-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="bg-card border border-border/50 rounded-xl p-4">
        <nav className="space-y-1">
          <Link
            href="/#explore"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
          >
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>Explore Clubs</span>
          </Link>
          <Link
            href="/sessions"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
          >
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>Sessions</span>
          </Link>
          <Link
            href="/#explore"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
          >
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span>My Clubs</span>
          </Link>
          <Link
            href="/#feed"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
          >
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Events</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}

// Right Sidebar - News
function RightSidebar() {
  return (
    <div className="space-y-4 sticky top-20">
      {/* News Section */}
      <div className="bg-card border border-border/50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Newspaper className="h-4 w-4 text-primary" />
            Campus News
          </h3>
          <span className="text-xs text-muted-foreground">Top stories</span>
        </div>

        <div className="space-y-4">
          {NEWS.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {item.time} • {item.readers} readers
              </p>
            </div>
          ))}
        </div>

        <button className="text-sm text-muted-foreground hover:text-primary mt-4 flex items-center gap-1">
          Show more <TrendingUp className="h-3 w-3" />
        </button>
      </div>

      {/* Quick Stats */}
      <div className="bg-card border border-border/50 rounded-xl p-4">
        <h3 className="font-semibold flex items-center gap-2 mb-4">
          <BookOpen className="h-4 w-4 text-primary" />
          Quick Facts
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Active Clubs</span>
            <span className="font-semibold">{CLUBS.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Members</span>
            <span className="font-semibold">1,240+</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Events This Month</span>
            <span className="font-semibold">12</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative flex min-h-[30vh] flex-col items-center justify-center overflow-hidden px-4 pt-16 text-center bg-linear-to-b from-[#F5E7C6] to-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 flex max-w-4xl flex-col items-center gap-2"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            <span className="text-primary">Renaissance</span>
          </h1>
          <p className="max-w-xl text-base text-muted-foreground font-medium">
            The heartbeat of NIT Manipur's student life.
          </p>
        </motion.div>
      </section>

      {/* Main Content - 3 Column Layout */}
      <section id="feed" className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <LeftSidebar />
          </aside>

          {/* Center Feed */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold tracking-tight">
                Latest Updates
              </h2>
              <p className="text-muted-foreground text-sm">
                Seminars, events & announcements
              </p>
            </div>

            {POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Right Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <RightSidebar />
          </aside>
        </div>
      </section>

      {/* Explore Section */}
      <section id="explore" className="container mx-auto px-4 py-12 space-y-8">
        <div className="flex flex-col items-center text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Explore Clubs</h2>
          <p className="text-muted-foreground">
            Find the community that speaks to you
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CLUBS.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </section>
    </div>
  );
}
