import type { ReactNode } from "react";
import { RootShell } from "@/components/RootShell";
import { ru } from "@/content/ru";

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell htmlLang={ru.htmlLang}>{children}</RootShell>;
}
