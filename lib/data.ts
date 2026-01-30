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
  department: string; // e.g., "CSE", "ECE", "All Departments"
}

export const CLUBS: Club[] = [
  {
    id: "quibit",
    name: "Quibit",
    description:
      "The Official Coding Club of NIT Manipur. We decode, we compile, we conquer.",
    logo: "/icons/code.svg",
    heroImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    history:
      "Founded in 2015, Quibit has been the backbone of coding culture at NIT Manipur. From hosting hackathons to conducting workshops on emerging technologies, we've nurtured countless developers who now work at top tech companies worldwide.",
    mentors: [
      {
        name: "Dr. Rajesh Kumar",
        role: "Faculty Advisor",
        phone: "1234567890",
      },
      { name: "Ankit Sharma", role: "President", phone: "0987654321" },
    ],
    contributions: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070",
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031",
    ],
    department: "CSE",
  },
  {
    id: "photography",
    name: "Photography Club",
    description: "Capturing moments, creating memories. The lens is our eye.",
    logo: "/icons/camera.svg",
    heroImage:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1974",
    history:
      "Since 2014, the Photography Club has been capturing the essence of campus life. Our members have won national-level competitions and our work has been featured in various publications.",
    mentors: [
      {
        name: "Prof. Meera Singh",
        role: "Faculty Coordinator",
        phone: "1122334455",
      },
    ],
    contributions: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000",
    ],
    department: "All Departments",
  },
  {
    id: "entrepreneurship",
    name: "Entrepreneurship Club",
    description: "Innovate, Pitch, Succeed. Building the leaders of tomorrow.",
    logo: "/icons/rocket.svg",
    heroImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070",
    history:
      "Starting small, dreaming big. Since 2016, we've incubated over 20 student startups and hosted pitch competitions with industry leaders.",
    mentors: [
      { name: "Dr. Vikram Patel", role: "Director", phone: "5544332211" },
    ],
    contributions: [
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032",
    ],
    department: "All Departments",
  },
  {
    id: "singing",
    name: "Singing Club",
    description: "Voice of the Soul. Harmonizing hearts through melody.",
    logo: "/icons/music.svg",
    heroImage:
      "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2070",
    history:
      "Bringing vocal talents together since 2017. Our choir has performed at state-level events and cultural festivals across the Northeast.",
    mentors: [
      { name: "Ms. Priya Devi", role: "Vocal Lead", phone: "9988776655" },
    ],
    contributions: [
      "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?q=80&w=2070",
    ],
    department: "All Departments",
  },
  {
    id: "dancing",
    name: "Dancing Club",
    description: "Rhythm in Motion. Expressing life through dance.",
    logo: "/icons/dance.svg",
    heroImage:
      "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=2070",
    history:
      "Dance your heart out! Established in 2018, we specialize in contemporary, classical, and folk dance forms of the Northeast.",
    mentors: [
      {
        name: "Mr. Rahul Ningombam",
        role: "Choreographer",
        phone: "1122998877",
      },
    ],
    contributions: [
      "https://images.unsplash.com/photo-1518834107812-cf67135de99f?q=80&w=2070",
    ],
    department: "All Departments",
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
