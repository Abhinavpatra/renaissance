"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const TEAM = [
  {
    name: "Abhinav Patra",
    role: "Full Stack Developer",
    image:
      "https://ui-avatars.com/api/?name=Abhinav+Patra&background=FA8112&color=FAF3E1&size=256",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "abhinav@nitmanipur.ac.in",
  },
  {
    name: "Shivam Raj",
    role: "Full Stack Developer",
    image:
      "https://ui-avatars.com/api/?name=Shivam+Raj&background=FA8112&color=FAF3E1&size=256",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "shivam@nitmanipur.ac.in",
  },
];

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-primary">CBDE</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Created By Dedicated Engineers
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {TEAM.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="rounded-3xl bg-card border border-border/50 p-8 shadow-xl text-center"
            >
              <div className="relative h-32 w-32 mx-auto mb-6 overflow-hidden rounded-full border-4 border-primary/20 shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {member.name}
              </h2>
              <p className="text-primary font-medium mb-6">{member.role}</p>

              <div className="flex justify-center gap-4">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-muted-foreground mt-16"
        >
          Built with ❤️ for NIT Manipur
        </motion.p>
      </div>
    </div>
  );
}
