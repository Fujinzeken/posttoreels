"use client";

import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck, CheckCircle2 } from "lucide-react";
import HeroEngine from "./HeroEngine";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* === Ambient Background Glows === */}
      {/* Top-left violet bloom */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full blur-[120px] opacity-25"
        style={{
          background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      {/* Right emerald bloom */}
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full blur-[100px] opacity-20"
        style={{
          background: "radial-gradient(circle, #10b981 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      {/* Bottom pink bloom */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 h-[400px] w-[500px] rounded-full blur-[120px] opacity-15"
        style={{
          background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* === Cosmic Grid === */}
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />

      {/* === Vignette fade at bottom === */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
        style={{
          background: "linear-gradient(to bottom, transparent, #090a0f)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10">
        {/* ========= Headline Block ========= */}
        <div className="mb-14 text-center lg:mb-16">
          {/* Category badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/50 backdrop-blur-md shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            AI Growth Engine for Mobile &amp; SaaS Apps
            <Zap className="h-3 w-3 text-emerald-400 fill-emerald-400" />
          </div>

          {/* Main headline */}
          <h1 className="mx-auto mt-6 max-w-[22ch] text-[clamp(2.5rem,5.5vw,5rem)] font-black leading-[0.92] tracking-[-0.055em] text-white">
            Your app deserves{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                virality
              </span>
              {/* Glowing underline */}
              <span
                className="absolute -bottom-1 left-0 right-0 h-px rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #10b981, #818cf8, transparent)",
                }}
              />
            </span>{" "}
            on every short-form platform.
          </h1>

          {/* Sub headline */}
          <p className="mx-auto mt-5 max-w-[52ch] text-[1.05rem] leading-relaxed text-white/45">
            Turn one screen recording into a month of human-UGC videos, viral
            memes, and carousel posts that drive{" "}
            <span className="font-semibold text-white/70">
              real App Store downloads
            </span>{" "}
            — on autopilot.
          </p>

          {/* CTA Row */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="#get-started"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-emerald-500 px-7 py-4 text-base font-bold text-white shadow-[0_0_40px_-10px_rgba(16,185,129,0.8)] transition hover:bg-emerald-400 hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0"
            >
              {/* shimmer sweep */}
              <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
              <span className="relative">Get 20 posts free</span>
              <ArrowRight className="relative h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-base font-semibold text-white/60 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
            >
              See how it works
            </Link>
          </div>

          {/* Trust signals */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-white/25">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-500/70" />
              No credit card needed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-500/70" />
              20 posts free to start
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3 text-emerald-500/70" />
              You approve before anything posts
            </span>
          </div>
        </div>

        {/* ========= Interactive Growth Engine Console ========= */}
        <div className="relative">
          {/* Console chrome frame */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-3 shadow-[0_0_100px_-30px_rgba(16,185,129,0.15)] backdrop-blur-sm">
            {/* Window chrome top bar */}
            <div className="mb-4 flex items-center gap-3 px-2">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/60" />
                <div className="h-3 w-3 rounded-full bg-amber-500/60" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.04] px-4 py-1.5 font-mono text-[11px] text-white/25">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  reelstostore.com · Growth Engine Console
                </div>
              </div>
              <div className="w-[52px]" />
            </div>

            {/* The Console Content */}
            <div className="rounded-2xl border border-white/8 bg-[#090a0f]/80 p-5 sm:p-7">
              <HeroEngine />
            </div>
          </div>

          {/* Bottom proof bar */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { value: "4.8M+", label: "App Store visits driven" },
              { value: "850+", label: "apps &amp; SaaS products" },
              { value: "3.4×", label: "average install uplift" },
              { value: "20", label: "posts free, no catch" },
            ].map(({ value, label }) => (
              <div
                key={value}
                className="rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4 text-center"
              >
                <div className="text-2xl font-black tracking-tight text-white">
                  {value}
                </div>
                <div
                  className="mt-0.5 text-[11px] text-white/35 font-medium"
                  dangerouslySetInnerHTML={{ __html: label }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
