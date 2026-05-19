"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const rows = [
  {
    before: "2h/semaine sur Excel",
    after: "Réponse IA en 30 secondes",
  },
  {
    before: "Problèmes de trésorerie découverts 2 mois trop tard",
    after: "Alertes proactives avant les problèmes",
  },
  {
    before: "Décisions prises sans données fraîches",
    after: "Briefing quotidien à 7h30 avec les priorités",
  },
  {
    before: "CFO à 80 000 €/an ou rien du tout",
    after: "Copilote IA 10× moins cher",
  },
];

export default function BeforeAfter() {
  return (
    <section className="py-16 bg-[#F3F1EB] relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-[11px] font-semibold tracking-[0.22em] text-[#B8935A] uppercase mb-4">Avant / Après</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A2B24] tracking-tight font-display">
            Arrêtez de subir votre trésorerie
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-red-200 bg-red-50 p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-full bg-red-100 border border-red-200 flex items-center justify-center">
                <X size={13} className="text-red-500" />
              </div>
              <span className="text-sm font-semibold text-red-500">Avant Ryvo</span>
            </div>
            <ul className="space-y-4">
              {rows.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 mt-0.5 rounded-full bg-red-100 border border-red-200 flex items-center justify-center shrink-0">
                    <X size={9} className="text-red-500" />
                  </div>
                  <span className="text-sm text-[#4A5E56] line-through decoration-red-300">{r.before}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-[#2A5240]/20 bg-[#2A5240]/5 p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#2A5240]/6 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-full bg-[#2A5240]/10 border border-[#2A5240]/20 flex items-center justify-center">
                <Check size={13} className="text-[#2A5240]" />
              </div>
              <span className="text-sm font-semibold text-[#2A5240]">Avec Ryvo</span>
            </div>
            <ul className="space-y-4">
              {rows.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 mt-0.5 rounded-full bg-[#2A5240]/10 border border-[#2A5240]/20 flex items-center justify-center shrink-0">
                    <Check size={9} className="text-[#2A5240]" />
                  </div>
                  <span className="text-sm text-[#1A2B24] font-medium">{r.after}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
