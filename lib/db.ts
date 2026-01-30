// In-memory storage for demo purposes (no external DB dependency)
// This avoids the bun:sqlite issue when running with npm

interface User {
  email: string;
  name: string;
}

interface Membership {
  email: string;
  clubId: string;
}

interface Message {
  id: number;
  clubId: string;
  email: string;
  name: string;
  content: string;
  timestamp: string;
}

// In-memory stores
const users: Map<string, User> = new Map();
const memberships: Membership[] = [];
const messages: Message[] = [];
let messageIdCounter = 1;

export const db = {
  // User operations
  upsertUser: (email: string, name: string) => {
    users.set(email, { email, name });
  },

  getUser: (email: string): User | undefined => {
    return users.get(email);
  },

  // Membership operations
  getMemberships: (email: string): Membership[] => {
    return memberships.filter((m) => m.email === email);
  },

  isMember: (email: string, clubId: string): boolean => {
    return memberships.some((m) => m.email === email && m.clubId === clubId);
  },

  joinClub: (email: string, clubId: string) => {
    if (!db.isMember(email, clubId)) {
      memberships.push({ email, clubId });
    }
  },

  leaveClub: (email: string, clubId: string) => {
    const index = memberships.findIndex(
      (m) => m.email === email && m.clubId === clubId,
    );
    if (index !== -1) {
      memberships.splice(index, 1);
    }
  },

  // Message operations
  getMessages: (clubId: string): Message[] => {
    return messages.filter((m) => m.clubId === clubId);
  },

  addMessage: (
    clubId: string,
    email: string,
    name: string,
    content: string,
  ): Message => {
    const message: Message = {
      id: messageIdCounter++,
      clubId,
      email,
      name,
      content,
      timestamp: new Date().toISOString(),
    };
    messages.push(message);
    return message;
  },
};
