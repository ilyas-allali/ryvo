"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, X, ArrowRight } from "lucide-react";

import Sidebar from "@/components/demo/Sidebar";
import type { ViewId } from "@/components/demo/types";

import Accueil      from "@/components/demo/views/Accueil";
import Analyses     from "@/components/demo/views/Analyses";
import Previsions   from "@/components/demo/views/Previsions";
import Creances     from "@/components/demo/views/Creances";
import Relances     from "@/components/demo/views/Relances";
import Reporting    from "@/components/demo/views/Reporting";
import Integrations from "@/components/demo/views/Integrations";

const VIEWS: Record<ViewId, () => React.ReactElement> = {
  accueil:      Accueil,
  analyses:     Analyses,
  previsions:   Previsions,
  creances:     Creances,
  relances:     Relances,
  reporting:    Reporting,
  integrations: Integrations,
};

export default function DemoPage() {
  const [view, setView] = useState<ViewId>("accueil");
  const View = VIEWS[view];

  return (
    <div className="min-h-screen bg-[#F3F1EB] flex flex-col">
      {/* Top header */}
      <header className="bg-white border-b border-[rgba(42,82,64,0.08)] z-20">
        <div className="flex items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/ryvo-logo.png"
              alt="Ryvo"
              width={72}
              height={28}
              className="h-7 w-auto object-contain"
              priority
            />
            <span className="text-sm text-[#8A9E97] font-medium group-hover:text-[#4A5E56] transition-colors">
              Démo Dashboard
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#B8935A]/12 border border-[#B8935A]/20 text-[#8B6B3C] text-[10px] font-bold tracking-[0.18em] uppercase rounded">
              Démo
            </span>
            <Link
              href="/"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8A9E97] hover:text-[#1A2B24] hover:bg-[#FAFAF7] transition-colors"
              aria-label="Fermer la démo"
            >
              <X size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 flex">
        <Sidebar view={view} setView={setView} />

        <main className="flex-1 overflow-y-auto">
          {/* Banner */}
          <div className="bg-[#FAFAF7] border-b border-[rgba(42,82,64,0.06)] px-8 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#4A5E56]">
                <AlertTriangle size={13} className="text-[#B8935A] shrink-0" />
                <span>Toutes les données affichées sont fictives et servent uniquement à illustrer les fonctionnalités de Ryvo.</span>
              </div>
              <Link
                href="/#waitlist"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#2A5240] hover:text-[#1C3A2B] transition-colors whitespace-nowrap"
              >
                Rejoindre la waitlist <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          <div className="px-8 py-7 max-w-[1280px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <View />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
