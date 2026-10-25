"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a stat like "50+", "100%" or "2 нед." from 0 when it scrolls into view,
 * and fades/slides it in. Renders the final value without JS and with reduced motion.
 */
export function CountUp({ value, delay = 0, className = "" }: { value: string; delay?: number; className?: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<"static" | "waiting" | "shown">("static");
  const [n, setN] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("waiting");
    if (match) setN(0);

    let raf = 0;
    let timer = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        timer = window.setTimeout(() => {
          setPhase("shown");
          if (!match || target === 0) return;
          const start = performance.now();
          const dur = 1400;
          const tick = (t: number) => {
            const k = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - k, 3);
            setN(Math.round(target * eased));
            if (k < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hidden = phase === "waiting";
  return (
    <span
      ref={ref}
      className={`inline-block tabular-nums transition-[opacity,transform] duration-700 ease-out ${hidden ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100"} ${className}`}
    >
      <span aria-hidden="true">{match ? `${n}${suffix}` : value}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
