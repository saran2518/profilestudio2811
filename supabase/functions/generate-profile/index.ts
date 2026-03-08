import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { input } = await req.json();
    if (!input || typeof input !== "string") {
      return new Response(JSON.stringify({ error: "Input is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are a dating profile writer. Given a user's self-description, generate a compelling dating profile. You MUST respond using the generate_profile tool. Analyze the input carefully and generate content that is directly derived from what the user said — reflect their personality, hobbies, and vibe. Do NOT invent unrelated interests.`;

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
                        "A compelling 2-3 sentence bio that captures the person's essence based on their input. Should feel authentic and warm.",
                    },
                    interests: {
                      type: "array",
                      items: { type: "string" },
                      description:
                        "6 specific interests/activities derived directly from the user's description. Each should be 2-4 words.",
                    },
                    narratives: {
                      type: "array",
                      items: { type: "string" },
                      description:
                        "2 personal narrative snippets (1-2 sentences each) that reveal personality traits mentioned in the input.",
                    },
                    joinMeFor: {
                      type: "array",
                      items: { type: "string" },
                      description:
                        "3 short date ideas (4-5 words MAX each) that relate to the user's interests. Keep them punchy and concise, e.g. 'Sunset hike with coffee' or 'Late-night vinyl shopping'.",
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

    return new Response(JSON.stringify({ profile }), {
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
