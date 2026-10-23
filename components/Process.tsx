"use client";

import { useState } from "react";
import type { Content, PathId } from "@/content/types";

const IDS: PathId[] = ["discovery", "delivery"];

export function Process({ c }: { c: Content }) {
  const [path, setPath] = useState<PathId>("discovery");
  const p = c.paths[path];

  return (
    <>
      <div role="group" aria-label={c.processTitle} className="mx-auto mt-10 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-[28px] bg-pill p-1">
        {IDS.map((id) => {
          const on = id === path;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={on}
              onClick={() => setPath(id)}
              className={`min-h-11 cursor-pointer rounded-full px-[22px] py-2 text-[15px] transition-colors ${on ? "bg-white text-ink shadow-[0_1px_3px_rgba(13,16,22,0.12)]" : "text-muted hover:text-ink"}`}
            >
              {c.paths[id].tab}
            </button>
          );
        })}
      </div>

      <div className="card mt-8 flex flex-wrap overflow-hidden rounded-[20px] border border-line bg-white">
        <div className="min-w-0 flex-[1_1_400px] p-7 md:p-12">
          <p className="m-0 text-sm text-accent">{p.kicker}</p>
          <h3 className="h3 mt-3">{p.title}</h3>
          <p className="mt-[18px] text-[17px] font-medium">{p.audience}</p>
          {p.lead && <p className="mt-3 text-[17px]">{p.lead}</p>}
          <p className="mt-3 text-muted">{p.desc}</p>
          <div className="mt-7 rounded-xl bg-sand-2 px-[22px] py-5">
            <div className="text-[15px] font-medium">{p.doneQ}</div>
            <div className="mt-1.5 text-[15px] text-body">{p.doneA}</div>
          </div>
          <a href="#contact" className="mt-7 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-ink px-[22px] font-medium text-white hover:bg-ink-2 hover:text-white">
            {p.cta} <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="min-w-0 flex-[999_1_480px] border-line-2 p-7 md:border-l md:p-12">
          <div className="text-sm text-muted">{p.stepsTitle}</div>
          <ol className="m-0 mt-2 list-none p-0">
            {p.steps.map((st, i) => (
              <li key={st.t} className="flex gap-5 border-b border-line-2 py-[18px]">
                <span className="w-7 flex-none pt-0.5 text-sm text-faint">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="text-lg font-medium leading-snug">{st.t}</div>
                  <div className="mt-1 text-[15px] text-muted">{st.d}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
