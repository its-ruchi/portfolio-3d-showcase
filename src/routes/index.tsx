import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")(
  {
  head: () => ({
    meta: [
      { title: "Ruchi.exe — AI Native Builder & AI Product Builder" },
      { name: "description", content: "Pixel-perfect portfolio of Ruchi Bhilare. AI native builder & AI product builder shipping AI-powered web apps." },
      { property: "og:title", content: "Ruchi.exe — Portfolio" },
      { property: "og:description", content: "Pixel-perfect portfolio of Ruchi Bhilare. AI native builder & AI product builder." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "motion/react";
import type { Variants } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Maximize2,
} from "lucide-react";
import avatar from "../assets/ruchi-pixel.png";
import mountains from "../assets/pixel-mountains.png";

import projectGrowthOs from "../assets/project-growth-os.jpg";
import projectMedischedule from "../assets/project-medischedule.png";
import projectResumePilot from "../assets/project-resumepilot.png";

/* ─────────────────────────────────────────────
   Animation Variants
   ───────────────────────────────────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -80, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 80, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const scalePop: Variants = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 0.8,
    },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─────────────────────────────────────────────
   Reusable Components
   ───────────────────────────────────────────── */

function Win({
  title,
  children,
  className = "",
  bodyClassName = "",
  collapsible = false,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  collapsible?: boolean;
}) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={`win ${className}`}>
      <div className="win-titlebar">
        <span>{title}</span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => collapsible && setCollapsed((c) => !c)}
            aria-label={collapsed ? "expand window" : "minimize window"}
            className="size-2.5 border-2 border-ink inline-block bg-paper hover:bg-ink transition-colors"
          />
          <button
            type="button"
            aria-label="window control"
            className="size-2.5 border-2 border-ink inline-block bg-paper hover:bg-ink transition-colors"
          />
        </div>
      </div>
      <div
        className={`win-body ${bodyClassName} overflow-hidden transition-all duration-300 ${
          collapsed ? "max-h-0 !p-0 opacity-0" : "max-h-[10000px] opacity-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

/* Animated skill bar — fills with spring physics on scroll */
function AnimatedBar({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const springValue = useSpring(0, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return (
    <div ref={ref} className="w-24 h-3 border-2 border-ink bg-paper inline-block overflow-hidden">
      <motion.div
        className="h-full bg-ink"
        style={{ width: useTransform(springValue, (v) => `${v}%`) }}
      />
    </div>
  );
}

/* Kinetic text — each word animates in with stagger + blur */
function KineticText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────
   Main Page
   ───────────────────────────────────────────── */

function Index() {
  const [time, setTime] = useState("");
  const [typed, setTyped] = useState("");
  const heroLine = "Hi! Welcome\nto my portfolio";

  /* Hero parallax */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const mountainY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(heroLine.slice(0, i));
      if (i >= heroLine.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen sky-bg">
      {/* Top desktop menu bar */}
      <motion.div
        className="border-b-2 border-ink bg-paper sticky top-0 z-50"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-[1200px] mx-auto px-4 h-9 flex items-center justify-between text-[10px] font-[family-name:var(--font-pixel)] uppercase tracking-wider">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="size-3 bg-ink inline-block" />
              Ruchi.exe
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline opacity-60">IST</span>
            <span className="tabular-nums">{time}</span>
            <span className="size-2 bg-ink animate-blink" />
          </div>
        </div>
      </motion.div>

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* === HERO WINDOW === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <Win title="Welcome.exe" bodyClassName="!p-0">
            <div ref={heroRef} className="relative overflow-hidden">
              <motion.img
                src={mountains}
                alt=""
                className="w-full h-44 sm:h-60 object-cover border-b-2 border-ink"
                loading="eager"
                style={{ y: mountainY }}
              />
              {/* Floating mini-window over the hero */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-[min(280px,72%)]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 18,
                    delay: 0.5,
                  }}
                >
                  <Win title="Digital Me">
                    <div className="flex gap-3 items-start">
                      <img
                        src={avatar}
                        alt="Ruchi pixel avatar"
                        width={96}
                        height={96}
                        className="size-20 sm:size-24 border-2 border-ink"
                      />
                      <div className="font-[family-name:var(--font-mono)] text-xl leading-tight">
                        {typed.split("\n").map((line, i, arr) => (
                          <span key={i}>
                            {line}
                            {i < arr.length - 1 && <br />}
                          </span>
                        ))}
                        <span className="animate-blink">_</span>
                      </div>
                    </div>
                  </Win>
                </motion.div>
              </div>
              <motion.div
                className="hidden sm:flex absolute top-6 right-6 w-10 h-10 border-2 border-ink bg-paper items-center justify-center animate-float-y"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Maximize2 size={16} strokeWidth={2.5} />
              </motion.div>
            </div>
            <div className="p-5 sm:p-8">
              <h1 className="font-[family-name:var(--font-mono)] text-5xl sm:text-7xl lg:text-8xl leading-none">
                <KineticText text="RUCHI BHILARE" delay={0.3} />
              </h1>
              <motion.p
                className="mt-3 font-[family-name:var(--font-mono)] text-xl sm:text-2xl text-muted-foreground"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                &gt; AI PRODUCT BUILDER
              </motion.p>
              <motion.div
                className="mt-5 flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <span className="px-2 py-1 border-2 border-ink bg-mint font-[family-name:var(--font-pixel)] text-[9px] uppercase">
                  OPEN TO FREELANCE PROJECTS
                </span>
                <span className="px-2 py-1 border-2 border-ink bg-paper font-[family-name:var(--font-pixel)] text-[9px] uppercase">
                  Mumbai · Remote
                </span>
              </motion.div>
            </div>
          </Win>
        </motion.div>

        {/* === INSTALLED PROGRAMS — staggered children === */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={fadeUp}>
            <Win title="Installed Programs" className="relative" collapsible>
              <motion.div
                className="grid md:grid-cols-3 gap-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {/* About */}
                <motion.div variants={staggerItem} className="h-full">
                  <Win title="About Me" className="h-full flex flex-col" bodyClassName="flex-1">
                    <p className="font-[family-name:var(--font-mono)] text-lg leading-snug">
                      Hi! I'm Ruchi 👋
                    </p>
                    <p className="mt-3 font-[family-name:var(--font-mono)] text-lg leading-snug text-muted-foreground">
                      I'm passionate about AI Product Management and building AI-first products. I've built websites using modern AI development tools, created AI-powered workflows and agents, and I'm continuously learning product strategy, user research, and shipping end-to-end MVPs.
                    </p>
                  </Win>
                </motion.div>

                {/* Software list */}
                <motion.div variants={staggerItem} className="h-full">
                  <Win title="Software List" className="h-full flex flex-col" bodyClassName="flex-1">
                    <ul className="space-y-2 font-[family-name:var(--font-mono)] text-lg leading-tight">
                      {[
                        ["React / Next.js", 95],
                        ["TypeScript", 90],
                        ["Tailwind CSS", 95],
                        ["Supabase", 85],
                        ["Node.js", 80],
                        ["Figma", 90],
                      ].map(([k, v]) => (
                        <li key={k as string} className="flex items-center justify-between gap-3">
                          <span>{k}</span>
                          <AnimatedBar value={v as number} />
                        </li>
                      ))}
                    </ul>
                  </Win>
                </motion.div>

                {/* Product Toolkit */}
                <motion.div variants={staggerItem} className="h-full">
                  <Win title="Product Toolkit" className="h-full flex flex-col" bodyClassName="flex-1">
                    <div className="flex flex-col gap-2">
                      {[
                        "Product Discovery & User Research",
                        "PRDs & Product Strategy",
                        "Product Analytics & A/B Testing",
                        "AI Prototyping (Claude, Cursor, Lovable)",
                        "GTM Strategy"
                      ].map((skill) => (
                        <div
                          key={skill}
                          className="w-full px-2 py-1.5 border-2 border-ink bg-paper font-[family-name:var(--font-pixel)] text-[9px] uppercase leading-tight"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </Win>
                </motion.div>
              </motion.div>
            </Win>
          </motion.div>
        </motion.div>

        {/* === PROJECTS.exe — staggered card rise === */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          <Win title="Projects.exe" collapsible>
            <motion.div
              className="grid lg:grid-cols-3 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
            >
              {[
                {
                  title: "LinkedIn Growth OS",
                  tag: "AI · SaaS",
                  img: projectGrowthOs,
                  href: "https://linkedin-growth-os-omega.vercel.app/",
                  blurb:
                    "AI personal-branding SaaS that captures your voice & generates algorithm-tuned LinkedIn posts. Full onboarding flow + live editor on Groq + Llama 3.",
                  stack: ["Next.js 14", "TypeScript", "Groq", "Tailwind"],
                  accent: "bg-paper",
                },
                {
                  title: "MediSchedule",
                  tag: "HealthTech",
                  img: projectMedischedule,
                  href: "https://medischedule-eight.vercel.app/",
                  blurb:
                    "Care-coordination platform shipped in <7 days with AI-assisted dev. Splits emergency vs normal queues without exposing phone numbers.",
                  stack: ["Next.js", "Supabase", "TypeScript", "Realtime"],
                  accent: "bg-paper",
                },
                {
                  title: "ResumePilot",
                  tag: "AI · Productivity",
                  img: projectResumePilot,
                  href: "https://resumecopilot-five.vercel.app/",
                  blurb:
                    "AI resume-tailoring tool that scores resumes against a job description the way an ATS would, then rewrites bullets to match the posting's language — drawing only on the user's real experience to keep output honest and ATS-safe.",
                  stack: ["Next.js", "TypeScript", "AI", "Tailwind"],
                  accent: "bg-paper",
                },
              ].map((p, i) => (
                <motion.div
                  key={p.title}
                  variants={scalePop}
                  whileHover={{
                    y: -6,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  className="h-full"
                >
                  <Win title={p.title} className="h-full flex flex-col" bodyClassName="flex-1 flex flex-col">
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block border-2 border-ink ${p.accent} mb-3 overflow-hidden group aspect-[4/3] relative flex items-center justify-center`}
                    >
                      <img
                        src={p.img}
                        alt={p.title}
                        className="w-full h-full object-contain p-0 brightness-110 contrast-110 saturate-110 group-hover:brightness-125 group-hover:saturate-150 transition-all"
                        loading="lazy"
                      />
                    </a>
                    <div className="font-[family-name:var(--font-pixel)] text-[9px] uppercase opacity-70 mb-1">
                      {p.tag}
                    </div>
                    <p className="font-[family-name:var(--font-mono)] text-lg leading-snug flex-1">
                      {p.blurb}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="px-1.5 py-0.5 border-2 border-ink bg-paper font-[family-name:var(--font-pixel)] text-[8px] uppercase"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3">
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-[family-name:var(--font-pixel)] text-[9px] uppercase hover:bg-ink hover:text-paper px-2 py-1 border-2 border-ink"
                      >
                        Open <ExternalLink size={10} strokeWidth={3} />
                      </a>
                    </div>
                  </Win>
                </motion.div>
              ))}
            </motion.div>
          </Win>
        </motion.div>

        {/* === CV.exe — slide-in wipe effect === */}
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
        >
          <Win title="Cv.exe" collapsible>
            <div className="grid lg:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Win title="Experience">
                  <div className="space-y-4">

                    <div>
                      <div className="flex justify-between font-[family-name:var(--font-pixel)] text-[9px] uppercase">
                        <span className="flex items-center gap-1.5">
                          Product Intern
                        </span>
                        <span className="opacity-60">Jun 2026 – Jul 2026</span>
                      </div>
                      <div className="font-[family-name:var(--font-mono)] text-xl">
                        Kaari Labs · Mumbai
                      </div>
                      <ul className="mt-2 font-[family-name:var(--font-mono)] text-base leading-snug space-y-1">
                        <li>&gt; Contributed to system design & product architecture for a 3D asset platform</li>
                        <li>&gt; Documented core product flows as PRD-style specs for tech & non-tech stakeholders</li>
                        <li>&gt; Built a 3D configurator (Three.js), translating requirements into a working prototype.</li>
                      </ul>
                    </div>
                    <div className="border-t-2 border-ink pt-4">
                      <div className="flex justify-between font-[family-name:var(--font-pixel)] text-[9px] uppercase">
                        <span>Full-Stack Dev</span>
                        <span className="opacity-60">Mar 2026</span>
                      </div>
                      <div className="font-[family-name:var(--font-mono)] text-xl">
                        Digiculum · Client Project
                      </div>
                      <ul className="mt-2 font-[family-name:var(--font-mono)] text-base leading-snug space-y-1">
                        <li>&gt; Shipped a production course platform w/ quizzes + video lessons</li>
                        <li>&gt; Architected Next.js + Node + Supabase + payments end-to-end</li>
                        <li>&gt; Cut hosting cost via unlisted YouTube infra</li>
                      </ul>
                    </div>
                    <div className="border-t-2 border-ink pt-4">
                      <div className="flex justify-between font-[family-name:var(--font-pixel)] text-[9px] uppercase">
                        <span>Frontend Intern</span>
                        <span className="opacity-60">Feb 2025 – Jun 2025</span>
                      </div>
                      <div className="font-[family-name:var(--font-mono)] text-xl">
                        Coding Jr · Remote
                      </div>
                      <ul className="mt-2 font-[family-name:var(--font-mono)] text-base leading-snug space-y-1">
                        <li>&gt; Built responsive UI components for production apps</li>
                        <li>&gt; Translated UI/UX into scalable front-end systems</li>
                        <li>&gt; Iterated quality via structured design feedback</li>
                      </ul>
                    </div>
                  </div>
                </Win>
              </motion.div>

              <motion.div
                className="space-y-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <motion.div variants={slideFromRight}>
                  <Win title="Education">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <div className="font-[family-name:var(--font-mono)] text-xl leading-tight">
                          B.Sc. Computer Science
                        </div>
                        <div className="font-[family-name:var(--font-pixel)] text-[9px] uppercase mt-1 opacity-70">
                          BK Birla College · Univ. of Mumbai
                        </div>
                        <div className="font-[family-name:var(--font-pixel)] text-[9px] uppercase mt-1 opacity-70">
                          2023 — 2026
                        </div>
                      </div>
                      <div className="text-center border-2 border-ink p-2 bg-mint shrink-0">
                        <div className="font-[family-name:var(--font-mono)] text-3xl leading-none">9.24</div>
                        <div className="font-[family-name:var(--font-pixel)] text-[8px] uppercase mt-1">/ 10</div>
                      </div>
                    </div>
                  </Win>
                </motion.div>



                <motion.div variants={slideFromRight}>
                  <Win title="Certificates.exe">
                    <ul className="space-y-2">
                      {[
                        {
                          title: "AI Fluency: Framework & Foundations",
                          issuer: "Anthropic",
                          href: "https://verify.skilljar.com/c/z4zg8aqo2cq7",
                          accent: "bg-mint",
                        },
                        {
                          title: "Claude 101",
                          issuer: "Anthropic · Certificate of Completion",
                          href: "https://verify.skilljar.com/c/grysd36gn4d4",
                          accent: "bg-coral",
                        },
                      ].map((c) => (
                        <li key={c.title}>
                          <a
                            href={c.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`border-2 border-ink ${c.accent} p-3 flex items-start gap-3 hover:translate-x-[2px] hover:translate-y-[2px] transition-transform`}
                          >
                            <div className="size-9 border-2 border-ink bg-paper grid place-items-center font-[family-name:var(--font-pixel)] text-[10px] shrink-0">
                              ★
                            </div>
                            <div className="min-w-0">
                              <div className="font-[family-name:var(--font-mono)] text-base leading-tight">
                                {c.title}
                              </div>
                              <div className="font-[family-name:var(--font-pixel)] text-[9px] uppercase opacity-70 mt-1 flex items-center gap-1">
                                {c.issuer} <ExternalLink size={10} strokeWidth={3} />
                              </div>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Win>
                </motion.div>
              </motion.div>
            </div>
          </Win>
        </motion.div>

        {/* === CONNECT.exe — scale pop with spring === */}
        <motion.div
          variants={scalePop}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <Win title="Connect.exe" bodyClassName="!p-0">
            <div className="relative scanline bg-[color-mix(in_oklab,var(--color-sky-deep)_60%,var(--color-paper))] p-6 sm:p-14 text-center overflow-hidden">
              <motion.h2
                className="font-[family-name:var(--font-mono)] text-[clamp(1.75rem,7vw,4.5rem)] leading-[1.05] break-words"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                  delay: 0.15,
                }}
              >
                Want to work together?
                <br />
                <span className="text-coral">Let's chat!</span>
              </motion.h2>
              <div className="mt-2 font-[family-name:var(--font-pixel)] text-[10px] uppercase opacity-70">
                [ press any link to continue ]<span className="animate-blink">_</span>
              </div>
              <div className="absolute bottom-4 right-4 size-12 border-2 border-ink bg-paper grid place-items-center animate-float-y">
                <Maximize2 size={18} strokeWidth={2.5} />
              </div>
            </div>
            <motion.div
              className="p-5 sm:p-6 border-t-2 border-ink"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="max-w-xl mx-auto">
                <Win title="Contact Me">
                  <motion.ul
                    className="font-[family-name:var(--font-mono)] text-lg space-y-1.5"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.li variants={staggerItem}>
                      <a
                        href="/resume.pdf"
                        download
                        className="inline-flex items-center gap-1.5 font-[family-name:var(--font-pixel)] text-[10px] uppercase hover:bg-ink hover:text-paper px-3 py-2 border-2 border-ink bg-mint"
                      >
                        ↓ Download résumé.pdf
                      </a>
                    </motion.li>
                    <motion.li variants={staggerItem} className="flex items-center gap-2">
                      <Mail size={14} strokeWidth={2.5} />
                      <span className="font-[family-name:var(--font-pixel)] text-[9px] uppercase w-20">Email</span>
                      <a className="underline decoration-2 underline-offset-2 hover:bg-mint" href="mailto:bhilareruchi@gmail.com">
                        bhilareruchi@gmail.com
                      </a>
                    </motion.li>
                    <motion.li variants={staggerItem} className="flex items-center gap-2">
                      <Linkedin size={14} strokeWidth={2.5} />
                      <span className="font-[family-name:var(--font-pixel)] text-[9px] uppercase w-20">LinkedIn</span>
                      <a className="underline decoration-2 underline-offset-2 hover:bg-mint" href="https://www.linkedin.com/in/ruchi-b-87738826b/" target="_blank" rel="noopener noreferrer">
                        www.linkedin.com/in/ruchi-b-87738826b
                      </a>
                    </motion.li>
                    <motion.li variants={staggerItem} className="flex items-center gap-2">
                      <Github size={14} strokeWidth={2.5} />
                      <span className="font-[family-name:var(--font-pixel)] text-[9px] uppercase w-20">GitHub</span>
                      <a className="underline decoration-2 underline-offset-2 hover:bg-mint" href="https://github.com/its-ruchi" target="_blank" rel="noopener noreferrer">
                        github.com/its-ruchi
                      </a>
                    </motion.li>
                  </motion.ul>
                </Win>
              </div>
            </motion.div>
          </Win>
        </motion.div>

        {/* Taskbar footer */}
        <motion.div
          className="border-2 border-ink bg-paper px-3 py-2 flex items-center justify-between font-[family-name:var(--font-pixel)] text-[9px] uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <span className="size-3 bg-ink" />
            Start
            <span className="opacity-50">|</span>
            <span className="hidden sm:inline opacity-70">Ruchi.exe — 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-70">System OK</span>
            <span className="size-2 bg-ink animate-blink" />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
