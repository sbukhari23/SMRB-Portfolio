// Typed mirror of docs/redesign/PROFILE.md. Do not add facts here that
// aren't in that file; add them there first, then mirror them here.

export const identity = {
  fullName: "Syed Muneeb Ur Rehman Bukhari",
  displayName: "Muneeb Ur Rehman",
  shortName: "Muneeb",
  handle: "SMRB",
  githubHandle: "sbukhari23",
  location: "Islamabad, Pakistan",
  status:
    "Final-year BS Software Engineering student at NUST SEECS, freelancing on Upwork",
  graduationYear: 2027,
  portrait: "/images/muneeb.jpeg",
} as const;

export const headline = "I design it, then I build it.";

export const bios = {
  short:
    "Full-stack MERN developer and Software Engineering student at NUST, Islamabad. I design first, then build software people actually use. Freelancing on Upwork.",
  medium:
    "I'm Muneeb, a full-stack MERN developer finishing a BS in Software Engineering at NUST SEECS. Before I wrote production code I spent years in design and content, which is why I start with the people who will use the software. With a partner, I built an offline Asset Management System that a plant and quarry business now runs on. I freelance on Upwork.",
  long:
    "Software Engineering student at NUST and web developer working across HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB and SQLite. Co-built a full-stack Asset Management System that is in active use by a client. Built Peer Support Hub, a personal project: the MVP of a habit-building and accountability platform shaped by a survey of 104 young people, mostly university students; it was not continued. Four years of experience across design, content and digital work, with a solid grip on responsive development, UI/UX, REST APIs, databases and Git. Freelancing on Upwork, where the first contract landed within 15 days of joining. Particular interest in AI, human-centered design and educational technology.",
} as const;

export const links = {
  email: "workinboxsmrb@gmail.com",
  github: "https://github.com/sbukhari23",
  linkedin: "https://www.linkedin.com/in/muneeburrehmanb/",
  upwork: "https://www.upwork.com/freelancers/~019d0bc35d72ab06a2",
  repo: "https://github.com/sbukhari23/SMRB-Portfolio",
  // TODO(muneeb): resume PDF pending, link it here once supplied.
  resume: null,
} as const;

export const availability = "Open to projects";

export const education = {
  institution: "National University of Sciences and Technology (NUST)",
  school: "School of Electrical Engineering and Computer Science (SEECS)",
  location: "H-12, Islamabad",
  degree: "Bachelor of Science in Software Engineering",
  batch: "BESE-23",
  dates: "2023 to 2027",
  coursework: [
    "Data Structures and Algorithms",
    "Object-Oriented Programming",
    "Database Systems",
    "Web Engineering",
    "Software Engineering",
    "Human Computer Interaction",
    "Entrepreneurship",
    "Introduction to Management",
    "Virtual and Augmented Reality (CS-365, Fall 2026)",
  ],
} as const;

export type Certification = {
  course: string;
  issuer: string;
  credentialUrl: string;
};

export const certifications: Certification[] = [
  {
    course: "React: The Complete Guide (incl. Next.js, Redux)",
    issuer: "Academind by Maximilian Schwarzmuller, Udemy",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-472061f6-571b-4e29-8d03-1309f24da789/",
  },
  {
    course: "HTML, CSS, and JavaScript for Web Developers",
    issuer: "Johns Hopkins University, Coursera",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/03LU769JBI8W",
  },
  {
    course: "Google AI (Professional Certificate)",
    issuer: "Google, Coursera",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/58A2S3NFFVEJ",
  },
  {
    course: "AI for Everyone",
    issuer: "DeepLearning.AI, Coursera",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/CQDY4NO7S9P7",
  },
];

export type Book = {
  title: string;
  author: string;
  note: string;
  cover: string;
};

export const books: Book[] = [
  {
    title: "Hooked: How to Build Habit-Forming Products",
    author: "Nir Eyal",
    note: "Behavioral design, engagement, behavior change.",
    cover: "/images/hooked.jpg",
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    note: "Experimentation, validation, iterative product development.",
    cover: "/images/the-lean-startup.jpg",
  },
  {
    title: "A Little History of the World",
    author: "E.H. Gombrich",
    note: "How societies and institutions evolve, relevant to cultural heritage and memory-focused digital projects.",
    cover: "/images/a-little-history-of-the-world.jpg",
  },
];

export const researchInterests = [
  "UI/UX design",
  "human-centered AI",
  "educational technology",
  "behavioral change",
  "AI-assisted learning",
  "personalized systems",
  "digital wellbeing",
  "interactive systems",
  "responsible AI",
] as const;

export const skills = {
  development: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "SQLite",
    "MySQL",
    "Socket.IO",
    "Electron",
    "REST APIs",
    "Git / GitHub",
    "responsive development",
    "C++",
    "Java",
    "Python (PyTorch for coursework)",
    "Unity (XR Interaction Toolkit) from coursework",
  ],
  uxAndProduct: [
    "UI/UX design principles",
    "user research",
    "human-centered design",
    "behavioral design",
    "prototyping",
  ],
  designAndContent: [
    "Graphic design (Photoshop, Illustrator, Canva)",
    "content writing",
    "social media design",
  ],
  languages: [
    "English (proficient)",
    "Urdu (native)",
    "Arabic (beginner)",
  ],
} as const;

export type ExperienceEntry = {
  role: string;
  org: string;
  dates: string;
  note: string;
};

export const developmentExperience: ExperienceEntry[] = [
  {
    role: "Web Development Freelancer",
    org: "Upwork (remote)",
    dates: "Ongoing",
    note: "First contract within 15 days of launching the account. Stats (jobs, rating, JSS): none to show yet.",
  },
];

// Shown as one compact "Pixels before code" chapter.
export const designExperience: ExperienceEntry[] = [
  {
    role: "Graphic Designer",
    org: "Book Cover Hub (remote)",
    dates: "Mar 2025 to Feb 2026",
    note: "Designed 300+ brand-aligned visuals for monthly articles, matching each to the article's tone and topic.",
  },
  {
    role: "Marketing Intern",
    org: "Bayyinah Institute (remote)",
    dates: "Summer 2025 (from Jul 2025)",
    note: "Brand strategy, content writing and visual design for Quran-centered campaigns, including platform-specific copy and content calendars. Ended.",
  },
  {
    role: "Summer Intern",
    org: "Alkhidmat Foundation Pakistan (remote)",
    dates: "Summer 2025",
    note: "Social media campaigns and influencer outreach for Youth Digital Summit 2025, researched impact across healthcare, education and disaster relief.",
  },
  {
    role: "Marketing Executive",
    org: "NUST Character Building Society (now NUST Social Values Society), Islamabad",
    dates: "Dec 2024 to Jun 2025",
    note: "Event promotions and motivational campaigns for a university-wide audience, coordinated with administration, security and sponsorship teams.",
  },
  {
    role: "Newsletter Lead",
    org: "Ibn e Aadam (remote)",
    dates: "Nov 2024 to Feb 2025",
    note: "Researched, wrote and published 22 editions of a weekly email newsletter on character building, emotional wellbeing and reflective writing.",
  },
];

export const leadershipExperience: ExperienceEntry[] = [
  {
    role: "Marketing Director (with a co-director)",
    org: "Google Developer Groups on Campus NUST (write 'GDG on Campus NUST')",
    dates: "Oct 2026 to present",
    note: "Leads Marketing executive recruitment: screening applicants and designing the interview and selection process.",
  },
];

export const achievements = [
  {
    name: "S3C Student Journey Design Contest, NUST",
    note: "Led a team of 4 to win the Student Support Services Centre contest, 2026.",
  },
] as const;

// Section 13 of PROFILE.md: numbers that are safe to show. Never add
// others (users, revenue, ratings, years of coding) without a PROFILE.md
// update from Muneeb.
export const numbers = {
  surveyRespondents: 104,
  earlyAccessRequests: "30+",
  brandVisuals: "300+",
  newsletterEditions: 22,
  daysToFirstContract: 15,
  contestTeamSize: 4,
  clientSystemsInDailyUse: 1,
} as const;
