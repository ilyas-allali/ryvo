"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Clock, CheckCircle2, Edit3, ChevronDown, Mail, TrendingUp } from "lucide-react";
import { RELANCES_PENDING, RELANCES_HISTORY, RELANCES_STATS } from "@/lib/demo-data";

function fmt(n: number) { return n.toLocaleString("fr-FR") + " €"; }

export default function Relances() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [sent, setSent] = useState<Set<number>>(new Set());

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-[#1A2B24] font-display tracking-tight">Relances IA</h1>
        <p className="text-sm text-[#8A9E97] mt-1">Recouvrement automatisé · Emails rédigés par Ryvo, validés par vous</p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Stat label="En attente" value={`${RELANCES_STATS.pending}`} sub="relances à envoyer" color="#B8935A" Icon={Clock} />
        <Stat label="Montant récupéré" value={fmt(RELANCES_STATS.recovered)} sub="sur 3 mois" color="#2A5240" Icon={TrendingUp} />
        <Stat label="Taux de succès" value={`${RELANCES_STATS.successRate}%`} sub="paiement après relance" color="#2D7A4F" Icon={CheckCircle2} />
      </div>

      {/* Pending */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-[#1A2B24] font-display">Relances en attente</p>
        {RELANCES_PENDING.map((r, i) => {
          const isOpen = openIdx === i;
          const isSent = sent.has(i);
          return (
            <motion.div
              key={r.facture}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`bg-white border rounded-2xl shadow-card transition-all ${
                isSent ? "border-[#2D7A4F]/30 bg-[#2D7A4F]/4" : "border-[rgba(42,82,64,0.1)]"
              }`}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <p className="text-base font-semibold text-[#1A2B24] font-display">{r.client}</p>
                    <span
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: r.typeColor + "15", color: r.typeColor }}
                    >
                      {r.type}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-[#1A2B24] font-display">{fmt(r.montant)}</p>
                    <p className="text-xs text-[#C0392B] font-semibold">{r.retard}j</p>
                  </div>
                </div>
                <p className="text-xs text-[#8A9E97] mb-4">
                  Facture : {r.facture} · Contact : {r.contact}
                </p>

                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#2A5240] hover:text-[#1C3A2B] transition-colors mb-4"
                >
                  <Mail size={12} />
                  {isOpen ? "Masquer l'email" : "Voir l'email complet"}
                  <ChevronDown size={12} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-[#FAFAF7] border border-[rgba(42,82,64,0.1)] rounded-xl p-4 mb-4">
                        <pre className="text-xs text-[#4A5E56] leading-relaxed whitespace-pre-wrap font-sans">
                          {r.email}
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {isSent ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2D7A4F]/10 text-[#2D7A4F] text-xs font-semibold rounded-lg">
                    <CheckCircle2 size={13} /> Envoyée à {r.contact}
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setSent((prev) => new Set(prev).add(i))}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#2A5240] hover:bg-[#1C3A2B] text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      <Send size={12} /> Envoyer maintenant
                    </button>
                    <button className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#FAFAF7] border border-[rgba(42,82,64,0.12)] text-[#4A5E56] hover:text-[#1A2B24] text-xs font-medium rounded-lg transition-colors">
                      <Clock size={12} /> Programmer demain 9h
                    </button>
                    <button className="inline-flex items-center gap-1.5 px-4 py-2.5 text-[#8A9E97] hover:text-[#4A5E56] text-xs font-medium rounded-lg transition-colors">
                      <Edit3 size={12} /> Modifier
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* History */}
      <div className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl p-5 shadow-card">
        <p className="text-base font-bold text-[#1A2B24] mb-4 font-display">Historique des relances</p>
        <table className="w-full">
          <thead>
            <tr className="text-[10px] font-semibold text-[#8A9E97] uppercase tracking-[0.14em]">
              <th className="text-left pb-3">Client</th>
              <th className="text-right pb-3">Montant</th>
              <th className="text-center pb-3">Résultat</th>
              <th className="text-right pb-3">Délai</th>
              <th className="text-right pb-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {RELANCES_HISTORY.map((h, i) => (
              <tr key={i} className="border-t border-[rgba(42,82,64,0.06)] hover:bg-[#FAFAF7]/60 transition-colors">
                <td className="py-3 text-sm font-medium text-[#1A2B24]">{h.client}</td>
                <td className="py-3 text-right text-sm font-semibold text-[#1A2B24] font-display">{fmt(h.montant)}</td>
                <td className="py-3 text-center">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#2D7A4F]/10 text-[#2D7A4F]">{h.status}</span>
                </td>
                <td className="py-3 text-right text-xs text-[#8A9E97]">{h.delay}</td>
                <td className="py-3 text-right text-xs text-[#4A5E56]">{h.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value, sub, color, Icon }: { label: string; value: string; sub: string; color: string; Icon: typeof Clock }) {
  return (
    <div className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl p-5 shadow-card">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-semibold text-[#8A9E97] uppercase tracking-[0.14em]">{label}</p>
        <Icon size={14} style={{ color }} />
      </div>
      <p className="text-3xl font-bold font-display" style={{ color }}>{value}</p>
      <p className="text-[11px] text-[#8A9E97] mt-1">{sub}</p>
    </div>
  );
}
