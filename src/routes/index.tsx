import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ruchi.exe — Full-Stack Developer & Product Designer" },
      { name: "description", content: "Pixel-perfect portfolio of Ruchi Bhilare. Full-stack developer & product designer shipping AI-powered web apps." },
      { property: "og:title", content: "Ruchi.exe — Portfolio" },
      { property: "og:description", content: "Pixel-perfect portfolio of Ruchi Bhilare. Full-stack developer & product designer." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

import { useEffect, useRef, useState } from "react";
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
import projectMedischedule from "../assets/project-medischedule.jpg";
import projectFinfable from "../assets/project-finfable.jpg";

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

function Bar({ value }: { value: number }) {
  return (
    <div className="w-24 h-3 border-2 border-ink bg-paper inline-block">
      <div className="h-full bg-ink" style={{ width: `${value}%` }} />
    </div>
  );
}

function Reveal3D({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOpen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ perspective: "1400px" }}
      className={className}
    >
      <div
        style={{
          transformOrigin: "top center",
          transformStyle: "preserve-3d",
          transform: open
            ? "rotateX(0deg) translateY(0) scale(1)"
            : "rotateX(-65deg) translateY(40px) scale(0.96)",
          opacity: open ? 1 : 0,
          transition:
            "transform 900ms cubic-bezier(.2,.8,.2,1), opacity 600ms ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Index() {
  const [time, setTime] = useState("");
  const [typed, setTyped] = useState("");
  const heroLine = "Hi! Welcome\nto my portfolio";

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
      <div className="border-b-2 border-ink bg-paper sticky top-0 z-50">
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
      </div>

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* === HERO WINDOW === */}
        <Win title="Welcome.exe" bodyClassName="!p-0">
          <div className="relative">
            <img
              src={mountains}
              alt=""
              className="w-full h-44 sm:h-60 object-cover border-b-2 border-ink"
              loading="eager"
            />
            {/* Floating mini-window over the hero */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-[min(280px,72%)]">
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
            </div>
            <div className="hidden sm:flex absolute top-6 right-6 w-10 h-10 border-2 border-ink bg-paper items-center justify-center animate-float-y">
              <Maximize2 size={16} strokeWidth={2.5} />
            </div>
          </div>
          <div className="p-5 sm:p-8">
            <h1 className="font-[family-name:var(--font-mono)] text-5xl sm:text-7xl lg:text-8xl leading-none">
              RUCHI BHILARE
            </h1>
            <p className="mt-3 font-[family-name:var(--font-mono)] text-xl sm:text-2xl text-muted-foreground">
              &gt; full-stack developer × product designer
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="px-2 py-1 border-2 border-ink bg-mint font-[family-name:var(--font-pixel)] text-[9px] uppercase">
                OPEN TO FREELANCE PROJECTS
              </span>
              <span className="px-2 py-1 border-2 border-ink bg-paper font-[family-name:var(--font-pixel)] text-[9px] uppercase">
                Mumbai · Remote
              </span>
            </div>
          </div>
        </Win>

        {/* === INSTALLED PROGRAMS row === */}
        <Reveal3D>
        <Win title="Installed Programs" className="relative" collapsible>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Software list */}
            <Win title="Software List">
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
                    <Bar value={v as number} />
                  </li>
                ))}
              </ul>
            </Win>

            {/* Languages */}
            <Win title="Languages">
              <ul className="space-y-2 font-[family-name:var(--font-mono)] text-lg leading-tight">
                {[
                  ["English", 95],
                  ["Hindi", 100],
                  ["Marathi", 100],
                ].map(([k, v]) => (
                  <li key={k as string} className="flex items-center justify-between gap-3">
                    <span>{k}</span>
                    <Bar value={v as number} />
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-4 border-t-2 border-ink">
                <div className="font-[family-name:var(--font-pixel)] text-[9px] uppercase mb-2">
                  Stats
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="border-2 border-ink p-2 bg-mint">
                    <div className="font-[family-name:var(--font-mono)] text-3xl leading-none">9.24</div>
                    <div className="font-[family-name:var(--font-pixel)] text-[8px] uppercase mt-1">CGPI</div>
                  </div>
                  <div className="border-2 border-ink p-2 bg-coral">
                    <div className="font-[family-name:var(--font-mono)] text-3xl leading-none">5+</div>
                    <div className="font-[family-name:var(--font-pixel)] text-[8px] uppercase mt-1">Shipped</div>
                  </div>
                </div>
              </div>
            </Win>

            {/* About */}
            <Win title="About Me">
              <p className="font-[family-name:var(--font-mono)] text-lg leading-snug">
                HIi I'm Ruchi! Welcome to my portfolio _
              </p>
              <p className="mt-3 font-[family-name:var(--font-mono)] text-lg leading-snug text-muted-foreground">
                Currently learning & leveling up my dev workflow with AI tools —
                Claude, Codex, n8n, and Lovable — to compress idea → live MVP
                and ship products end-to-end.
              </p>
            </Win>
          </div>

        </Win>
        </Reveal3D>

        {/* === PROJECTS.exe === */}
        <Reveal3D>
        <Win title="Projects.exe" collapsible>
          <div className="grid lg:grid-cols-3 gap-4">
            {[
              {
                title: "LinkedIn Growth OS",
                tag: "AI · SaaS",
                img: projectGrowthOs,
                href: "https://linkedin-growth-os-omega.vercel.app/",
                blurb:
                  "AI personal-branding SaaS that captures your voice & generates algorithm-tuned LinkedIn posts. Full onboarding flow + live editor on Groq + Llama 3.",
                stack: ["Next.js 14", "TypeScript", "Groq", "Tailwind"],
                accent: "bg-mint",
              },
              {
                title: "MediSchedule",
                tag: "HealthTech",
                img: projectMedischedule,
                href: "https://medischedule-eight.vercel.app/",
                blurb:
                  "Care-coordination platform shipped in <7 days with AI-assisted dev. Splits emergency vs normal queues without exposing phone numbers.",
                stack: ["Next.js", "Supabase", "TypeScript", "Realtime"],
                accent: "bg-coral",
              },
              {
                title: "FinFable",
                tag: "FinTech",
                img: projectFinfable,
                href: "https://finfable.vercel.app/",
                blurb:
                  "Savings-timeline calculator for solo + group goals. Instant-feedback UI that turns abstract money targets into a weekly plan.",
                stack: ["React", "Vite", "TypeScript", "Tailwind"],
                accent: "bg-paper",
              },
            ].map((p) => (
              <Win key={p.title} title={p.title}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block border-2 border-ink ${p.accent} mb-3 overflow-hidden group`}
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full aspect-[4/3] object-cover brightness-110 contrast-110 saturate-110 group-hover:brightness-125 group-hover:saturate-150 transition-all"
                    loading="lazy"
                  />
                </a>
                <div className="font-[family-name:var(--font-pixel)] text-[9px] uppercase opacity-70 mb-1">
                  {p.tag}
                </div>
                <p className="font-[family-name:var(--font-mono)] text-lg leading-snug">
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
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 font-[family-name:var(--font-pixel)] text-[9px] uppercase hover:bg-ink hover:text-paper px-2 py-1 border-2 border-ink"
                >
                  Open <ExternalLink size={10} strokeWidth={3} />
                </a>
              </Win>
            ))}
          </div>
        </Win>
        </Reveal3D>

        {/* === CV.exe === */}
        <Reveal3D>
        <Win title="Cv.exe" collapsible>
          <div className="grid lg:grid-cols-2 gap-4">
            <Win title="Experience">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between font-[family-name:var(--font-pixel)] text-[9px] uppercase">
                    <span className="flex items-center gap-1.5">
                      Product Intern
                      <span className="size-1.5 bg-mint inline-block animate-pulse" />
                    </span>
                    <span className="opacity-60">Present</span>
                  </div>
                  <div className="font-[family-name:var(--font-mono)] text-xl">
                    Kaari Design · Mumbai
                  </div>
                  <ul className="mt-2 font-[family-name:var(--font-mono)] text-base leading-snug space-y-1">
                    <li>&gt; Driving product strategy and execution for user-centric products</li>
                    <li>&gt; Bridging design, engineering, and business to ship features end-to-end</li>
                    <li>&gt; Contributing to the full product development lifecycle</li>
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
                    CodingJunior · Remote
                  </div>
                  <ul className="mt-2 font-[family-name:var(--font-mono)] text-base leading-snug space-y-1">
                    <li>&gt; Built responsive UI components for production apps</li>
                    <li>&gt; Translated UI/UX into scalable front-end systems</li>
                    <li>&gt; Iterated quality via structured design feedback</li>
                  </ul>
                </div>
              </div>
            </Win>

            <div className="space-y-4">
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


              <Win title="Achievements">
                <ul className="font-[family-name:var(--font-mono)] text-base leading-snug space-y-1">
                  <li>★ Shipped 3 live products solo</li>
                  <li>★ MVP in &lt;7 days using AI-assisted dev</li>
                  <li>★ Bridged design + engineering end-to-end</li>
                </ul>
              </Win>

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
            </div>
          </div>
        </Win>
        </Reveal3D>

        {/* === CONNECT.exe === */}
        <Reveal3D>
        <Win title="Connect.exe" bodyClassName="!p-0">
          <div className="relative scanline bg-[color-mix(in_oklab,var(--color-sky-deep)_60%,var(--color-paper))] p-6 sm:p-14 text-center overflow-hidden">
            <h2 className="font-[family-name:var(--font-mono)] text-[clamp(1.75rem,7vw,4.5rem)] leading-[1.05] break-words">
              Want to work together?
              <br />
              <span className="text-coral">Let's chat!</span>
            </h2>
            <div className="mt-2 font-[family-name:var(--font-pixel)] text-[10px] uppercase opacity-70">
              [ press any link to continue ]<span className="animate-blink">_</span>
            </div>
            <div className="absolute bottom-4 right-4 size-12 border-2 border-ink bg-paper grid place-items-center animate-float-y">
              <Maximize2 size={18} strokeWidth={2.5} />
            </div>
          </div>
          <div className="p-5 sm:p-6 border-t-2 border-ink">
            <div className="max-w-xl mx-auto">
              <Win title="Contact Me">
                <ul className="font-[family-name:var(--font-mono)] text-lg space-y-1.5">
                  <li>
                    <a
                      href="/resume.pdf"
                      download
                      className="inline-flex items-center gap-1.5 font-[family-name:var(--font-pixel)] text-[10px] uppercase hover:bg-ink hover:text-paper px-3 py-2 border-2 border-ink bg-mint"
                    >
                      ↓ Download résumé.pdf
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail size={14} strokeWidth={2.5} />
                    <span className="font-[family-name:var(--font-pixel)] text-[9px] uppercase w-20">Email</span>
                    <a className="underline decoration-2 underline-offset-2 hover:bg-mint" href="mailto:bhilareruchi@gmail.com">
                      bhilareruchi@gmail.com
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Linkedin size={14} strokeWidth={2.5} />
                    <span className="font-[family-name:var(--font-pixel)] text-[9px] uppercase w-20">LinkedIn</span>
                    <a className="underline decoration-2 underline-offset-2 hover:bg-mint" href="https://www.linkedin.com/in/ruchi-b-87738826b/" target="_blank" rel="noopener noreferrer">
                      www.linkedin.com/in/ruchi-b-87738826b
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Github size={14} strokeWidth={2.5} />
                    <span className="font-[family-name:var(--font-pixel)] text-[9px] uppercase w-20">GitHub</span>
                    <a className="underline decoration-2 underline-offset-2 hover:bg-mint" href="https://github.com/its-ruchi" target="_blank" rel="noopener noreferrer">
                      github.com/its-ruchi
                    </a>
                  </li>
                </ul>
              </Win>
            </div>
          </div>
        </Win>
        </Reveal3D>

        {/* Taskbar footer */}
        <div className="border-2 border-ink bg-paper px-3 py-2 flex items-center justify-between font-[family-name:var(--font-pixel)] text-[9px] uppercase">
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
        </div>
      </main>
    </div>
  );
}
