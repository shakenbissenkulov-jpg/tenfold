import type { ReactNode } from "react";
import { RootShell } from "@/components/RootShell";

export default function RuLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="ru">{children}</RootShell>;
}
