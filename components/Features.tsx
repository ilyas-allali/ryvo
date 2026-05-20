"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Zap, Bell, RefreshCw, TrendingUp, MessageSquare, Shield } from "lucide-react";

/* ── Terminal mockup ── */
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
    const reset = setTimeout(() => { setActive(false); setTimeout(() => setActive(true), 1000); }, 7000);
    return () => { timers.forEach(clearTimeout); clearTimeout(reset); };
  }, [active]);
  return (
    <div className="rounded-xl bg-[#0D1E15] border border-[rgba(42,82,64,0.3)] p-4 font-mono text-xs h-40 overflow-hidden w-full">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF7A]/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#5DBB8A]/50" />
        <span className="ml-2 text-[#5B8A6F] text-[10px]">ryvo — terminal</span>
      </div>
      {lines.map((l, i) => (
        <p key={i} className={`${l.color} leading-relaxed`}>{l.text}</p>
      ))}
      {lines.length < terminalLines.length && <span className="text-[#5DBB8A]">▋</span>}
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
    const t = setInterval(() => setStep((s) => (s + 1) % 5), 1200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="rounded-xl bg-[#0D1E15] border border-[rgba(42,82,64,0.3)] p-4 h-40 relative overflow-hidden w-full">
      <svg width="100%" height="100%" viewBox="0 0 100 80" preserveAspectRatio="xMidYMid meet">
        {[
          { from: nodes[0], to: nodes[1], active: step >= 1 },
          { from: nodes[1], to: nodes[2], active: step >= 2 },
          { from: nodes[1], to: nodes[3], active: step >= 3 },
        ].map(({ from, to, active }, i) => (
          <line key={i}
            x1={from.x + 7} y1={from.y} x2={to.x - 7} y2={to.y}
            stroke={active ? "#3D6B54" : "rgba(42,82,64,0.15)"}
            strokeWidth={active ? "0.8" : "0.5"}
            strokeDasharray={active ? "none" : "2,2"}
            className="transition-all duration-500"
          />
        ))}
        {nodes.map((n, i) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r="7"
              fill={step >= i ? n.color + "22" : "rgba(42,82,64,0.04)"}
              stroke={step >= i ? n.color : "rgba(42,82,64,0.2)"}
              strokeWidth="0.8" className="transition-all duration-300"
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
    if (phase === "idle") { timer = setTimeout(() => setPhase("typing"), 800); }
    else if (phase === "typing") {
      let i = 0;
      const iv = setInterval(() => {
        i++; setText(fullQuestion.slice(0, i));
        if (i >= fullQuestion.length) { clearInterval(iv); setPhase("loading"); }
      }, 45);
      return () => clearInterval(iv);
    } else if (phase === "loading") { timer = setTimeout(() => setPhase("response"), 1200); }
    else if (phase === "response") { timer = setTimeout(() => { setText(""); setPhase("idle"); }, 4000); }
    return () => clearTimeout(timer);
  }, [phase]);
  return (
    <div className="rounded-xl bg-[#0D1E15] border border-[rgba(42,82,64,0.3)] p-4 h-40 flex flex-col justify-between w-full">
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

/* ── Forecast mockup ── */
function ForecastMockup() {
  const [progress, setProgress] = useState(0);
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    setProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += 0.018;
      if (p >= 1) { clearInterval(iv); setTimeout(() => setCycle((c) => c + 1), 1200); return; }
      setProgress(p);
    }, 30);
    return () => clearInterval(iv);
  }, [cycle]);

  const pts = [
    [8, 62], [22, 50], [36, 58], [50, 34], [64, 22], [78, 16], [92, 26],
  ] as [number, number][];

  const totalLen = pts.reduce((acc, pt, i) => {
    if (i === 0) return 0;
    const [px, py] = pts[i - 1];
    return acc + Math.hypot(pt[0] - px, pt[1] - py);
  }, 0);

  const pathD = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const areaD = `${pathD} L 92 75 L 8 75 Z`;

  return (
    <div className="rounded-xl bg-[#0D1E15] border border-[rgba(42,82,64,0.3)] p-4 h-40 overflow-hidden w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-[#5B8A6F] font-mono">Prévision 90j</span>
        <span className="text-[10px] text-[#5DBB8A] font-semibold font-mono">↑ +41%</span>
      </div>
      <svg width="100%" height="70" viewBox="0 0 100 75" preserveAspectRatio="none">
        <defs>
          <linearGradient id="fg-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2A5240" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2A5240" stopOpacity="0.02" />
          </linearGradient>
          <clipPath id="fg-clip">
            <rect x="0" y="0" width={`${progress * 100}%`} height="100%" />
          </clipPath>
        </defs>
        <path d={areaD} fill="url(#fg-grad)" clipPath="url(#fg-clip)" />
        <path
          d={pathD} fill="none" stroke="#5DBB8A" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={totalLen}
          strokeDashoffset={totalLen * (1 - progress)}
        />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="#5DBB8A"
            opacity={progress > i / pts.length ? 1 : 0}
            style={{ transition: "opacity 0.2s" }}
          />
        ))}
      </svg>
      <div className="flex justify-between mt-1">
        {["Auj", "J+15", "J+30", "J+60", "J+90"].map((l) => (
          <span key={l} className="text-[9px] text-[#3D5A4A] font-mono">{l}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Briefing mockup ── */
const briefingLines = [
  { delay: 0,    text: "☀️ Briefing du 20/05 · 7h30",       color: "text-[#7AB89A]" },
  { delay: 700,  text: "💰 Solde: 87 420 € (+2 300 €)",      color: "text-[#5DBB8A]" },
  { delay: 1400, text: "⚠️ 2 créances en retard (21 300 €)", color: "text-[#D4AF7A]" },
  { delay: 2100, text: "📋 3 actions Ryvo recommandées",     color: "text-[#7AB89A]" },
  { delay: 2800, text: "→ Envoyé sur WhatsApp & email",       color: "text-[#5B8A6F]" },
];

function BriefingMockup() {
  const [shown, setShown] = useState<number[]>([]);
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    setShown([]);
    const timers = briefingLines.map(({ delay }, i) =>
      setTimeout(() => setShown((v) => [...v, i]), delay)
    );
    const reset = setTimeout(() => setCycle((c) => c + 1), 5000);
    return () => { timers.forEach(clearTimeout); clearTimeout(reset); };
  }, [cycle]);
  return (
    <div className="rounded-xl bg-[#0D1E15] border border-[rgba(42,82,64,0.3)] p-4 h-40 overflow-hidden font-mono text-xs w-full">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-2 h-2 rounded-full bg-[#5DBB8A] animate-pulse" />
        <span className="text-[#5B8A6F] text-[10px]">ryvo — briefing</span>
      </div>
      {briefingLines.map(({ color }, i) => (
        <motion.p
          key={`${cycle}-${i}`}
          initial={{ opacity: 0, x: -8 }}
          animate={shown.includes(i) ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className={`${color} leading-relaxed`}
        >
          {briefingLines[i].text}
        </motion.p>
      ))}
    </div>
  );
}

/* ── Security mockup ── */
const secChecks = ["AES-256 chiffrement", "RGPD conforme", "DSP2 agréé", "Hébergement France/UE"];

function SecurityMockup() {
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    setCount(0);
    const timers = secChecks.map((_, i) => setTimeout(() => setCount(i + 1), 500 + i * 600));
    const reset = setTimeout(() => setCycle((c) => c + 1), 5200);
    return () => { timers.forEach(clearTimeout); clearTimeout(reset); };
  }, [cycle]);
  return (
    <div className="rounded-xl bg-[#0D1E15] border border-[rgba(42,82,64,0.3)] p-4 h-40 overflow-hidden w-full">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-[#2A5240]/25 border border-[#2A5240]/30 flex items-center justify-center">
          <Shield size={13} className="text-[#5DBB8A]" />
        </div>
        <span className="text-[10px] text-[#5DBB8A] font-semibold font-mono">Sécurité vérifiée</span>
        <span className="ml-auto text-[9px] text-[#3D5A4A] font-mono">{count}/{secChecks.length}</span>
      </div>
      <div className="space-y-1.5">
        {secChecks.map((c, i) => (
          <motion.div
            key={`${cycle}-${i}`}
            initial={{ opacity: 0, x: -6 }}
            animate={i < count ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] transition-colors duration-300 ${i < count ? "bg-[#2D7A4F]/30 text-[#5DBB8A]" : "bg-[rgba(42,82,64,0.1)] text-transparent"}`}>
              ✓
            </div>
            <span className="text-[10px] text-[#5B8A6F] font-mono">{c}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Feature definitions ── */
type Feature = {
  icon: React.ElementType;
  title: string;
  desc: string;
  mockup: React.ReactNode;
  accentClass: string;
  iconClass: string;
  borderClass: string;
};

const features: Feature[] = [
  {
    icon: Zap,
    title: "Réponse en 30 secondes",
    desc: "Posez n'importe quelle question financière. Ryvo analyse vos données en temps réel et répond instantanément avec les chiffres exacts.",
    mockup: <IOMockup />,
    accentClass: "from-[#2A5240]/4 to-white",
    iconClass: "text-[#2A5240] bg-[#2A5240]/8 border-[#2A5240]/20",
    borderClass: "border-[#2A5240]/12",
  },
  {
    icon: Bell,
    title: "Alertes proactives",
    desc: "Ryvo surveille vos comptes 24h/24 et vous alerte avant que les problèmes de trésorerie n'arrivent. Zéro surprise.",
    mockup: <NodeGraph />,
    accentClass: "from-[#B8935A]/4 to-white",
    iconClass: "text-[#B8935A] bg-[#B8935A]/8 border-[#B8935A]/20",
    borderClass: "border-[#B8935A]/12",
  },
  {
    icon: RefreshCw,
    title: "Analyse automatique",
    desc: "Connexion multi-banques sécurisée. Synchronisation en temps réel. Zéro saisie manuelle, zéro délai.",
    mockup: <TerminalMockup />,
    accentClass: "from-[#2D7A4F]/4 to-white",
    iconClass: "text-[#2D7A4F] bg-[#2D7A4F]/8 border-[#2D7A4F]/20",
    borderClass: "border-[#2D7A4F]/12",
  },
  {
    icon: TrendingUp,
    title: "Prévision 90 jours",
    desc: "Anticipez votre trésorerie sur 3 mois avec des modèles IA entraînés sur des milliers de PME françaises.",
    mockup: <ForecastMockup />,
    accentClass: "from-[#2A5240]/4 to-white",
    iconClass: "text-[#2A5240] bg-[#2A5240]/8 border-[#2A5240]/20",
    borderClass: "border-[#2A5240]/12",
  },
  {
    icon: MessageSquare,
    title: "Briefing quotidien",
    desc: "Chaque matin à 7h30, recevez vos priorités du jour par email ou WhatsApp. Directement dans votre poche.",
    mockup: <BriefingMockup />,
    accentClass: "from-[#B8935A]/4 to-white",
    iconClass: "text-[#B8935A] bg-[#B8935A]/8 border-[#B8935A]/20",
    borderClass: "border-[#B8935A]/12",
  },
  {
    icon: Shield,
    title: "Sécurité bancaire",
    desc: "Chiffrement AES-256, hébergement France/UE, RGPD, DSP2. Vos données ne quittent jamais l'Europe.",
    mockup: <SecurityMockup />,
    accentClass: "from-[#2D7A4F]/4 to-white",
    iconClass: "text-[#2D7A4F] bg-[#2D7A4F]/8 border-[#2D7A4F]/20",
    borderClass: "border-[#2D7A4F]/12",
  },
];

/* ── Stacking card ── */
function StackCard({
  feature,
  index,
  total,
  progress,
}: {
  feature: Feature;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const Icon = feature.icon;

  // Card starts scaling down when the NEXT card arrives
  const pushStart = (index + 1) / total;
  const pushEnd = Math.min(pushStart + 0.09, 1);

  const scale = useTransform(progress, [pushStart, pushEnd], [1, 0.88]);
  const opacity = useTransform(progress, [pushStart, pushEnd], [1, 0.68]);
  const y = useTransform(progress, [pushStart, pushEnd], [0, -16]);

  return (
    /* Each wrapper provides scroll space; the inner card is sticky */
    <div style={{ minHeight: "48vh" }}>
      <motion.div
        style={{
          scale,
          opacity,
          y,
          position: "sticky",
          top: 80 + index * 6,
          zIndex: index + 1,
          transformOrigin: "top center",
        }}
        className={`rounded-2xl border ${feature.borderClass} bg-gradient-to-br ${feature.accentClass} shadow-card overflow-hidden`}
      >
        <div className="grid md:grid-cols-[1fr_40%]">
          {/* Text panel */}
          <div className="p-7 lg:p-9 flex flex-col justify-center">
            <div className={`inline-flex w-11 h-11 rounded-xl border items-center justify-center mb-5 ${feature.iconClass}`}>
              <Icon size={18} />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-[#1A2B24] mb-3 font-display tracking-tight leading-tight">
              {feature.title}
            </h3>
            <p className="text-sm text-[#4A5E56] leading-relaxed max-w-xs">{feature.desc}</p>
          </div>

          {/* Mockup panel */}
          <div className="border-t md:border-t-0 md:border-l border-[rgba(42,82,64,0.08)] bg-[#0D1E15]/3 p-6 flex items-center justify-center min-h-[180px]">
            <div className="w-full">{feature.mockup}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Section ── */
export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="features" className="py-16 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[rgba(42,82,64,0.12)]" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
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

        {/* Stacking cards */}
        <div ref={sectionRef}>
          {features.map((f, i) => (
            <StackCard
              key={f.title}
              feature={f}
              index={i}
              total={features.length}
              progress={scrollYProgress}
            />
          ))}
          {/* bottom spacer so last card scrolls into view properly */}
          <div className="h-[30vh]" />
        </div>
      </div>
    </section>
  );
}
