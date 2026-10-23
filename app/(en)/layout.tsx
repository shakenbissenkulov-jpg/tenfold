import type { ReactNode } from "react";
import { RootShell } from "@/components/RootShell";
import { en } from "@/content/en";

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell htmlLang={en.htmlLang}>{children}</RootShell>;
}
