import { useSyncExternalStore } from "react";
import { subscribeInvites, getInvites, SentInvite } from "@/lib/inviteStore";

export function useSentInvites(): SentInvite[] {
  return useSyncExternalStore(subscribeInvites, getInvites);
}
