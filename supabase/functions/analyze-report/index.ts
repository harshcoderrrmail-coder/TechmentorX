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
    const { reportText, language } = await req.json();

    if (!reportText || typeof reportText !== "string" || reportText.trim().length < 20) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid medical report text." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const lang = language === "hi" ? "Hindi" : "English";

    const systemPrompt = `You are a medical report simplifier AI. Your job is to take complex medical reports and make them easy to understand for patients.

CRITICAL RULES:
- Never diagnose or prescribe
- Use calm, reassuring, non-alarming tone
- Explain medical terms in simple language
- Be accurate but accessible

You MUST respond with a valid JSON object using this EXACT structure:
{
  "summary": "A clear, easy-to-understand summary of the report in 3-5 sentences",
  "indicators": [
    {
      "name": "Indicator name (e.g., Hemoglobin, Blood Sugar, etc.)",
      "value": "The actual value with units",
      "status": "normal" | "moderate" | "high"
    }
  ],
  "riskLevel": "low" | "moderate" | "high",
  "suggestions": ["lifestyle suggestion 1", "suggestion 2", "suggestion 3"],
  "doctorRecommendation": "Only include if there are abnormal values, otherwise null"
}

Respond in ${lang}. Only output the JSON, nothing else.`;

    console.log("Sending report to AI for analysis...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
            content: `Please analyze the following medical report and provide a simplified, patient-friendly breakdown:\n\n${reportText.substring(0, 8000)}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please contact support." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "AI analysis failed. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content;

    if (!content) {
      console.error("Empty AI response:", JSON.stringify(aiData));
      return new Response(
        JSON.stringify({ error: "AI returned empty response." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("AI response received, parsing...");

    // Parse JSON from AI response (may have markdown code blocks)
    let jsonStr = content.trim();
    const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      jsonStr = codeBlockMatch[1].trim();
    }

    let result;
    try {
      result = JSON.parse(jsonStr);
    } catch (parseErr) {
      console.error("Failed to parse AI JSON:", jsonStr);
      return new Response(
        JSON.stringify({ error: "Failed to parse AI response." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate and normalize
    const normalized = {
      summary: result.summary || "Unable to generate summary.",
      indicators: Array.isArray(result.indicators)
        ? result.indicators.map((ind: any) => ({
            name: ind.name || "Unknown",
            value: ind.value || "N/A",
            status: ["normal", "moderate", "high"].includes(ind.status) ? ind.status : "normal",
          }))
        : [],
      riskLevel: ["low", "moderate", "high"].includes(result.riskLevel) ? result.riskLevel : "low",
      suggestions: Array.isArray(result.suggestions) ? result.suggestions : [],
      doctorRecommendation: result.doctorRecommendation || null,
    };

    console.log("Analysis complete. Risk level:", normalized.riskLevel);

    return new Response(JSON.stringify(normalized), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("analyze-report error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
