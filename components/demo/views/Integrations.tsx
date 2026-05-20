"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plug, ShieldCheck, Database, DollarSign, FileText, Activity, Link2, CheckCircle2 } from "lucide-react";
import { INTEGRATIONS, RECENT_INVOICES } from "@/lib/demo-data";

function fmt(n: number) { return n.toLocaleString("fr-FR") + " €"; }

export default function Integrations() {
  const [connected, setConnected] = useState<Set<string>>(new Set(INTEGRATIONS.filter((i) => i.connected).map((i) => i.id)));

  function toggle(id: string) {
    setConnected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const activeCount = connected.size;
  const totalInvoices = INTEGRATIONS.filter((i) => connected.has(i.id)).reduce((a, i) => a + i.invoices, 0);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-[#1A2B24] font-display tracking-tight flex items-center gap-3">
          <Plug size={22} className="text-[#2A5240]" />
          Connecter mon logiciel comptable
        </h1>
        <p className="text-sm text-[#8A9E97] mt-1">
          Synchronisez vos factures, créances et soldes pour que Ryvo suive tout en temps réel.
        </p>
      </div>

      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[rgba(42,82,64,0.12)] rounded-full">
        <ShieldCheck size={13} className="text-[#2A5240]" />
        <span className="text-xs text-[#4A5E56]">Connexion chiffrée OAuth 2.0 · Lecture seule · Révocable à tout moment</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <Database size={14} className="text-[#2A5240]" />
            <p className="text-[10px] font-semibold text-[#8A9E97] uppercase tracking-wider">Connexions actives</p>
          </div>
          <p className="text-3xl font-bold text-[#1A2B24] font-display">{activeCount}<span className="text-base text-[#8A9E97]">/{INTEGRATIONS.length}</span></p>
        </div>
        <div className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign size={14} className="text-[#B8935A]" />
            <p className="text-[10px] font-semibold text-[#8A9E97] uppercase tracking-wider">Factures totales synchronisées</p>
          </div>
          <p className="text-3xl font-bold text-[#1A2B24] font-display">{totalInvoices.toLocaleString("fr-FR")}</p>
        </div>
        <div className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl p-5 shadow-card">
          <p className="text-[10px] font-semibold text-[#8A9E97] uppercase tracking-wider mb-3">Données suivies par Ryvo</p>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-[#4A5E56]">
            <span className="flex items-center gap-1.5"><FileText size={11} className="text-[#2A5240]" /> Factures clients</span>
            <span className="flex items-center gap-1.5"><FileText size={11} className="text-[#2A5240]" /> Factures fournisseurs</span>
            <span className="flex items-center gap-1.5"><Database size={11} className="text-[#2A5240]" /> Soldes bancaires</span>
            <span className="flex items-center gap-1.5"><Activity size={11} className="text-[#2A5240]" /> Mouvements trésorerie</span>
          </div>
        </div>
      </div>

      {/* Integration cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {INTEGRATIONS.map((int, idx) => {
          const isConnected = connected.has(int.id);
          return (
            <motion.div
              key={int.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className={`bg-white border rounded-2xl p-5 shadow-card transition-all ${
                isConnected ? "border-[#2A5240]/25" : "border-[rgba(42,82,64,0.1)]"
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold font-display text-lg shrink-0"
                  style={{ backgroundColor: int.color }}
                >
                  {int.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-base font-semibold text-[#1A2B24] font-display">{int.name}</p>
                    {int.tag && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        int.tag === "RECOMMANDÉ" ? "bg-[#2A5240]/10 text-[#2A5240]" : "bg-[#B8935A]/15 text-[#8B6B3C]"
                      }`}>
                        {int.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#8A9E97]">{int.desc}</p>
                </div>
              </div>

              {isConnected ? (
                <>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="inline-flex items-center gap-1.5 text-[#2D7A4F] font-semibold">
                      <CheckCircle2 size={12} /> Connecté
                    </span>
                    <span className="text-[#8A9E97]">Dernière sync · à l'instant</span>
                  </div>
                  <div className="bg-[#FAFAF7] border border-[rgba(42,82,64,0.06)] rounded-lg px-3.5 py-2.5 mb-3 text-xs text-[#4A5E56]">
                    <span className="font-semibold text-[#1A2B24]">{int.invoices.toLocaleString("fr-FR")}</span> factures synchronisées
                  </div>
                  {int.id === "pennylane" && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-semibold text-[#8A9E97] uppercase tracking-wider">Dernières factures synchronisées</p>
                        <button className="text-[10px] font-medium text-[#2A5240] hover:text-[#1C3A2B]">Voir tout ›</button>
                      </div>
                      <ul className="space-y-1.5">
                        {RECENT_INVOICES.map((inv, i) => (
                          <li key={i} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: inv.color }} />
                              <span className="text-[#1A2B24] font-medium">{inv.client}</span>
                              <span className="text-[#8A9E97]">{inv.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-[#1A2B24] font-display">{fmt(inv.montant)}</span>
                              <span
                                className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                                style={{ backgroundColor: inv.color + "15", color: inv.color }}
                              >
                                {inv.status}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <button
                    onClick={() => toggle(int.id)}
                    className="w-full mt-4 px-4 py-2.5 text-xs font-medium text-[#8A9E97] hover:text-[#C0392B] border border-[rgba(42,82,64,0.12)] hover:border-[#C0392B]/30 rounded-lg transition-colors"
                  >
                    Déconnecter
                  </button>
                </>
              ) : (
                <button
                  onClick={() => toggle(int.id)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#2A5240] hover:bg-[#1C3A2B] text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  <Link2 size={14} /> Connecter
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
