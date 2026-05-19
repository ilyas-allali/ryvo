"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Leaf } from "lucide-react";

const plans = [
  {
    name: "Essentiel",
    price: { monthly: 149, annual: 119 },
    desc: "Pour démarrer avec l'IA financière",
    highlight: false,
    features: [
      { text: "1 compte bancaire",        ok: true },
      { text: "Briefing email quotidien", ok: true },
      { text: "20 questions par mois",    ok: true },
      { text: "Support email",            ok: true },
      { text: "Questions illimitées",     ok: false },
      { text: "Prévisions 90 jours",      ok: false },
      { text: "Relances automatiques",    ok: false },
      { text: "WhatsApp briefing",        ok: false },
    ],
    cta: "Rejoindre la waitlist",
    tag: null,
  },
  {
    name: "Pro",
    price: { monthly: 349, annual: 279 },
    desc: "Pour les PME qui veulent tout automatiser",
    highlight: true,
    features: [
      { text: "5 comptes bancaires",        ok: true },
      { text: "Briefing email + WhatsApp",  ok: true },
      { text: "Questions illimitées",       ok: true },
      { text: "Prévisions 90 jours",        ok: true },
      { text: "Relances automatiques",      ok: true },
      { text: "Support prioritaire",        ok: true },
      { text: "Tableau de bord avancé",     ok: true },
      { text: "API accès",                  ok: false },
    ],
    cta: "Rejoindre la waitlist",
    tag: "Populaire",
  },
  {
    name: "Entreprise",
    price: null,
    desc: "Pour les groupes et multi-entités",
    highlight: false,
    features: [
      { text: "Comptes illimités",        ok: true },
      { text: "Multi-entités / groupes",  ok: true },
      { text: "Questions illimitées",     ok: true },
      { text: "Prévisions 90 jours",      ok: true },
      { text: "Relances automatiques",    ok: true },
      { text: "API dédiée",               ok: true },
      { text: "Account manager dédié",    ok: true },
      { text: "SLA garanti",              ok: true },
    ],
    cta: "Nous contacter",
    tag: null,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-[11px] font-semibold tracking-[0.22em] text-[#B8935A] uppercase mb-4">Tarifs</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A2B24] tracking-tight mb-5 font-display">
            Transparent.{" "}
            <span className="gradient-text italic">Sans surprise.</span>
          </h2>
          <p className="text-lg text-[#4A5E56] mb-8 max-w-xl mx-auto">
            Garantie satisfaction 60 jours. Remboursement intégral si vous n&rsquo;êtes pas convaincu.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-1 p-1 bg-[#F3F1EB] border border-[rgba(42,82,64,0.1)] rounded-xl">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                !annual ? "bg-white text-[#1A2B24] shadow-sm border border-[rgba(42,82,64,0.1)]" : "text-[#4A5E56] hover:text-[#1A2B24]"
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
                annual ? "bg-white text-[#1A2B24] shadow-sm border border-[rgba(42,82,64,0.1)]" : "text-[#4A5E56] hover:text-[#1A2B24]"
              }`}
            >
              Annuel
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${annual ? "bg-[#2A5240]/10 text-[#2A5240]" : "bg-[#2D7A4F]/10 text-[#2D7A4F]"}`}>
                −20%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className={`relative rounded-2xl p-6 flex flex-col transition-all duration-300 ${
                plan.highlight
                  ? "bg-[#2A5240] border border-[#2A5240] shadow-glow-primary"
                  : "card-surface hover:shadow-card-hover"
              }`}
            >
              {plan.tag && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#B8935A] text-white text-xs font-bold rounded-full shadow-lg">
                    <Leaf size={9} />
                    {plan.tag}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-lg font-bold mb-1 font-display ${plan.highlight ? "text-white" : "text-[#1A2B24]"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.highlight ? "text-white/60" : "text-[#8A9E97]"}`}>{plan.desc}</p>
              </div>

              <div className="mb-6">
                {plan.price ? (
                  <div className="flex items-end gap-1.5">
                    <motion.span
                      key={annual ? "annual" : "monthly"}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-4xl font-bold font-display ${plan.highlight ? "text-white" : "text-[#1A2B24]"}`}
                    >
                      {annual ? plan.price.annual : plan.price.monthly} €
                    </motion.span>
                    <span className={`text-sm mb-1.5 ${plan.highlight ? "text-white/50" : "text-[#8A9E97]"}`}>/mois HT</span>
                  </div>
                ) : (
                  <p className="text-3xl font-bold text-[#1A2B24] font-display">Sur mesure</p>
                )}
                {plan.price && annual && (
                  <p className={`text-xs mt-1 font-medium ${plan.highlight ? "text-[#B8935A]" : "text-[#2D7A4F]"}`}>
                    Facturé {(plan.price.annual * 12).toLocaleString("fr-FR")} €/an
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                      f.ok
                        ? plan.highlight ? "bg-white/20 border border-white/30" : "bg-[#2A5240]/10 border border-[#2A5240]/20"
                        : plan.highlight ? "bg-white/8 border border-white/15" : "bg-[rgba(42,82,64,0.04)] border border-[rgba(42,82,64,0.1)]"
                    }`}>
                      {f.ok
                        ? <Check size={8} className={plan.highlight ? "text-white" : "text-[#2A5240]"} />
                        : <X size={8} className={plan.highlight ? "text-white/30" : "text-[#8A9E97]"} />
                      }
                    </div>
                    <span className={`text-sm ${
                      f.ok
                        ? plan.highlight ? "text-white/90" : "text-[#1A2B24]"
                        : plan.highlight ? "text-white/35" : "text-[#8A9E97]"
                    }`}>{f.text}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  plan.highlight
                    ? "bg-white text-[#2A5240] hover:bg-[#F3F1EB]"
                    : "bg-[#2A5240] text-white hover:bg-[#1C3A2B]"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-[#8A9E97] mt-8"
        >
          Tous les prix sont HT · Annulation à tout moment · Sans engagement annuel pour l&rsquo;offre mensuelle
        </motion.p>
      </div>
    </section>
  );
}
