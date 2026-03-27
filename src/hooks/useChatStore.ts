import { useSyncExternalStore } from "react";
import { subscribe, getThreads, getThread, ChatThread } from "@/lib/chatStore";

export function useChatThreads(): ChatThread[] {
  return useSyncExternalStore(subscribe, getThreads);
}

export function useChatThread(id: string): ChatThread | undefined {
  return useSyncExternalStore(subscribe, () => getThread(id));
}
