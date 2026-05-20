"use client";

import { motion } from "framer-motion";
import { Download, Share2, Calendar } from "lucide-react";
import { COMPANY, KPIS, CASHFLOW_6M } from "@/lib/demo-data";
import { GroupedBarChart } from "../charts";

function fmt(n: number) { return n.toLocaleString("fr-FR") + " €"; }

const synthesis = [
  { label: "Solde début",        value: fmt(72100) },
  { label: "Solde fin",          value: fmt(KPIS.solde) },
  { label: "Encaissements",      value: fmt(147200), color: "#2D7A4F" },
  { label: "Décaissements",      value: fmt(152800), color: "#C0392B" },
  { label: "Variation mensuelle", value: "+15 320 €", color: "#2D7A4F" },
  { label: "DSO",                value: "42j", sub: "(−4j)" },
  { label: "Taux de marge",      value: "56.7%" },
  { label: "Runway",             value: `${KPIS.runwayMonths} mois` },
];

const insights = [
  {
    title: "Trésorerie en hausse de +21% vs M-1",
    detail: "Portée par l'encaissement Leroux (13 000 €) et la facture BTP Léger (23 150 €). Maintenir la dynamique commerciale sur Q2.",
    severity: "positive",
  },
  {
    title: "Concentration client à surveiller",
    detail: "Top 3 clients représentent 64% du chiffre d'affaires. Risque de dépendance si perte d'un compte. Diversifier le portefeuille.",
    severity: "warning",
  },
  {
    title: "DSO en amélioration constante",
    detail: "Passage de 46j (Déc) à 38j (Fév). Effet visible des relances automatisées. Continuer à activer Ryvo Relances IA.",
    severity: "positive",
  },
];

export default function Reporting() {
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1A2B24] font-display tracking-tight">Reporting</h1>
          <p className="text-sm text-[#8A9E97] mt-1">Rapports mensuels générés automatiquement</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[rgba(42,82,64,0.12)] hover:border-[#2A5240]/30 text-xs font-medium text-[#4A5E56] hover:text-[#1A2B24] rounded-lg transition-colors">
            <Calendar size={12} /> Février 2026
          </button>
          <button className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[rgba(42,82,64,0.12)] hover:border-[#2A5240]/30 text-xs font-medium text-[#4A5E56] hover:text-[#1A2B24] rounded-lg transition-colors">
            <Share2 size={12} /> Partager
          </button>
          <button className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#2A5240] hover:bg-[#1C3A2B] text-white text-xs font-semibold rounded-lg transition-colors">
            <Download size={12} /> Télécharger PDF
          </button>
        </div>
      </div>

      {/* Report document */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl shadow-card overflow-hidden"
      >
        {/* Cover */}
        <div className="p-8 border-b border-[rgba(42,82,64,0.06)]">
          <h2 className="text-2xl font-bold text-[#1A2B24] font-display tracking-tight uppercase">{COMPANY.name}</h2>
          <p className="text-base text-[#4A5E56] mt-1">Rapport financier mensuel — Février 2026</p>
          <p className="text-xs text-[#8A9E97] mt-2">Généré automatiquement par Ryvo · {COMPANY.generatedAt}</p>
        </div>

        {/* Section 1 */}
        <div className="p-8 border-b border-[rgba(42,82,64,0.06)]">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#2A5240] uppercase mb-4">1. Synthèse financière</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {synthesis.map((s) => (
              <div key={s.label} className="bg-[#FAFAF7] border border-[rgba(42,82,64,0.06)] rounded-xl p-4">
                <p className="text-[10px] font-semibold text-[#8A9E97] uppercase tracking-wider mb-1.5">{s.label}</p>
                <p className="text-xl font-bold font-display" style={{ color: s.color ?? "#1A2B24" }}>
                  {s.value} {s.sub && <span className="text-xs text-[#8A9E97] font-normal">{s.sub}</span>}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2 */}
        <div className="p-8 border-b border-[rgba(42,82,64,0.06)]">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#2A5240] uppercase mb-4">2. Évolution sur 6 mois</p>
          <GroupedBarChart
            groups={CASHFLOW_6M.map((m) => ({
              label: m.label,
              values: [
                { value: m.in,  color: "#9BB5A5" },
                { value: m.out, color: "#D9B89A" },
              ],
            }))}
            line={{ values: CASHFLOW_6M.map((m) => m.in - m.out + 60), color: "#2A5240" }}
            height={240}
          />
        </div>

        {/* Section 3 — Insights */}
        <div className="p-8">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#2A5240] uppercase mb-4">3. Insights IA</p>
          <div className="space-y-3">
            {insights.map((ins, i) => {
              const color = ins.severity === "positive" ? "#2D7A4F" : "#B8935A";
              return (
                <div key={i} className="border-l-2 pl-4 py-1" style={{ borderColor: color }}>
                  <p className="text-sm font-semibold text-[#1A2B24]">{ins.title}</p>
                  <p className="text-xs text-[#4A5E56] mt-1 leading-relaxed">{ins.detail}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-5 bg-[#2A5240]/5 border border-[#2A5240]/15 rounded-xl">
            <p className="text-xs font-semibold text-[#2A5240] uppercase tracking-wider mb-2">Recommandation Ryvo</p>
            <p className="text-sm text-[#1A2B24] leading-relaxed">
              Sur la base des 6 derniers mois, votre trésorerie suit une tendance saine.
              Priorité actuelle : <span className="font-semibold">accélérer le recouvrement</span> sur Durand & Fils
              et Constructions Martin pour libérer 21 300 € sur Q2.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
