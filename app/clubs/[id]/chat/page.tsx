"use client";

import { useState, useEffect, useRef } from "react";
import { CLUBS } from "@/lib/data";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

interface Message {
  id: number;
  user_email: string;
  sender_name: string;
  content: string;
  created_at: string;
}

export default function ChatPage() {
  const { id } = useParams();
  const clubId = Array.isArray(id) ? id[0] : id;

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState<{ email: string; name: string } | null>(
    null,
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  const club = CLUBS.find((c) => c.id === clubId);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // Poll for messages
  useEffect(() => {
    if (!clubId) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/chats/${clubId}`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [clubId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!club) return <div className="p-10 text-center">Club not found</div>;

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !clubId) return;

    try {
      await fetch(`/api/chats/${clubId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          sender: user.name,
          message: newMessage,
        }),
      });
      setNewMessage("");
      // Trigger immediate re-fetch
      const res = await fetch(`/api/chats/${clubId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error("Failed to send", err);
    }
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
        {messages.map((msg) => {
          const isMe = user?.email === msg.user_email;
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${isMe ? "justify-end" : "justify-start"}`}
            >
              {!isMe && (
                <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold">
                  {msg.sender_name.charAt(0)}
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                  isMe
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-muted text-muted-foreground rounded-tl-none"
                }`}
              >
                {!isMe && (
                  <p className="text-[10px] font-bold opacity-70 mb-1">
                    {msg.sender_name}
                  </p>
                )}
                <p>{msg.content}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-4 bg-background border-t border-border">
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={user ? "Type a message..." : "Sign in to chat"}
            disabled={!user}
            className="flex-1 rounded-full bg-accent/50 px-4 py-2 outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || !user}
            className="rounded-full bg-primary p-2 text-primary-foreground transition-transform hover:scale-105 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
