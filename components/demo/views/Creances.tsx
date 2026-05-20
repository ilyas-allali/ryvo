"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, FileText, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";
import { CREANCES, KPIS } from "@/lib/demo-data";

function fmt(n: number) { return n.toLocaleString("fr-FR") + " €"; }

type Filter = "all" | "retard" | "venir" | "payees";
type Sort = "retard" | "montant" | "echeance";

export default function Creances() {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("retard");
  const [search, setSearch] = useState("");

  const counts = useMemo(() => ({
    retard: CREANCES.filter((c) => c.statut === "URGENT" || c.statut === "RETARD").length,
    venir:  CREANCES.filter((c) => c.statut === "OK").length,
    payees: CREANCES.filter((c) => c.statut === "PAYEE").length,
  }), []);

  const totals = useMemo(() => {
    const enCours = CREANCES.filter((c) => c.statut !== "PAYEE").reduce((a, c) => a + c.montant, 0);
    const enRetard = CREANCES.filter((c) => c.statut === "URGENT" || c.statut === "RETARD").reduce((a, c) => a + c.montant, 0);
    const encaissees = CREANCES.filter((c) => c.statut === "PAYEE").reduce((a, c) => a + c.montant, 0);
    return { enCours, enRetard, encaissees };
  }, []);

  const filtered = useMemo(() => {
    let list = CREANCES.filter((c) => {
      if (filter === "retard") return c.statut === "URGENT" || c.statut === "RETARD";
      if (filter === "venir")  return c.statut === "OK";
      if (filter === "payees") return c.statut === "PAYEE";
      return true;
    });
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.client.toLowerCase().includes(q) || c.facture.toLowerCase().includes(q));
    }
    const sorted = [...list];
    if (sort === "retard")   sorted.sort((a, b) => b.retard - a.retard);
    if (sort === "montant")  sorted.sort((a, b) => b.montant - a.montant);
    if (sort === "echeance") sorted.sort((a, b) => a.echeance.localeCompare(b.echeance));
    return sorted;
  }, [filter, sort, search]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-[#1A2B24] font-display tracking-tight">Créances</h1>
        <p className="text-sm text-[#8A9E97] mt-1">Suivi des factures clients · {CREANCES.length} factures</p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Total en cours" value={fmt(totals.enCours)} sub={`${CREANCES.length - counts.payees} factures`} Icon={FileText} />
        <Stat label="En retard" value={fmt(totals.enRetard)} sub={`${counts.retard} clients`} Icon={AlertTriangle} color="#C0392B" />
        <Stat label="DSO moyen" value={`${KPIS.dsoMoyen} jours`} sub={`vs secteur : ${KPIS.dsoSecteur}j (−47%)`} Icon={Clock} color="#2A5240" />
        <Stat label="Encaissées (3 mois)" value={fmt(totals.encaissees)} sub={`${counts.payees} factures`} Icon={CheckCircle2} color="#2D7A4F" />
      </div>

      {/* Filters + sort */}
      <div className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl p-5 shadow-card">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-1">
            <FilterPill active={filter === "all"}     onClick={() => setFilter("all")}     label="Toutes" />
            <FilterPill active={filter === "retard"}  onClick={() => setFilter("retard")}  label="En retard" badge={counts.retard} badgeColor="#C0392B" />
            <FilterPill active={filter === "venir"}   onClick={() => setFilter("venir")}   label="À venir"    badge={counts.venir} />
            <FilterPill active={filter === "payees"}  onClick={() => setFilter("payees")}  label="Payées"     badge={counts.payees} badgeColor="#2D7A4F" />
          </div>
          <div className="ml-auto flex items-center gap-3 text-xs text-[#8A9E97]">
            <span>Trier :</span>
            {(["retard", "montant", "echeance"] as Sort[]).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                  sort === s ? "bg-[#FAFAF7] border border-[rgba(42,82,64,0.12)] text-[#1A2B24] font-semibold" : "hover:text-[#4A5E56]"
                }`}
              >
                {s === "echeance" ? "Échéance" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9E97]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par client ou n° facture…"
            className="w-full bg-[#FAFAF7] border border-[rgba(42,82,64,0.1)] focus:border-[#2A5240]/30 focus:shadow-input rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#1A2B24] placeholder-[#8A9E97] outline-none transition-all"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-[10px] font-semibold text-[#8A9E97] uppercase tracking-[0.14em]">
                <th className="text-left pb-3 pl-2">Client</th>
                <th className="text-right pb-3">Facture</th>
                <th className="text-right pb-3">Montant</th>
                <th className="text-right pb-3">Échéance</th>
                <th className="text-right pb-3">Retard</th>
                <th className="text-right pb-3 pr-2">Statut</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center py-8 text-sm text-[#8A9E97]">Aucune facture ne correspond.</td></tr>
              )}
              {filtered.map((c, i) => (
                <motion.tr
                  key={c.facture}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.02 }}
                  className="border-t border-[rgba(42,82,64,0.06)] hover:bg-[#FAFAF7]/60 transition-colors"
                >
                  <td className="py-3.5 pl-2 text-sm text-[#1A2B24] font-medium">{c.client}</td>
                  <td className="py-3.5 text-right text-xs text-[#8A9E97]">{c.facture}</td>
                  <td className="py-3.5 text-right text-sm font-semibold text-[#1A2B24] font-display">{fmt(c.montant)}</td>
                  <td className="py-3.5 text-right text-sm text-[#4A5E56]">{c.echeance}</td>
                  <td className="py-3.5 text-right text-sm">
                    {c.retard > 0 ? <span className="text-[#C0392B] font-semibold">{c.retard}j</span> : <span className="text-[#8A9E97]">—</span>}
                  </td>
                  <td className="py-3.5 pr-2 text-right">
                    <StatusBadge statut={c.statut} />
                  </td>
                  <td className="py-3.5 text-right">
                    {(c.statut === "URGENT" || c.statut === "RETARD") && (
                      <button className="text-xs font-semibold text-[#2A5240] hover:text-[#1C3A2B] transition-colors">Relancer</button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, sub, Icon, color = "#1A2B24" }: { label: string; value: string; sub: string; Icon: typeof FileText; color?: string }) {
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

function FilterPill({ active, onClick, label, badge, badgeColor }: { active: boolean; onClick: () => void; label: string; badge?: number; badgeColor?: string }) {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 px-3.5 py-1.5 text-xs rounded-full transition-colors ${
        active ? "bg-[#FAFAF7] border border-[rgba(42,82,64,0.18)] text-[#1A2B24] font-semibold" : "text-[#8A9E97] hover:text-[#4A5E56]"
      }`}
    >
      {label}
      {badge !== undefined && (
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
          style={{ backgroundColor: (badgeColor ?? "#2A5240") + "15", color: badgeColor ?? "#2A5240" }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

function StatusBadge({ statut }: { statut: "URGENT" | "RETARD" | "OK" | "PAYEE" }) {
  const cfg = {
    URGENT: { bg: "#C0392B15", color: "#C0392B", text: "URGENT" },
    RETARD: { bg: "#B8935A20", color: "#8B6B3C", text: "RETARD" },
    OK:     { bg: "#2D7A4F12", color: "#2D7A4F", text: "OK" },
    PAYEE:  { bg: "#2D7A4F12", color: "#2D7A4F", text: "PAYÉE" },
  }[statut];
  return (
    <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
      {cfg.text}
    </span>
  );
}
