// Simulated profile expansion logic
// In a real app, this would call an AI API

export interface NarrativeItem {
  title: string;
  content: string;
}

export interface GeneratedProfile {
  bio: string;
  interests: string[];
  narratives: NarrativeItem[];
  joinMeFor: string[];
}

const interestKeywords: Record<string, string[]> = {
  music: ["Live concerts", "Vinyl collecting", "Songwriting"],
  travel: ["Weekend road trips", "Hidden gem cafés", "Sunset chasing"],
  food: ["Farmers market Sundays", "Pasta from scratch", "Wine & cheese nights"],
  art: ["Gallery hopping", "Sketching in parks", "Photography walks"],
  fitness: ["Morning runs", "Yoga at sunrise", "Hiking new trails"],
  reading: ["Bookstore dates", "Poetry nights", "Cozy library corners"],
  film: ["Indie cinema", "Movie marathon nights", "Film festival hopping"],
  tech: ["Hackathon weekends", "Podcast deep dives", "Gadget hunting"],
  nature: ["Botanical gardens", "Stargazing", "Beach bonfires"],
  coffee: ["Third-wave coffee spots", "Latte art", "Café crawling"],
};

const dateSpots = [
  "A candlelit dinner at that tiny Italian place no one knows about",
  "An early morning hike to catch the sunrise together",
  "A spontaneous road trip to a coastal town",
  "A vinyl shopping spree followed by coffee",
  "An evening picnic in the park with homemade everything",
  "A cooking class where we inevitably make a mess",
  "A sunset kayak ride on the lake",
  "A jazz bar with dimmed lights and great cocktails",
  "A bookstore crawl ending at a cozy café",
  "A farmer's market morning followed by brunch we cook together",
  "An art gallery opening with wine and good conversation",
  "A late-night dessert tour through the city",
];

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function generateProfile(input: string): GeneratedProfile {
  const lower = input.toLowerCase();

  // Extract interests based on keywords
  const matchedInterests: string[] = [];
  Object.entries(interestKeywords).forEach(([key, values]) => {
    if (lower.includes(key) || values.some(v => lower.includes(v.toLowerCase()))) {
      matchedInterests.push(...values);
    }
  });

  // Fallback interests if no matches
  const interests = matchedInterests.length > 0
    ? pickRandom(matchedInterests, 6)
    : pickRandom([
        "Spontaneous adventures", "Deep conversations", "Cozy nights in",
        "Trying new restaurants", "Creative projects", "Morning walks",
      ], 6);

  // Generate bio
  const bioTemplates = [
    `${input.trim()}. I believe the best connections start with genuine curiosity and a shared love for the little things that make life extraordinary.`,
    `Here's the thing — ${input.trim().toLowerCase()}. I'm looking for someone who gets that the best stories come from saying "yes" to the unexpected.`,
    `${input.trim()}. Life's too short for surface-level conversations. Let's skip the small talk and go straight to "what makes you come alive?"`,
  ];
  const bio = bioTemplates[Math.floor(Math.random() * bioTemplates.length)];

  // Generate narratives
  const narrativeTemplates = [
    `The most spontaneous thing I've done? Probably following my curiosity wherever it leads — which is exactly how I ended up here.`,
    `I'm the kind of person who remembers the small details: your favorite song, how you take your coffee, the story behind your laugh.`,
    `My friends would describe me as the one who always has a plan B (and C), but secretly loves when things go completely off-script.`,
    `I believe every great relationship starts with two people who aren't afraid to be completely, unapologetically themselves.`,
  ];
  const narratives = pickRandom(narrativeTemplates, 2);

  // Generate date ideas
  const joinMeFor = pickRandom(dateSpots, 3);

  return { bio, interests, narratives, joinMeFor };
}
