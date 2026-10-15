import { Landing } from "@/components/Landing";
import { buildMetadata } from "@/components/metadata";
import { ru } from "@/content/ru";

export const metadata = buildMetadata(ru);

export default function Page() {
  return <Landing c={ru} />;
}
