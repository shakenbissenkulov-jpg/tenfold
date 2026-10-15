import Link from "next/link";
import type { Content } from "@/content/types";
import { Container, Logo } from "./ui";

/**
 * TODO before launch: replace the placeholder with a privacy policy reviewed by a lawyer
 * (Law of the Republic of Kazakhstan "On Personal Data and Their Protection").
 */
export function PrivacyPage({ c }: { c: Content }) {
  const ru = c.lang === "ru";
  return (
    <>
      <header className="border-b border-line">
        <Container className="flex h-[72px] items-center">
          <Link href={ru ? "/" : "/en"} aria-label="Tenfold">
            <Logo />
          </Link>
        </Container>
      </header>
      <main>
        <Container className="max-w-[760px] py-20">
          <h1 className="font-display text-[clamp(30px,4vw,48px)] font-medium tracking-[-0.03em]">
            {ru ? "Политика конфиденциальности" : "Privacy policy"}
          </h1>
          <p className="mt-6 text-body">
            {ru
              ? "[Текст политики конфиденциальности будет опубликован здесь. Подготовить с юристом до запуска.]"
              : "[The privacy policy will be published here. To be prepared with a lawyer before launch.]"}
          </p>
          <p className="mt-10">
            <Link href={ru ? "/" : "/en"} className="font-bold underline">
              {ru ? "← На главную" : "← Back to home"}
            </Link>
          </p>
        </Container>
      </main>
    </>
  );
}
