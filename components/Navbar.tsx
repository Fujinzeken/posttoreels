"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Menu,
  X,
  Zap,
  BarChart3,
  Layers,
  DollarSign,
} from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-4 pt-4 sm:px-6 sm:pt-5">
      <div
        className={`mx-auto flex h-[3.5rem] max-w-[72rem] items-center justify-between rounded-2xl border px-5 transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-[#090a0f]/85 shadow-[0_0_60px_-20px_rgba(16,185,129,0.25)] backdrop-blur-2xl"
            : "border-white/5 bg-white/[0.04] backdrop-blur-xl"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-bold text-white"
        >
          <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-[0_0_18px_-4px_rgba(16,185,129,0.8)]">
            <Zap className="h-4 w-4 text-white fill-white" />
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-60" />
          </div>
          <span className="tracking-tight text-[1.1rem]">
            reels<span className="text-emerald-400">to</span>store
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {[
            { label: "How it works", href: "#how-it-works", icon: Layers },
            { label: "Formats", href: "#formats", icon: BarChart3 },
            { label: "Pricing", href: "#pricing", icon: DollarSign },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-white/60 transition-all hover:bg-white/[0.06] hover:text-white"
            >
              {label}
            </Link>
          ))}
          {/* ROI badge link */}
          <Link
            href="#roi"
            className="ml-1 flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-medium text-white/60 transition-all hover:bg-white/[0.06] hover:text-white"
          >
            Results
            <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wide text-emerald-400 ring-1 ring-emerald-500/30">
              +340%
            </span>
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden text-[13px] font-medium text-white/50 transition hover:text-white sm:block"
          >
            Sign in
          </Link>
          <Link
            href="#get-started"
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-xl bg-emerald-500 px-4 py-2 text-[13px] font-semibold text-white shadow-[0_0_24px_-6px_rgba(16,185,129,0.7)] transition hover:bg-emerald-400 active:scale-[0.97]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            Start free
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/[0.08] hover:text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mx-auto mt-2 max-w-[72rem] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0f15]/95 p-3 shadow-2xl backdrop-blur-2xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {[
              { label: "How it works", href: "#how-it-works" },
              { label: "Formats", href: "#formats" },
              { label: "Pricing", href: "#pricing" },
              { label: "Results (+340% installs)", href: "#roi" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.06] hover:text-white"
              >
                {label}
              </Link>
            ))}
            <div className="mt-2 border-t border-white/10 pt-3">
              <Link
                href="#get-started"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(16,185,129,0.7)]"
              >
                Start free — 20 posts on us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
