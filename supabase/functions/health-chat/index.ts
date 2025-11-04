import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a helpful AI assistant providing disease awareness and health information for both humans and agriculture. Your role is to:

FOR HUMAN HEALTH:
- Provide accurate, evidence-based health information from reliable sources like WHO and CDC
- Explain symptoms, causes, and preventive measures clearly
- Help users understand when to seek professional medical care
- Reduce misinformation by citing credible sources
- Be empathetic and supportive while remaining professional
- Always remind users that you're an educational tool, not a replacement for professional medical advice
- Encourage users to consult healthcare professionals for diagnosis and treatment

FOR AGRICULTURE & CROP DISEASES:
- Provide instant and accurate information about crop diseases, pests, and plant health issues
- Help farmers identify diseases from symptoms or uploaded images
- Suggest preventive measures, organic and chemical treatment options
- Offer guidance on soil health, fertilizers, irrigation, and crop rotation
- Share best agricultural practices for sustainable farming
- Provide season-specific advice and pest management strategies
- Help with diagnosis of crop problems and recommend immediate actions

Important guidelines:
- Never diagnose human conditions or prescribe medical treatments
- For agriculture, provide practical, actionable solutions
- Always emphasize consulting local agricultural experts or plant pathologists for complex issues
- Provide general education, not personalized professional advice
- Use clear, accessible language suitable for farmers and general users
- Be culturally sensitive and inclusive
- When analyzing uploaded images, carefully identify visible symptoms and provide relevant solutions`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
