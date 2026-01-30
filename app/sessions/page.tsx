"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Users, Video, ExternalLink } from "lucide-react";
import Link from "next/link";

// Sessions/Tutorials data
const SESSIONS = [
  {
    id: 1,
    title: "Introduction to Python Programming",
    club: "Quibit",
    department: "CSE",
    instructor: "Ankit Sharma",
    date: "Feb 5, 2026",
    time: "4:00 PM - 6:00 PM",
    venue: "LHC-101",
    attendees: 120,
    description:
      "Learn Python from scratch. This beginner-friendly session covers variables, data types, loops, functions, and more.",
    tags: ["Python", "Beginner", "Programming"],
  },
  {
    id: 2,
    title: "Git & GitHub for Beginners",
    club: "Quibit",
    department: "CSE",
    instructor: "Rahul Kumar",
    date: "Feb 8, 2026",
    time: "3:00 PM - 5:00 PM",
    venue: "LHC-201",
    attendees: 85,
    description:
      "Master version control with Git. Learn branching, merging, pull requests, and collaborative development workflows.",
    tags: ["Git", "GitHub", "Version Control"],
  },
  {
    id: 3,
    title: "Web Development with React",
    club: "Quibit",
    department: "CSE",
    instructor: "Priya Devi",
    date: "Feb 12, 2026",
    time: "4:00 PM - 7:00 PM",
    venue: "CC Lab-1",
    attendees: 95,
    description:
      "Build modern web applications with React.js. Covers components, hooks, state management, and API integration.",
    tags: ["React", "JavaScript", "Web Dev"],
  },
  {
    id: 4,
    title: "Power Electronics Fundamentals",
    club: "EE Society",
    department: "EE",
    instructor: "Prof. Manas Biswas",
    date: "Feb 15, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "EE Lab-3",
    attendees: 60,
    description:
      "Hands-on workshop on inverters, converters, and renewable energy systems. Bring your own calculators!",
    tags: ["Electronics", "Power Systems", "Hardware"],
  },
  {
    id: 5,
    title: "Machine Learning Basics",
    club: "Quibit",
    department: "CSE",
    instructor: "Dr. Rajesh Kumar",
    date: "Feb 18, 2026",
    time: "4:00 PM - 6:30 PM",
    venue: "LHC-301",
    attendees: 110,
    description:
      "Introduction to ML algorithms, supervised vs unsupervised learning, and building your first model with scikit-learn.",
    tags: ["ML", "AI", "Data Science"],
  },
  {
    id: 6,
    title: "Photography Masterclass",
    club: "Photography Club",
    department: "All Departments",
    instructor: "Vikram Singh",
    date: "Feb 20, 2026",
    time: "10:00 AM - 1:00 PM",
    venue: "Open Air Theatre",
    attendees: 45,
    description:
      "Learn composition, lighting, and post-processing. Outdoor practical session included. Bring your cameras!",
    tags: ["Photography", "Creative", "Art"],
  },
];

export default function SessionsPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            <span className="text-primary">Sessions</span> & Workshops
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enhance your skills with tutorials and workshops conducted by clubs
            across NIT Manipur.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {["All", "CSE", "EE", "Programming", "Web Dev", "Creative"].map(
            (filter) => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === "All"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:bg-muted"
                }`}
              >
                {filter}
              </button>
            ),
          )}
        </div>

        {/* Sessions Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SESSIONS.map((session, idx) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6 space-y-4">
                {/* Club Badge */}
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {session.club}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {session.department}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground">
                  {session.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {session.description}
                </p>

                {/* Meta Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{session.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{session.attendees} registered</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {session.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Instructor */}
                <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                      {session.instructor.charAt(0)}
                    </div>
                    <span className="text-sm font-medium">
                      {session.instructor}
                    </span>
                  </div>
                  <button className="text-primary text-sm font-semibold hover:underline">
                    Register →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Want to conduct a session for your club?
          </p>
          <Link
            href="/#explore"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Video className="h-4 w-4" />
            Submit a Proposal
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
