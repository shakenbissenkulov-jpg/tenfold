import { Landing } from "@/components/Landing";
import { buildMetadata } from "@/components/metadata";
import { kz } from "@/content/kz";

export const metadata = buildMetadata(kz);

export default function Page() {
  return <Landing c={kz} />;
}
