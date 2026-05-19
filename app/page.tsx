"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Features from "@/components/Features";
import BeforeAfter from "@/components/BeforeAfter";
import HowItWorks from "@/components/HowItWorks";
import Demo from "@/components/Demo";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Security from "@/components/Security";
import FAQ from "@/components/FAQ";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";

export default function Page() {
  return (
    <main className="bg-bg min-h-screen">
      <ScrollAnimations />
      <Navbar />
      <Hero />
      <Marquee />
      <Features />
      <BeforeAfter />
      <HowItWorks />
      <Demo />
      <Testimonials />
      <Pricing />
      <Security />
      <FAQ />
      <Waitlist />
      <Footer />
    </main>
  );
}
