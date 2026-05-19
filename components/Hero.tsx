"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, TrendingUp, TrendingDown, Clock, Zap, Leaf } from "lucide-react";

function DashboardCard() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [10, -10]), {
    stiffness: 180, damping: 28,
  });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-10, 10]), {
    stiffness: 180, damping: 28,
  });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }
  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      className="relative w-full max-w-md"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Ambient glows */}
      <div className="absolute -inset-16 bg-[#2A5240]/8 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -inset-8 bg-[#B8935A]/6 rounded-full blur-2xl pointer-events-none" />

      {/* Main dashboard panel */}
      <div
        className="relative bg-white rounded-2xl p-5 shadow-elevated border border-[rgba(42,82,64,0.12)] gradient-border"
        style={{ transform: "translateZ(0px)" }}
      >
        {/* Window controls + header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-semibold text-[#1A2B24]">Bâtiments Morel SAS</p>
            <p className="text-[11px] text-[#8A9E97] mt-0.5">Mis à jour il y a 2h</p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#2D7A4F]/10 border border-[#2D7A4F]/20 rounded-full">
            <div className="w-1.5 h-1.5 bg-[#2D7A4F] rounded-full animate-pulse" />
            <span className="text-xs text-[#2D7A4F] font-semibold">En direct</span>
          </div>
        </div>

        {/* Main metric */}
        <div className="mb-5">
          <p className="text-[10px] text-[#8A9E97] mb-1 font-semibold uppercase tracking-widest">Solde trésorerie</p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-[#1A2B24] tracking-tight font-display">87 420 €</span>
            <div className="flex items-center gap-1 mb-1.5 text-[#2D7A4F]">
              <TrendingUp size={13} />
              <span className="text-sm font-semibold">+12 300 €</span>
              <span className="text-[11px] text-[#8A9E97]">vs lundi</span>
            </div>
          </div>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <MetricCell label="Créances en retard" value="34 200 €" trend="up" trendLabel="urgent" color="red" />
          <MetricCell label="Prévision J+30" value="62 100 €" trend="down" trendLabel="-26%" color="amber" />
        </div>

        {/* Alert */}
        <div className="relative overflow-hidden rounded-xl bg-red-50 border border-red-200 p-3.5">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-400 rounded-l-xl" />
          <p className="text-[11px] text-red-500 mb-1 font-semibold">⚠ Action requise</p>
          <p className="text-sm text-[#1A2B24] font-semibold">Relancer Durand & Fils BTP</p>
          <p className="text-[11px] text-[#8A9E97] mt-0.5">12 400 € · 47 jours de retard</p>
        </div>

        {/* Quick questions */}
        <div className="mt-4 flex flex-wrap gap-2">
          {["Salaires demain ?", "Embaucher ce mois ?", "Solde J+30 ?"].map((q) => (
            <span
              key={q}
              className="text-[11px] px-3 py-1.5 bg-[#2A5240]/8 border border-[#2A5240]/15 text-[#2A5240] rounded-full font-medium cursor-pointer hover:bg-[#2A5240]/15 transition-colors"
            >
              {q}
            </span>
          ))}
        </div>
      </div>

      {/* Floating chips */}
      <motion.div
        style={{ transform: "translateZ(45px)" }}
        className="absolute -top-5 -right-8 bg-white rounded-xl px-3.5 py-2.5 shadow-card border border-[rgba(42,82,64,0.1)]"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#2A5240]/10 border border-[#2A5240]/15 flex items-center justify-center">
            <Zap size={12} className="text-[#2A5240]" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#1A2B24]">Réponse en</p>
            <p className="text-[11px] text-[#2D7A4F] font-bold">28 secondes</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ transform: "translateZ(35px)" }}
        className="absolute -bottom-5 -left-8 bg-white rounded-xl px-3.5 py-2.5 shadow-card border border-[rgba(42,82,64,0.1)]"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#B8935A]/10 border border-[#B8935A]/15 flex items-center justify-center">
            <Clock size={12} className="text-[#B8935A]" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#1A2B24]">Briefing</p>
            <p className="text-[11px] text-[#B8935A] font-bold">7h30 chaque jour</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MetricCell({
  label, value, trend, trendLabel, color,
}: {
  label: string;
  value: string;
  trend: "up" | "down";
  trendLabel: string;
  color: "red" | "amber" | "green";
}) {
  const styles = {
    red: { cell: "bg-red-50 border-red-100", value: "text-[#1A2B24]", trend: "text-red-500" },
    amber: { cell: "bg-amber-50 border-amber-100", value: "text-[#1A2B24]", trend: "text-[#B8935A]" },
    green: { cell: "bg-green-50 border-green-100", value: "text-[#1A2B24]", trend: "text-[#2D7A4F]" },
  };
  const s = styles[color];
  return (
    <div className={`border rounded-xl p-3 ${s.cell}`}>
      <p className="text-[10px] text-[#8A9E97] mb-1.5 font-semibold uppercase tracking-wide">{label}</p>
      <p className={`text-lg font-bold leading-none ${s.value}`}>{value}</p>
      <div className={`flex items-center gap-1 mt-1.5 ${s.trend}`}>
        {trend === "up" ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
        <span className="text-[11px] font-semibold">{trendLabel}</span>
      </div>
    </div>
  );
}

const stats = [
  { value: "30s", label: "Temps de réponse" },
  { value: "2h", label: "Gagné par semaine" },
  { value: "90j", label: "Prévision trésorerie" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-bg">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-br from-bg via-bg/95 to-[#F3F1EB]" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#2A5240]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#B8935A]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-14 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-[rgba(42,82,64,0.15)] rounded-full mb-8 shadow-sm"
            >
              <Leaf size={12} className="text-[#2A5240]" />
              <span className="text-xs font-semibold text-[#2A5240] tracking-wide">
                Lancement Avril 2026 · 200 PME seulement
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight text-[#1A2B24] mb-6 font-display"
            >
              Posez une question.{" "}
              <span className="gradient-text italic">Obtenez une réponse.</span>{" "}
              Prenez la bonne décision.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="text-lg text-[#4A5E56] leading-relaxed mb-10 max-w-xl"
            >
              Le premier copilote financier IA pour patrons de PME qui n&rsquo;ont pas
              de directeur financier. Trésorerie, embauche, investissement —
              une réponse en <strong className="text-[#1A2B24] font-semibold">30 secondes</strong>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mb-14"
            >
              <a
                href="#waitlist"
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-xl overflow-hidden"
              >
                <span className="absolute inset-0 bg-[#2A5240] group-hover:bg-[#1C3A2B] transition-colors duration-200" />
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]" />
                <span className="relative">Rejoindre la waitlist</span>
                <ArrowRight size={15} className="relative transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#2A5240] rounded-xl border border-[rgba(42,82,64,0.2)] hover:border-[rgba(42,82,64,0.4)] hover:bg-[#2A5240]/5 transition-all duration-200"
              >
                Voir la démo
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-8"
            >
              {stats.map((stat, i) => (
                <div key={i} className="border-l-2 border-[#2A5240]/20 pl-4 first:border-l-0 first:pl-0">
                  <p className="text-2xl font-bold text-[#2A5240] font-display">{stat.value}</p>
                  <p className="text-xs text-[#8A9E97] mt-0.5 font-medium">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: 3D dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
            style={{ perspective: 1000 }}
          >
            <DashboardCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
