import { heroBackground } from "@/flags";
import HomeContent from "./home-content";

export default async function Home() {
  // Graceful fallback: if evaluation fails (e.g., missing FLAGS_SECRET with an
  // overrides cookie present), default to showing the background.
  let heroBackgroundEnabled = true;
  try {
    heroBackgroundEnabled = await heroBackground();
  } catch {
    heroBackgroundEnabled = true;
  }
  return <HomeContent heroBackgroundEnabled={heroBackgroundEnabled} />;
}
