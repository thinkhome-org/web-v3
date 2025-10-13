import { flag } from "flags/next";

// Boolean flag: controls the animated hero background.
// Default: enabled (true)
export const heroBackground = flag<boolean>({
  key: "hero-background",
  description: "Animated hero background on the home page.",
  options: [
    { label: "Off", value: false },
    { label: "On", value: true },
  ],
  async decide() {
    // Default ON. If HERO_BACKGROUND_DEFAULT is set, respect it.
    const envDefault = process.env.HERO_BACKGROUND_DEFAULT?.toLowerCase();
    if (envDefault === "false" || envDefault === "0" || envDefault === "off" || envDefault === "no")
      return false;
    if (envDefault === "true" || envDefault === "1" || envDefault === "on" || envDefault === "yes")
      return true;
    return true;
  },
});
