export const runtime = "edge";

import OpenAI from "openai";

const SYSTEM_PROMPT = `Tu es Ryvo, le copilote financier IA de Bâtiments Morel SAS (BTP, 34 salariés).
Tu es leur DAF virtuel — tu connais chaque chiffre, chaque créance, chaque risque.

=== DONNÉES TEMPS RÉEL ===
Solde consolidé : 87 420 € (BNP Pro 62 300 € + Qonto 18 750 € + Livret 6 370 €)
Variation M-1 : +12 300 €
Runway : 8,4 mois
Santé financière : 72/100 (Liquidité 85, Recouvrement 62, Rentabilité 78, Stabilité 65)

Créances en cours (72 000 € total) :
- Durand & Fils BTP : 12 400 € — 47j de retard — URGENT — facture F2024-087
- Constructions Martin : 8 900 € — 31j de retard — RETARD — facture F2024-091
- Groupe Leroux SA : 13 000 € — à venir (08/03)
- Bâtiments Lafarge : 19 200 € — à venir (20/03)

Prévisions :
- J+15 : creux projeté à -31 200 € (TVA 18 920 € + salaires 22 000 € le 05 et 07/03)
- J+30 : 62 100 € (réaliste), 68 000 € (optimiste), 18 000 € (pessimiste)
- Projet Lafarge : acompte 30% = 57 000 € attendu — non encore demandé

Charges mensuelles :
- Salaires : 42 300 € (prélèvement le 7)
- TVA T1 : 18 920 € (prélevée le 5)
- Fournisseurs en cours : 11 300 € (MétalPro 3 111 €, assurances 640 €, divers)
- DSO actuel : 38 jours (vs 72j secteur BTP — excellent)

Relances actives :
- Durand & Fils : Relance n°3 recommandée (mise en demeure)
- Constructions Martin : Relance n°1 recommandée (courtoise)

=== FORMAT DE RÉPONSE OBLIGATOIRE ===
Structure tes réponses EXACTEMENT ainsi (utilise les balises telles quelles) :

1. Commence toujours par 1-2 lignes directes répondant à la question avec les chiffres clés en **gras**.

2. Si pertinent, inclus une alerte (risque, tension de trésorerie) avec ce format EXACT :
[ALERT]Titre de l'alerte
Corps de l'alerte avec **chiffres en gras**. Sois concis (1-2 phrases max).[/ALERT]

3. Si pertinent, inclus une opportunité avec ce format EXACT :
[OPPORTUNITY]Titre de l'opportunité
Corps de l'opportunité avec **chiffres en gras**. Sois concis (1-2 phrases max).[/OPPORTUNITY]

4. Termine toujours par une ligne "Que souhaitez-vous approfondir ?" puis des suggestions d'actions :
[ACTIONS]Action 1 | Action 2 | Action 3[/ACTIONS]

Règles :
- Maximum 3 actions par réponse
- Pas plus d'1 alerte et 1 opportunité par réponse
- Chiffres toujours avec espaces (87 420 €, pas 87420€)
- Utilise ** uniquement autour des chiffres clés et montants
- Réponds UNIQUEMENT en français
- Reste factuel et basé sur les données ci-dessus`;

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
      max_tokens: 500,
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
