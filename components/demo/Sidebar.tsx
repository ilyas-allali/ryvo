"use client";

import { motion } from "framer-motion";
import { Home, BarChart3, TrendingUp, FileText, Mail, ClipboardList, Plug } from "lucide-react";
import type { ViewId } from "./types";
import { COMPANY } from "@/lib/demo-data";

const sections: { title: string; items: { id: ViewId; label: string; Icon: typeof Home }[] }[] = [
  {
    title: "Vue d'ensemble",
    items: [
      { id: "accueil",    label: "Accueil",    Icon: Home },
      { id: "analyses",   label: "Analyses",   Icon: BarChart3 },
      { id: "previsions", label: "Prévisions", Icon: TrendingUp },
      { id: "creances",   label: "Créances",   Icon: FileText },
    ],
  },
  {
    title: "Automatisation",
    items: [
      { id: "relances",     label: "Relances IA",   Icon: Mail },
      { id: "reporting",    label: "Reporting",     Icon: ClipboardList },
      { id: "integrations", label: "Intégrations",  Icon: Plug },
    ],
  },
];

export default function Sidebar({ view, setView }: { view: ViewId; setView: (v: ViewId) => void }) {
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-[rgba(42,82,64,0.08)] flex flex-col">
      <div className="px-6 pt-6 pb-5 border-b border-[rgba(42,82,64,0.06)]">
        <p className="text-sm font-semibold text-[#1A2B24] font-display tracking-tight">{COMPANY.name}</p>
        <p className="text-xs text-[#8A9E97] mt-0.5">Plan {COMPANY.plan}</p>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.title} className="mb-5 last:mb-0">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-[#8A9E97] uppercase px-3 mb-2">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map(({ id, label, Icon }) => {
                const active = view === id;
                return (
                  <li key={id}>
                    <button
                      onClick={() => setView(id)}
                      className={`relative w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                        active
                          ? "bg-[#2A5240]/8 text-[#1A2B24] font-semibold"
                          : "text-[#4A5E56] hover:bg-[#FAFAF7] hover:text-[#1A2B24]"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="sidebar-active"
                          className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-[#2A5240] rounded-r"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                        />
                      )}
                      <Icon size={15} className={active ? "text-[#2A5240]" : "text-[#8A9E97]"} />
                      <span>{label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-[rgba(42,82,64,0.06)]">
        <div className="rounded-xl bg-[#2A5240]/6 border border-[#2A5240]/15 p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D7A4F] animate-pulse" />
            <p className="text-[10px] font-semibold text-[#2A5240] uppercase tracking-wider">Sync active</p>
          </div>
          <p className="text-[11px] text-[#4A5E56] leading-relaxed">
            BNP Pro · Qonto · Pennylane
          </p>
        </div>
      </div>
    </aside>
  );
}
