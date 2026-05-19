"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Zap, Bell, RefreshCw, TrendingUp, MessageSquare, Shield,
} from "lucide-react";

/* ── Terminal mockup (dark green branded) ── */
const terminalLines = [
  { t: 0,    text: "$ analyse trésorerie --période=7j", color: "text-[#5B8A6F]" },
  { t: 700,  text: "→ Connexion CIC, CA, BNP...",       color: "text-[#7AB89A]" },
  { t: 1400, text: "✓ 3 comptes synchronisés",          color: "text-[#5DBB8A]" },
  { t: 2100, text: "→ Calcul prévision J+30...",        color: "text-[#7AB89A]" },
  { t: 2800, text: "✓ Solde prévu: 62 100 €",           color: "text-[#5DBB8A]" },
  { t: 3500, text: "⚠ Alerte: 2 créances critiques",   color: "text-[#D4AF7A]" },
  { t: 4200, text: "→ Génération briefing...",          color: "text-[#7AB89A]" },
  { t: 4900, text: "✓ Rapport prêt. 3 actions.",        color: "text-[#5DBB8A]" },
];

function TerminalMockup() {
  const [lines, setLines] = useState<typeof terminalLines>([]);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!active) return;
    setLines([]);
    const timers = terminalLines.map(({ t, text, color }) =>
      setTimeout(() => setLines((prev) => [...prev, { t, text, color }]), t)
    );
    const reset = setTimeout(() => {
      setActive(false);
      setTimeout(() => setActive(true), 1000);
    }, 7000);
    return () => { timers.forEach(clearTimeout); clearTimeout(reset); };
  }, [active]);

  return (
    <div className="rounded-xl bg-[#0D1E15] border border-[rgba(42,82,64,0.4)] p-4 font-mono text-xs h-36 overflow-hidden">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF7A]/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#5DBB8A]/50" />
        <span className="ml-2 text-[#5B8A6F] text-[10px]">ryvo — terminal</span>
      </div>
      {lines.map((l, i) => (
        <p key={i} className={`${l.color} leading-relaxed`}>{l.text}</p>
      ))}
      {lines.length < terminalLines.length && (
        <span className="text-[#5DBB8A] cursor">▋</span>
      )}
    </div>
  );
}

/* ── Node graph mockup ── */
const nodes = [
  { id: "bank",   label: "Banques",  x: 10, y: 40, color: "#2A5240" },
  { id: "ryvo",   label: "Ryvo IA",  x: 45, y: 40, color: "#B8935A" },
  { id: "alert",  label: "Alertes",  x: 80, y: 15, color: "#D4AF7A" },
  { id: "report", label: "Rapport",  x: 80, y: 65, color: "#2D7A4F" },
];

function NodeGraph() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % 4), 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rounded-xl bg-[#0D1E15] border border-[rgba(42,82,64,0.4)] p-4 h-36 relative overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 100 80" preserveAspectRatio="xMidYMid meet">
        {[
          { from: nodes[0], to: nodes[1], active: step >= 1 },
          { from: nodes[1], to: nodes[2], active: step >= 2 },
          { from: nodes[1], to: nodes[3], active: step >= 3 },
        ].map(({ from, to, active }, i) => (
          <line
            key={i}
            x1={from.x + 7} y1={from.y}
            x2={to.x - 7} y2={to.y}
            stroke={active ? "#3D6B54" : "rgba(42,82,64,0.15)"}
            strokeWidth={active ? "0.8" : "0.5"}
            strokeDasharray={active ? "none" : "2,2"}
            className="transition-all duration-500"
          />
        ))}
        {nodes.map((n, i) => (
          <g key={n.id}>
            <circle
              cx={n.x} cy={n.y} r="7"
              fill={step >= i ? n.color + "22" : "rgba(42,82,64,0.04)"}
              stroke={step >= i ? n.color : "rgba(42,82,64,0.2)"}
              strokeWidth="0.8"
              className="transition-all duration-300"
            />
            <text x={n.x} y={n.y + 14} textAnchor="middle" fill="#5B8A6F" fontSize="5" fontFamily="Inter, sans-serif">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ── IO mockup ── */
function IOMockup() {
  const [phase, setPhase] = useState<"idle" | "typing" | "loading" | "response">("idle");
  const [text, setText] = useState("");
  const fullQuestion = "Puis-je payer les salaires demain ?";
  const answer = "✓ Oui. Solde 87 420 €. Masse salariale ≈22 000 €. Il restera 65 420 € après paiement.";

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "idle") {
      timer = setTimeout(() => setPhase("typing"), 800);
    } else if (phase === "typing") {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setText(fullQuestion.slice(0, i));
        if (i >= fullQuestion.length) { clearInterval(iv); setPhase("loading"); }
      }, 45);
      return () => clearInterval(iv);
    } else if (phase === "loading") {
      timer = setTimeout(() => setPhase("response"), 1200);
    } else if (phase === "response") {
      timer = setTimeout(() => { setText(""); setPhase("idle"); }, 4000);
    }
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <div className="rounded-xl bg-[#0D1E15] border border-[rgba(42,82,64,0.4)] p-4 h-36 flex flex-col justify-between">
      <div className="flex-1">
        {phase === "response" ? (
          <p className="text-xs text-[#5DBB8A] leading-relaxed">{answer}</p>
        ) : phase === "loading" ? (
          <div className="flex gap-1 items-center h-6">
            {[0, 0.15, 0.3].map((d) => (
              <div key={d} className="w-1.5 h-1.5 bg-[#3D6B54] rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#5B8A6F]">{text}<span className="animate-blink text-[#5DBB8A]">|</span></p>
        )}
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-[rgba(42,82,64,0.2)] pt-3">
        <div className="flex-1 h-7 bg-[rgba(42,82,64,0.08)] rounded-lg border border-[rgba(42,82,64,0.15)]" />
        <div className="w-7 h-7 bg-[#2A5240]/40 rounded-lg flex items-center justify-center">
          <Zap size={12} className="text-[#5DBB8A]" />
        </div>
      </div>
    </div>
  );
}

/* ── Feature cards ── */
const features = [
  {
    icon: Zap,
    title: "Réponse en 30 secondes",
    desc: "Posez n'importe quelle question financière. Ryvo analyse vos données en temps réel et répond instantanément.",
    mockup: <IOMockup />,
    accent: "#2A5240",
    light: "bg-[#2A5240]/6 border-[#2A5240]/15",
    iconStyle: "text-[#2A5240] bg-[#2A5240]/8 border-[#2A5240]/15",
  },
  {
    icon: Bell,
    title: "Alertes proactives",
    desc: "Ryvo surveille vos comptes 24h/24 et vous alerte avant que les problèmes de trésorerie n'arrivent.",
    mockup: <NodeGraph />,
    accent: "#B8935A",
    light: "bg-[#B8935A]/6 border-[#B8935A]/15",
    iconStyle: "text-[#B8935A] bg-[#B8935A]/8 border-[#B8935A]/15",
  },
  {
    icon: RefreshCw,
    title: "Analyse automatique",
    desc: "Connexion multi-banques sécurisée. Synchronisation en temps réel. Zéro saisie manuelle.",
    mockup: <TerminalMockup />,
    accent: "#2D7A4F",
    light: "bg-[#2D7A4F]/6 border-[#2D7A4F]/15",
    iconStyle: "text-[#2D7A4F] bg-[#2D7A4F]/8 border-[#2D7A4F]/15",
  },
  {
    icon: TrendingUp,
    title: "Prévision 90 jours",
    desc: "Anticipez votre trésorerie sur 3 mois avec des modèles IA entraînés sur des milliers de PME françaises.",
    mockup: null,
    accent: "#2A5240",
    light: "bg-[#2A5240]/6 border-[#2A5240]/15",
    iconStyle: "text-[#2A5240] bg-[#2A5240]/8 border-[#2A5240]/15",
  },
  {
    icon: MessageSquare,
    title: "Briefing quotidien",
    desc: "Chaque matin à 7h30, recevez vos priorités du jour par email ou WhatsApp. Directement dans votre poche.",
    mockup: null,
    accent: "#B8935A",
    light: "bg-[#B8935A]/6 border-[#B8935A]/15",
    iconStyle: "text-[#B8935A] bg-[#B8935A]/8 border-[#B8935A]/15",
  },
  {
    icon: Shield,
    title: "Sécurité bancaire",
    desc: "Chiffrement AES-256, hébergement France/UE, RGPD, DSP2. Vos données ne quittent jamais l'Europe.",
    mockup: null,
    accent: "#2D7A4F",
    light: "bg-[#2D7A4F]/6 border-[#2D7A4F]/15",
    iconStyle: "text-[#2D7A4F] bg-[#2D7A4F]/8 border-[#2D7A4F]/15",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Features() {
  return (
    <section id="features" className="py-16 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[rgba(42,82,64,0.12)]" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-[11px] font-semibold tracking-[0.22em] text-[#2A5240] uppercase mb-4">Fonctionnalités</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A2B24] tracking-tight mb-5 font-display">
            Tout ce qu&rsquo;un CFO ferait,{" "}
            <span className="gradient-text italic">en automatique</span>
          </h2>
          <p className="text-lg text-[#4A5E56] max-w-2xl mx-auto">
            Ryvo fait le travail d&rsquo;un directeur financier senior. Sans le salaire,
            sans le délai, sans la complexité.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={item}
                className={`group relative rounded-2xl border bg-gradient-to-b p-6 transition-all duration-300 cursor-default card-surface hover:shadow-card-hover ${f.light}`}
              >
                <div className={`inline-flex w-10 h-10 rounded-xl border items-center justify-center mb-4 ${f.iconStyle}`}>
                  <Icon size={17} />
                </div>
                <h3 className="text-base font-semibold text-[#1A2B24] mb-2">{f.title}</h3>
                <p className="text-sm text-[#4A5E56] leading-relaxed mb-4">{f.desc}</p>
                {f.mockup && <div className="mt-2">{f.mockup}</div>}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
