// Single source of truth for all portfolio content.
// Edit this file to update text, links, projects and experience.

import { asset } from "./site";

export const profile = {
  name: "Priyank Shah",
  shortName: "Priyank",
  heroTitle: ["PRODUCT", "DESIGNER"],
  heroTag: "/PRODUCT DESIGN & DESIGN ENGINEERING",
  role: ["Product Designer", "& Design Engineer."],
  location: "Toronto, Canada",
  year: 2026, // shown as ©2026 in the hero and footer
  photo: asset("/images/Me.jpg"),
  current: {
    company: "Walmart",
    role: "UI/UX Designer & Frontend Developer",
    since: "February 2025",
  },
  email: "priyankshah0101@gmail.com",
  resume: asset("/Priyank_Shah_Resume_2026.pdf"),
  availability:
    "Open to senior product design roles: full-time, contract or remote. My inbox is open.",
};

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shah-priyank/", icon: "linkedin" },
  { label: "Behance", href: "https://www.behance.net/priyankshah0101", icon: "behance" },
  { label: "Dribbble", href: "https://dribbble.com/Priyank7", icon: "dribbble" },
  { label: "Resume", href: asset("/Priyank_Shah_Resume_2026.pdf"), icon: "resume" },
] as const;

export type SkillGroup = {
  title: string;
  subtitle: string;
  items: { name: string }[]; // every 4th item (1st, 5th, 9th) is shown filled
};

export const skills: SkillGroup[] = [
  {
    title: "Product & Interface Design",
    subtitle: "Interfaces, Prototypes & Design Systems",
    items: [
      { name: "Product Design" },
      { name: "Figma" },
      { name: "Adobe XD" },
      { name: "Prototyping" },
      { name: "Design Systems" },
      { name: "Interaction Design" },
      { name: "Commerce UX" },
      { name: "Healthcare UX" },
    ],
  },
  {
    title: "Research & Accessibility",
    subtitle: "Interviews, Usability Testing, Inclusive Design",
    items: [
      { name: "UX Research" },
      { name: "User Interviews" },
      { name: "Personas" },
      { name: "Journey Mapping" },
      { name: "Usability Testing" },
      { name: "Accessibility" },
    ],
  },
  {
    title: "Frontend & Handoff",
    subtitle: "Production React, Design QA, Developer Handoff",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "JavaScript" },
      { name: "HTML/CSS" },
      { name: "Tailwind CSS" },
      { name: "Bootstrap" },
      { name: "WordPress" },
      { name: "Design QA" },
    ],
  },
];

/* Featured Projects
 * Each entry is one folder in the grid. Clicking it opens the details panel.
 * kind "case-study" → overview + facts + narrative layout (no screenshot needed)
 * kind "project"    → screenshot on the left, details on the right
 */
type ProjectBase = {
  id: string;
  title: string;
  category: string; // under the folder and under the title in the panel
};

export type CaseStudy = ProjectBase & {
  kind: "case-study";
  professional?: boolean; // work for an employer: panel reads "Professional case study"
  preview: { eyebrow: string; headline: [string, string]; footnote: string }; // paper in the folder
  summary: string;
  facts: { label: string; value: string }[];
  note: string;
  challenge: string;
  approach: { title: string; body: string }[];
  impact: string;
  stats?: { label: string; value: string }[]; // shown as a before → after style pair
};

export type Project = CaseStudy;

export const projects: Project[] = [
  {
    id: "walmart",
    kind: "case-study",
    title: "Walmart",
    professional: true,
    category: "Commerce UX · Case study",
    preview: { eyebrow: "Walmart", headline: ["From listing", "to checkout."], footnote: "Commerce UX case study" },
    summary:
      "Redesigning the commerce journey, from product listing to checkout, then building it as responsive React components.",
    facts: [
      { label: "Role", value: "UI/UX Designer & Frontend Developer" },
      { label: "Period", value: "February 2025 – Present" },
      { label: "Scope", value: "Listing, cart, checkout, account" },
      { label: "Stack", value: "Figma · React · Design system" },
    ],
    note: "A summary of my work at Walmart. The full case study is in progress.",
    challenge:
      "Product listing, cart, checkout and account flows across a multi-category e-commerce platform needed to feel like one product, in Figma and in production code.",
    approach: [
      {
        title: "Redesign the flows",
        body: "Took listing, cart, checkout and account from wireframes through to high-fidelity designs.",
      },
      {
        title: "Build one design system",
        body: "Created the shared design system that keeps every screen consistent, in Figma and as reusable React components.",
      },
      {
        title: "Implement in React",
        body: "Built the designs as responsive React components, so the system in the file is the system in production.",
      },
      {
        title: "Close the gaps",
        body: "Reviewed builds against the design with backend and QA teams and fixed the differences together.",
      },
    ],
    impact: "One consistent commerce experience, designed and shipped from the same source of truth.",
    stats: [
      { label: "Screens in one system", value: "40+" },
      { label: "Core flows redesigned", value: "4" },
    ],
  },
  {
    id: "alayacare",
    kind: "case-study",
    title: "AlayaCare",
    professional: true,
    category: "Healthcare UX · Case study",
    preview: {
      eyebrow: "AlayaCare",
      headline: ["Booking that", "works for everyone."],
      footnote: "Healthcare UX case study",
    },
    summary:
      "Making doctor search and appointment booking work for patients and clinic staff, including elderly and first-time users.",
    facts: [
      { label: "Role", value: "UI/UX Designer" },
      { label: "Period", value: "December 2023 – February 2025" },
      { label: "Scope", value: "Doctor search & booking" },
      { label: "Methods", value: "Interviews · Testing · Accessibility" },
    ],
    note: "A summary of my work at AlayaCare. The full case study is in progress.",
    challenge:
      "Booking an appointment had to be simple for patients of every age and efficient for the clinic staff managing it.",
    approach: [
      {
        title: "Research first",
        body: "User interviews, personas and journey maps before any screens.",
      },
      {
        title: "Design the booking flows",
        body: "Redesigned doctor search and appointment booking for patients and clinic staff.",
      },
      {
        title: "Test and iterate",
        body: "Iterated the booking flows on usability-testing feedback.",
      },
      {
        title: "Design for access",
        body: "Readable type, strong contrast, simple patterns and custom icons for elderly and first-time users, then handed off to developers.",
      },
    ],
    impact: "A booking experience grounded in research and shaped by what real users did in testing.",
  },
  {
    id: "freelanceflow",
    kind: "case-study",
    title: "FreelanceFlow",
    category: "Two-sided marketplace",
    preview: { eyebrow: "FreelanceFlow", headline: ["Hire to pay,", "in one place."], footnote: "Marketplace case study" },
    summary:
      "A two-sided freelance marketplace covering the full hire-to-pay loop, from posting a job to secure payment, designed and built end to end.",
    facts: [
      { label: "Role", value: "Product Designer & Developer" },
      { label: "Type", value: "Self-initiated project" },
      { label: "Scope", value: "Research, IA, flows, React build" },
      { label: "Stack", value: "Figma · React · Tailwind · Node.js" },
    ],
    note: "A self-initiated project, researched, designed and built end to end.",
    challenge:
      "Freelancers and clients juggle trust, scattered communication, late payments and poor visibility across separate tools.",
    approach: [
      {
        title: "Frame the problem",
        body: "Defined four pain points (trust, scattered communication, late payments and poor visibility) and three role-based personas.",
      },
      {
        title: "Scope the MVP",
        body: "Prioritised a 10-feature MVP with MoSCoW and user stories.",
      },
      {
        title: "Design and build",
        body: "Designed role-aware IA and four end-to-end flows, then built them in React.",
      },
      {
        title: "Test with users",
        body: "Tested with 5 participants and turned all 9 findings into design changes.",
      },
    ],
    impact: "A marketplace people could use without help, scoring above the industry usability average.",
    stats: [
      { label: "Task success", value: "84%" },
      { label: "SUS score", value: "76" },
    ],
  },
  {
    id: "giftelle",
    kind: "case-study",
    title: "Giftelle",
    category: "Guided gift discovery",
    preview: { eyebrow: "Giftelle", headline: ["The right gift,", "with less doubt."], footnote: "Product design case study" },
    summary:
      "A personalized gifting app that reduces decision fatigue through a guided Gift Finder, backed by a vendor portal and an admin console.",
    facts: [
      { label: "Role", value: "UX Strategist & UI Designer" },
      { label: "Type", value: "Self-initiated project" },
      { label: "Scope", value: "Shopper app, vendor portal, admin" },
      { label: "Stack", value: "Figma · React · Tailwind · Node.js" },
    ],
    note: "A self-initiated project covering all three sides of the marketplace.",
    challenge:
      "Choosing a gift is stressful: too many options and too little confidence that the choice is right.",
    approach: [
      {
        title: "Research",
        body: "50+ survey responses and 10 interviews, synthesised into two personas, a journey map and five design principles.",
      },
      {
        title: "Design the Gift Finder",
        body: "A short guided quiz that narrows choices to a confident shortlist.",
      },
      {
        title: "Test the prototype",
        body: "Met every target: 90% task success, a 72-second average quiz and a SUS score of 79.",
      },
      {
        title: "Design every side",
        body: "Vendor task success rose from 65% to 85%, admin from 75% to 94%.",
      },
    ],
    impact: "Shoppers finished with far more confidence in what they picked.",
    stats: [
      { label: "Confidence before", value: "2.8/5" },
      { label: "Confidence after", value: "4.3/5" },
    ],
  },
  {
    id: "basics",
    kind: "case-study",
    title: "BASICS",
    category: "Mobile commerce app",
    preview: { eyebrow: "BASICS", headline: ["Essentials,", "made simple."], footnote: "Mobile UX case study" },
    summary:
      "A mobile shopping app for an essentials-first clothing brand: 55 screens, a token-based design system and usability testing that fixed checkout.",
    facts: [
      { label: "Role", value: "Product Designer" },
      { label: "Type", value: "Self-initiated project" },
      { label: "Scope", value: "55 screens, design system" },
      { label: "Tools", value: "Figma · Variables · Testing" },
    ],
    note: "A self-initiated project, from research to a tested, token-based design system.",
    challenge:
      "Shopping for basics should be quick, but checkout friction and unclear states made people drop off.",
    approach: [
      {
        title: "Design the full loop",
        body: "55 high-fidelity screens covering the full purchase loop, from sign-up to orders and returns.",
      },
      {
        title: "Test with shoppers",
        body: "Tested with 6 shoppers and turned 10 findings into design changes, from a coupon row at checkout to an accessible grey.",
      },
      {
        title: "Build the system",
        body: "Light and dark token modes, then loading, offline, out-of-stock and payment-failed states.",
      },
    ],
    impact: "A checkout people completed, on a system ready for both themes and every edge case.",
    stats: [
      { label: "Task success", value: "87%" },
      { label: "SUS score", value: "74" },
    ],
  },
  {
    id: "lego",
    kind: "case-study",
    title: "LEGO Step Finder",
    category: "Interaction design",
    preview: { eyebrow: "LEGO Step Finder", headline: ["Ouch,", "but make it fun."], footnote: "Interaction design case study" },
    summary:
      "A micro-interaction-driven web app that turns the familiar pain of stepping on LEGO into a humorous, highly engaging interaction.",
    facts: [
      { label: "Role", value: "Designer & Frontend Developer" },
      { label: "Type", value: "Solo concept" },
      { label: "Scope", value: "Interaction, UX writing, build" },
      { label: "Stack", value: "Figma · HTML · CSS · JS · Lottie" },
    ],
    note: "A solo concept, from idea and design to the frontend build.",
    challenge: "Turn a tiny, universally painful moment into something people actually want to play with.",
    approach: [
      {
        title: "Play with interaction",
        body: "Used playful interaction design and microcopy to create a memorable, high-engagement experience.",
      },
      {
        title: "Motion and tone",
        body: "Showed how motion, feedback and tone of voice can strengthen a simple product concept.",
      },
      {
        title: "Build it",
        body: "Combined UX writing, animation and frontend execution into a compact, polished build.",
      },
    ],
    impact: "A small, polished piece that shows how much personality interaction design can carry.",
  },
];

export type Job = {
  badge?: string;
  dates: string;
  role: string;
  org: string;
  place?: string;
  body: string;
};

export const experience: Job[] = [
  {
    badge: "Current role",
    dates: "February 2025 – Present",
    role: "UI/UX Designer & Frontend Developer",
    org: "Walmart",
    body: "Commerce UX across listing, cart and checkout, plus the design system and React components behind 40+ screens.",
  },
  {
    dates: "December 2023 – February 2025",
    role: "UI/UX Designer",
    org: "AlayaCare",
    body: "Healthcare appointment booking: research, usability testing, accessibility and developer handoff.",
  },
  {
    dates: "2022 – 2023",
    role: "Junior UI/UX & Graphic Designer",
    org: "WebClues Infotech",
    body: "Web, mobile and marketing interfaces for a range of client products.",
  },
  {
    dates: "2021 – 2022",
    role: "UI/UX Designer Intern",
    org: "JVS Technology",
    body: "Mobile interfaces, interactive prototypes and WordPress sites.",
  },
];

export const navLinks = {
  primary: [
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  secondary: [
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Resume", href: asset("/Priyank_Shah_Resume_2026.pdf") },
  ],
};
