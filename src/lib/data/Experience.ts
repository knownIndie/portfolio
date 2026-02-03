export type WorkItem = {
  id: string;
  type: "work";
  start: string;
  end?: string;
  title: string;
  name: string;
  role: string;
  bullets?: string[];
  logo?: string;
  link?: string;
};

export const workItems: WorkItem[] = [
  {
    id: "skynet-2024",
    type: "work",
    start: "2025",
    title: "SkynetDev.space",
    name: "Project",
    role: "Frontend Developer",
    bullets: [
      "Built Next.js + Tailwind skeleton with routing and layout foundations.",
      "Structured reusable UI blocks for fast iteration and consistent spacing.",
      "Focused on clean typography, accessibility, and responsive layout behavior.",
    ],
    link: "https://skynetdev.space",
  },
];
