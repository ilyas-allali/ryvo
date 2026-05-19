"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Leaf } from "lucide-react";

const sectors = [
  "BTP / Construction", "Commerce / Distribution", "Services aux entreprises",
  "Industrie / Fabrication", "Transport / Logistique", "Restauration / Hôtellerie",
  "Santé / Médical", "Immobilier", "IT / Tech", "Autre",
];

const sizes = [
  "1-5 salariés", "6-20 salariés", "21-50 salariés", "51-100 salariés", "+100 salariés",
];

type FormState = "idle" | "loading" | "success";

export default function Waitlist() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    firstName: "", email: "", company: "", sector: "", size: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setTimeout(() => setState("success"), 1200);
  }

  return (
    <section id="waitlist" className="py-16 bg-[#2A5240] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#1C3A2B]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#B8935A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/15 rounded-full mb-6 backdrop-blur-sm">
            <Leaf size={12} className="text-[#B8935A]" />
            <span className="text-xs font-semibold text-white/80">Places limitées · Lancement avril 2026</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5 font-display">
            Rejoignez les{" "}
            <span className="gradient-text-gold italic">200 premières PME</span>
          </h2>
          <p className="text-lg text-white/65">
            Accès prioritaire, tarif de lancement garanti,
            et 60 jours de garantie satisfait ou remboursé.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl p-7 shadow-elevated"
        >
          {state === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#2A5240]/10 border border-[#2A5240]/20 flex items-center justify-center mx-auto mb-5">
                <Check size={28} className="text-[#2A5240]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A2B24] mb-2 font-display">Vous êtes sur la liste !</h3>
              <p className="text-[#4A5E56] text-sm max-w-sm mx-auto">
                Nous vous contacterons en priorité avant le lancement d&rsquo;avril 2026.
                Gardez un œil sur votre boîte mail.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A5E56] mb-1.5">Prénom</label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Jean"
                    className="w-full bg-[#FAFAF7] border border-[rgba(42,82,64,0.15)] focus:border-[#2A5240] focus:shadow-input rounded-lg px-3.5 py-2.5 text-sm text-[#1A2B24] placeholder-[#8A9E97] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A5E56] mb-1.5">Email professionnel</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="jean@entreprise.fr"
                    className="w-full bg-[#FAFAF7] border border-[rgba(42,82,64,0.15)] focus:border-[#2A5240] focus:shadow-input rounded-lg px-3.5 py-2.5 text-sm text-[#1A2B24] placeholder-[#8A9E97] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A5E56] mb-1.5">Entreprise</label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  required
                  placeholder="Bâtiments Morel SAS"
                  className="w-full bg-[#FAFAF7] border border-[rgba(42,82,64,0.15)] focus:border-[#2A5240] focus:shadow-input rounded-lg px-3.5 py-2.5 text-sm text-[#1A2B24] placeholder-[#8A9E97] outline-none transition-all"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A5E56] mb-1.5">Secteur</label>
                  <select
                    name="sector"
                    value={form.sector}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#FAFAF7] border border-[rgba(42,82,64,0.15)] focus:border-[#2A5240] rounded-lg px-3.5 py-2.5 text-sm text-[#1A2B24] outline-none transition-all appearance-none"
                  >
                    <option value="">Choisir...</option>
                    {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A5E56] mb-1.5">Effectif</label>
                  <select
                    name="size"
                    value={form.size}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#FAFAF7] border border-[rgba(42,82,64,0.15)] focus:border-[#2A5240] rounded-lg px-3.5 py-2.5 text-sm text-[#1A2B24] outline-none transition-all appearance-none"
                  >
                    <option value="">Choisir...</option>
                    {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={state === "loading"}
                className="w-full group relative flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white rounded-xl overflow-hidden disabled:opacity-70 mt-2"
              >
                <span className="absolute inset-0 bg-[#2A5240] group-hover:bg-[#1C3A2B] transition-colors duration-200" />
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_70%)]" />
                {state === "loading" ? (
                  <span className="relative flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Inscription...
                  </span>
                ) : (
                  <span className="relative flex items-center gap-2">
                    Rejoindre la waitlist
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                )}
              </button>

              <p className="text-center text-xs text-[#8A9E97]">
                Gratuit · Aucune carte bancaire requise · Garantie 60 jours
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
