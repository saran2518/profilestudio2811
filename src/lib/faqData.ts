export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  slug: string;
  title: string;
  subtitle: string;
  questions: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    slug: "profile-account",
    title: "Profile & Account",
    subtitle: "We usually respond within 24 hours.",
    questions: [
      {
        question: "How do I edit my profile?",
        answer:
          "To edit your profile, go to Profile Studio. You can update your photos, bio, details, and preferences. After making changes, remember to save your updates before exiting.",
      },
      {
        question: "How does Profile Studio work?",
        answer:
          "Profile Studio uses AI to help you create an engaging dating profile. Simply write a few sentences about yourself and it will generate a structured profile with a bio, interests, narratives, and date ideas tailored to you.",
      },
      {
        question: "How do I update my details (education, location, etc.)?",
        answer:
          "Go to your Profile tab, tap Edit Profile, then scroll to the 'About You' section. There you can update fields like education, profession, location, height, languages, and more.",
      },
      {
        question: "Why is my profile not visible?",
        answer:
          "Your profile may not be visible if you haven't completed setup or if your account is under review. Make sure you've added at least one photo and filled in your basic details. If the issue persists, contact support.",
      },
    ],
  },
  {
    slug: "discovery-preferences",
    title: "Discovery Preferences",
    subtitle: "We usually respond within 24 hours.",
    questions: [
      {
        question: "How do I change my discovery settings?",
        answer:
          "Go to your Profile tab, tap Settings, then look for Discovery Preferences. You can adjust age range, distance, and who you'd like to see.",
      },
      {
        question: "Why am I not seeing any profiles?",
        answer:
          "This could be due to narrow filters. Try expanding your age range or distance settings. Also ensure you have a stable internet connection.",
      },
      {
        question: "Can I filter by specific interests?",
        answer:
          "Yes! Use the Magic Search feature on the Discover page to filter profiles by interests, lifestyle, and more.",
      },
    ],
  },
  {
    slug: "invites-connections",
    title: "Invites & Connections",
    subtitle: "We usually respond within 24 hours.",
    questions: [
      {
        question: "How do invites work?",
        answer:
          "You can send invites to people you're interested in. If they accept, you'll be connected and can start chatting. You have a limited number of invites per day.",
      },
      {
        question: "How do I unmatch someone?",
        answer:
          "Open the chat with the person, tap the menu icon in the top right, and select 'Unmatch'. This will remove the connection and delete the conversation.",
      },
      {
        question: "Why can't I send more invites?",
        answer:
          "Free accounts have a daily invite limit. You can upgrade your subscription to get more invites per day.",
      },
    ],
  },
  {
    slug: "safety-privacy",
    title: "Safety & Privacy",
    subtitle: "We usually respond within 24 hours.",
    questions: [
      {
        question: "How do I block someone?",
        answer:
          "Open their profile, tap the three-dot menu, and select 'Block'. They will no longer be able to see your profile or contact you.",
      },
      {
        question: "How do I report a user?",
        answer:
          "Open their profile, tap the three-dot menu, and select 'Report'. Choose the reason for your report and provide any additional details. Our team reviews all reports within 24 hours.",
      },
      {
        question: "Is my data secure?",
        answer:
          "Yes. We use industry-standard encryption to protect your data. Your personal information is never shared with other users without your consent.",
      },
      {
        question: "Who can see my profile?",
        answer:
          "Only registered users who match your discovery preferences can see your profile. You can further control visibility in your privacy settings.",
      },
    ],
  },
  {
    slug: "payments",
    title: "Payments",
    subtitle: "We usually respond within 24 hours.",
    questions: [
      {
        question: "What subscription plans are available?",
        answer:
          "We offer several subscription tiers with different features. Visit the Subscriptions section in your Profile tab to see current plans and pricing.",
      },
      {
        question: "How do I cancel my subscription?",
        answer:
          "Go to Profile > Subscriptions > Manage Subscription. You can cancel anytime and your benefits will continue until the end of your billing period.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "Refund eligibility depends on your subscription type and when you purchased it. Contact support with your purchase details and we'll review your request.",
      },
    ],
  },
  {
    slug: "profile-studio",
    title: "Profile Studio",
    subtitle: "We usually respond within 24 hours.",
    questions: [
      {
        question: "What is Profile Studio?",
        answer:
          "Profile Studio is our AI-powered tool that helps you create a compelling dating profile. It generates a bio, selects interests, writes narrative prompts, and suggests date ideas based on what you tell it about yourself.",
      },
      {
        question: "Can I edit my AI-generated profile?",
        answer:
          "Absolutely! After Profile Studio generates your profile, you can edit every section — bio, interests, narratives, and 'Join Me For' ideas. Tap the edit icon on any section to make changes.",
      },
      {
        question: "How do I regenerate my profile?",
        answer:
          "Go to Edit Profile and tap 'Create New Profile' to start the Profile Studio flow again. You can write new prompts to generate a completely fresh profile.",
      },
      {
        question: "Are there limits on profile generation?",
        answer:
          "Free users can generate a limited number of profiles. Premium subscribers get unlimited profile generations.",
      },
    ],
  },
];
