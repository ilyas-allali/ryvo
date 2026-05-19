"use client";

import { motion } from "framer-motion";
import { Link2, Brain, Send, MessageCircle } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Link2,
    title: "Connectez vos banques",
    desc: "En 5 minutes, connectez vos comptes bancaires via notre agrégateur DSP2 certifié. CIC, CA, BNP, Société Générale — tous les établissements français sont supportés.",
    time: "5 minutes",
  },
  {
    n: "02",
    icon: Brain,
    title: "L'IA analyse tout",
    desc: "Ryvo lit et comprend vos transactions, identifie vos charges récurrentes, calcule vos prévisions et détecte les anomalies. Zéro configuration.",
    time: "Automatique",
  },
  {
    n: "03",
    icon: Send,
    title: "Recevez votre briefing",
    desc: "Chaque matin à 7h30, recevez vos priorités financières du jour directement dans votre boîte mail ou sur WhatsApp. Simple. Actionnable.",
    time: "7h30 chaque jour",
  },
  {
    n: "04",
    icon: MessageCircle,
    title: "Posez vos questions",
    desc: "Quand une décision se présente, posez directement votre question à Ryvo. Budget, embauche, investissement — vous obtenez une réponse en 30 secondes.",
    time: "À la demande",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-white relative overflow-hidden">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(42,82,64,0.1)] to-transparent -translate-x-1/2 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-[11px] font-semibold tracking-[0.22em] text-[#2A5240] uppercase mb-4">Comment ça marche</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A2B24] tracking-tight mb-5 font-display">
            Opérationnel en{" "}
            <span className="gradient-text italic">5 minutes</span>
          </h2>
          <p className="text-lg text-[#4A5E56] max-w-xl mx-auto">
            Pas d&rsquo;intégration complexe. Pas de formation. Pas de consulting.
            Juste connecter et utiliser.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group card-surface rounded-2xl p-6 transition-all duration-300 hover:shadow-card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-[#2A5240]/8 border border-[#2A5240]/15 flex items-center justify-center group-hover:bg-[#2A5240]/15 transition-colors duration-200">
                    <Icon size={17} className="text-[#2A5240]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#8A9E97] font-mono">{step.n}</span>
                      <span className="text-xs text-[#2A5240] font-semibold px-2.5 py-0.5 bg-[#2A5240]/8 rounded-full border border-[#2A5240]/15">
                        {step.time}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-[#1A2B24] mb-2">{step.title}</h3>
                    <p className="text-sm text-[#4A5E56] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
