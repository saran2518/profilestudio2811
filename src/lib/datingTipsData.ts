export interface DatingTopic {
  slug: string;
  title: string;
  subtitle: string;
  icon: string; // lucide icon name
  tips: { title: string; description: string }[];
}

export const datingTopics: DatingTopic[] = [
  {
    slug: "meet-with-care",
    title: "Meet with Care",
    subtitle: "Stay safe and at ease",
    icon: "Shield",
    tips: [
      { title: "Choose Public Places", description: "For your first few meetings, always pick well-lit, populated public venues like cafés, restaurants, or parks. This ensures both parties feel comfortable and secure." },
      { title: "Share Your Plans", description: "Let a trusted friend or family member know where you're going, who you're meeting, and when you expect to be back. A quick text check-in can go a long way." },
      { title: "Trust Your Instincts", description: "If something feels off at any point — before or during a date — trust that feeling. It's always okay to leave or reschedule. Your comfort matters most." },
      { title: "Keep Personal Info Private", description: "Avoid sharing your home address, workplace details, or financial information early on. Build trust gradually as you get to know someone." },
      { title: "Arrange Your Own Transport", description: "Drive yourself or use your own ride service for the first few dates. This gives you full control over when you arrive and leave." },
    ],
  },
  {
    slug: "your-presence",
    title: "Your Presence",
    subtitle: "How you are seen",
    icon: "Eye",
    tips: [
      { title: "Authentic Photos Matter", description: "Use recent, clear photos that genuinely represent who you are. Natural lighting and real smiles create a warm, approachable impression." },
      { title: "Craft a Genuine Bio", description: "Write about what truly excites you — your passions, quirks, and what makes you unique. Authenticity attracts the right people." },
      { title: "Show Range", description: "Include photos from different aspects of your life — travel, hobbies, social moments. This paints a fuller picture of who you are." },
      { title: "First Impressions Count", description: "Your opening photo sets the tone. Choose one where you look confident, happy, and approachable. Avoid group shots as your lead image." },
    ],
  },
  {
    slug: "starting-conversations",
    title: "Starting Conversations",
    subtitle: "Begin with intention",
    icon: "MessageSquare",
    tips: [
      { title: "Reference Their Profile", description: "Mention something specific from their bio or photos. Personalized openers show genuine interest and get 3x more responses than generic greetings." },
      { title: "Ask Open Questions", description: "Instead of yes/no questions, ask about experiences, opinions, or stories. 'What's the best trip you've ever taken?' invites a real conversation." },
      { title: "Be Playful, Not Pushy", description: "Light humor and warmth open doors. Keep the tone friendly and curious rather than intense or overly forward." },
      { title: "Timing Matters", description: "Don't rush to meet immediately, but don't let conversations stall for weeks either. A few days of good chat is usually the sweet spot." },
    ],
  },
  {
    slug: "connection-mindset",
    title: "Connection Mindset",
    subtitle: "Think beyond the surface",
    icon: "Heart",
    tips: [
      { title: "Stay Open-Minded", description: "Some of the best connections happen when you least expect them. Don't limit yourself to a rigid checklist — allow room for pleasant surprises." },
      { title: "Focus on Values", description: "Shared values create stronger foundations than shared hobbies. Look for alignment on what matters most: kindness, ambition, humor, honesty." },
      { title: "Patience Is Key", description: "Meaningful connections take time to develop. Don't judge a potential match entirely on a first impression — people often reveal their best selves gradually." },
      { title: "Embrace Vulnerability", description: "Being open about your feelings, hopes, and even uncertainties creates space for genuine connection. Strength lies in authenticity." },
    ],
  },
  {
    slug: "meaningful-interactions",
    title: "Meaningful Interactions",
    subtitle: "Create real connection",
    icon: "Sparkles",
    tips: [
      { title: "Be Present", description: "Put your phone away during dates. Give your full attention — active listening and eye contact show you genuinely care about the conversation." },
      { title: "Share Stories, Not Stats", description: "Instead of listing facts about yourself, share the stories behind them. Narratives create emotional connection and make you memorable." },
      { title: "Find Common Ground", description: "Look for shared experiences or mutual interests to build on. These become the threads that weave a deeper connection." },
      { title: "Follow Up Thoughtfully", description: "After a date, send a genuine message about something you enjoyed. It shows you were paying attention and valued the time together." },
    ],
  },
  {
    slug: "reading-the-signals",
    title: "Reading the Signals",
    subtitle: "Notice what matters",
    icon: "Star",
    tips: [
      { title: "Watch for Consistency", description: "Actions speak louder than words. Notice if someone's behavior aligns with what they say — consistency builds trust." },
      { title: "Respect Boundaries", description: "Pay attention to comfort levels — both yours and theirs. Healthy connections are built on mutual respect and clear communication." },
      { title: "Notice Effort", description: "Is the other person initiating conversations, suggesting plans, and showing genuine curiosity about your life? Mutual effort is a strong positive signal." },
      { title: "Trust the Energy", description: "Sometimes the connection is undeniable, and sometimes it's just not there. Both are valid. Don't force what doesn't feel natural." },
    ],
  },
];
