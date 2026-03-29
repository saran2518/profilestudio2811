import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const truncateWords = (value: string, max: number): string =>
  value.trim().split(/\s+/).slice(0, max).join(" ");

const toTwoWords = (value: string): string =>
  truncateWords(value.replace(/[^\p{L}\p{N}\s'-]/gu, " ").replace(/\s+/g, " "), 2);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { input, tone } = await req.json();
    if (!input || typeof input !== "string") {
      return new Response(JSON.stringify({ error: "Input is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const toneInstructions = tone === "natural"
      ? `Write in a casual, down-to-earth, conversational tone — like someone describing themselves to a friend over coffee. Use everyday language, contractions, and a relaxed vibe. Avoid flowery or polished phrasing. Keep it real and relatable.`
      : `Write in a warm, refined, and romantically compelling tone. Use evocative language that feels authentic yet polished. Create prose that sounds like a well-written personal essay — eloquent but not pretentious.`;

    const systemPrompt = `You are a dating profile writer. Given a user's self-description, generate a compelling dating profile. CRITICAL: You MUST write ALL output EXCLUSIVELY in English. Do NOT use any other language, script, or characters (no Chinese, Hindi, Arabic, etc.). Every word in every field must be in English. You MUST respond using the generate_profile tool. Analyze the input carefully and generate content that is directly derived from what the user said — reflect their personality, hobbies, and vibe. Do NOT invent unrelated interests. STRICT LIMITS: Bio must be 30-40 words. Interests must be 1-2 words each. Narrative titles must be 2-4 words. Narrative content must be 15-25 words. TONE: ${toneInstructions}`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `Here is my self-description: "${input}"\n\nGenerate a dating profile based on this. Make every section directly relevant to what I described.`,
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "generate_profile",
                description:
                  "Generate a structured dating profile from user input",
                parameters: {
                  type: "object",
                  properties: {
                    bio: {
                      type: "string",
                      description:
                        "A compelling 2-3 sentence bio (30-40 words max) that captures the person's essence. Should feel authentic and warm.",
                    },
                    interests: {
                      type: "array",
                      items: { type: "string" },
                      description:
                        "6 specific interests/activities derived directly from the user's description. Each must be 1-2 words only.",
                    },
                    narratives: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          title: { type: "string", description: "A short evocative heading (2-4 words max) that captures the essence of this narrative." },
                          content: { type: "string", description: "A 1-2 sentence personal narrative (15-25 words max) that reveals a personality trait from the input." },
                        },
                        required: ["title", "content"],
                      },
                      description: "2 personal narrative objects each with a title and content.",
                    },
                    joinMeFor: {
                      type: "array",
                      items: { type: "string" },
                      description:
                        "4 short date ideas (5 words MAX each) that relate to the user's interests. Keep them punchy and concise, e.g. 'Sunset hike with hot coffee' or 'Late-night vinyl record shopping'.",
                    },
                  },
                  required: ["bio", "interests", "narratives", "joinMeFor"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "generate_profile" },
          },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error("AI did not return structured output");
    }

    const profile = JSON.parse(toolCall.function.arguments);
    const normalizedProfile = {
      ...profile,
      bio: typeof profile.bio === "string" ? truncateWords(profile.bio, 40) : "",
      interests: Array.isArray(profile.interests)
        ? profile.interests
            .map((i: unknown) => typeof i === "string" ? toTwoWords(i) : "")
            .filter(Boolean)
            .slice(0, 6)
        : [],
      narratives: Array.isArray(profile.narratives)
        ? profile.narratives.map((n: any) => ({
            title: typeof n.title === "string" ? truncateWords(n.title, 4) : "",
            content: typeof n.content === "string" ? truncateWords(n.content, 25) : "",
          }))
        : [],
      joinMeFor: Array.isArray(profile.joinMeFor)
        ? profile.joinMeFor
            .map((j: unknown) => typeof j === "string" ? truncateWords(j, 5) : "")
            .filter(Boolean)
            .slice(0, 4)
        : [],
    };

    return new Response(JSON.stringify({ profile: normalizedProfile }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-profile error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
