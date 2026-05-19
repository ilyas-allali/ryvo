"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "J'ai découvert un problème de trésorerie de 40 000 € six semaines trop tard. Avec Ryvo, j'aurais eu l'alerte deux mois avant. Ça aurait tout changé.",
    name: "Jean D.",
    title: "Directeur",
    company: "34 salariés · BTP",
    initial: "J",
    color: "#2A5240",
    bg: "bg-[#2A5240]/8",
  },
  {
    quote:
      "Je passais 3h par semaine à jongler entre Excel et mon ERP. Maintenant Ryvo me donne tout en 30 secondes le matin. C'est un luxe que même mes grands comptes n'ont pas.",
    name: "Marie L.",
    title: "Gérante",
    company: "52 salariés · Services",
    initial: "M",
    color: "#B8935A",
    bg: "bg-[#B8935A]/10",
  },
  {
    quote:
      "Quand on prend des décisions tous les jours, avoir des données en temps réel c'est pas du luxe, c'est une nécessité. Ryvo m'a rendu ça accessible sans embaucher un DAF.",
    name: "Pierre R.",
    title: "Président",
    company: "68 salariés · Industrie",
    initial: "P",
    color: "#2D7A4F",
    bg: "bg-[#2D7A4F]/8",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-[#F3F1EB] relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-[11px] font-semibold tracking-[0.22em] text-[#2A5240] uppercase mb-4">Témoignages</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A2B24] tracking-tight font-display">
            Ce que disent{" "}
            <span className="gradient-text italic">nos patrons</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="card-surface rounded-2xl p-6 flex flex-col transition-all duration-300 hover:shadow-card-hover"
            >
              <Quote size={18} style={{ color: t.color + "60" }} className="mb-4 shrink-0" />
              <p className="text-sm text-[#4A5E56] leading-relaxed flex-1 mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${t.bg} border flex items-center justify-center shrink-0`}
                  style={{ borderColor: t.color + "25" }}
                >
                  <span className="text-sm font-bold" style={{ color: t.color }}>{t.initial}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A2B24]">{t.name}</p>
                  <p className="text-xs text-[#8A9E97]">{t.title} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
