"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, BarChart3, TrendingUp, Mail, FileText, Plug } from "lucide-react";

const features = [
  { Icon: Sparkles,    label: "Briefing IA quotidien",       desc: "Synthèse vocale chaque matin à 7h30" },
  { Icon: BarChart3,   label: "Analyses temps réel",         desc: "KPIs, flux, charges, prévisions" },
  { Icon: TrendingUp,  label: "3 scénarios à 90 jours",      desc: "Réaliste · Optimiste · Pessimiste" },
  { Icon: FileText,    label: "Suivi des créances",          desc: "Tri, recherche, statuts, DSO" },
  { Icon: Mail,        label: "Relances automatisées",       desc: "Emails rédigés et envoyés par Ryvo" },
  { Icon: Plug,        label: "Intégrations comptables",     desc: "Pennylane, Sage, Cegid, QuickBooks" },
];

export default function Demo() {
  return (
    <section id="demo" className="py-16 bg-[#F3F1EB] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(42,82,64,0.15)] to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-[11px] font-semibold tracking-[0.22em] text-[#2A5240] uppercase mb-4">Démo interactive</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A2B24] tracking-tight mb-5 font-display">
            Voyez Ryvo{" "}
            <span className="gradient-text italic">en action</span>
          </h2>
          <p className="text-lg text-[#4A5E56] max-w-xl mx-auto">
            Naviguez dans le produit complet avec les données fictives de Bâtiments Morel SAS.
            Posez de vraies questions financières au copilote IA.
          </p>
        </motion.div>

        {/* Dashboard preview card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-white rounded-2xl shadow-elevated border border-[rgba(42,82,64,0.1)] overflow-hidden"
        >
          {/* Mock app header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(42,82,64,0.08)] bg-[#FAFAF7]">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-[#B8935A]/60" />
                <div className="w-3 h-3 rounded-full bg-[#2D7A4F]/60" />
              </div>
              <span className="text-xs text-[#8A9E97] font-medium">Bâtiments Morel SAS — Démo Ryvo</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-[#2D7A4F] rounded-full animate-pulse" />
              <span className="text-[11px] text-[#2D7A4F] font-semibold">Synchronisé</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_360px]">
            {/* Left visual */}
            <div className="p-8 lg:p-10 bg-gradient-to-br from-white via-[#FAFAF7] to-[#F3F1EB]/40">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#2A5240] uppercase mb-3">
                Application complète
              </p>
              <h3 className="text-3xl lg:text-4xl font-bold text-[#1A2B24] font-display tracking-tight mb-4">
                Sept modules. <span className="gradient-text italic">Une seule conversation.</span>
              </h3>
              <p className="text-[#4A5E56] mb-6 max-w-md leading-relaxed">
                Accueil, Analyses, Prévisions, Créances, Relances IA, Reporting, Intégrations —
                tout est interactif, toutes les données sont fictives, l&apos;IA répond en temps réel.
              </p>

              <Link
                href="/demo"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[#2A5240] hover:bg-[#1C3A2B] text-white text-sm font-semibold rounded-xl shadow-card transition-all hover:shadow-card-hover"
              >
                Lancer la démo interactive
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>

              <div className="flex items-center gap-3 mt-5 text-xs text-[#8A9E97]">
                <div className="flex -space-x-2">
                  {["#2A5240", "#B8935A", "#2D7A4F"].map((c) => (
                    <div key={c} className="w-6 h-6 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <span>Aucune inscription · Données fictives · 1 minute</span>
              </div>
            </div>

            {/* Right feature list */}
            <div className="border-t lg:border-t-0 lg:border-l border-[rgba(42,82,64,0.08)] p-6 bg-[#FAFAF7]/60">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#8A9E97] uppercase mb-4">
                Modules inclus
              </p>
              <ul className="space-y-2.5">
                {features.map((f, i) => (
                  <motion.li
                    key={f.label}
                    initial={{ opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-[rgba(42,82,64,0.1)] flex items-center justify-center shrink-0">
                      <f.Icon size={13} className="text-[#2A5240]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#1A2B24] mb-0.5">{f.label}</p>
                      <p className="text-[11px] text-[#8A9E97] leading-snug">{f.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
