import type { Metadata } from "next";
import { PrivacyPage } from "@/components/PrivacyPage";
import { en } from "@/content/en";

export const metadata: Metadata = { title: `${en.privacyTitle} — Tenfold`, robots: { index: false } };

export default function Page() {
  return <PrivacyPage c={en} />;
}
