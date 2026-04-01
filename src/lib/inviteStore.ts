export interface SentInvite {
  id: string;
  name: string;
  photo: string;
  time: string;
  category: string;
  categoryIcon: string;
  message: string;
  accepted?: boolean;
  profileIndex: number;
}

let invites: SentInvite[] = [];
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export function subscribeInvites(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

export function getInvites(): SentInvite[] {
  return invites;
}

const CATEGORY_EMOJIS: Record<string, string> = {
  Coffee: "☕",
  Dinner: "🍽️",
  Movie: "🎬",
  "Virtual Date": "💻",
  "A Long Walk": "🌿",
  Travel: "✈️",
  Other: "✨",
};

export function addInvite(name: string, photo: string, category: string, message: string, profileIndex: number = 0): SentInvite {
  const invite: SentInvite = {
    id: `inv-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name,
    photo,
    time: "Just now",
    category: category.toLowerCase(),
    categoryIcon: CATEGORY_EMOJIS[category] || "✨",
    message,
    accepted: false,
    profileIndex,
  };

  invites = [invite, ...invites];
  notify();
  return invite;
}
