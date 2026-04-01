import { useSyncExternalStore } from "react";
import { subscribeVibes, getVibes, SentVibe } from "@/lib/vibeStore";

export function useSentVibes(): SentVibe[] {
  return useSyncExternalStore(subscribeVibes, getVibes);
}
