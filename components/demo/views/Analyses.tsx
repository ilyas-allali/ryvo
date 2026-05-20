"use client";

import { motion } from "framer-motion";
import { Wallet, TrendingUp, AlertTriangle, Shield, Clock, BarChart3, FileText, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { KPIS, CASHFLOW_6M, CHARGES, FORECAST_90D, CREANCES, MOUVEMENTS, ALERTES } from "@/lib/demo-data";
import { Donut, GroupedBarChart, LineChart } from "../charts";

function fmt(n: number) { return n.toLocaleString("fr-FR") + " €"; }
function fmtSigned(n: number) { return (n >= 0 ? "+" : "") + n.toLocaleString("fr-FR") + " €"; }

const kpiCards = [
  { label: "Solde consolidé", value: fmt(KPIS.solde),       delta: fmtSigned(KPIS.soldeChange), trend: "up",   Icon: Wallet },
  { label: "Prévision J+30",  value: fmt(KPIS.previsionJ30), delta: `${fmtSigned(KPIS.previsionDelta)} (TVA)`, trend: "down", Icon: TrendingUp },
  { label: "Créances en retard", value: fmt(KPIS.creancesEnRetard), delta: "2 clients", trend: "down", Icon: AlertTriangle },
  { label: "Runway",          value: `${KPIS.runwayMonths} mois`, delta: "stable vs M-1", trend: "up", Icon: Shield },
  { label: "DSO",             value: `${KPIS.dsoMoyen} jours`, delta: "−4j vs M-1", trend: "up", Icon: Clock },
  { label: "Marge nette",     value: `${KPIS.margeNette}%`,   delta: `+${KPIS.margeDelta}pts vs M-1`, trend: "up", Icon: BarChart3 },
];

export default function Analyses() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1A2B24] font-display tracking-tight">Analyses</h1>
          <p className="text-sm text-[#8A9E97] mt-1">
            Bâtiments Morel SAS · Actualisé il y a 2h · Sources : BNP Pro, Qonto, Pennylane
          </p>
        </div>
        <button className="inline-flex items-center gap-2 text-sm font-medium text-[#2A5240] hover:text-[#1C3A2B] transition-colors">
          <FileText size={14} /> Rapport complet
        </button>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiCards.map((k, i) => {
          const isNeg = k.trend === "down";
          return (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-semibold text-[#8A9E97] uppercase tracking-[0.16em]">{k.label}</p>
                <k.Icon size={14} className="text-[#8A9E97]" />
              </div>
              <p className="text-3xl font-bold text-[#1A2B24] font-display mb-2">{k.value}</p>
              <div className="flex items-center gap-1.5">
                {isNeg
                  ? <ArrowDownRight size={13} className="text-[#B8935A]" />
                  : <ArrowUpRight size={13} className="text-[#2D7A4F]" />
                }
                <span className={`text-xs font-medium ${isNeg ? "text-[#B8935A]" : "text-[#2D7A4F]"}`}>{k.delta}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cashflow */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl p-5 shadow-card"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-base font-bold text-[#1A2B24] font-display">Flux de trésorerie</p>
            <p className="text-xs text-[#8A9E97]">Encaissements vs décaissements · 6 derniers mois</p>
          </div>
          <div className="inline-flex items-center gap-1 p-1 bg-[#FAFAF7] rounded-lg border border-[rgba(42,82,64,0.08)]">
            {["30j", "90j", "6m"].map((p, i) => (
              <button
                key={p}
                className={`px-3 py-1 text-xs font-medium rounded ${i === 1 ? "bg-white text-[#1A2B24] shadow-sm" : "text-[#8A9E97]"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <GroupedBarChart
          groups={CASHFLOW_6M.map((m) => ({
            label: m.label,
            values: [
              { value: m.in,  color: "#2A5240" },
              { value: m.out, color: "#C9A47A" },
            ],
          }))}
          line={{ values: CASHFLOW_6M.map((m) => m.in - m.out + 60), color: "#1C3A2B" }}
        />
        <div className="flex items-center gap-5 mt-3 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#2A5240]" /> Encaissements</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#C9A47A]" /> Décaissements</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-[#1C3A2B]" /> Solde cumulé</span>
        </div>
      </motion.div>

      {/* Charges + Prévisions */}
      <div className="grid lg:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl p-5 shadow-card"
        >
          <p className="text-base font-bold text-[#1A2B24] mb-4 font-display">Répartition des charges</p>
          <div className="flex items-center gap-6">
            <Donut slices={CHARGES.map((c) => ({ value: c.value, color: c.color, label: c.label }))} size={180} thickness={24} />
            <ul className="flex-1 grid grid-cols-2 gap-x-4 gap-y-2">
              {CHARGES.map((c) => (
                <li key={c.label} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="text-[#4A5E56]">{c.label}</span>
                  </span>
                  <span className="font-semibold text-[#1A2B24] font-display">{c.value}K</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl p-5 shadow-card"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-base font-bold text-[#1A2B24] font-display">Prévisions — 3 scénarios</p>
            <button className="text-xs font-medium text-[#2A5240] hover:text-[#1C3A2B]">Détails →</button>
          </div>
          <LineChart
            series={[
              { values: FORECAST_90D.optimiste,  color: "#2D7A4F", label: "Optimiste" },
              { values: FORECAST_90D.realiste,   color: "#2A5240", label: "Réaliste",  area: true },
              { values: FORECAST_90D.pessimiste, color: "#B8935A", label: "Pessimiste", dashed: true },
            ]}
            labels={["28/02", "J+7", "J+15", "J+30", "J+60", "J+90"]}
            height={210}
            yTicks={4}
          />
          <div className="flex items-center gap-4 mt-2 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-[#2A5240]" /> Réaliste</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-[#2D7A4F]" /> Optimiste</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-[#B8935A] border-t border-dashed border-[#B8935A]" /> Pessimiste</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom: Créances + Mouvements */}
      <div className="grid lg:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl p-5 shadow-card"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-base font-bold text-[#1A2B24] font-display">Créances clients</p>
            <button className="text-xs font-medium text-[#2A5240] hover:text-[#1C3A2B]">Tout voir ›</button>
          </div>
          <ul className="space-y-2.5">
            {CREANCES.filter((c) => c.statut !== "PAYEE").slice(0, 5).map((c) => (
              <li key={c.facture} className="flex items-center justify-between py-1">
                <span className="text-sm text-[#1A2B24] font-medium">{c.client}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-[#1A2B24] font-display">{fmt(c.montant)}</span>
                  {c.retard > 0 && <span className="text-xs text-[#8A9E97]">{c.retard}j</span>}
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      c.statut === "URGENT" ? "bg-[#C0392B]/10 text-[#C0392B]" :
                      c.statut === "RETARD" ? "bg-[#B8935A]/15 text-[#8B6B3C]" :
                      "bg-[#2D7A4F]/10 text-[#2D7A4F]"
                    }`}
                  >
                    {c.statut}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl p-5 shadow-card"
        >
          <p className="text-base font-bold text-[#1A2B24] mb-4 font-display">Derniers mouvements</p>
          <ul className="space-y-2">
            {MOUVEMENTS.slice(0, 6).map((m, i) => (
              <li key={i} className="flex items-center justify-between py-1.5 text-sm">
                <div className="flex items-center gap-3">
                  <span className={`w-1.5 h-1.5 rounded-full ${m.amount >= 0 ? "bg-[#2D7A4F]" : "bg-[#B8935A]"}`} />
                  <span className="text-[#8A9E97] text-xs w-12">{m.date}</span>
                  <span className="text-[#1A2B24]">{m.label}</span>
                </div>
                <span className={`font-semibold font-display ${m.amount >= 0 ? "text-[#2D7A4F]" : "text-[#1A2B24]"}`}>
                  {fmtSigned(m.amount)}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Alertes */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45 }}
        className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl p-5 shadow-card"
      >
        <p className="text-base font-bold text-[#1A2B24] mb-4 font-display">Alertes actives</p>
        <ul className="space-y-3">
          {ALERTES.map((a, i) => {
            const c = a.severity === "critical" ? "#C0392B" : a.severity === "warning" ? "#B8935A" : "#2A5240";
            return (
              <li
                key={i}
                className="border-l-2 pl-4 py-1"
                style={{ borderColor: c }}
              >
                <p className="text-sm font-semibold text-[#1A2B24]">{a.title}</p>
                <p className="text-xs text-[#8A9E97] mt-0.5">{a.detail}</p>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}
