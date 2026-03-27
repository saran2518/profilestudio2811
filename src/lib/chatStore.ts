// Simple in-memory chat store (shared across pages via module singleton)

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
let listeners: Array<() => void> = [];

function notify() {
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export function getThreads(): ChatThread[] {
  return [...threads];
}

export function getThread(id: string): ChatThread | undefined {
  return threads.find((t) => t.id === id);
}

export function createThread(name: string, photo: string, source: "vibe" | "invite"): ChatThread {
  // Check if thread already exists for this person
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
      {
        id: "system-1",
        sender: "them",
        text: greeting,
        time: "Just now",
      },
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
