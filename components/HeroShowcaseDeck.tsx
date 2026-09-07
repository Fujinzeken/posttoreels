"use client";

import { useState, useEffect, useRef } from "react";
import { Check, X, Play, Pause, Sparkles, Download, Star, Volume2, ArrowRight, TrendingUp } from "lucide-react";
import confetti from "canvas-confetti";

interface PostCard {
  id: string;
  type: "Human UGC" | "In-App Tour" | "Viral Meme" | "Carousel";
  duration: string;
  hookText: string;
  subText: string;
  appName: string;
  rating: string;
  installs: string;
  gradientBg: string;
  accentColor: string;
  badge: string;
  tagline: string;
}

const POSTS: PostCard[] = [
  {
    id: "post-ugc",
    type: "Human UGC",
    duration: "18 sec",
    hookText: "Stop running boring ads. This app literally replaced 3 full-time assistants.",
    subText: "Real creator hook · feed-native retention",
    appName: "FlowState AI",
    rating: "4.9 ★",
    installs: "+2,430 installs",
    gradientBg: "from-stone-900 via-neutral-900 to-stone-950",
    accentColor: "#d2fb32",
    badge: "App Store #3 Productivity",
    tagline: "High-retention creator opener",
  },
  {
    id: "post-flow",
    type: "In-App Tour",
    duration: "24 sec",
    hookText: "The 30-second workflow every founder is using to 10x output this week.",
    subText: "Auto-zoomed vertical demo · zero filming needed",
    appName: "Briefly Mac",
    rating: "4.8 ★",
    installs: "+4,120 installs",
    gradientBg: "from-neutral-950 via-stone-900 to-neutral-900",
    accentColor: "#60a5fa",
    badge: "Trending in App Store",
    tagline: "Dynamic UI gesture zooms",
  },
  {
    id: "post-meme",
    type: "Viral Meme",
    duration: "6 sec",
    hookText: "Me promising myself I'll stick to spreadsheets vs. finding this app at 2 AM",
    subText: "Trending meme audio sync · 8.4% tap rate",
    appName: "LedgerIQ",
    rating: "4.9 ★",
    installs: "+1,890 installs",
    gradientBg: "from-stone-900 via-zinc-900 to-stone-950",
    accentColor: "#f472b6",
    badge: "Viral feed format",
    tagline: "Pop-culture template sync",
  },
  {
    id: "post-carousel",
    type: "Carousel",
    duration: "5 slides",
    hookText: "Your app shipped last month. Why does nobody know it exists yet?",
    subText: "5-slide visual breakdown · swipe-optimized",
    appName: "StackPulse",
    rating: "5.0 ★",
    installs: "+3,210 installs",
    gradientBg: "from-neutral-900 via-stone-900 to-black",
    accentColor: "#34d399",
    badge: "Educational Authority",
    tagline: "Swipe-to-install funnel",
  },
];

export default function HeroShowcaseDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [approvedNotification, setApprovedNotification] = useState<string | null>(null);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto cycle cards when isPlaying
  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % POSTS.length);
    }, 4200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % POSTS.length);
  };

  const handleSkip = () => {
    setActiveIndex((prev) => (prev + 1) % POSTS.length);
  };

  const handleApprove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 28,
      spread: 55,
      origin: { x, y },
      colors: ["#d2fb32", "#1c1917", "#ffffff"],
      disableForReducedMotion: true,
    });

    const approvedPost = POSTS[activeIndex];
    setApprovedNotification(`Approved for TikTok & Reels publishing!`);
    setTimeout(() => setApprovedNotification(null), 2500);

    handleNext();
  };

  // Touch / Drag handling
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (dragStartX === null) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragDeltaX(clientX - dragStartX);
  };

  const handleTouchEnd = () => {
    if (dragStartX !== null) {
      if (dragDeltaX > 50) {
        // Dragged right -> Approve
        handleNext();
      } else if (dragDeltaX < -50) {
        // Dragged left -> Skip
        handleSkip();
      }
    }
    setDragStartX(null);
    setDragDeltaX(0);
  };

  return (
    <div className="relative mx-auto w-full max-w-[36rem] lg:max-w-[38rem] select-none">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute -inset-10 z-0 opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(210, 251, 50, 0.22) 0%, transparent 68%)",
        }}
        aria-hidden="true"
      />

      {/* Floating Scheduled Social Receipt: TikTok (Top-Left) */}
      <div
        className="hidden sm:flex pointer-events-none absolute -left-6 lg:-left-10 top-12 z-40 items-center gap-3 rounded-2xl border border-stone-900/10 bg-white/95 px-3.5 py-2 shadow-[0_16px_36px_-14px_rgba(28,25,23,0.28)] backdrop-blur-md transition-all duration-300 animate-float-slow"
      >
        {/* TikTok SVG Icon */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-black text-white shadow-sm">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-6.05 6.32 6.34 6.34 0 0 0 10.85 4.47 6.27 6.27 0 0 0 1.87-4.47V8.62a8.16 8.16 0 0 0 4.9 1.62V6.8a4.85 4.85 0 0 1-2.31-.11Z" />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.1em] text-stone-500">
              Scheduled · TikTok
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <span className="block text-[12px] font-bold text-stone-900 leading-tight">
            Tue · 6:00 PM
          </span>
          <span className="text-[10px] text-stone-500 flex items-center gap-1 font-medium">
            <TrendingUp className="h-2.5 w-2.5 text-emerald-600" />
            Direct App Store link in bio
          </span>
        </div>
      </div>

      {/* Floating Scheduled Social Receipt: Instagram (Top-Right) */}
      <div
        className="hidden sm:flex pointer-events-none absolute -right-6 lg:-right-10 top-24 z-40 items-center gap-3 rounded-2xl border border-stone-900/10 bg-white/95 px-3.5 py-2 shadow-[0_16px_36px_-14px_rgba(28,25,23,0.28)] backdrop-blur-md transition-all duration-300 animate-float-medium"
      >
        {/* Instagram SVG Icon */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-sm">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.1em] text-stone-500">
              Published · Reels
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>
          <span className="block text-[12px] font-bold text-stone-900 leading-tight">
            52.4k views · +840 installs
          </span>
          <span className="text-[10px] text-stone-500 font-medium">
            Story Sticker active
          </span>
        </div>
      </div>

      {/* Floating Scheduled Social Receipt: YouTube Shorts (Bottom-Left) */}
      <div
        className="hidden lg:flex pointer-events-none absolute -left-4 xl:-left-8 bottom-28 z-40 items-center gap-3 rounded-2xl border border-stone-900/10 bg-white/95 px-3.5 py-2 shadow-[0_16px_36px_-14px_rgba(28,25,23,0.28)] backdrop-blur-md transition-all duration-300 animate-float-slow"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-sm">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </div>
        <div>
          <span className="block font-mono text-[8.5px] font-bold uppercase tracking-[0.1em] text-stone-500">
            Auto-Scheduled · Shorts
          </span>
          <span className="block text-[12px] font-bold text-stone-900 leading-tight">
            Thu · 9:30 AM
          </span>
          <span className="text-[10px] text-stone-500 font-medium">
            Pinned comment with app link
          </span>
        </div>
      </div>

      {/* Top Banner Tag: Drag to review */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-stone-900/10 bg-white/90 px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-stone-600 shadow-sm backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-[#cff728] ring-2 ring-stone-900/10 animate-ping" />
          Review &amp; Approve Post Batch
        </div>
      </div>

      {/* The 3D Cards Stack Stage */}
      <div
        className="relative flex h-[31rem] sm:h-[35rem] lg:h-[34rem] items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {POSTS.map((post, idx) => {
          // Calculate stack position relative to activeIndex
          const offset = (idx - activeIndex + POSTS.length) % POSTS.length;

          // Styles according to position
          let zIndex = 10;
          let transform = "";
          let opacity = 0;
          let isInteractive = false;

          if (offset === 0) {
            // Front card
            zIndex = 30;
            opacity = 1;
            const dragOffset = dragDeltaX * 0.4;
            const dragRotate = dragDeltaX * 0.05;
            transform = `translate3d(${dragOffset}px, 0px, 0px) rotate(${dragRotate}deg) scale(1)`;
            isInteractive = true;
          } else if (offset === 1) {
            // Right tilted card behind
            zIndex = 22;
            opacity = 0.94;
            transform = "translate3d(115px, 22px, 0) rotate(7.5deg) scale(0.92)";
          } else if (offset === POSTS.length - 1) {
            // Left tilted card behind
            zIndex = 24;
            opacity = 0.94;
            transform = "translate3d(-115px, 22px, 0) rotate(-7.5deg) scale(0.92)";
          } else {
            // Hidden back cards
            zIndex = 10;
            opacity = 0;
            transform = "translate3d(0, 36px, 0) scale(0.85)";
          }

          return (
            <div
              key={post.id}
              className="absolute w-[14.8rem] sm:w-[16.6rem] lg:w-[15.8rem] xl:w-[17.2rem]"
              style={{
                zIndex,
                opacity,
                transform,
                transition: dragStartX ? "none" : "transform 550ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease",
              }}
              aria-hidden={!isInteractive}
            >
              <article className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border border-white/15 bg-stone-950 text-white shadow-[0_24px_50px_-16px_rgba(28,25,23,0.65)] ring-1 ring-black/20">
                {/* Simulated Vertical Video Dynamic Background */}
                <div className={`absolute inset-0 bg-gradient-to-b ${post.gradientBg}`} />

                {/* Subtle cinematic glow and scanlines */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/80" />

                {/* Top Overlay Badge Bar */}
                <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between p-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.08em] backdrop-blur-md">
                    <Sparkles className="h-3 w-3 text-[#cff728]" />
                    {post.type}
                  </span>
                  <span className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-[9.5px] text-white/90 backdrop-blur-md">
                    {post.duration}
                  </span>
                </div>

                {/* Dynamic Post Format Visualization */}
                <div className="absolute inset-0 flex flex-col justify-center px-4 z-20">
                  {post.type === "Human UGC" && (
                    <div className="space-y-3">
                      {/* Audio waveform mockup */}
                      <div className="flex items-center gap-1 justify-center py-2">
                        {[40, 65, 85, 30, 95, 75, 45, 80, 60, 90, 50, 70, 35].map((h, i) => (
                          <span
                            key={i}
                            className="w-1 bg-[#cff728] rounded-full transition-all duration-300"
                            style={{
                              height: `${h * 0.35}px`,
                              animation: `pulseGlow ${1 + (i % 4) * 0.3}s ease-in-out infinite`,
                            }}
                          />
                        ))}
                      </div>

                      {/* Native hook speech bubble */}
                      <div className="rounded-2xl border border-white/15 bg-black/60 p-3.5 backdrop-blur-md shadow-xl">
                        <p className="text-[13.5px] sm:text-[14.5px] font-bold leading-snug text-white tracking-tight">
                          &ldquo;{post.hookText}&rdquo;
                        </p>
                      </div>
                    </div>
                  )}

                  {post.type === "In-App Tour" && (
                    <div className="space-y-2.5">
                      {/* App Frame UI Mockup */}
                      <div className="rounded-xl border border-white/20 bg-stone-900/90 p-3 shadow-2xl backdrop-blur-lg">
                        <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] font-mono text-stone-400">
                          <span>00:14 / AUTO-ZOOM</span>
                          <span className="text-[#60a5fa] font-bold">● REC</span>
                        </div>
                        <div className="py-3 flex flex-col gap-2">
                          <div className="h-4 w-3/4 rounded bg-stone-800 animate-pulse" />
                          <div className="h-8 w-full rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center px-2.5 text-[11px] font-semibold text-blue-200">
                            ⚡ Instant 1-Click Sync
                          </div>
                          <div className="h-4 w-1/2 rounded bg-stone-800" />
                        </div>
                      </div>
                      <p className="text-center font-mono text-[10px] text-stone-300 uppercase tracking-wider">
                        Wide screen recording → 9:16 re-framed
                      </p>
                    </div>
                  )}

                  {post.type === "Viral Meme" && (
                    <div className="space-y-3 text-center">
                      <div className="rounded-2xl border border-stone-800 bg-white/95 p-3 text-stone-950 shadow-2xl">
                        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-stone-500">
                          POV: Founder finding Reelstostore
                        </span>
                        <p className="mt-1 text-[13px] font-bold leading-tight text-stone-950">
                          &ldquo;{post.hookText}&rdquo;
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="rounded-full bg-pink-500/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-pink-300 border border-pink-500/30">
                          🔥 Trending Meme Format
                        </span>
                      </div>
                    </div>
                  )}

                  {post.type === "Carousel" && (
                    <div className="space-y-3">
                      <div className="flex justify-center gap-1.5">
                        {[0, 1, 2, 3, 4].map((slide) => (
                          <span
                            key={slide}
                            className={`h-1.5 rounded-full transition-all ${
                              slide === 0 ? "w-6 bg-white" : "w-1.5 bg-white/40"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="rounded-2xl border border-white/20 bg-stone-900/80 p-4 backdrop-blur-md">
                        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                          SLIDE 01 · THE DOWNLOAD GAP
                        </span>
                        <h4 className="mt-2 text-[14.5px] font-bold leading-snug text-white">
                          {post.hookText}
                        </h4>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom App Store Conversion Proof Pill */}
                <div className="absolute inset-x-0 bottom-0 z-30 border-t border-white/15 bg-black/75 p-3.5 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-stone-800 to-stone-900 border border-white/20 shadow-inner">
                        <Download className="h-4 w-4 text-[#cff728]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[12px] font-bold text-white leading-none">
                            {post.appName}
                          </span>
                          <span className="rounded bg-white/10 px-1 py-0.2 text-[9px] font-mono font-semibold text-amber-300">
                            {post.rating}
                          </span>
                        </div>
                        <span className="mt-0.5 block font-mono text-[9.5px] font-semibold text-[#cff728]">
                          {post.installs}
                        </span>
                      </div>
                    </div>
                    <span className="rounded-full bg-white/15 px-2 py-1 text-[9.5px] font-bold text-white/90">
                      App Store
                    </span>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      {/* Floating Approval Toast */}
      {approvedNotification && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-50 rounded-full border border-[#cff728]/60 bg-stone-950 px-4 py-1.5 text-xs font-semibold text-[#cff728] shadow-xl animate-in fade-in zoom-in duration-200">
          ✓ {approvedNotification}
        </div>
      )}

      {/* Interactive Controls Dock (ClipMyApp style review dock) */}
      <div className="relative z-50 mx-auto -mt-2 flex w-fit items-center gap-2 rounded-full border border-stone-900/10 bg-white/94 p-1.5 shadow-[0_12px_36px_-16px_rgba(28,25,23,0.35)] backdrop-blur-xl">
        {/* Skip Button */}
        <button
          type="button"
          onClick={handleSkip}
          className="group inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-stone-600 transition hover:bg-stone-100 hover:text-stone-950 active:scale-[0.97]"
          title="Skip to next candidate"
        >
          <X className="h-4 w-4 text-stone-400 group-hover:text-stone-800 transition" />
          <span>Skip</span>
        </button>

        {/* Keep / Approve Button */}
        <button
          type="button"
          onClick={handleApprove}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-stone-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800 active:scale-[0.97]"
          title="Approve for publishing"
        >
          <Check className="h-4 w-4 text-[#cff728]" />
          <span>Keep</span>
          <ArrowRight className="h-3.5 w-3.5 text-stone-400" />
        </button>

        {/* Play / Pause Auto Showcase */}
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "Pause auto review" : "Play auto review"}
          className="flex h-11 w-11 items-center justify-center rounded-full text-stone-500 transition hover:bg-stone-100 hover:text-stone-950"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
        </button>
      </div>

      {/* Bottom Pagination Dots */}
      <div className="mt-4 flex items-center justify-center gap-1.5" aria-hidden="true">
        {POSTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-6 bg-stone-950" : "w-1.5 bg-stone-300 hover:bg-stone-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
