import type { Metadata } from "next";
import { PrivacyPage } from "@/components/PrivacyPage";
import { ru } from "@/content/ru";

export const metadata: Metadata = { title: `${ru.privacyTitle} — Tenfold`, robots: { index: false } };

export default function Page() {
  return <PrivacyPage c={ru} />;
}
