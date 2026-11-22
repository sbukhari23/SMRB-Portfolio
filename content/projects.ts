// Case-study content for /work/[slug]. Layout per REDESIGN_PLAN.md §2.4.
// Every fact here must trace to docs/redesign/PROFILE.md §5. Unknowns are
// TODO chips, rendered only in development and hidden in production builds.

export type ProjectSlug = "asset-management-system" | "peer-support-hub" | "educonnect";

export type MetaStrip = {
  role: string;
  timeline: string;
  stack: string[];
  status: string;
};

export type Constraint = {
  label: string;
};

export type ArchitectureLayer = {
  name: string;
  detail: string;
};

export type FeatureCard = {
  n: number;
  title: string;
  detail: string;
};

export type Project = {
  slug: ProjectSlug;
  name: string;
  summary: string;
  meta: MetaStrip;
  actions: {
    demo?: { label: string; video: string };
    code?: { label: string; href: string };
  };
  theThirtySecondVersion: {
    challenge: string;
    role: string;
  };
  constraints: Constraint[];
  architecture: ArchitectureLayer[];
  features: FeatureCard[];
  reflections: string | null; // TODO(muneeb): no reflection text supplied yet.
};

export const projects: Project[] = [
  {
    slug: "asset-management-system",
    name: "Asset Management System",
    summary:
      "An offline desktop system a plant and quarry business now runs on instead of Excel: equipment, employees, production, expenses and partner profit sharing.",
    meta: {
      role: "Co-built with Faisal Iqbal",
      timeline: "Feb 2026 to Jul 2026",
      stack: ["Electron", "React", "Node.js", "Express.js", "SQLite"],
      status: "In daily use",
    },
    actions: {
      demo: { label: "Watch demo", video: "/videos/asset-management-system.mp4" },
      code: {
        label: "View code",
        href: "https://github.com/faisaliqbalkhattak/asset-management-system",
      },
    },
    theThirtySecondVersion: {
      challenge:
        "A plant and quarry business tracked equipment, employees, production, expenses and partner profit sharing in Excel.",
      role:
        "Co-built with Faisal Iqbal. The split of work was not specified, so this is described as joint work: system design, requirements gathering and the full build.",
    },
    constraints: [
      { label: "Runs offline, on site" },
      { label: "Must replace Excel without a learning cliff" },
      { label: "Profit sharing has to stay accurate across partners" },
    ],
    architecture: [
      { name: "Electron shell", detail: "Desktop app, runs without an internet connection" },
      { name: "React", detail: "UI: Production, Equipment, Employees, Expenses, Stock valuation, Profit sharing, Reports" },
      { name: "Express.js", detail: "Layered REST API" },
      { name: "SQLite", detail: "Persistent local data storage" },
    ],
    features: [
      { n: 1, title: "Production tracking", detail: "Daily production logged per site." },
      { n: 2, title: "Expense reporting", detail: "Monthly and yearly expense reports." },
      { n: 3, title: "Stock valuation", detail: "Equipment and stock valued over time." },
      { n: 4, title: "Automated profit sharing", detail: "Partner profit-sharing workflows run automatically." },
    ],
    reflections: null,
  },
  {
    slug: "peer-support-hub",
    name: "Peer Support Hub",
    summary:
      "A habit-building and accountability platform for young men. Before building, I surveyed 104 people, mostly university students, to decide what the MVP should do.",
    meta: {
      role: "Sole creator, personal project (not continued)",
      timeline: "2024 to 2025",
      stack: ["MongoDB", "Express.js", "React", "Node.js", "Socket.IO"],
      status: "Not continued",
    },
    actions: {
      demo: { label: "Watch demo", video: "/videos/peer-support-hub.mp4" },
      code: { label: "View code", href: "https://github.com/sbukhari23/PeerSupportHub" },
    },
    theThirtySecondVersion: {
      challenge:
        "Young Pakistani men, mostly university students, struggle to build habits and often lack an accountability partner.",
      role:
        "Ran an audience research and feasibility survey (104 respondents) to define core MVP features and validate the concept, then built the initial MVP alone.",
    },
    constraints: [
      { label: "Privacy was the main condition for joining a private group" },
      { label: "Most respondents had never used a productivity tool or support group, and found existing ones felt like chores" },
      { label: "56% would only use it for free" },
    ],
    architecture: [
      { name: "React", detail: "Client" },
      { name: "Express.js", detail: "API" },
      { name: "Socket.IO", detail: "Real-time features" },
      { name: "MongoDB", detail: "Data storage" },
    ],
    features: [
      { n: 1, title: "Accountability partners", detail: "The most-requested feature from the survey." },
      { n: 2, title: "Streaks", detail: "Habit tracking with daily streaks." },
      { n: 3, title: "Private matching", detail: "Screen names and private matching, since privacy was the deal-breaker." },
    ],
    reflections: null,
  },
  {
    slug: "educonnect",
    name: "EduConnect",
    summary:
      "A final year project combining peer learning, collaborative study groups and a verified tutor marketplace. In progress.",
    meta: {
      role: "Frontend (Hassan Shahid: backend). Advised by Dr. Bilal Ali, co-advised by Naema Asif.",
      timeline: "2026 to 2027, ongoing",
      stack: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL", "Socket.IO", "WebRTC"],
      status: "In progress",
    },
    actions: {},
    theThirtySecondVersion: {
      challenge:
        "Students need peer learning, study groups and a way to find a verified tutor in one place.",
      role:
        "Muneeb builds the frontend; Hassan Shahid builds the backend. Advised by Dr. Bilal Ali, co-advised by Naema Asif.",
    },
    constraints: [
      { label: "Verification for tutors is still being designed" },
    ],
    architecture: [
      { name: "React.js + Tailwind CSS", detail: "Frontend" },
      { name: "Node.js + Express.js", detail: "Backend" },
      { name: "PostgreSQL", detail: "Data storage" },
      { name: "Socket.IO / WebRTC", detail: "Real-time communication" },
    ],
    features: [
      { n: 1, title: "Study groups", detail: "Peer learning and collaborative study groups." },
      { n: 2, title: "Tutor marketplace", detail: "Verified tutor marketplace (verification method still TBC)." },
    ],
    reflections: null,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
