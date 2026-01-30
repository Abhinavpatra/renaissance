export interface Mentor {
  name: string;
  role: string;
  phone: string; // For WhatsApp deep link
  avatar?: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  logo: string;
  heroImage: string; // For the cool card/page background
  mentors: Mentor[];
  contributions: string[]; // Image URLs for gallery
  history: string;
}

export const CLUBS: Club[] = [
  {
    id: "quibit",
    name: "Quibit",
    description:
      " The Official Coding Club of NIT Manipur. We decode, we compile, we conquer.",
    logo: "/icons/code.svg", // Placeholder
    heroImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    history:
      "Founded in 2015, Quibit has been the backbone of coding culture...",
    mentors: [
      { name: "Alice Coder", role: "President", phone: "1234567890" },
      { name: "Bob Dev", role: "Tech Lead", phone: "0987654321" },
    ],
    contributions: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070",
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031",
    ],
  },
  {
    id: "photography",
    name: "Photography Club",
    description: "Capturing moments, creating memories. The lens is our eye.",
    logo: "/icons/camera.svg",
    heroImage:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1974",
    history: "Since 2014, capturing the essence of campus life...",
    mentors: [{ name: "Charlie Lens", role: "Lead", phone: "1122334455" }],
    contributions: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000",
    ],
  },
  {
    id: "entrepreneurship",
    name: "Entrepreneurship Club",
    description: "Innovate, Pitch, Succeed. Building the leaders of tomorrow.",
    logo: "/icons/rocket.svg",
    heroImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070",
    history:
      "Starting small, dreaming big. Fostering startup culture since 2016.",
    mentors: [{ name: "Dave Founder", role: "Director", phone: "5544332211" }],
    contributions: [
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032",
    ],
  },
];

export const MOCK_CHATS = [
  {
    id: 1,
    sender: "Alice",
    message: "Hey everyone, meeting at 5?",
    time: "10:00 AM",
    clubId: "quibit",
  },
  {
    id: 2,
    sender: "Bob",
    message: "Yes, look forward to it.",
    time: "10:05 AM",
    clubId: "quibit",
  },
];
