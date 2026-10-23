import type { Metadata } from "next";
import { PrivacyPage } from "@/components/PrivacyPage";
import { kz } from "@/content/kz";

export const metadata: Metadata = { title: `${kz.privacyTitle} — Tenfold`, robots: { index: false } };

export default function Page() {
  return <PrivacyPage c={kz} />;
}
