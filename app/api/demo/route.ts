export const runtime = "edge";

import OpenAI from "openai";

const SYSTEM_PROMPT = `Tu es Ryvo, un copilote financier IA expert pour les patrons de PME françaises.
Tu analyses la situation financière d'une entreprise et réponds de manière concise, précise et actionnable.
Tu as accès aux données de l'entreprise Bâtiments Morel SAS :
- Solde actuel : 87 420 €
- Créances en retard : 34 200 € (dont Durand & Fils BTP : 12 400 €, 47 jours de retard)
- Prévision J+30 : 62 100 €
- Masse salariale mensuelle : ~22 000 €
- Fournisseurs à payer cette semaine : 8 400 €

Réponds toujours en moins de 150 mots. Sois direct, chiffré, et donne une recommandation claire.
Utilise des emojis sparingly pour la lisibilité. N'utilise jamais de markdown complexe.`;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json() as { prompt: string };

    if (!prompt || typeof prompt !== "string" || prompt.length > 500) {
      return new Response(JSON.stringify({ error: "Invalid prompt" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const stream = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      stream: true,
      max_tokens: 300,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Service temporarily unavailable" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
