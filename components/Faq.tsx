"use client";

import { useId, useState } from "react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number>(0);
  const base = useId();

  return (
    <div className="min-w-0 flex-[999_1_560px] border-t border-line">
      {items.map((f, i) => {
        const isOpen = open === i;
        const panelId = `${base}-p-${i}`;
        const btnId = `${base}-b-${i}`;
        return (
          <div key={f.q} className="border-b border-line">
            <h3 className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-6 bg-transparent py-[22px] text-left text-lg font-normal text-ink"
              >
                {f.q}
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className={`flex-none transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen}>
              <p className="m-0 pb-6 pr-12 text-[15px] text-muted">{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
