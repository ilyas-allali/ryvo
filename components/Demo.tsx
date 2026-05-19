"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, RotateCcw, TrendingUp, TrendingDown, Clock,
  AlertTriangle, MessageSquare, BarChart3, Zap, Euro,
} from "lucide-react";

/* ── Sparkline SVG ── */
function Sparkline({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 80, h = 28;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  });
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      <circle cx={pts[pts.length - 1].split(",")[0]} cy={pts[pts.length - 1].split(",")[1]} r="2.5" fill={color} />
    </svg>
  );
}

/* ── Mini bar chart ── */
function BarChart({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  return (
    <div className="flex items-end gap-0.5 h-7">
      {values.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm opacity-60"
          style={{
            height: `${(v / max) * 100}%`,
            backgroundColor: color,
            opacity: i === values.length - 1 ? 1 : 0.35 + (i / values.length) * 0.45,
          }}
        />
      ))}
    </div>
  );
}

/* ── Data ── */
const METRICS = [
  {
    label: "Solde trésorerie",
    value: "87 420 €",
    change: "+12 300 €",
    trend: "up",
    color: "#2A5240",
    icon: Euro,
    spark: [62, 71, 68, 74, 79, 75, 82, 87],
  },
  {
    label: "Créances en retard",
    value: "34 200 €",
    change: "2 critiques",
    trend: "down",
    color: "#C0392B",
    icon: AlertTriangle,
    spark: [18, 22, 28, 25, 31, 29, 34, 34],
  },
  {
    label: "Prévision J+30",
    value: "62 100 €",
    change: "-26% vs proj.",
    trend: "down",
    color: "#B8935A",
    icon: BarChart3,
    spark: [84, 78, 71, 69, 65, 63, 62, 62],
  },
  {
    label: "Temps de réponse",
    value: "28 sec",
    change: "IA disponible",
    trend: "up",
    color: "#2D7A4F",
    icon: Zap,
    spark: [35, 32, 31, 29, 30, 28, 27, 28],
  },
];

const CASHFLOW_MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"];
const CASHFLOW_VALUES = [52, 61, 58, 69, 74, 87];

const ALERTS = [
  { level: "critical", text: "Durand & Fils BTP", detail: "12 400 € · 47j retard", color: "#C0392B" },
  { level: "warning",  text: "Constructions Loire", detail: "8 200 € · 32j retard", color: "#B8935A" },
  { level: "info",     text: "Salaires vendredi", detail: "22 000 € prélevés", color: "#2A5240" },
];

const SUGGESTED = [
  "Puis-je payer les salaires demain ?",
  "Quel est mon risque de trésorerie ce mois ?",
  "Faut-il relancer Durand & Fils BTP ?",
  "Puis-je me permettre d'embaucher quelqu'un ?",
  "Quelle est ma prévision à 30 jours ?",
];

type Msg = { role: "user" | "assistant"; text: string };

export default function Demo() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"dashboard" | "chat">("dashboard");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  async function send(prompt: string) {
    if (!prompt.trim() || loading) return;
    setError("");
    setInput("");
    setActiveTab("chat");
    setMessages((prev) => [...prev, { role: "user", text: prompt }]);
    setLoading(true);
    setStreaming("");

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error("Service indisponible");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let full = "";
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          full += decoder.decode(value, { stream: true });
          setStreaming(full);
        }
      }
      setMessages((prev) => [...prev, { role: "assistant", text: full }]);
      setStreaming("");
    } catch {
      setError("Clé API non configurée. Configurez OPENAI_API_KEY pour activer la démo.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setMessages([]);
    setStreaming("");
    setError("");
    setInput("");
    setActiveTab("dashboard");
    inputRef.current?.focus();
  }

  const displayMessages = [...messages];
  if (streaming) displayMessages.push({ role: "assistant", text: streaming });

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
            Essayez Ryvo{" "}
            <span className="gradient-text italic">maintenant</span>
          </h2>
          <p className="text-lg text-[#4A5E56] max-w-xl mx-auto">
            Données réelles de Bâtiments Morel SAS. Posez n&rsquo;importe quelle question financière.
          </p>
        </motion.div>

        {/* Dashboard mockup shell */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-elevated border border-[rgba(42,82,64,0.1)] overflow-hidden"
        >
          {/* App header bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(42,82,64,0.08)] bg-[#FAFAF7]">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-[#B8935A]/60" />
                <div className="w-3 h-3 rounded-full bg-[#2D7A4F]/60" />
              </div>
              <span className="text-xs text-[#8A9E97] font-medium">Bâtiments Morel SAS — Dashboard Ryvo</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-[#2D7A4F] rounded-full animate-pulse" />
              <span className="text-[11px] text-[#2D7A4F] font-semibold">Synchronisé</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_380px]">
            {/* Left: dashboard panels */}
            <div className="border-r border-[rgba(42,82,64,0.08)]">
              {/* Tab bar */}
              <div className="flex items-center gap-1 px-5 pt-4 pb-0">
                {(["dashboard", "chat"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-t-lg transition-all duration-150 border-b-2 ${
                      activeTab === tab
                        ? "text-[#2A5240] border-[#2A5240] bg-white"
                        : "text-[#8A9E97] border-transparent hover:text-[#4A5E56]"
                    }`}
                  >
                    {tab === "dashboard" ? <BarChart3 size={12} /> : <MessageSquare size={12} />}
                    {tab === "dashboard" ? "Tableau de bord" : "IA Copilote"}
                    {tab === "chat" && messages.length > 0 && (
                      <span className="w-1.5 h-1.5 bg-[#2A5240] rounded-full" />
                    )}
                  </button>
                ))}
              </div>
              <div className="h-px bg-[rgba(42,82,64,0.08)] mx-5" />

              <AnimatePresence mode="wait">
                {activeTab === "dashboard" ? (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="p-5 space-y-4"
                  >
                    {/* Metric cards grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {METRICS.map((m, i) => {
                        const Icon = m.icon;
                        return (
                          <motion.div
                            key={m.label}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: i * 0.06 }}
                            className="bg-[#FAFAF7] border border-[rgba(42,82,64,0.1)] rounded-xl p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-[10px] font-semibold text-[#8A9E97] uppercase tracking-wide">{m.label}</p>
                              <Icon size={12} style={{ color: m.color }} />
                            </div>
                            <p className="text-xl font-bold text-[#1A2B24] font-display mb-1">{m.value}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                {m.trend === "up" ? <TrendingUp size={10} style={{ color: m.color }} /> : <TrendingDown size={10} style={{ color: m.color }} />}
                                <span className="text-[10px] font-semibold" style={{ color: m.color }}>{m.change}</span>
                              </div>
                              <Sparkline values={m.spark} color={m.color} />
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Cash flow chart */}
                    <div className="bg-[#FAFAF7] border border-[rgba(42,82,64,0.1)] rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-[#1A2B24]">Évolution trésorerie</p>
                        <span className="text-[10px] text-[#8A9E97] font-medium">6 derniers mois</span>
                      </div>
                      <div className="flex items-end gap-2 h-16">
                        {CASHFLOW_VALUES.map((v, i) => {
                          const max = Math.max(...CASHFLOW_VALUES);
                          const pct = (v / max) * 100;
                          const isLast = i === CASHFLOW_VALUES.length - 1;
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                              <div
                                className="w-full rounded-t-md transition-all duration-500"
                                style={{
                                  height: `${pct}%`,
                                  backgroundColor: isLast ? "#2A5240" : `rgba(42,82,64,${0.2 + (i / CASHFLOW_VALUES.length) * 0.5})`,
                                }}
                              />
                              <span className="text-[9px] text-[#8A9E97]">{CASHFLOW_MONTHS[i]}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Alerts */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-[#1A2B24]">Actions requises</p>
                      {ALERTS.map((a, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 bg-[#FAFAF7] border rounded-lg px-3.5 py-2.5"
                          style={{ borderColor: a.color + "25" }}
                        >
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: a.color }} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-[#1A2B24] truncate">{a.text}</p>
                            <p className="text-[10px] text-[#8A9E97]">{a.detail}</p>
                          </div>
                          <button
                            onClick={() => send(`Que faire concernant ${a.text} ?`)}
                            className="text-[10px] font-semibold px-2.5 py-1 rounded-md border transition-colors"
                            style={{ color: a.color, borderColor: a.color + "30", backgroundColor: a.color + "08" }}
                          >
                            Demander à Ryvo →
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  /* ── Chat view ── */
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex flex-col"
                    style={{ height: 420 }}
                  >
                    <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(42,82,64,0.06)]">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-[#2A5240]/10 border border-[#2A5240]/15 flex items-center justify-center">
                          <Zap size={11} className="text-[#2A5240]" />
                        </div>
                        <span className="text-xs font-semibold text-[#1A2B24]">Ryvo IA</span>
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1 bg-[#2D7A4F] rounded-full animate-pulse" />
                          <span className="text-[10px] text-[#8A9E97]">En ligne</span>
                        </div>
                      </div>
                      {messages.length > 0 && (
                        <button onClick={reset} className="p-1 text-[#8A9E97] hover:text-[#4A5E56] transition-colors">
                          <RotateCcw size={13} />
                        </button>
                      )}
                    </div>

                    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                      {displayMessages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-6">
                          <div className="w-10 h-10 rounded-xl bg-[#2A5240]/8 border border-[#2A5240]/15 flex items-center justify-center mb-3">
                            <Zap size={16} className="text-[#2A5240]" />
                          </div>
                          <p className="text-sm font-semibold text-[#1A2B24] mb-1">Bonjour, je suis Ryvo</p>
                          <p className="text-xs text-[#8A9E97]">Posez-moi une question sur vos finances</p>
                        </div>
                      ) : (
                        <AnimatePresence>
                          {displayMessages.map((msg, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.22 }}
                              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                                  msg.role === "user"
                                    ? "bg-[#2A5240] text-white rounded-br-sm"
                                    : "bg-[#FAFAF7] border border-[rgba(42,82,64,0.1)] text-[#1A2B24] rounded-bl-sm"
                                }`}
                              >
                                {msg.text}
                                {msg.role === "assistant" && i === displayMessages.length - 1 && loading && (
                                  <span className="inline-block w-2 h-4 bg-[#2A5240] ml-0.5 animate-blink align-middle" />
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      )}

                      {loading && !streaming && (
                        <div className="flex justify-start">
                          <div className="flex gap-1 items-center px-4 py-3 bg-[#FAFAF7] border border-[rgba(42,82,64,0.1)] rounded-2xl rounded-bl-sm">
                            {[0, 150, 300].map((d) => (
                              <div key={d} className="w-1.5 h-1.5 bg-[#2A5240]/50 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                            ))}
                          </div>
                        </div>
                      )}

                      {error && (
                        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                          <AlertTriangle size={13} className="text-red-400 mt-0.5 shrink-0" />
                          <p className="text-xs text-red-500">{error}</p>
                        </div>
                      )}
                      <div ref={bottomRef} />
                    </div>

                    <div className="px-4 py-3 border-t border-[rgba(42,82,64,0.06)]">
                      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2">
                        <input
                          ref={inputRef}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Posez votre question financière..."
                          disabled={loading}
                          className="flex-1 bg-[#FAFAF7] border border-[rgba(42,82,64,0.12)] focus:border-[#2A5240] focus:shadow-input rounded-xl px-4 py-2.5 text-sm text-[#1A2B24] placeholder-[#8A9E97] outline-none transition-all disabled:opacity-50"
                        />
                        <button
                          type="submit"
                          disabled={!input.trim() || loading}
                          className="w-9 h-9 shrink-0 rounded-xl bg-[#2A5240] hover:bg-[#1C3A2B] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                        >
                          <Send size={14} className="text-white" />
                        </button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Suggested questions + context */}
            <div className="flex flex-col">
              <div className="p-5 border-b border-[rgba(42,82,64,0.08)]">
                <p className="text-[10px] font-semibold text-[#8A9E97] uppercase tracking-wider mb-3">Questions suggérées</p>
                <div className="space-y-2">
                  {SUGGESTED.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      disabled={loading}
                      className="w-full text-left text-xs px-3.5 py-2.5 bg-[#FAFAF7] border border-[rgba(42,82,64,0.1)] hover:border-[rgba(42,82,64,0.25)] hover:bg-[#2A5240]/5 rounded-lg text-[#4A5E56] hover:text-[#1A2B24] transition-all disabled:opacity-40 font-medium"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5">
                <p className="text-[10px] font-semibold text-[#8A9E97] uppercase tracking-wider mb-3">Contexte actuel</p>
                <div className="space-y-2">
                  {[
                    { label: "Entreprise", value: "Bâtiments Morel SAS" },
                    { label: "Secteur",    value: "BTP / Construction" },
                    { label: "Modèle IA",  value: "GPT-4o" },
                    { label: "Données",    value: "En temps réel" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <span className="text-[11px] text-[#8A9E97]">{row.label}</span>
                      <span className="text-[11px] font-semibold text-[#4A5E56]">{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-[#2A5240]/6 border border-[#2A5240]/15 rounded-xl">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Clock size={11} className="text-[#2A5240]" />
                    <span className="text-[10px] font-semibold text-[#2A5240]">Prochain briefing</span>
                  </div>
                  <p className="text-xs text-[#4A5E56]">Demain 7h30 · Email + WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
