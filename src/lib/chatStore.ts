export interface ChatThread {
  id: string;
  name: string;
  photo: string;
  lastMessage: string;
  time: string;
  unread?: boolean;
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  sender: "me" | "them";
  text: string;
  time: string;
}

let threads: ChatThread[] = [];
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

// Return the same reference — only mutated via createThread/addMessage which reassign `threads`
export function getThreads(): ChatThread[] {
  return threads;
}

export function createThread(name: string, photo: string, source: "vibe" | "invite"): ChatThread {
  const existing = threads.find((t) => t.name === name);
  if (existing) return existing;

  const greeting =
    source === "vibe"
      ? `You and ${name} vibed! Start a conversation 💬`
      : `You and ${name} are connected! Start chatting 💬`;

  const thread: ChatThread = {
    id: `chat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name,
    photo,
    lastMessage: greeting,
    time: "Just now",
    unread: true,
    messages: [
      { id: "system-1", sender: "them", text: greeting, time: "Just now" },
    ],
  };

  threads = [thread, ...threads];
  notify();
  return thread;
}

export function addMessage(threadId: string, text: string, sender: "me" | "them") {
  threads = threads.map((t) =>
    t.id === threadId
      ? {
          ...t,
          lastMessage: text,
          time: "Just now",
          messages: [
            ...t.messages,
            { id: `msg-${Date.now()}`, sender, text, time: "Just now" },
          ],
        }
      : t
  );
  notify();
}
