"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Globe, FileCheck, Eye, RefreshCw } from "lucide-react";

const items = [
  { icon: Lock,     title: "AES-256",          desc: "Chiffrement bout en bout de toutes vos données financières, au repos et en transit." },
  { icon: Globe,    title: "France / UE",       desc: "Hébergement exclusivement en France et dans l'Union Européenne. Vos données ne quittent jamais l'Europe." },
  { icon: Shield,   title: "RGPD",              desc: "Conformité totale RGPD. Vous gardez le contrôle intégral sur vos données. Suppression à la demande." },
  { icon: FileCheck,title: "DSP2 certifié",     desc: "Agrégateur bancaire certifié DSP2. Accès en lecture seule. Aucun credential stocké." },
  { icon: Eye,      title: "Lecture seule",     desc: "Ryvo ne peut jamais effectuer de transactions. Accès consultation uniquement, par design." },
  { icon: RefreshCw,title: "Audits trimestriels",desc: "Tests de pénétration et audits de sécurité réalisés chaque trimestre par un cabinet indépendant." },
];

export default function Security() {
  return (
    <section id="security" className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-[11px] font-semibold tracking-[0.22em] text-[#2A5240] uppercase mb-4">Sécurité</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A2B24] tracking-tight mb-5 font-display">
            Sécurité de niveau{" "}
            <span className="gradient-text italic">bancaire</span>
          </h2>
          <p className="text-lg text-[#4A5E56] max-w-xl mx-auto">
            Vos données financières sont ce que vous avez de plus précieux.
            On les protège comme telles.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group flex items-start gap-4 card-surface rounded-xl p-5 transition-all duration-300 hover:shadow-card-hover"
              >
                <div className="w-9 h-9 rounded-lg bg-[#2A5240]/8 border border-[#2A5240]/15 flex items-center justify-center shrink-0 group-hover:bg-[#2A5240]/15 transition-colors">
                  <Icon size={15} className="text-[#2A5240]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A2B24] mb-1">{item.title}</p>
                  <p className="text-xs text-[#4A5E56] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
