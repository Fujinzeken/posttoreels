"use client";

import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import {
  Play,
  Pause,
  ArrowRight,
  TrendingUp,
  Zap,
  Flame,
  Star,
  BarChart3,
  CheckCircle2,
  RefreshCw,
  ChevronRight,
} from "lucide-react";

// --- Simulated Live Install Ticker ---
function InstallTicker({ base }: { base: number }) {
  const [count, setCount] = useState(base);
  useEffect(() => {
    const t = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 4 + 1));
    }, 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="tabular-nums font-mono font-bold text-emerald-400">
      +{count.toLocaleString()}
    </span>
  );
}

// --- Reel Formats to Demonstrate ---
const FORMATS = [
  {
    id: "ugc",
    label: "Human UGC",
    color: "#cff728",
    tag: "🎯 Creator Hook",
    hookHeadline: `"I deleted Notion and never went back."`,
    subline: "Real creator voice — feeds watch it to the end",
    platform: "TikTok",
    views: "142K",
    installs: 1840,
    barData: [30, 55, 40, 75, 62, 90, 85, 100, 92],
  },
  {
    id: "tour",
    label: "In-App Tour",
    color: "#818cf8",
    tag: "🎬 Auto-Zoomed",
    hookHeadline: `"Watch how fast this workflow is in 30 seconds."`,
    subline: "Screen recording → vertical 9:16 with smart zooms",
    platform: "Instagram Reels",
    views: "88K",
    installs: 3120,
    barData: [20, 35, 60, 45, 80, 70, 95, 88, 100],
  },
  {
    id: "meme",
    label: "Viral Meme",
    color: "#f472b6",
    tag: "🔥 Trending Format",
    hookHeadline: `"Me vs my to-do list at 2AM (I won this time)"`,
    subline: "Trending meme + app footage = organic reach",
    platform: "YouTube Shorts",
    views: "319K",
    installs: 2640,
    barData: [10, 25, 45, 80, 55, 70, 100, 95, 88],
  },
  {
    id: "carousel",
    label: "Carousel Story",
    color: "#34d399",
    tag: "📱 5-Slide Swipe",
    hookHeadline: `"Your app shipped. Why does nobody know it exists?"`,
    subline: "Swipe-to-install narrative funnel — highest CTR",
    platform: "TikTok + Reels",
    views: "204K",
    installs: 4210,
    barData: [40, 50, 35, 65, 88, 72, 90, 100, 95],
  },
];

// --- Animated Bar Chart ---
function MiniBarChart({ data, color }: { data: number[]; color: string }) {
  return (
    <div className="flex h-12 items-end gap-[3px]">
      {data.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm transition-all duration-700"
          style={{
            height: `${h}%`,
            background: `${color}`,
            opacity: 0.2 + (i / data.length) * 0.8,
          }}
        />
      ))}
    </div>
  );
}

// --- Platform icon mini ---
function PlatformDot({ platform }: { platform: string }) {
  const map: Record<string, string> = {
    TikTok: "bg-neutral-900 border-white/20",
    "Instagram Reels": "bg-gradient-to-br from-amber-500 to-purple-600",
    "YouTube Shorts": "bg-red-600",
    "TikTok + Reels": "bg-gradient-to-br from-neutral-900 to-purple-700",
  };
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${map[platform] ?? "bg-white/30"}`}
    />
  );
}

export default function HeroEngine() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const format = FORMATS[activeIdx];

  // Auto-advance
  useEffect(() => {
    if (!playing) return;
    timerRef.current = setInterval(() => advance(1), 4500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, activeIdx]);

  const advance = (dir: 1 | -1) => {
    setAnimating(true);
    setTimeout(() => {
      setActiveIdx((i) => (i + dir + FORMATS.length) % FORMATS.length);
      setAnimating(false);
    }, 220);
  };

  const handleApprove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    confetti({
      particleCount: 35,
      spread: 60,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: rect.top / window.innerHeight,
      },
      colors: ["#10b981", "#cff728", "#ffffff", "#818cf8"],
      disableForReducedMotion: true,
    });
    advance(1);
  };

  return (
    <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 xl:gap-14">
      {/* ============ LEFT PANEL: Format Selector ============ */}
      <div className="flex flex-col gap-3 lg:w-[260px] xl:w-[280px] shrink-0">
        <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-white/30">
          <span className="h-px flex-1 bg-white/10" />
          FORMAT
          <span className="h-px flex-1 bg-white/10" />
        </div>
        {FORMATS.map((f, i) => (
          <button
            key={f.id}
            onClick={() => {
              setAnimating(true);
              setTimeout(() => {
                setActiveIdx(i);
                setAnimating(false);
              }, 220);
            }}
            className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
              i === activeIdx
                ? "border-white/20 bg-white/[0.08] shadow-[0_0_24px_-8px_rgba(16,185,129,0.3)]"
                : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.05]"
            }`}
          >
            {/* Left accent bar */}
            <div
              className="h-8 w-0.5 shrink-0 rounded-full transition-all duration-300"
              style={{
                background:
                  i === activeIdx ? f.color : "rgba(255,255,255,0.15)",
              }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span
                  className="text-[13px] font-semibold transition-colors"
                  style={{
                    color: i === activeIdx ? f.color : "rgba(255,255,255,0.7)",
                  }}
                >
                  {f.label}
                </span>
                {i === activeIdx && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </span>
                )}
              </div>
              <div className="mt-0.5 flex items-center gap-1.5">
                <PlatformDot platform={f.platform} />
                <span className="text-[11px] text-white/35">{f.platform}</span>
              </div>
            </div>
            {/* Hover shimmer */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}

        {/* Playback controls */}
        <div className="mt-1 flex items-center gap-2">
          <button
            onClick={() => advance(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/50 transition hover:bg-white/[0.08] hover:text-white"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
          </button>
          <button
            onClick={() => setPlaying(!playing)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/50 transition hover:bg-white/[0.08] hover:text-white"
          >
            {playing ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 ml-0.5" />
            )}
          </button>
          <button
            onClick={() => advance(1)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/50 transition hover:bg-white/[0.08] hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <span className="ml-auto font-mono text-[11px] text-white/25">
            {activeIdx + 1} / {FORMATS.length}
          </span>
        </div>
      </div>

      {/* ============ CENTER: Vertical Reel Preview ============ */}
      <div className="flex flex-1 flex-col items-center gap-5">
        {/* Top label */}
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ background: format.color }}
          />
          Live preview · {format.platform}
        </div>

        {/* The Reel Card */}
        <div
          className="relative w-[200px] sm:w-[220px] xl:w-[240px] transition-all duration-300"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating
              ? "scale(0.96) translateY(8px)"
              : "scale(1) translateY(0)",
          }}
        >
          <div
            className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]"
            style={{ borderColor: `${format.color}22` }}
          >
            {/* Gradient background based on format */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 30% 20%, ${format.color}22 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, ${format.color}11 0%, transparent 50%), #0d0e14`,
              }}
            />

            {/* Cosmic grid overlay */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Format Tag badge */}
            <div className="absolute left-3 right-3 top-4 z-20 flex items-center justify-between">
              <span
                className="rounded-full border px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest backdrop-blur-md"
                style={{
                  borderColor: `${format.color}40`,
                  color: format.color,
                  background: `${format.color}12`,
                }}
              >
                {format.tag}
              </span>
              <span className="rounded-full border border-white/10 bg-black/40 px-2 py-1 font-mono text-[9px] text-white/60 backdrop-blur-md">
                ● REC
              </span>
            </div>

            {/* Center content */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
              {/* Waveform for UGC */}
              {format.id === "ugc" && (
                <div className="mb-4 flex items-end gap-[2px] h-8">
                  {[45, 70, 90, 55, 85, 100, 65, 80, 40, 95, 70].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-full"
                      style={{
                        height: `${h}%`,
                        background: format.color,
                        opacity: 0.5 + (i / 11) * 0.5,
                        animation: `pulse ${1 + (i % 3) * 0.4}s ease-in-out infinite alternate`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* App mockup for tour */}
              {format.id === "tour" && (
                <div className="mb-4 w-full rounded-lg border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 pb-2 border-b border-white/10">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
                    <span className="ml-1 font-mono text-[8px] text-white/30">
                      yourapp.io
                    </span>
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="h-2 w-3/4 rounded bg-white/10 animate-pulse" />
                    <div className="h-6 w-full rounded-md bg-indigo-500/20 border border-indigo-400/20 flex items-center px-2">
                      <span className="text-[8px] text-indigo-300 font-medium">
                        ⚡ 1-Click Sync
                      </span>
                    </div>
                    <div className="h-2 w-1/2 rounded bg-white/10" />
                  </div>
                </div>
              )}

              {/* Meme bubble */}
              {format.id === "meme" && (
                <div className="mb-4 rounded-2xl border border-white/10 bg-white/90 p-3">
                  <p className="font-mono text-[8px] font-bold uppercase text-stone-400">
                    POV: Indie founder
                  </p>
                  <div className="mt-1 text-[11px] font-bold leading-tight text-stone-900">
                    Finding a tool that posts my reels & tracks every install 🤯
                  </div>
                </div>
              )}

              {/* Carousel slides indicator */}
              {format.id === "carousel" && (
                <div className="mb-4 w-full space-y-2">
                  <div className="flex justify-center gap-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span
                        key={i}
                        className={`h-1 rounded-full ${i === 0 ? "w-5 bg-white" : "w-1 bg-white/25"}`}
                      />
                    ))}
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-left">
                    <span
                      className="font-mono text-[8px] font-bold uppercase tracking-wider"
                      style={{ color: format.color }}
                    >
                      SLIDE 01 · THE HOOK
                    </span>
                    <p className="mt-1 text-[10px] font-bold leading-tight text-white/90">
                      Your app is good. Your content strategy isn&apos;t.
                      Let&apos;s fix that.
                    </p>
                  </div>
                </div>
              )}

              {/* Hook quote */}
              <div className="rounded-2xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
                <p className="text-[11px] font-bold leading-snug text-white">
                  {format.hookHeadline}
                </p>
              </div>
            </div>

            {/* Bottom conversion badge */}
            <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/70 px-3 py-2.5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-2.5 w-2.5 text-emerald-400" />
                    <span className="font-mono text-[9px] font-bold text-emerald-400">
                      <InstallTicker base={format.installs} /> installs
                    </span>
                  </div>
                  <span className="text-[9px] text-white/35">
                    {format.views} views
                  </span>
                </div>
                <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1">
                  <Star className="h-2.5 w-2.5 text-amber-400 fill-amber-400" />
                  <span className="font-mono text-[9px] font-bold text-white/70">
                    App Store
                  </span>
                </div>
              </div>
            </div>

            {/* Glow edge effect */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-40"
              style={{ boxShadow: `inset 0 0 60px -20px ${format.color}` }}
            />
          </div>

          {/* Glow drop shadow beneath the card */}
          <div
            className="absolute -inset-x-6 -bottom-8 -top-4 -z-10 blur-3xl opacity-20 rounded-full"
            style={{ background: format.color }}
          />
        </div>

        {/* Review action dock */}
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-xl">
          <button
            onClick={() => advance(1)}
            className="flex h-10 items-center gap-2 rounded-xl px-4 text-[13px] font-semibold text-white/50 transition hover:bg-white/[0.07] hover:text-white"
          >
            Skip
          </button>
          <button
            onClick={handleApprove}
            className="group flex h-10 items-center gap-2 overflow-hidden rounded-xl bg-emerald-500 px-5 text-[13px] font-bold text-white shadow-[0_0_20px_-6px_rgba(16,185,129,0.7)] transition hover:bg-emerald-400 active:scale-[0.97]"
          >
            <CheckCircle2 className="h-4 w-4" />
            Approve &amp; Schedule
          </button>
          <button
            onClick={() => setPlaying(!playing)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white/35 transition hover:bg-white/[0.07] hover:text-white"
          >
            {playing ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 ml-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* ============ RIGHT PANEL: Live Conversion Analytics ============ */}
      <div className="flex flex-col gap-3 lg:w-[240px] xl:w-[260px] shrink-0">
        <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-white/30">
          <span className="h-px flex-1 bg-white/10" />
          ANALYTICS
          <span className="h-px flex-1 bg-white/10" />
        </div>

        {/* Installs Card */}
        <div
          className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-4"
          style={{ boxShadow: `0 0 30px -15px ${format.color}40` }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-white/35">
                Installs Today
              </p>
              <p className="mt-1 text-2xl font-bold text-white tabular-nums">
                <InstallTicker base={format.installs} />
              </p>
            </div>
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: `${format.color}18` }}
            >
              <TrendingUp className="h-4 w-4" style={{ color: format.color }} />
            </div>
          </div>
          <div className="mt-3">
            <MiniBarChart data={format.barData} color={format.color} />
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <Flame className="h-3 w-3 text-orange-400" />
            <span className="text-[11px] text-white/40">
              Up <span className="font-bold text-emerald-400">+23%</span> vs
              last week
            </span>
          </div>
        </div>

        {/* Publishing Schedule */}
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-white/35">
            Queued for Publishing
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {[
              { platform: "TikTok", day: "Today · 6:00 PM", color: "#fff" },
              { platform: "Reels", day: "Wed · 12:30 PM", color: "#e879f9" },
              { platform: "Shorts", day: "Thu · 9:00 AM", color: "#f87171" },
            ].map(({ platform, day, color }) => (
              <div
                key={platform}
                className="flex items-center gap-2.5 rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-2"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: color }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold text-white/80">
                    {platform}
                  </p>
                  <p className="text-[10px] text-white/30">{day}</p>
                </div>
                <span className="rounded-md bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[9px] font-bold text-emerald-400">
                  ✓
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* App Store Rank Card */}
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-white/35">
              App Store Rank
            </p>
            <RefreshCw className="h-3 w-3 text-white/20" />
          </div>
          <div className="mt-2 flex items-end gap-1">
            <span className="text-3xl font-black text-white leading-none">
              #4
            </span>
            <span className="mb-0.5 text-sm text-white/40">Productivity</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <BarChart3 className="h-3 w-3 text-indigo-400" />
            <span className="text-[11px] text-white/40">
              Was <span className="line-through">#18</span> before Reelstostore
            </span>
          </div>
        </div>

        {/* Format subtext */}
        <p className="px-1 text-[11px] leading-relaxed text-white/25">
          {format.subline}
        </p>
      </div>
    </div>
  );
}
