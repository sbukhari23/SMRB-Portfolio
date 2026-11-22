import { education } from "./profile";

// The 11 home-page chapters. Copy from REDESIGN_PLAN.md §2.3, board/camera
// coordinates from ANIMATION_SPEC.md §2.2 and the matching desktop mockups
// in docs/redesign/mockups/. Frames without a literal size chip in their
// mockup (03, 07, 09, 10, 11) use the mockup's real card width with an
// estimated height; Phase 4 should re-check those against the mockups
// once Board.tsx is laying frames out for real.

// "ink" = dark filled pill (the case-study / primary CTA look used across
// chapters), "outline" = bordered pill, "link" = plain text link, "video"
// = outline pill that opens VideoDialog instead of navigating.
export type ChapterAction = {
  label: string;
  href?: string;
  variant: "ink" | "outline" | "link" | "video";
};

export type Sticky = {
  text: string;
  layer: "front" | "back"; // back = blurred, decorative
};

export type Stat = {
  value: string;
  label: string;
};

export type FrameCard = {
  heading: string;
  subheading?: string;
  tags?: string[];
  status?: string;
  note?: string;
};

export type Frame = {
  type: "code" | "image" | "card" | "grid" | "overview" | "none";
  label: string;
  /** Board-space rect: frame centre sits on the chapter's camera focus point. */
  rect: { w: number; h: number } | null;
  code?: string[];
  card?: FrameCard;
  /** For type: "grid" once real visuals exist (public/images/<name>.webp paths). */
  images?: string[];
  todo?: string;
};

export type Chapter = {
  id: string;
  n: number;
  eyebrow: string;
  /** Short subtitle used in ChapterMenu / ChapterCounter, from Overlay-ChapterMenu.html. */
  menuLabel: string;
  /**
   * Short chapter name shown in ChapterMenu and the bottom-left counter.
   * Equal to `title` for most chapters; chapters 01 and 11 use a shorter
   * name there than their on-page heading (Overlay-ChapterMenu.html).
   */
  shortTitle: string;
  title: string;
  body: string;
  pullLine?: string;
  stats?: Stat[];
  actions: ChapterAction[];
  frame: Frame;
  stickies: Sticky[];
  /** cx: fraction of viewport width the focus point maps to (ANIMATION_SPEC.md §2.2). Defaults to 0.62. */
  camera: { x: number; y: number; scale: number; cx?: number };
};

export const chapters: Chapter[] = [
  {
    id: "where-it-starts",
    n: 1,
    eyebrow: "2023 to now · Islamabad",
    menuLabel: "Intro",
    shortTitle: "Where it starts",
    title: "I design it, then I build it.",
    body:
      "Full-stack MERN developer and Software Engineering student at NUST. Four years of design and content work taught me to start with people. Code is how it ships.",
    pullLine:
      "BS Software Engineering, NUST SEECS · Class of 2027 / Freelancing on Upwork · first contract within 15 days",
    stats: [
      { value: "104", label: "survey responses that shaped Peer Support Hub" },
      { value: "300+", label: "brand visuals designed at Book Cover Hub" },
      { value: "1", label: "client system in daily use, built with a partner" },
    ],
    actions: [],
    frame: {
      type: "code",
      label: "# Muneeb.tsx",
      rect: { w: 600, h: 370 },
      code: [
        "// 2023 to 2027 · BS Software Engineering",
        "// NUST SEECS, Islamabad",
        "",
        "export function Muneeb() {",
        "  return (",
        '    <Developer stack="MERN" designsFirst>',
        "      Start with people. Ship with code.",
        "    </Developer>",
        "  )",
        "}",
      ],
    },
    stickies: [
      { text: "who actually uses this?", layer: "front" },
      { text: "empty state?", layer: "front" },
      { text: "works offline?", layer: "front" },
      { text: "try again?", layer: "back" },
    ],
    camera: { x: 700, y: 600, scale: 1.0 },
  },
  {
    id: "pixels-before-code",
    n: 2,
    eyebrow: "Before code · Remote and on campus",
    menuLabel: "Design and content work",
    shortTitle: "Pixels before code",
    title: "Pixels before code",
    body:
      "Before I wrote production code, I designed and wrote for real audiences: 300+ brand visuals for Book Cover Hub, 22 weekly newsletter editions for Ibn e Aadam, and campaigns for Bayyinah Institute, Alkhidmat Foundation and NUST Character Building Society.",
    pullLine: "Photoshop, Illustrator, Canva · content writing · social media design",
    actions: [],
    frame: {
      type: "grid",
      label: "# work-samples/",
      rect: { w: 380, h: 380 },
      images: Array.from({ length: 9 }, (_, i) => `/images/work-samples/${i + 1}.webp`),
    },
    stickies: [],
    camera: { x: 1800, y: 550, scale: 0.9 },
  },
  {
    id: "engineering-properly",
    n: 3,
    eyebrow: "2023 to 2027 · NUST SEECS, H-12 Islamabad",
    menuLabel: "NUST SEECS, certifications",
    shortTitle: "Engineering, properly",
    title: "Engineering, properly",
    body:
      "BS Software Engineering at NUST's School of Electrical Engineering and Computer Science, from data structures to human-computer interaction.",
    pullLine:
      "Interests: human-centered AI, educational technology, behavioral change, digital wellbeing, responsible AI",
    actions: [],
    frame: {
      type: "code",
      label: "# coursework.ts",
      rect: { w: 560, h: 360 },
      code: [
        "// NUST SEECS · BS Software Engineering",
        "export const coursework = [",
        ...education.coursework.map((course) => `  "${course}",`),
        "]",
      ],
    },
    stickies: [],
    camera: { x: 2900, y: 650, scale: 0.95 },
  },
  {
    id: "built-for-a-quarry",
    n: 4,
    eyebrow: "Feb to Jul 2026 · Client project",
    menuLabel: "Asset Management System",
    shortTitle: "Built for a quarry",
    title: "Built for a quarry",
    body:
      "An offline desktop system a plant and quarry business now runs on instead of Excel: equipment, employees, production, expenses and partner profit sharing. Co-built with Faisal Iqbal.",
    pullLine:
      "Production tracking, monthly and yearly expense reports, stock valuation and automated profit sharing on a layered REST architecture.",
    actions: [
      { label: "Read the case study", href: "/work/asset-management-system", variant: "ink" },
      { label: "Watch demo", variant: "video" },
      {
        label: "View code",
        href: "https://github.com/faisaliqbalkhattak/asset-management-system",
        variant: "link",
      },
    ],
    frame: {
      type: "image",
      label: "# AssetManagementSystem · desktop · in daily use",
      rect: { w: 670, h: 420 },
      code: [
        "<AssetManagementSystem",
        '  runs="offline, on site"',
        '  stack={["Electron", "React", "Express", "SQLite"]}',
        '  status="in daily use"',
        "/>",
      ],
    },
    stickies: [
      { text: "who gets which share?", layer: "front" },
      { text: "month-end report?", layer: "front" },
      { text: "no internet on site?", layer: "back" },
    ],
    camera: { x: 4000, y: 600, scale: 0.85 },
  },
  {
    id: "habits-together",
    n: 5,
    eyebrow: "2024 to 2025 · Personal project · Not continued",
    menuLabel: "Peer Support Hub",
    shortTitle: "Habits, together",
    title: "Habits, together",
    body:
      "A habit-building and accountability platform for young men. Before building, I surveyed 104 people, mostly university students, to decide what the MVP should do, then built it on the MERN stack with real-time features over Socket.IO.",
    pullLine:
      "85% struggled to build habits. The top ask was an accountability partner, and privacy was the deal-breaker.",
    actions: [
      { label: "Read the case study", href: "/work/peer-support-hub", variant: "ink" },
      { label: "Watch demo", variant: "video" },
      { label: "View code", href: "https://github.com/sbukhari23/PeerSupportHub", variant: "link" },
    ],
    frame: {
      type: "image",
      label: "# PeerSupportHub.jsx",
      rect: { w: 600, h: 340 },
    },
    stickies: [
      { text: "what keeps a streak alive?", layer: "front" },
      { text: "who holds me accountable?", layer: "front" },
      { text: "30+ asked for early access", layer: "front" },
    ],
    camera: { x: 4000, y: 1800, scale: 0.9 },
  },
  {
    id: "learning-connected",
    n: 6,
    eyebrow: "2026 to 2027 · Final year project · In progress",
    menuLabel: "EduConnect, final year project",
    shortTitle: "Learning, connected",
    title: "Learning, connected",
    body:
      "My final year project at NUST SEECS with Hassan Shahid: peer learning, study groups and a verified tutor marketplace. I build the frontend, Hassan builds the backend. Advised by Dr. Bilal Ali, co-advised by Naema Asif.",
    pullLine: "Planned stack: React, Tailwind, Node, Express, PostgreSQL, Socket.IO, WebRTC.",
    actions: [{ label: "Read the case study", href: "/work/educonnect", variant: "ink" }],
    frame: {
      type: "card",
      label: "# EduConnect · work in progress",
      rect: { w: 600, h: 400 },
      todo: "wireframe screens once there are any to show",
    },
    stickies: [
      { text: "verified how?", layer: "front" },
      { text: "study room or chat?", layer: "front" },
    ],
    camera: { x: 2900, y: 1750, scale: 0.85 },
  },
  {
    id: "freelance-shipped",
    n: 7,
    eyebrow: "Ongoing · Remote",
    menuLabel: "Upwork",
    shortTitle: "Freelance, shipped",
    title: "Freelance, shipped",
    body: "I freelance as a web developer on Upwork. The first contract came within 15 days of opening the account.",
    actions: [
      {
        label: "View Upwork profile",
        href: "https://www.upwork.com/freelancers/~019d0bc35d72ab06a2",
        variant: "ink",
      },
    ],
    frame: {
      type: "card",
      label: "# upwork.profile",
      rect: { w: 520, h: 260 },
      card: {
        heading: "Syed Muneeb Ur Rehman Bukhari",
        subheading: "Full-stack MERN developer · Islamabad, Pakistan",
        tags: ["React", "Node.js", "Express", "MongoDB", "Electron", "UI/UX"],
        status: "Open to projects",
      },
    },
    stickies: [],
    camera: { x: 1800, y: 1850, scale: 1.0 },
  },
  {
    id: "worlds-in-unity",
    n: 8,
    eyebrow: "Fall 2026 · CS-365 Virtual and Augmented Reality",
    menuLabel: "VR and AR labs",
    shortTitle: "Worlds in Unity",
    title: "Worlds in Unity",
    body:
      "Course labs in Unity: a terrain build of Faisal Masjid, physics and prefabs, and a VR scene set up with the XR Interaction Toolkit.",
    actions: [],
    frame: {
      type: "image",
      label: "# FaisalMasjid.unity",
      rect: { w: 700, h: 394 },
      images: ["/images/worlds-in-unity.webp"],
    },
    stickies: [],
    camera: { x: 700, y: 1800, scale: 0.8 },
  },
  {
    id: "leading-together",
    n: 9,
    eyebrow: "GDG NUST · S3C · NCBS",
    menuLabel: "GDG on Campus NUST, S3C",
    shortTitle: "Leading, together",
    title: "Leading, together",
    body:
      "Marketing Director at GDG on Campus NUST, running executive recruitment with my co-director. I also led a team of four to win the 2026 S3C Student Journey Design Contest at NUST.",
    pullLine: "Before that: Marketing Executive at NUST Character Building Society, Dec 2024 to Jun 2025.",
    actions: [],
    frame: {
      type: "card",
      label: "# team.md",
      rect: { w: 640, h: 230 },
      card: {
        heading: "Marketing Director",
        subheading: "GDG on Campus NUST · with a co-director",
        tags: ["Applications", "Screening", "Interviews", "Selection"],
        note: "I designed the screening, interview and selection process for Marketing executives.",
      },
    },
    stickies: [{ text: "what does a great executive look like?", layer: "front" }],
    camera: { x: 700, y: 2900, scale: 0.95 },
  },
  {
    id: "the-whole-picture",
    n: 10,
    eyebrow: "Zoomed out",
    menuLabel: "Zoomed-out board",
    shortTitle: "The whole picture",
    title: "The whole picture",
    body: "Design and words first, then engineering, then software people rely on. Click any frame to jump to its chapter.",
    actions: [
      { label: "Show all chapters", variant: "outline" },
      { label: "Skip to contact", href: "#lets-build", variant: "link" },
    ],
    frame: {
      type: "overview",
      label: "# the-whole-picture",
      rect: null,
    },
    stickies: [],
    camera: { x: 3000, y: 1800, scale: 0.38, cx: 0.5 },
  },
  {
    id: "lets-build",
    n: 11,
    eyebrow: "Islamabad, Pakistan · Open to projects",
    menuLabel: "Contact",
    shortTitle: "Let's build",
    title: "Let's build something people use.",
    body: "",
    actions: [],
    frame: {
      type: "none",
      label: "",
      rect: null,
    },
    stickies: [],
    camera: { x: 2300, y: 3000, scale: 1.0 },
  },
];

export const footerLine = "Designed and built by Muneeb Ur Rehman · 2026.";
