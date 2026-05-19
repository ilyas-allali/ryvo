"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Ça vaut le coût pour ma PME ?",
    a: "Ryvo remplace 2h de travail par semaine minimum, évite les erreurs de trésorerie, et vous fait prendre de meilleures décisions. Un seul incident de trésorerie évité rembourse l'abonnement plusieurs fois. La plupart de nos clients estiment la valeur créée à 5-10× le coût mensuel.",
  },
  {
    q: "C'est compliqué à mettre en place ?",
    a: "Pas du tout. Connexion de vos comptes bancaires en 5 minutes via notre interface guidée. Aucune intégration ERP requise, aucun IT interne nécessaire. Vous pouvez poser votre première question à Ryvo le jour même de votre inscription.",
  },
  {
    q: "Mes données financières sont-elles en sécurité ?",
    a: "Absolument. Chiffrement AES-256, hébergement France/UE uniquement, conformité RGPD totale, agrégateur bancaire certifié DSP2. Ryvo accède à vos données en lecture seule — il ne peut jamais effectuer de transactions. Audits de sécurité trimestriels par cabinet indépendant.",
  },
  {
    q: "Comment sont traitées mes données personnelles ?",
    a: "Vos données appartiennent uniquement à vous. Elles sont hébergées en France, jamais vendues, jamais utilisées pour entraîner des modèles tiers. Vous pouvez demander leur suppression complète à tout moment. Nous sommes pleinement conformes au RGPD.",
  },
  {
    q: "Quel support si j'ai besoin d'aide ?",
    a: "Support email inclus dans tous les plans. Support prioritaire avec réponse en moins de 4h pour les abonnés Pro. Account manager dédié pour les clients Entreprise. Nous répondons aussi en direct sur WhatsApp pour les urgences.",
  },
  {
    q: "Puis-je annuler à tout moment ?",
    a: "Oui, sans engagement ni frais de résiliation. Si vous annulez, votre accès reste actif jusqu'à la fin de la période payée. En plus de ça, nous offrons une garantie satisfaction 60 jours — remboursement intégral si vous n'êtes pas convaincu.",
  },
];

function FAQItem({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) {
  return (
    <div className={`bg-white rounded-xl overflow-hidden transition-all duration-200 border ${open ? "border-[#2A5240]/25 shadow-sm" : "border-[rgba(42,82,64,0.1)]"}`}>
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className={`text-sm font-semibold transition-colors ${open ? "text-[#1A2B24]" : "text-[#4A5E56]"}`}>{q}</span>
        <div className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${open ? "bg-[#2A5240]" : "bg-[rgba(42,82,64,0.08)]"}`}>
          {open
            ? <Minus size={11} className="text-white" />
            : <Plus size={11} className="text-[#2A5240]" />
          }
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="px-5 pb-5">
              <div className="w-full h-px bg-[rgba(42,82,64,0.08)] mb-4" />
              <p className="text-sm text-[#4A5E56] leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 bg-[#F3F1EB]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-[11px] font-semibold tracking-[0.22em] text-[#B8935A] uppercase mb-4">FAQ</p>
          <h2 className="text-4xl font-bold text-[#1A2B24] tracking-tight mb-4 font-display">
            Questions fréquentes
          </h2>
          <p className="text-[#4A5E56]">Tout ce que vous devez savoir avant de commencer.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.q}
              a={faq.a}
              open={openIdx === i}
              toggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
