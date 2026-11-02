"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, Code2,
  Command, ExternalLink, Github, Layers3, Menu, Moon, Send, Sparkles,
  Sun, X, Zap
} from "lucide-react";
import { experience, portfolio, projects, skills, type Project } from "@/data/portfolio";

const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ number, title, description }: { number: string; title: string; description?: string }) {
  return (
    <div className="section-heading">
      <span className="section-number">{number} /</span>
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}

export default function PortfolioApp() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [light, setLight] = useState(false);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const visibleProjects = useMemo(() => projects.filter((project) => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const searchText = `${project.title} ${project.summary} ${project.stack.join(" ")}`.toLowerCase();
    return matchesCategory && searchText.includes(query.toLowerCase());
  }), [activeCategory, query]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("light-theme", light);
    return () => document.body.classList.remove("light-theme");
  }, [light]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
        setMobileOpen(false);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.getElementById("project-search")?.focus();
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navItems = [
    ["home", "Home"], ["about", "About"], ["work", "Work"],
    ["skills", "Skills"], ["journey", "Journey"], ["contact", "Contact"]
  ];

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(portfolio.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${portfolio.email}`;
    }
  }

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#home" aria-label={`${portfolio.name} home`}>
          <span className="brand-mark">S<span>H</span></span>
          <span className="brand-name">{portfolio.name}<small>PORTFOLIO / 2026</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([id, label]) => (
            <a key={id} className={activeSection === id ? "nav-link active" : "nav-link"} href={`#${id}`}>{label}</a>
          ))}
        </nav>
        <div className="topbar-actions">
          <button className="icon-button" onClick={() => setLight(!light)} aria-label={light ? "Switch to dark theme" : "Switch to light theme"}>
            {light ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <a className="availability-pill" href="#contact"><span /> Available</a>
          <button className="icon-button mobile-menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            {navItems.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMobileOpen(false)}>{label}<ArrowUpRight size={16} /></a>)}
          </motion.nav>
        )}
      </AnimatePresence>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <Reveal>
              <div className="eyebrow"><span className="eyebrow-line" /> HELLO WORLD, I’M {portfolio.name.toUpperCase()}</div>
              <h1>Curious mind.<br /><span className="text-gradient">Builder’s instinct.</span></h1>
              <p className="hero-description">{portfolio.intro}</p>
              <div className="hero-cta">
                <a className="button button-primary" href="#work">Explore my work <ArrowUpRight size={17} /></a>
                <a className="button button-quiet" href={portfolio.resumePath} target="_blank" rel="noreferrer">View resume <ArrowDownRight size={17} /></a>
              </div>
              <div className="hero-meta">
                <span><span className="status-dot" /> {portfolio.availability}</span>
                <span className="meta-divider">/</span>
                <span>{portfolio.location}</span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="hero-art-wrap">
            <div className="hero-art">
              <div className="art-grid" />
              <div className="orbit orbit-a" /><div className="orbit orbit-b" />
              <motion.div className="core-orb" animate={{ rotate: 360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
                <div className="orb-inner"><span>SH</span><i /></div>
              </motion.div>
              <motion.div className="floating-card card-code" animate={{ y: [0, -8, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}>
                <Code2 size={16} /><span>build()</span><b>↗</b>
              </motion.div>
              <motion.div className="floating-card card-ai" animate={{ y: [0, 7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                <Sparkles size={16} /><span>ideas → impact</span>
              </motion.div>
              <div className="art-index">FIG. 01 <span>CREATIVE SYSTEMS</span></div>
              <div className="art-cross cross-a">+</div><div className="art-cross cross-b">+</div>
            </div>
          </Reveal>
          <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
          <div className="hero-side-note">DESIGN / CODE / ITERATE</div>
        </section>

        <section className="intro-strip section-wrap" id="about">
          <Reveal className="intro-label"><span className="section-number">01 / ABOUT</span><span className="mini-rule" /></Reveal>
          <Reveal delay={0.08} className="intro-statement">
            <p>I like working where <span>logic meets imagination.</span> I’m learning by building, testing ideas, and turning complex problems into experiences people can actually use.</p>
            <div className="intro-foot"><span>BASED IN {portfolio.location.toUpperCase()}</span><span>ALWAYS IN BUILD MODE ↗</span></div>
          </Reveal>
        </section>

        <section className="section-wrap work-section" id="work">
          <Reveal><SectionHeading number="02" title="Selected work" description="A few ideas, prototypes, and systems I’m exploring." /></Reveal>
          <div className="project-toolbar">
            <div className="filter-list" role="group" aria-label="Filter projects">
              {categories.map((category) => <button key={category} className={activeCategory === category ? "filter-chip selected" : "filter-chip"} onClick={() => setActiveCategory(category)}>{category}</button>)}
            </div>
            <label className="search-box" htmlFor="project-search"><Command size={14} /><input id="project-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a project..." /><kbd>⌘ K</kbd></label>
          </div>
          <motion.div layout className="project-grid">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, index) => (
                <motion.article layout key={project.slug} className={`project-card accent-${project.accent}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.32, delay: index * 0.035 }}>
                  <button className="project-open" onClick={() => setSelectedProject(project)} aria-label={`View details for ${project.title}`}>
                    <div className="project-visual">
                      <div className="visual-noise" />
                      <span className="project-index">PROJECT / {String(index + 1).padStart(2, "0")}</span>
                      <div className="visual-symbol">
                        {project.accent === "green" ? <Layers3 size={54} strokeWidth={1.1} /> : project.accent === "purple" ? <Sparkles size={54} strokeWidth={1.1} /> : project.accent === "orange" ? <Zap size={54} strokeWidth={1.1} /> : <Code2 size={54} strokeWidth={1.1} />}
                      </div>
                      <span className="visual-category">{project.category}</span>
                      <span className="visual-arrow"><ArrowUpRight size={20} /></span>
                    </div>
                    <div className="project-info">
                      <div className="project-title-row"><h3>{project.title}</h3><span>{project.year}</span></div>
                      <p>{project.summary}</p>
                      <div className="tag-row">{project.stack.map((tech) => <span key={tech} className="tech-tag">{tech}</span>)}</div>
                    </div>
                  </button>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
          {visibleProjects.length === 0 && <div className="empty-state">No projects match that search. Try another keyword.</div>}
          <div className="section-bottom-note"><span>{String(visibleProjects.length).padStart(2, "0")} PROJECTS SHOWN</span><span>MORE IDEAS IN PROGRESS <span className="red-dot">●</span></span></div>
        </section>

        <section className="skills-section">
          <div className="section-wrap">
            <Reveal><SectionHeading number="03" title="Tools of the trade" description="Technologies I use, explore, and keep learning." /></Reveal>
            <div className="skills-layout">
              <Reveal className="skills-copy"><span className="big-asterisk">✳</span><h3>Curiosity is<br />part of the stack.</h3><p>Tools change. The fundamentals—clear thinking, experimentation, and solving the right problem—stay useful.</p></Reveal>
              <div className="skills-cloud">
                {Array.from(new Set(skills.map((skill) => skill.group))).map((group, i) => (
                  <Reveal key={group} delay={i * 0.06} className="skill-group">
                    <div className="skill-group-head"><span>{group}</span><span>{String(i + 1).padStart(2, "0")}</span></div>
                    <div className="skill-pills">{skills.filter((skill) => skill.group === group).map((skill) => <span key={skill.name} className="skill-pill">{skill.name}<ArrowUpRight size={12} /></span>)}</div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrap journey-section" id="skills">
          <Reveal><SectionHeading number="04" title="A work in progress" description="The path so far—and where the next experiments begin." /></Reveal>
          <div className="journey-layout">
            <div className="journey-intro"><span className="eyebrow">THE JOURNEY</span><h3>Learn it.<br /><span>Build it.</span><br />Improve it.</h3><p>Every project is a chance to connect what I study with a real problem.</p><a className="text-link" href="#contact">Start a conversation <ArrowUpRight size={16} /></a></div>
            <div className="timeline" id="journey">
              {experience.map((item, i) => <Reveal key={item.title} delay={i * 0.08} className="timeline-item"><div className="timeline-marker"><span /></div><div className="timeline-date">{item.date}</div><div className="timeline-content"><h4>{item.title}</h4><span>{item.organization}</span><p>{item.description}</p></div></Reveal>)}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-wrap contact-inner">
            <Reveal className="contact-kicker"><span className="eyebrow"><span className="eyebrow-line" /> HAVE A GOOD PROBLEM?</span><span className="section-number">05 / CONTACT</span></Reveal>
            <Reveal className="contact-main"><h2>Let’s make<br /><span>something matter.</span></h2><p>Have an opportunity, a project idea, or a question? I’d love to hear what you’re working on.</p><div className="contact-actions"><a className="button button-primary" href={`mailto:${portfolio.email}?subject=Portfolio%20enquiry`}>Say hello <Send size={16} /></a><button className="button button-outline" onClick={copyEmail}>{copied ? <Check size={16} /> : <span className="email-symbol">@</span>}{copied ? "Email copied" : portfolio.email}</button></div></Reveal>
            <Reveal className="social-row">{portfolio.socials.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noreferrer"><span>{social.short}</span>{social.label}<ExternalLink size={13} /></a>)}</Reveal>
          </div>
        </section>
      </main>

      <footer className="footer section-wrap">
        <a className="brand footer-brand" href="#home"><span className="brand-mark">S<span>H</span></span><span className="brand-name">{portfolio.name}<small>MADE WITH INTENTION</small></span></a>
        <span className="footer-center">DESIGNED TO KEEP EVOLVING <span className="red-dot">●</span></span>
        <a className="back-top" href="#home">BACK TO TOP <ArrowUpRight size={14} /></a>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} {portfolio.name}. All rights reserved.</span><span>BUILT WITH REACT · NEXT.JS · MOTION</span></div>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <motion.div className="modal-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProject(null); }}>
            <motion.div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} transition={{ duration: 0.22 }}>
              <div className={`modal-visual accent-${selectedProject.accent}`}><span>PROJECT / CASE FILE</span><button className="icon-button modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X size={19} /></button><div><Code2 size={42} strokeWidth={1.1} /><span>{selectedProject.category} · {selectedProject.year}</span></div></div>
              <div className="modal-content"><span className="eyebrow">{selectedProject.status}</span><h2 id="modal-title">{selectedProject.title}</h2><p>{selectedProject.description}</p><h3>Built with</h3><div className="tag-row">{selectedProject.stack.map((tech) => <span className="tech-tag" key={tech}>{tech}</span>)}</div><div className="modal-outcome"><span>FOCUS</span><p>{selectedProject.outcome}</p></div><div className="modal-actions">{selectedProject.github && <a className="button button-outline" href={selectedProject.github} target="_blank" rel="noreferrer"><Github size={16} /> Repository <ArrowRight size={15} /></a>}{selectedProject.demo && <a className="button button-primary" href={selectedProject.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={16} /></a>}</div><p className="modal-note">Replace sample links and concept descriptions with your real project details before publishing.</p></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
