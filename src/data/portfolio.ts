export const portfolio = {
  name: "Sri Hari",
  initials: "SH",
  role: "AI/ML Engineer · Software Developer · Creative Technologist",
  headline: "I build intelligent software and digital experiences.",
  intro:
    "I’m a computer science student exploring AI, full-stack development, and creative technology. I turn real-world problems into thoughtful, useful digital products.",
  location: "Hyderabad, India",
  availability: "Open to internships and meaningful collaborations",
  email: "itshari0918@gmail.com",
  resumePath: "/resume.pdf",
  socials: [
    { label: "GitHub", url: "https://github.com/itshari09", short: "GH" },
    { label: "LinkedIn", url: "https://in.linkedin.com/in/srihari-1807aiml-es", short: "IN" },
  ]
};

export const skills = [
  { name: "Python", group: "Languages" },
  { name: "JavaScript", group: "Languages" },
  { name: "TypeScript", group: "Languages" },
  { name: "HTML & CSS", group: "Frontend" },
  { name: "React", group: "Frontend" },
  { name: "Next.js", group: "Frontend" },
  { name: "FastAPI", group: "Backend" },
  { name: "Node.js", group: "Backend" },
  { name: "PostgreSQL", group: "Data" },
  { name: "MongoDB", group: "Data" },
  { name: "scikit-learn", group: "AI / ML" },
  { name: "RDFLib", group: "AI / ML" },
  { name: "Git & GitHub", group: "Tools" },
  { name: "Figma", group: "Creative" }
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  stack: string[];
  status: string;
  featured: boolean;
  accent: string;
  outcome: string;
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: "software-xray",
    title: "Software X-Ray",
    category: "AI / ML",
    year: "2026",
    summary: "A concept for helping students understand the gaps between their current skills and target software roles.",
    description: "Software X-Ray is a placement-focused concept that could map a learner’s skills against role requirements, surface gaps, and suggest a practical learning path. Replace this concept copy with the features you have actually implemented.",
    stack: ["Python", "React", "Data Analysis"],
    status: "Concept / in progress",
    featured: true,
    accent: "green",
    outcome: "Designed around a clear student problem and actionable next steps.",
    github: "https://github.com/"
  },
  {
    slug: "vehicle-knowledge",
    title: "Vehicle Maintenance AI (VAI)",
    category: "AI / ML",
    year: "2026",
    summary: "An ontology-based vehicle maintenance assistant that reasons over vehicle data and maintenance rules to recommend actions and schedule servicing.",
    description: "VAI stores vehicle data and maintenance rules in an OWL/RDF ontology, uses a reasoning engine to infer required maintenance actions, and generates a service calendar based on vehicle usage. The interface is designed for real-time maintenance suggestions through a console or GUI.",
    stack: ["Python 3.12", "OWL / RDF", "Knowledge Representation & Reasoning"],
    status: "Prototype",
    featured: true,
    accent: "red",
    outcome: "Connects semantic knowledge representation with rule-based maintenance recommendations.",
    github: "https://github.com/itshari09/VAI-Vechile-maintanance-ai-"
  },
  {
    slug: "lex-ai",
    title: "Lex AI",
    category: "Full Stack",
    year: "2026",
    summary: "A legal-information prototype exploring a clearer way to navigate complex documents and questions.",
    description: "Lex AI is a prototype concept for making legal information easier to explore. Clearly distinguish general information from legal advice, and document any retrieval or AI features you actually build.",
    stack: ["React", "API Design", "AI Integration"],
    status: "Prototype",
    featured: true,
    accent: "purple",
    outcome: "Focuses on approachable information architecture and usability.",
    github: "https://github.com/"
  },
  {
    slug: "creator-platform",
    title: "Growfluence AI",
    category: "Full Stack",
    year: "2026",
    summary: "A multi-user creator growth workspace for weekly content planning, AI-assisted creation, creator strategy and performance tracking.",
    description: "Built as a creator-focused SaaS MVP with private accounts, personalized creator profiles, seven-day content plans, an AI content studio for hooks and captions, an editorial workflow, and creator-reported analytics. Supabase Auth and PostgreSQL Row Level Security keep each creator’s workspace private. AI generation is optional and requires an API key; social publishing and live platform analytics are not yet integrated.",
    stack: ["Python", "Streamlit", "Supabase", "PostgreSQL", "OpenAI API"],
    status: "MVP",
    featured: true,
    accent: "orange",
    outcome: "Multi-user creator workspaces with personalized planning and growth tracking.",
    github: "https://github.com/itshari09/growfluence-ai"
  }
];

export const experience = [
  {
    date: "2024 — Present",
    title: "B.Tech, Computer Science (AI & ML)",
    organization: "Vignan Institute of Technology and Science",
    description: "Studying computer science with an interest in intelligent systems, software engineering, and applied AI."
  },
  {
    date: "2021 — 2024",
    title: "Diploma in Embedded Systems Engineering",
    organization: "Government Polytechnic College, Nizamabad",
    description: "Built a foundation in engineering and embedded systems."
  },
  {
    date: "Ongoing",
    title: "Projects & community initiatives",
    organization: "Independent work",
    description: "Developing software prototypes and contributing to student technology events. Add specific dates, responsibilities, and outcomes as appropriate."
  }
];
