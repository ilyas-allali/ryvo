"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { FORECAST_90D } from "@/lib/demo-data";
import { GroupedBarChart } from "../charts";

type Scenario = "realiste" | "optimiste" | "pessimiste";

const SCENARIO_DATA: Record<Scenario, { label: string; color: string; weekly: { in: number; out: number }[]; totalIn: number; totalOut: number; ending: number; negWeeks: number }> = {
  realiste: {
    label: "Réaliste",
    color: "#2A5240",
    weekly: [
      { in: 18, out: 65 }, { in: 12, out: 22 }, { in: 8,  out: 50 }, { in: 27, out: 18 },
      { in: 64, out: 14 }, { in: 22, out: 58 }, { in: 38, out: 18 }, { in: 21, out: 16 },
      { in: 30, out: 18 }, { in: 48, out: 60 }, { in: 64, out: 22 }, { in: 27, out: 14 },
      { in: 95, out: 72 },
    ],
    totalIn: 474, totalOut: 447, ending: 56, negWeeks: 4,
  },
  optimiste: {
    label: "Optimiste",
    color: "#2D7A4F",
    weekly: [
      { in: 22, out: 65 }, { in: 14, out: 24 }, { in: 10, out: 50 }, { in: 32, out: 16 },
      { in: 72, out: 12 }, { in: 26, out: 58 }, { in: 44, out: 16 }, { in: 24, out: 14 },
      { in: 34, out: 16 }, { in: 55, out: 60 }, { in: 72, out: 20 }, { in: 30, out: 14 },
      { in: 110, out: 75 },
    ],
    totalIn: 499, totalOut: 444, ending: 79, negWeeks: 3,
  },
  pessimiste: {
    label: "Pessimiste",
    color: "#C0392B",
    weekly: [
      { in: 14, out: 70 }, { in: 8,  out: 24 }, { in: 4,  out: 55 }, { in: 18, out: 20 },
      { in: 48, out: 16 }, { in: 16, out: 60 }, { in: 28, out: 22 }, { in: 14, out: 20 },
      { in: 22, out: 22 }, { in: 38, out: 65 }, { in: 50, out: 24 }, { in: 20, out: 16 },
      { in: 70, out: 78 },
    ],
    totalIn: 350, totalOut: 492, ending: -42, negWeeks: 7,
  },
};

function fmt(n: number) { return n.toLocaleString("fr-FR") + " €"; }

export default function Previsions() {
  const [scenario, setScenario] = useState<Scenario>("optimiste");
  const data = SCENARIO_DATA[scenario];

  const groups = useMemo(
    () => data.weekly.map((w, i) => ({
      label: `S${i + 1}`,
      values: [
        { value: w.in,  color: "#9BB5A5" },
        { value: w.out, color: "#D9B89A" },
      ],
    })),
    [data]
  );

  const lineValues = useMemo(() => {
    let bal = 0;
    return data.weekly.map((w) => { bal += w.in - w.out; return bal; });
  }, [data]);

  const peak = Math.max(...lineValues);
  const trough = Math.min(...lineValues);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-[#1A2B24] font-display tracking-tight">Prévisions</h1>
        <p className="text-sm text-[#8A9E97] mt-1">13 semaines · Mise à jour quotidienne · Trois scénarios comparés</p>
      </div>

      {/* Scenario tabs */}
      <div className="inline-flex items-center gap-1 p-1 bg-white border border-[rgba(42,82,64,0.1)] rounded-xl shadow-card">
        {(["realiste", "optimiste", "pessimiste"] as Scenario[]).map((s) => (
          <button
            key={s}
            onClick={() => setScenario(s)}
            className={`relative px-5 py-2 text-sm font-medium rounded-lg transition-colors ${
              scenario === s ? "text-[#1A2B24]" : "text-[#8A9E97] hover:text-[#4A5E56]"
            }`}
          >
            {scenario === s && (
              <motion.span
                layoutId="scenario-pill"
                className="absolute inset-0 rounded-lg bg-[#FAFAF7] border border-[rgba(42,82,64,0.12)]"
                transition={{ type: "spring", bounce: 0.18, duration: 0.35 }}
              />
            )}
            <span className="relative capitalize">{SCENARIO_DATA[s].label}</span>
          </button>
        ))}
      </div>

      {/* KPI row */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scenario}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Total encaissements", value: fmt(data.totalIn * 1000), color: "#2A5240", Icon: TrendingUp },
            { label: "Total décaissements", value: fmt(data.totalOut * 1000), color: "#B8935A", Icon: TrendingDown },
            { label: "Solde fin de période", value: fmt(data.ending * 1000), color: data.ending >= 0 ? "#2A5240" : "#C0392B", Icon: TrendingUp },
            { label: "Semaines en négatif",  value: `${data.negWeeks} / 13`, color: data.negWeeks > 5 ? "#C0392B" : "#B8935A", Icon: AlertTriangle },
          ].map((k) => (
            <div key={k.label} className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl p-5 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-semibold text-[#8A9E97] uppercase tracking-[0.16em]">{k.label}</p>
                <k.Icon size={14} style={{ color: k.color }} />
              </div>
              <p className="text-2xl lg:text-3xl font-bold font-display" style={{ color: k.color }}>{k.value}</p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Weekly chart */}
      <motion.div
        layout
        className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl p-5 shadow-card"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-base font-bold text-[#1A2B24] font-display">
            Flux et solde hebdomadaire — Scénario {data.label.toLowerCase()}
          </p>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <GroupedBarChart groups={groups} line={{ values: lineValues, color: data.color }} height={300} />
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center justify-between mt-3 text-xs">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#9BB5A5]" /> Encaissements</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#D9B89A]" /> Décaissements</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5" style={{ backgroundColor: data.color }} /> Solde</span>
          </div>
          <div className="flex items-center gap-4 text-[#4A5E56]">
            <span>Creux min. : <span className="font-bold font-display" style={{ color: trough < 0 ? "#C0392B" : "#1A2B24" }}>{trough}K€</span></span>
            <span>Pic max. : <span className="font-bold text-[#1A2B24] font-display">{peak}K€</span></span>
          </div>
        </div>
      </motion.div>

      {/* Comparison */}
      <div className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl p-5 shadow-card">
        <p className="text-base font-bold text-[#1A2B24] mb-4 font-display">Comparatif des scénarios sur 90 jours</p>
        <div className="grid grid-cols-3 gap-4">
          {(["pessimiste", "realiste", "optimiste"] as Scenario[]).map((s) => {
            const d = SCENARIO_DATA[s];
            const active = scenario === s;
            return (
              <button
                key={s}
                onClick={() => setScenario(s)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  active
                    ? "border-[#2A5240]/30 bg-[#2A5240]/4"
                    : "border-[rgba(42,82,64,0.08)] bg-[#FAFAF7] hover:border-[#2A5240]/15"
                }`}
              >
                <p className="text-xs font-semibold text-[#8A9E97] uppercase tracking-wide mb-2 capitalize">{d.label}</p>
                <p className="text-2xl font-bold font-display mb-1" style={{ color: d.color }}>{fmt(d.ending * 1000)}</p>
                <p className="text-[11px] text-[#8A9E97]">Solde projeté · {d.negWeeks} sem. en négatif</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
