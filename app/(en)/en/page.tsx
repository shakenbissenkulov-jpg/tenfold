import { Landing } from "@/components/Landing";
import { buildMetadata } from "@/components/metadata";
import { en } from "@/content/en";

export const metadata = buildMetadata(en);

export default function Page() {
  return <Landing c={en} />;
}
