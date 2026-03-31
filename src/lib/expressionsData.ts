import { PROFILES } from "@/lib/profilesData";
import momentCoffee from "@/assets/moment-coffee.jpg";
import momentTypewriter from "@/assets/moment-typewriter.jpg";
import momentPiano from "@/assets/moment-piano.jpg";
import momentSketch from "@/assets/moment-sketch.jpg";

export interface MomentData {
  id: string;
  name: string;
  age: number;
  profession: string;
  location: string;
  avatar: string;
  text: string;
  photo?: string;
  moodTag: string;
  timestamp: string;
  profileIndex?: number;
}

export const MOOD_TAGS = [
  "💭 Random thoughts", "📸 Captured a moment", "🌅 Golden hour", "☕ Coffee & thoughts",
  "🎵 Lost in music", "😊 Feeling good", "🥰 In my feels", "🙏 Grateful today",
  "✨ Little joys", "🌧️ Rainy day mood", "🔥 Spontaneous", "🎨 Creative spark",
  "💫 Late night thoughts", "🌸 Self-care moment", "📚 Currently reading", "🍷 Cozy evening",
  "✈️ On the move", "🧘 Finding calm", "🌙 Can't sleep", "💪 Personal win",
] as const;

export const MOMENTS: MomentData[] = [
  {
    id: "m1",
    name: PROFILES[0].name,
    age: PROFILES[0].age,
    profession: PROFILES[0].profession,
    location: PROFILES[0].location,
    avatar: PROFILES[0].photos[0],
    text: "Finding beauty in the quiet moments. Looking for someone who appreciates early morning coffee and late-night architecture talks just as much as I do.",
    moodTag: "Quiet evening",
    timestamp: "2h ago",
    profileIndex: 0,
  },
  {
    id: "m2",
    name: PROFILES[1]?.name || "Julian",
    age: PROFILES[1]?.age || 31,
    profession: PROFILES[1]?.profession || "Writer",
    location: PROFILES[1]?.location || "Brooklyn",
    avatar: PROFILES[1]?.photos[0] || PROFILES[0].photos[0],
    text: "Lost in the words today. The right ambiance changes everything.",
    photo: momentTypewriter,
    moodTag: "Creative moment",
    timestamp: "4h ago",
  },
  {
    id: "m3",
    name: PROFILES[2]?.name || "Maya",
    age: PROFILES[2]?.age || 26,
    profession: PROFILES[2]?.profession || "Pianist",
    location: PROFILES[2]?.location || "Seattle",
    avatar: PROFILES[2]?.photos[0] || PROFILES[0].photos[0],
    text: "There is nothing quite like the silence that fills the room just before the first note is played. A moment of pure anticipation.",
    photo: momentPiano,
    moodTag: "Artistic soul",
    timestamp: "6h ago",
  },
  {
    id: "m4",
    name: PROFILES[3]?.name || "Arjun",
    age: PROFILES[3]?.age || 29,
    profession: PROFILES[3]?.profession || "Designer",
    location: PROFILES[3]?.location || "Mumbai",
    avatar: PROFILES[3]?.photos[0] || PROFILES[0].photos[0],
    text: "Sketched the sunrise from my balcony this morning. Some mornings just demand to be captured.",
    photo: momentSketch,
    moodTag: "Morning energy",
    timestamp: "8h ago",
  },
  {
    id: "m5",
    name: PROFILES[4]?.name || "Priya",
    age: PROFILES[4]?.age || 27,
    profession: PROFILES[4]?.profession || "Chef",
    location: PROFILES[4]?.location || "Delhi",
    avatar: PROFILES[4]?.photos[0] || PROFILES[0].photos[0],
    text: "Tried a new recipe today — cardamom rose latte. The kitchen smells like a garden now.",
    photo: momentCoffee,
    moodTag: "Coffee thoughts",
    timestamp: "12h ago",
  },
];
