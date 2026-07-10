"use client";
import { useState, useEffect } from "react";
import {
  Play,
  ArrowUpRight,
  Circle,
  Globe,
  Mail,
  Link
} from "lucide-react";

const TOTAL_SECONDS = 225; // symbolic runtime of the page: 03:45
const FPS = 24;

function useScrollTimecode() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, Math.max(0, (scrollTop / max) * 100)) : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const totalFrames = Math.floor((progress / 100) * TOTAL_SECONDS * FPS);
  const mm = Math.floor(totalFrames / FPS / 60);
  const ss = Math.floor((totalFrames / FPS) % 60);
  const ff = totalFrames % FPS;
  const pad = (n: number): string => String(n).padStart(2, "0");
  const timecode = `${pad(mm)}:${pad(ss)}:${pad(ff)}`;

  return { progress, timecode };
}

const WORK = [
  { title: "Nova", sub: "Launch Film", tag: "Product Launch", dur: "00:38", from: "#F5C518", to: "#FF6155" },
  { title: "Fieldtrip", sub: "Social Cutdowns", tag: "Social Ads", dur: "00:15", from: "#3F5C34", to: "#F5C518" },
  { title: "Runwell", sub: "Founder Story", tag: "Brand Film", dur: "01:20", from: "#FF6155", to: "#3F5C34" },
  { title: "Haze", sub: "App Walkthrough", tag: "Explainer", dur: "00:52", from: "#F5C518", to: "#3F5C34" },
  { title: "Kiosk", sub: "Holiday Campaign", tag: "Seasonal", dur: "00:30", from: "#FF6155", to: "#F5C518" },
  { title: "Paloma", sub: "Investor Reel", tag: "Pitch", dur: "02:05", from: "#3F5C34", to: "#FF6155" },
];

const PLAYLIST = [
  {
    tc: "00:00",
    title: "Brief & Concept",
    body: "You send the vibe, the brand, the deadline. We turn it into a real concept and shot list, same week.",
  },
  {
    tc: "00:35",
    title: "AI Generation",
    body: "We generate footage, motion, and voice at a scale no camera crew can match — dozens of takes before lunch.",
  },
  {
    tc: "01:10",
    title: "Human Edit & Grade",
    body: "An editor and colorist shape the raw generations into something with actual rhythm, not just AI filler.",
  },
  {
    tc: "01:45",
    title: "Delivery & Rights",
    body: "Every cut, every ratio, every platform — delivered with full usage rights, no watermarks, no drama.",
  },
];

const COMMENTS = [
  { handle: "@nova.hq", text: "Shipped in two days what our old agency quoted six weeks for.", time: "2d ago" },
  { handle: "@fieldtripco", text: "Our socials finally look like they belong to a real brand.", time: "1w ago" },
  { handle: "@runwell", text: "Somehow it feels handmade even though half of it is AI. Wild.", time: "3w ago" },
];

export default function LemonadeStudioPage() {
  const { progress, timecode } = useScrollTimecode();
  const [form, setForm] = useState({ name: "", company: "", email: "", brief: "" });
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="ls-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

        .ls-root {
          --pulp: #FFF7E4;
          --card: #FFFDF6;
          --ink: #1C1B13;
          --zest: #F5C518;
          --blush: #FF6155;
          --rind: #3F5C34;
          --charcoal: #16150F;
          --line: rgba(28,27,19,0.12);
          background: var(--pulp);
          color: var(--ink);
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
          position: relative;
        }
        .ls-root * { box-sizing: border-box; }
        .ls-display { font-family: 'Bricolage Grotesque', sans-serif; }
        .ls-mono { font-family: 'JetBrains Mono', monospace; }

        .ls-nav {
          position: sticky; top: 0; z-index: 50;
          background: rgba(255,247,228,0.88);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--line);
        }
        .ls-nav-inner {
          max-width: 1180px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 28px;
        }
        .ls-logo { font-family:'Bricolage Grotesque',sans-serif; font-weight: 800; font-size: 17px; letter-spacing: -0.01em; display:flex; align-items:center; gap:8px;}
        .ls-logo .dot { width:9px; height:9px; border-radius:50%; background: var(--blush); animation: ls-blink 1.6s infinite; }
        .ls-links { display: flex; gap: 30px; font-size: 14px; font-weight: 500; }
        .ls-links a { color: var(--ink); text-decoration: none; opacity: 0.72; transition: opacity .2s; }
        .ls-links a:hover { opacity: 1; }
        .ls-nav-cta {
          font-size: 13px; font-weight: 600; padding: 9px 18px; border-radius: 999px;
          background: var(--ink); color: var(--pulp); text-decoration: none;
          display:flex; align-items:center; gap:6px;
        }
        .ls-scrub {
          height: 3px; width: 100%; background: var(--line); position: relative;
        }
        .ls-scrub-fill {
          position: absolute; left:0; top:0; height:100%; background: var(--blush);
        }
        .ls-tc-readout {
          position: fixed; bottom: 18px; right: 18px; z-index: 50;
          background: var(--charcoal); color: var(--zest);
          padding: 8px 12px; border-radius: 8px; font-size: 12px;
          letter-spacing: 0.06em; box-shadow: 0 8px 24px rgba(0,0,0,0.25);
          display:flex; align-items:center; gap:8px;
        }
        .ls-tc-readout .rec { width:7px;height:7px;border-radius:50%; background: var(--blush); animation: ls-blink 1.6s infinite; }
        @media (max-width: 720px) { .ls-tc-readout { display:none; } }

        section { max-width: 1180px; margin: 0 auto; padding: 100px 28px; }
        @media (max-width: 860px) { section { padding: 64px 22px; } }

        .ls-eyebrow {
          font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--rind); font-weight: 600; display:flex; align-items:center; gap:8px; margin-bottom: 20px;
        }
        .ls-eyebrow::before { content:''; width: 20px; height:1px; background: var(--rind); }

        /* HERO */
        .ls-hero { padding-top: 84px; }
        .ls-hero-grid { display:grid; grid-template-columns: 1.05fr 0.95fr; gap: 56px; align-items:center; }
        @media (max-width: 940px) { .ls-hero-grid { grid-template-columns: 1fr; } }
        .ls-h1 {
          font-family:'Bricolage Grotesque',sans-serif; font-weight: 800;
          font-size: clamp(2.6rem, 5.6vw, 4.4rem); line-height: 0.98; letter-spacing: -0.02em; margin: 0 0 22px;
        }
        .ls-h1 span { color: var(--blush); }
        .ls-sub { font-size: 17px; line-height: 1.6; opacity: 0.78; max-width: 480px; margin-bottom: 34px; }
        .ls-cta-row { display:flex; gap: 14px; flex-wrap: wrap; }
        .ls-btn-primary {
          background: var(--ink); color: var(--pulp); border:none; border-radius: 999px;
          padding: 15px 26px; font-weight: 600; font-size: 14.5px; display:flex; align-items:center; gap:8px;
          cursor:pointer; text-decoration:none; transition: transform .15s;
        }
        .ls-btn-primary:hover { transform: translateY(-2px); }
        .ls-btn-ghost {
          border: 1.5px solid var(--ink); color: var(--ink); background: transparent; border-radius: 999px;
          padding: 15px 26px; font-weight: 600; font-size: 14.5px; display:flex; align-items:center; gap:8px;
          cursor:pointer; text-decoration:none; transition: background .15s;
        }
        .ls-btn-ghost:hover { background: rgba(28,27,19,0.06); }

        .ls-frame {
          position: relative; aspect-ratio: 4/5; border-radius: 22px; overflow:hidden;
          background: linear-gradient(145deg, var(--zest), var(--blush));
          box-shadow: 0 30px 60px -20px rgba(28,27,19,0.35);
        }
        .ls-frame-top {
          position:absolute; top:16px; left:16px; right:16px; display:flex; justify-content:space-between; align-items:center;
        }
        .ls-frame-rec { display:flex; align-items:center; gap:6px; background: rgba(22,21,15,0.55); color:#fff; font-size:11px; padding:5px 10px; border-radius: 999px; }
        .ls-frame-rec .dotr { width:6px;height:6px;border-radius:50%;background:#ff453a; animation: ls-blink 1.4s infinite; }
        .ls-frame-play {
          position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
          width: 74px; height:74px; border-radius:50%; background: rgba(255,255,255,0.92);
          display:flex; align-items:center; justify-content:center; box-shadow: 0 10px 30px rgba(0,0,0,0.25);
        }
        .ls-frame-bottom {
          position:absolute; bottom:16px; left:16px; right:16px; display:flex; justify-content:space-between; align-items:flex-end;
        }
        .ls-frame-name { font-size: 10.5px; color: rgba(22,21,15,0.7); background: rgba(255,255,255,0.55); padding:4px 8px; border-radius:6px; }
        .ls-frame-dur { font-size: 11px; background: rgba(22,21,15,0.7); color:#fff; padding:4px 9px; border-radius:6px; }

        /* LOGOS */
        .ls-logos-wrap { padding-top: 40px; padding-bottom: 40px; }
        .ls-logos-label { text-align:center; margin-bottom: 26px; }
        .ls-logos-row { display:flex; flex-wrap:wrap; justify-content:center; gap: 42px; opacity: 0.55; font-weight:700; font-size: 18px; font-family:'Bricolage Grotesque',sans-serif; }

        /* WORK */
        .ls-section-head { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom: 44px; flex-wrap:wrap; gap: 16px; }
        .ls-h2 { font-family:'Bricolage Grotesque',sans-serif; font-weight: 800; font-size: clamp(1.8rem, 3.4vw, 2.6rem); letter-spacing:-0.02em; margin:0; }
        .ls-work-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        @media (max-width: 940px) { .ls-work-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .ls-work-grid { grid-template-columns: 1fr; } }
        .ls-work-card { border-radius: 16px; overflow:hidden; background: var(--card); border: 1px solid var(--line); }
        .ls-work-thumb { aspect-ratio: 16/10; position:relative; display:flex; align-items:center; justify-content:center; }
        .ls-work-thumb .ls-work-play {
          width: 46px; height:46px; border-radius:50%; background: rgba(255,255,255,0.85);
          display:flex; align-items:center; justify-content:center; opacity:0; transform: scale(0.85);
          transition: all .2s;
        }
        .ls-work-card:hover .ls-work-play { opacity:1; transform: scale(1); }
        .ls-work-dur { position:absolute; bottom:10px; right:10px; font-size:11px; background: rgba(22,21,15,0.72); color:#fff; padding: 3px 8px; border-radius:5px; }
        .ls-work-body { padding: 16px 18px 18px; }
        .ls-work-title { font-family:'Bricolage Grotesque',sans-serif; font-weight:700; font-size:17px; margin: 0 0 3px; }
        .ls-work-sub { font-size: 13.5px; opacity:0.65; margin: 0 0 10px; }
        .ls-work-tag { font-size: 11px; letter-spacing:0.05em; text-transform:uppercase; color: var(--rind); font-weight:600; }

        /* PLAYLIST / PROCESS */
        .ls-playlist-section { background: var(--card); border-radius: 28px; margin: 0 auto; }
        .ls-playlist-row {
          display:grid; grid-template-columns: 90px 220px 1fr; gap: 24px; padding: 26px 0;
          border-top: 1px solid var(--line); align-items:start;
        }
        .ls-playlist-row:last-child { border-bottom: 1px solid var(--line); }
        @media (max-width: 760px) { .ls-playlist-row { grid-template-columns: 60px 1fr; } .ls-playlist-row .ls-pl-title { grid-column: 2; } .ls-playlist-row .ls-pl-body { grid-column: 1/-1; } }
        .ls-pl-tc { font-family:'JetBrains Mono',monospace; font-size: 13px; color: var(--blush); font-weight:700; padding-top:2px; }
        .ls-pl-title { font-family:'Bricolage Grotesque',sans-serif; font-weight:700; font-size: 18px; }
        .ls-pl-body { font-size: 14.5px; line-height:1.6; opacity:0.72; }

        /* STATS */
        .ls-stats-wrap { background: var(--charcoal); color: var(--pulp); border-radius: 28px; }
        .ls-stats-grid { display:grid; grid-template-columns: repeat(3,1fr); gap: 20px; text-align:center; }
        @media (max-width: 720px) { .ls-stats-grid { grid-template-columns: 1fr; gap: 40px; } }
        .ls-stat-num { font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size: clamp(2.4rem,5vw,3.4rem); color: var(--zest); line-height:1; margin-bottom:10px; }
        .ls-stat-label { font-size: 13.5px; opacity:0.65; }

        /* COMMENTS */
        .ls-comments { display:flex; flex-direction:column; gap: 16px; max-width: 640px; }
        .ls-comment { background: var(--card); border:1px solid var(--line); border-radius: 14px; padding: 18px 20px; }
        .ls-comment-top { display:flex; justify-content:space-between; font-family:'JetBrains Mono',monospace; font-size:12.5px; margin-bottom:8px; }
        .ls-comment-handle { color: var(--rind); font-weight:700; }
        .ls-comment-time { opacity:0.5; }
        .ls-comment-text { font-size: 15px; line-height:1.55; }

        /* CONTACT */
        .ls-contact-grid { display:grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items:start; }
        @media (max-width: 860px) { .ls-contact-grid { grid-template-columns: 1fr; gap: 32px; } }
        .ls-field { margin-bottom: 16px; }
        .ls-field label { display:block; font-size: 12px; text-transform:uppercase; letter-spacing:0.08em; font-weight:600; opacity:0.6; margin-bottom: 7px; }
        .ls-field input, .ls-field textarea {
          width:100%; border: 1.5px solid var(--line); background: var(--card); border-radius: 10px;
          padding: 12px 14px; font-family:'Inter',sans-serif; font-size: 14.5px; color: var(--ink); outline:none;
          transition: border-color .15s;
        }
        .ls-field input:focus, .ls-field textarea:focus { border-color: var(--blush); }
        .ls-field textarea { resize: vertical; min-height: 96px; }
        .ls-sent { padding: 16px 18px; background: var(--rind); color: var(--pulp); border-radius: 12px; font-size: 14.5px; }

        /* FOOTER */
        .ls-footer { background: var(--charcoal); color: var(--pulp); }
        .ls-footer-inner { max-width:1180px; margin:0 auto; padding: 48px 28px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px; }
        .ls-footer-tag { font-family:'JetBrains Mono',monospace; font-size: 12px; opacity:0.55; letter-spacing:0.05em; }
        .ls-footer-social { display:flex; gap:16px; }
        .ls-footer-social a { color: var(--pulp); opacity:0.7; transition: opacity .2s; }
        .ls-footer-social a:hover { opacity:1; }

        @keyframes ls-blink { 0%,100% { opacity:1; } 50% { opacity:0.15; } }
      `}</style>

      {/* NAV */}
      <div className="ls-nav">
        <div className="ls-nav-inner">
          <div className="ls-logo"><span className="dot" />LEMONADE STUDIO</div>
          <div className="ls-links">
            <a href="#work">Work</a>
            <a href="#playbook">Playbook</a>
            <a href="#reviews">Reviews</a>
          </div>
          <a href="#contact" className="ls-nav-cta">Book a session <ArrowUpRight size={14} /></a>
        </div>
        <div className="ls-scrub">
          <div className="ls-scrub-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="ls-tc-readout ls-mono"><span className="rec" />{timecode}</div>

      {/* HERO */}
      <section className="ls-hero">
        <div className="ls-hero-grid">
          <div>
            <div className="ls-eyebrow">AI Video Studio — est. frame one</div>
            <h1 className="ls-h1">Video,<br /><span>fresh-pressed</span><br />daily.</h1>
            <p className="ls-sub">
              We turn your brand brief into scroll-stopping video — concepted, generated, and
              graded by actual humans, delivered before your competitors finish their storyboard.
            </p>
            <div className="ls-cta-row">
              <a href="#contact" className="ls-btn-primary">Book a session <ArrowUpRight size={16} /></a>
              <a href="#work" className="ls-btn-ghost"><Play size={15} /> Watch the reel</a>
            </div>
          </div>
          <div className="ls-frame">
            <div className="ls-frame-top">
              <div className="ls-frame-rec"><span className="dotr" />REC</div>
            </div>
            <div className="ls-frame-play"><Play size={26} color="#1C1B13" fill="#1C1B13" /></div>
            <div className="ls-frame-bottom">
              <div className="ls-frame-name ls-mono">LEMONADE_REEL_2026.mp4</div>
              <div className="ls-frame-dur ls-mono">00:42</div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="ls-logos-wrap">
        <div className="ls-logos-label ls-eyebrow" style={{ justifyContent: "center" }}>
          Currently in rotation for
        </div>
        <div className="ls-logos-row">
          <span>NOVA</span><span>FIELDTRIP</span><span>RUNWELL</span><span>HAZE</span><span>KIOSK</span><span>PALOMA</span>
        </div>
      </section>

      {/* WORK */}
      <section id="work">
        <div className="ls-section-head">
          <h2 className="ls-h2">Recent cuts.</h2>
          <div className="ls-eyebrow" style={{ marginBottom: 0 }}>6 projects, one timeline</div>
        </div>
        <div className="ls-work-grid">
          {WORK.map((w) => (
            <div className="ls-work-card" key={w.title}>
              <div className="ls-work-thumb" style={{ background: `linear-gradient(150deg, ${w.from}, ${w.to})` }}>
                <div className="ls-work-play"><Play size={18} color="#1C1B13" fill="#1C1B13" /></div>
                <div className="ls-work-dur ls-mono">{w.dur}</div>
              </div>
              <div className="ls-work-body">
                <p className="ls-work-title">{w.title} / {w.sub}</p>
                <p className="ls-work-tag">{w.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PLAYLIST / PROCESS */}
      <section id="playbook">
        <div className="ls-section-head">
          <h2 className="ls-h2">One timeline. Four moves.</h2>
          <div className="ls-eyebrow" style={{ marginBottom: 0 }}>Scrub through the process</div>
        </div>
        <div className="ls-playlist-section" style={{ padding: "0 32px" }}>
          {PLAYLIST.map((p) => (
            <div className="ls-playlist-row" key={p.tc}>
              <div className="ls-pl-tc">{p.tc}</div>
              <div className="ls-pl-title">{p.title}</div>
              <div className="ls-pl-body">{p.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section>
        <div className="ls-stats-wrap" style={{ padding: "64px 40px" }}>
          <div className="ls-stats-grid">
            <div>
              <div className="ls-stat-num">10x</div>
              <div className="ls-stat-label">faster than a traditional shoot</div>
            </div>
            <div>
              <div className="ls-stat-num">48hrs</div>
              <div className="ls-stat-label">average turnaround on a first cut</div>
            </div>
            <div>
              <div className="ls-stat-num">100%</div>
              <div className="ls-stat-label">human-reviewed before it ships</div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews">
        <div className="ls-section-head">
          <h2 className="ls-h2">What they're saying.</h2>
        </div>
        <div className="ls-comments">
          {COMMENTS.map((c) => (
            <div className="ls-comment" key={c.handle}>
              <div className="ls-comment-top">
                <span className="ls-comment-handle">{c.handle}</span>
                <span className="ls-comment-time">{c.time}</span>
              </div>
              <div className="ls-comment-text">{c.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="ls-contact-grid">
          <div>
            <div className="ls-eyebrow">Let's make something</div>
            <h2 className="ls-h2" style={{ marginBottom: 16 }}>Got a brand?<br />Let's shoot it.</h2>
            <p className="ls-sub" style={{ marginBottom: 0 }}>
              Tell us what you're building and what it's for. We'll come back with a concept,
              a timeline, and a number — usually within a day.
            </p>
          </div>
          <div>
            {sent ? (
              <div className="ls-sent">Sent — we'll be in touch within a day. Go grab a lemonade.</div>
            ) : (
              <form onSubmit={onSubmit}>
                <div className="ls-field">
                  <label>Name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                </div>
                <div className="ls-field">
                  <label>Company</label>
                  <input required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Your company" />
                </div>
                <div className="ls-field">
                  <label>Email</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" />
                </div>
                <div className="ls-field">
                  <label>The brief</label>
                  <textarea value={form.brief} onChange={(e) => setForm({ ...form, brief: e.target.value })} placeholder="What are we making, and for what?" />
                </div>
                <button type="submit" className="ls-btn-primary" style={{ border: "none", width: "100%", justifyContent: "center" }}>
                  Send it — press record <ArrowUpRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ls-footer">
        <div className="ls-footer-inner">
          <div className="ls-footer-tag">LEMONADE STUDIO © 2026 — SHOT ON AI. CUT BY HUMANS.</div>
          <div className="ls-footer-social">
            <Globe size={18} />
            <Link size={18} />
            <Mail size={18} />
          </div>
        </div>
      </footer>
    </div>
  );
}
