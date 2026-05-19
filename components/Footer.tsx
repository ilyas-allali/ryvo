"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1C3A2B] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/ryvo-logo.png"
              alt="Ryvo"
              width={80}
              height={34}
              className="h-8 w-auto object-contain brightness-0 invert opacity-90"
            />
            <span className="text-white/40 text-xs">· Copilote financier IA</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-6 text-xs text-white/40">
            {["Mentions légales", "Politique de confidentialité", "CGU", "Contact"].map((link) => (
              <a key={link} href="#" className="hover:text-white/80 transition-colors">
                {link}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-xs text-white/35">
            © 2026 Ryvo. Fait avec ♥ en France.
          </p>
        </motion.div>

        <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-6 text-[11px] text-white/40">
          {["AES-256", "RGPD", "DSP2 certifié", "Hébergement France/UE"].map((badge) => (
            <span key={badge} className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#2D7A4F]/30 border border-[#2D7A4F]/40 flex items-center justify-center text-[8px] text-[#5DBB8A]">✓</span>
              {badge}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
