import type { ReactNode } from "react";
import { RootShell } from "@/components/RootShell";
import { kz } from "@/content/kz";

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell htmlLang={kz.htmlLang}>{children}</RootShell>;
}
