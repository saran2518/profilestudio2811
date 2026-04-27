import { useSyncExternalStore } from "react";
import { subscribe, getThreads, ChatThread, isLoaded } from "@/lib/chatStore";

export function useChatThreads(): ChatThread[] {
  return useSyncExternalStore(subscribe, getThreads);
}

export function useChatThread(id: string): ChatThread | undefined {
  const threads = useChatThreads();
  return threads.find((t) => t.id === id);
}

export function useChatLoaded(): boolean {
  return useSyncExternalStore(subscribe, isLoaded);
}

