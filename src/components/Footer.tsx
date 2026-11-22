"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Code2, Copy, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { getLenis } from "@/lib/lenis";
import { profile } from "@/lib/site";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "GitHub", href: profile.github, icon: Github },
  { label: "LeetCode", href: profile.leetcode, icon: Code2 },
];

const fieldClass =
  "w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-base text-white placeholder:text-white/35 font-light focus:outline-none focus:border-white transition-colors";

// Live local time in Bengaluru, rendered only on the client to avoid hydration mismatch
function useBengaluruTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" }).format(new Date());
    setTime(format());
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const Footer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isArrowHovered, setIsArrowHovered] = useState(false);
  const time = useBengaluruTime();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const website = new FormData(e.currentTarget).get("website");
    setLoading(true);
    setStatus(null);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });
      if (response.ok) {
        setStatus({ ok: true, text: "Message sent. I'll get back to you soon." });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus({ ok: false, text: `Couldn't send that. Email me directly at ${profile.email}.` });
      }
    } catch {
      setStatus({ ok: false, text: `Couldn't send that. Email me directly at ${profile.email}.` });
    } finally {
      setLoading(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const backToTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-black text-white font-kh-teka">
      {/* Background: faint grid + soft glows, same language as the project covers */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-indigo-600/20 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[520px] w-[520px] rounded-full bg-teal-500/10 blur-[140px]" />

      <div className="relative px-5 sm:px-8 md:px-12 lg:px-16 pt-20 sm:pt-24 md:pt-32">
        {/* Heading */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-white/60">Available for freelance projects</span>
          </div>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal leading-[0.95] tracking-[-0.02em] flex items-center gap-3 sm:gap-4"
            onMouseEnter={() => setIsArrowHovered(true)}
            onMouseLeave={() => setIsArrowHovered(false)}
          >
            <span>Let&apos;s talk</span>
            <motion.span
              className="text-white/30"
              animate={{ x: isArrowHovered ? 8 : 0, y: isArrowHovered ? 8 : 0, rotate: isArrowHovered ? 45 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              ↘
            </motion.span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/60 font-light leading-relaxed">
            Building something ambitious: real-time systems, agentic AI, or a product that has to ship? Tell me about it.
          </p>
        </div>

        {/* Contact + form */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 pb-16 sm:pb-20 border-b border-white/10">
          {/* Direct contact */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">Email</p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="text-xl sm:text-2xl md:text-3xl text-white break-all hover:text-white/70 transition-colors"
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:text-white hover:border-white/40 transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">Elsewhere</p>
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {socials.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-4 text-lg text-white/85 hover:text-white transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-white/50 group-hover:text-white transition-colors" />
                        {label}
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-white/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={profile.resumeUrl}
                    download={profile.resumeFileName}
                    className="group flex items-center justify-between py-4 text-lg text-white/85 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <Download className="h-5 w-5 text-white/50 group-hover:text-white transition-colors" />
                      Resume
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/35 group-hover:text-white/70 transition-colors">PDF</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-3 text-white/60">
              <MapPin className="h-4 w-4" />
              <span>Bengaluru, India</span>
              {time && (
                <>
                  <span className="text-white/20">/</span>
                  <span suppressHydrationWarning>{time} IST</span>
                </>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <Mail className="h-4 w-4 text-white/50" />
                <p className="text-xs uppercase tracking-[0.25em] text-white/50">Send a message</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <label className="block">
                    <span className="sr-only">Your name</span>
                    <input type="text" required maxLength={100} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className={fieldClass} />
                  </label>
                  <label className="block">
                    <span className="sr-only">Your email</span>
                    <input type="email" required maxLength={200} placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} className={fieldClass} />
                  </label>
                </div>
                <label className="block">
                  <span className="sr-only">Message</span>
                  <textarea
                    required
                    rows={4}
                    maxLength={5000}
                    placeholder="What are you building?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${fieldClass} resize-none`}
                  />
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending…" : "Send message"}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                  {status && (
                    <p role="status" className={`text-sm ${status.ok ? "text-emerald-400" : "text-red-400"}`}>
                      {status.text}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Navigation + back to top */}
        <div className="py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map(({ label, href }) => (
              <Link key={label} href={href} className="text-white/60 hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={backToTop}
            className="group inline-flex items-center gap-2 self-start md:self-auto text-white/60 hover:text-white transition-colors"
          >
            Back to top
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">↑</span>
          </button>
        </div>
      </div>

      {/* Oversized name, echoing the hero */}
      <div aria-hidden className="relative select-none px-3 sm:px-5 overflow-hidden">
        <p
          className="font-accent font-black leading-[0.8] tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-b from-white/[0.14] to-white/[0.01] whitespace-nowrap"
          style={{ fontSize: "clamp(2.5rem, 15vw, 17rem)" }}
        >
          YASHAVANTH
        </p>
      </div>

      <div className="relative px-5 sm:px-8 md:px-12 lg:px-16 py-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-white/40">
        <p>© {new Date().getFullYear()} Yashavanth R Siddesh</p>
        <p>Designed &amp; built in Bengaluru</p>
      </div>
    </footer>
  );
};

export default Footer;
