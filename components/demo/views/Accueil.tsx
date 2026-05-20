"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Plus, AlertTriangle, RotateCcw } from "lucide-react";
import { BRIEFING, KPIS, SANTE_BREAKDOWN, SUGGESTED_QUESTIONS, BANK_ACCOUNTS } from "@/lib/demo-data";
import { ScoreRing, LineChart } from "../charts";
import RichMessage from "../RichMessage";

type Msg = { role: "user" | "assistant"; text: string };

function fmt(n: number) {
  return n.toLocaleString("fr-FR") + " €";
}
function fmtSigned(n: number) {
  return (n >= 0 ? "+" : "") + n.toLocaleString("fr-FR") + " €";
}

export default function Accueil() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState("");
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  async function send(prompt: string) {
    if (!prompt.trim() || loading) return;
    setError("");
    setInput("");
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
      setError("Service IA temporairement indisponible. Réessayez dans un instant.");
    } finally {
      setLoading(false);
    }
  }

  const displayMessages = streaming ? [...messages, { role: "assistant" as const, text: streaming }] : messages;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
      {/* Main column */}
      <div className="space-y-5">
        {/* Header pill */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#2A5240] flex items-center justify-center shadow-[0_4px_16px_rgba(42,82,64,0.25)]">
            <Sparkles size={20} className="text-[#B8935A]" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#1A2B24] font-display tracking-tight">Ryvo</h1>
            <p className="text-sm text-[#8A9E97]">Directeur financier IA</p>
          </div>
          <div className="hidden sm:flex items-center gap-5">
            <div>
              <p className="text-[10px] font-semibold text-[#8A9E97] uppercase tracking-wider">Solde</p>
              <p className="text-lg font-bold text-[#1A2B24] font-display">{fmt(KPIS.solde)}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[#8A9E97] uppercase tracking-wider">Runway</p>
              <p className="text-lg font-bold text-[#1A2B24] font-display">{KPIS.runwayMonths} mois</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[#8A9E97] uppercase tracking-wider">Santé</p>
              <p className="text-lg font-bold text-[#1A2B24] font-display">{KPIS.santeScore}/100</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-[#4A5E56]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D7A4F] animate-pulse" />
            <span>Connecté · Dernière mise à jour il y a 2 min</span>
          </div>
          <button className="inline-flex items-center gap-1 text-[#2A5240] hover:text-[#1C3A2B] font-medium transition-colors">
            <Plus size={12} /> Nouveau
          </button>
        </div>

        {/* Briefing card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl p-5 shadow-card"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[#2A5240]/8 border border-[#2A5240]/15 flex items-center justify-center">
              <Sparkles size={14} className="text-[#2A5240]" />
            </div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#8A9E97] uppercase">
              Briefing quotidien · {BRIEFING.date}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            {BRIEFING.blocks.map((b) => (
              <div key={b.label} className="bg-[#FAFAF7] rounded-xl px-4 py-4 text-center border border-[rgba(42,82,64,0.06)]">
                <p className="text-[10px] font-semibold text-[#8A9E97] uppercase tracking-wider mb-1.5">{b.label}</p>
                <p className="text-xl font-bold text-[#1A2B24] font-display">{b.value}</p>
                <p className="text-[11px] text-[#8A9E97] mt-0.5">{b.sub}</p>
              </div>
            ))}
          </div>

          <p className="text-sm font-semibold text-[#1A2B24] mb-3">Mouvements des dernières 24h</p>
          <ul className="space-y-2">
            {BRIEFING.movements.map((m, i) => (
              <li key={i} className="flex items-center justify-between py-2 border-b border-[rgba(42,82,64,0.06)] last:border-0">
                <span className="text-sm text-[#4A5E56]">{m.label}</span>
                <span className={`text-sm font-semibold ${m.amount >= 0 ? "text-[#2D7A4F]" : "text-[#1A2B24]"} font-display`}>
                  {fmtSigned(m.amount)}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Quick prompts */}
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              disabled={loading}
              className="text-xs px-3.5 py-2 rounded-full bg-white border border-[rgba(42,82,64,0.12)] text-[#4A5E56] hover:border-[#2A5240]/30 hover:bg-[#2A5240]/5 hover:text-[#1A2B24] transition-all disabled:opacity-40 font-medium"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat conversation */}
        {displayMessages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl p-5 shadow-card"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#8A9E97] uppercase">Conversation</p>
              <button onClick={() => { setMessages([]); setStreaming(""); }} className="p-1 text-[#8A9E97] hover:text-[#4A5E56] transition-colors">
                <RotateCcw size={13} />
              </button>
            </div>
            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              <AnimatePresence>
                {displayMessages.map((msg, i) => {
                  const isStreaming = loading && i === displayMessages.length - 1 && msg.role === "assistant";
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "user" ? (
                        <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-br-sm bg-[#2A5240] text-white text-sm leading-relaxed">
                          {msg.text}
                        </div>
                      ) : (
                        <div className="max-w-[92%] bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl rounded-bl-sm px-4 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                          {isStreaming ? (
                            <p className="text-sm text-[#1A2B24] leading-relaxed whitespace-pre-wrap">
                              {msg.text}
                              <span className="inline-block w-2 h-4 bg-[#2A5240] ml-0.5 animate-blink align-middle" />
                            </p>
                          ) : (
                            <RichMessage content={msg.text} onAction={(action) => send(action)} />
                          )}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
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
          </motion.div>
        )}

        {/* Composer */}
        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="bg-white border border-[rgba(42,82,64,0.12)] rounded-2xl p-2 shadow-card flex items-center gap-2 focus-within:border-[#2A5240]/40 focus-within:shadow-input transition-all"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez une question à votre CFO IA…"
            disabled={loading}
            className="flex-1 bg-transparent px-3 py-2.5 text-sm text-[#1A2B24] placeholder-[#8A9E97] outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-9 h-9 shrink-0 rounded-xl bg-[#2A5240] hover:bg-[#1C3A2B] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <Send size={14} className="text-white" />
          </button>
        </form>
        <p className="text-[11px] text-center text-[#8A9E97]">
          Ryvo analyse votre trésorerie, vos créances, simule des scénarios et rédige vos relances.
        </p>
      </div>

      {/* Right rail — Santé + Prévision 90j + Contexte */}
      <div className="space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl p-5 shadow-card"
        >
          <div className="flex items-center gap-4 mb-4">
            <ScoreRing score={KPIS.santeScore} color="#B8935A" />
            <div>
              <p className="text-[10px] font-semibold text-[#8A9E97] uppercase tracking-wider mb-1">Santé financière</p>
              <p className="text-base font-bold text-[#1A2B24] font-display">Correcte</p>
              <p className="text-[11px] text-[#8A9E97] mt-0.5">Score basé sur 12 indicateurs clés</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {SANTE_BREAKDOWN.map((b) => (
              <div key={b.label} className="text-center">
                <p className="text-[9px] font-semibold text-[#8A9E97] uppercase tracking-tight mb-1">{b.label}</p>
                <div className="h-1 bg-[rgba(42,82,64,0.08)] rounded-full overflow-hidden mb-1">
                  <div className="h-full rounded-full" style={{ width: `${b.score}%`, backgroundColor: b.color }} />
                </div>
                <p className="text-xs font-semibold text-[#1A2B24] font-display">{b.score}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl p-5 shadow-card"
        >
          <p className="text-sm font-semibold text-[#1A2B24] mb-1 font-display">Prévision trésorerie — 90 jours</p>
          <p className="text-xs text-[#8A9E97] mb-3">Scénario réaliste</p>
          <LineChart
            series={[{ values: [87, 56, 28, 41, 72, 105], color: "#2A5240", area: true }]}
            labels={["Auj", "J+7", "J+15", "J+30", "J+60", "J+90"]}
            height={170}
            yTicks={3}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white border border-[rgba(42,82,64,0.1)] rounded-2xl p-5 shadow-card"
        >
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#8A9E97] uppercase mb-4">Contexte financier</p>
          {BANK_ACCOUNTS.map((acc) => (
            <div key={acc.name} className="flex items-center justify-between py-2.5 border-b border-[rgba(42,82,64,0.06)] last:border-0">
              <div>
                <p className="text-sm font-semibold text-[#1A2B24]">{acc.name}</p>
                <p className="text-[11px] text-[#8A9E97]">{acc.type}</p>
              </div>
              <p className="text-sm font-bold text-[#1A2B24] font-display">{fmt(acc.balance)}</p>
            </div>
          ))}
          <div className="flex items-center justify-between pt-3 mt-2 border-t border-[rgba(42,82,64,0.15)]">
            <p className="text-xs font-semibold text-[#4A5E56]">Total consolidé</p>
            <p className="text-base font-bold text-[#2A5240] font-display">{fmt(KPIS.solde)}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
