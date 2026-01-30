"use client";

import { useState, useEffect, useRef } from "react";
import { MOCK_CHATS, CLUBS } from "@/lib/data";
import { Send, User } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function ChatPage() {
  const { id } = useParams();
  const clubId = Array.isArray(id) ? id[0] : id; // Handle potential array from catch-all but here it's [id]
  const [messages, setMessages] = useState(
    MOCK_CHATS.filter((c) => c.clubId === clubId),
  );
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Find club name for header
  const club = CLUBS.find((c) => c.id === clubId);

  useEffect(() => {
    // Scroll to bottom on load/message
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!club) return <div className="p-10 text-center">Club not found</div>;

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: Date.now(),
      sender: "Me",
      message: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      clubId: clubId,
    };

    setMessages([...messages, msg]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-background">
      {/* Header */}
      <div className="border-b border-border p-4 bg-card/50 backdrop-blur sticky top-0 z-10">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          {club.name} Group Chat
        </h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-10">
            No messages yet. Be the first to say hi!
          </div>
        )}
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.sender === "Me" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender !== "Me" && (
              <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-xs">
                {msg.sender.charAt(0)}
              </div>
            )}
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                msg.sender === "Me"
                  ? "bg-primary text-primary-foreground rounded-tr-none"
                  : "bg-muted text-muted-foreground rounded-tl-none"
              }`}
            >
              {msg.sender !== "Me" && (
                <p className="text-[10px] font-bold opacity-70 mb-1">
                  {msg.sender}
                </p>
              )}
              <p>{msg.message}</p>
              <p className="text-[10px] opacity-70 text-right mt-1">
                {msg.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-background border-t border-border">
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-accent/50 px-4 py-2 outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="rounded-full bg-primary p-2 text-primary-foreground transition-transform hover:scale-105 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
