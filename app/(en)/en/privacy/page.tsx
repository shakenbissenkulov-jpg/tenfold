import type { Metadata } from "next";
import { PrivacyPage } from "@/components/PrivacyPage";
import { en } from "@/content/en";

export const metadata: Metadata = {
  title: "Privacy policy — Tenfold",
  robots: { index: false },
};

export default function Page() {
  return <PrivacyPage c={en} />;
}
