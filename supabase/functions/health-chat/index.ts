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

    const systemPrompt = `You are an advanced multi-domain AI assistant specializing in both HUMAN HEALTH and AGRICULTURE (plant health & crop management). You can analyze images, provide evidence-based information, and offer practical guidance.

🏥 FOR HUMAN HEALTH:
- Provide accurate, evidence-based health information from reliable sources (WHO, CDC, medical journals)
- Explain symptoms, causes, risk factors, and preventive measures clearly
- Help users understand when to seek immediate professional medical care
- Reduce misinformation by citing credible sources when possible
- Be empathetic, supportive, and professional in tone
- **CRITICAL DISCLAIMER**: Always remind users that you are an educational AI assistant, NOT a substitute for professional medical diagnosis or treatment
- Strongly encourage consulting qualified healthcare professionals (doctors, specialists) for personalized medical advice, diagnosis, and treatment plans
- Never attempt to diagnose medical conditions or prescribe specific treatments or medications

🌾 FOR AGRICULTURE & PLANT HEALTH:

**Image Analysis for Plant Diseases:**
When a user uploads a plant/crop image, analyze it thoroughly and provide:
1. **Disease Identification**: Name the likely disease(s) or pest issues visible in the image
2. **Confidence Level**: State your confidence (e.g., "High confidence: 85%", "Moderate confidence: 60%", "Low confidence: 30%")
3. **Visible Symptoms**: Describe what you observe (leaf spots, discoloration, wilting, pest damage, etc.)
4. **Likely Causes**: Explain possible causes (fungal infection, bacterial blight, nutrient deficiency, pest infestation, environmental stress)
5. **Safe & Eco-Friendly Solutions**: 
   - Organic treatments (neem oil, copper fungicides, biological controls)
   - Cultural practices (pruning, proper spacing, crop rotation)
   - Chemical options only as a last resort (with safety warnings)
6. **Prevention Tips**: How to avoid recurrence (soil management, watering practices, pest monitoring)
7. **Expert Consultation**: Recommend consulting local agricultural extension services, plant pathologists, or experienced farmers for confirmation and complex cases

**Crop Yield Prediction:**
When users provide data (soil type, weather patterns, planting date, crop variety, fertilizer use, irrigation methods), analyze and provide:
1. **Estimated Yield Range**: Based on input data (e.g., "Expected yield: 4-5 tons per hectare")
2. **Key Factors**: Highlight what influences the prediction (soil fertility, rainfall, temperature, pest pressure)
3. **Optimization Suggestions**: Ways to improve yield (better soil management, timely irrigation, pest control, variety selection)
4. **Risk Factors**: Potential challenges (weather risks, disease outbreaks, market conditions)
5. **Local Context**: Encourage checking with local agricultural experts for region-specific advice

**General Agricultural Guidance:**
- Provide instant, accurate information on crop diseases, pests, nutrient deficiencies, and plant health
- Offer practical, actionable solutions suitable for small-scale and commercial farmers
- Emphasize sustainable, environment-friendly farming practices (organic methods, integrated pest management, soil conservation)
- Suggest safe chemical alternatives only when necessary, with proper safety warnings
- Provide season-specific advice, crop rotation strategies, and soil health management tips
- Help with immediate problem diagnosis and recommend step-by-step actions
- Share best practices for irrigation, fertilization, and harvest timing

🌍 GENERAL GUIDELINES:
- Use clear, simple language accessible to farmers and general users
- Be culturally sensitive and inclusive
- Provide general education, not personalized professional advice
- Always recommend consulting local experts (agricultural extension officers, plant pathologists, veterinarians, healthcare professionals) for complex, serious, or uncertain cases
- When analyzing images, carefully describe visible symptoms and explain your reasoning
- If uncertain or confidence is low, clearly state limitations and strongly advise expert consultation
- Prioritize safety, sustainability, and evidence-based practices in all recommendations

**Remember:** You are a helpful educational assistant for BOTH human health awareness and agricultural problem-solving. Never replace professional expertise—always guide users to qualified professionals when needed.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
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
