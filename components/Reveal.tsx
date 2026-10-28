"use client";

import { useEffect } from "react";

const SELECTOR = [
  "main section:not(#top) h2",
  "main section:not(#top) h2 + p",
  "main section:not(#top) .card",
  "main section:not(#top) .grid > *",
  "main #services ul > li",
  "main #faq details",
].join(",");

/**
 * Fades and lifts headings and cards into view as the visitor scrolls.
 * Classes are added only by JS, so without JS (or with reduced motion) everything is simply visible.
 */
export function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const vh = window.innerHeight;
    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter((el, i, all) => {
      // skip nested matches (e.g. a .card inside a grid item) and anything already on screen
      if (all.some((other) => other !== el && other.contains(el))) return false;
      return el.getBoundingClientRect().top > vh * 0.9;
    });

    // stagger siblings that enter together (cards in a row)
    const order = new Map<Element, number>();
    for (const el of els) {
      const parent = el.parentElement!;
      const n = order.get(parent) ?? 0;
      order.set(parent, n + 1);
      el.style.setProperty("--reveal-delay", `${Math.min(n, 5) * 70}ms`);
      el.classList.add("reveal");
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          io.unobserve(el);
          el.classList.add("is-visible");
          // hand transitions back to the element (e.g. card hover) once the reveal is done
          window.setTimeout(() => {
            el.classList.remove("reveal", "is-visible");
            el.style.removeProperty("--reveal-delay");
          }, 1200);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
