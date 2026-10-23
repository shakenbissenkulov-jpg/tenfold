import Link from "next/link";
import type { Content } from "@/content/types";
import { homePath } from "@/content/site";

/** TODO before launch: replace with a privacy policy reviewed by a lawyer (Law of the RK "On Personal Data and Their Protection"). */
export function PrivacyPage({ c }: { c: Content }) {
  return (
    <>
      <header className="border-b border-line">
        <div className="mx-auto flex h-[68px] max-w-[1320px] items-center px-5 sm:px-8">
          <Link href={homePath[c.lang]} aria-label="Tenfold" className="flex items-baseline gap-2 text-ink">
            <span className="text-xl font-medium tracking-[-0.02em]">Tenfold</span>
            <span className="text-xs font-medium text-accent">10×</span>
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-[760px] px-5 py-20 sm:px-8">
        <h1 className="h2 m-0">{c.privacyTitle}</h1>
        <p className="mt-6 text-body">{c.privacyBody}</p>
        <p className="mt-10">
          <Link href={homePath[c.lang]} className="underline underline-offset-4">{c.privacyBack}</Link>
        </p>
      </main>
    </>
  );
}
