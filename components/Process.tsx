"use client";

import { useState } from "react";
import type { Content, PathId } from "@/content/types";

const IDS: PathId[] = ["discovery", "delivery"];

export function Process({ c }: { c: Content }) {
  const [path, setPath] = useState<PathId>("discovery");
  const p = c.paths[path];

  return (
    <>
      <div role="group" aria-label={c.processTitle} className="mx-auto mt-10 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-[14px] bg-pill p-1">
        {IDS.map((id) => {
          const on = id === path;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={on}
              onClick={() => setPath(id)}
              className={`min-h-11 cursor-pointer rounded-[10px] px-[22px] py-2 text-[15px] transition-colors ${on ? "bg-white text-ink shadow-[0_1px_3px_rgba(13,16,22,0.12)]" : "text-muted hover:text-ink"}`}
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
          <a href="#contact" className="mt-7 inline-flex min-h-12 items-center gap-2.5 rounded-[10px] bg-ink px-[22px] font-medium text-white hover:bg-ink-2 hover:text-white">
            {p.cta} <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="min-w-0 flex-[999_1_480px] border-line-2 p-7 md:border-l md:p-12">
          <div className="text-sm text-muted">{p.stepsTitle}</div>
          <ol className="m-0 mt-2 list-none p-0">
            {p.steps.map((st, i) => (
              <li
                key={st.t}
                tabIndex={0}
                className="group relative -mx-4 flex cursor-default gap-5 rounded-xl border-b border-line-2 px-4 py-[18px] outline-none transition-[background-color,transform] duration-300 ease-out before:absolute before:inset-y-3 before:left-0 before:w-[3px] before:origin-top before:scale-y-0 before:rounded-full before:bg-accent before:transition-transform before:duration-300 hover:border-transparent hover:bg-sand-2 hover:before:scale-y-100 focus-visible:border-transparent focus-visible:bg-sand-2 focus-visible:before:scale-y-100 motion-safe:hover:translate-x-1 motion-safe:focus-visible:translate-x-1"
              >
                <span className="w-7 flex-none pt-0.5 text-sm text-faint transition-colors duration-300 group-hover:text-accent group-focus-visible:text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1">
                  <div className="text-lg font-medium leading-snug">{st.t}</div>
                  <div className="mt-1 text-[15px] text-muted transition-colors duration-300 group-hover:text-body">{st.d}</div>
                </div>
                <span aria-hidden="true" className="self-center text-lg text-accent opacity-0 transition-[opacity,transform] duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:-translate-x-2 motion-safe:group-hover:translate-x-0">→</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
