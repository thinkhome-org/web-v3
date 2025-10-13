import { createFlagsDiscoveryEndpoint, getProviderData } from "flags/next";
import * as flags from "../../../../flags";

// Expose flags metadata to Vercel Flags Explorer.
// - Authorization: Bearer <FLAGS_SECRET>
// - Store overrides in encrypted cookie mode
export const GET = createFlagsDiscoveryEndpoint(
  () => ({
    ...getProviderData(flags),
    overrideEncryptionMode: "encrypted",
  }),
  { secret: process.env.FLAGS_SECRET }
);
