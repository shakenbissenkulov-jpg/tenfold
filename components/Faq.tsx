"use client";

import { useId, useState } from "react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number>(0);
  const base = useId();

  return (
    <div className="min-w-0 flex-[999_1_560px] border-t border-line-strong">
      {items.map((f, i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        const btnId = `${base}-btn-${i}`;
        return (
          <div key={f.q} className="border-b border-line-strong">
            <h3 className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-6 bg-transparent py-6 text-left text-[19px] font-bold text-ink"
              >
                {f.q}
                <svg
                  aria-hidden="true"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className={`flex-none transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen}>
              <p className="m-0 pb-[26px] pr-12 text-base text-body">{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
