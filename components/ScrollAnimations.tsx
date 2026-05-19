"use client";

import { useEffect } from "react";

export default function ScrollAnimations() {
  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      /* ── 1. Fade-up reveals (all [data-reveal] elements) ── */
      const revealEls = document.querySelectorAll<HTMLElement>("[data-reveal]");
      revealEls.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 44, scale: 0.98 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      /* ── 2. Staggered children inside [data-stagger] ── */
      const staggerGroups = document.querySelectorAll<HTMLElement>("[data-stagger]");
      staggerGroups.forEach((group) => {
        const children = Array.from(group.children) as HTMLElement[];
        gsap.fromTo(
          children,
          { opacity: 0, y: 36, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      /* ── 3. Section headings: word-by-word split animation ── */
      const headings = document.querySelectorAll<HTMLElement>("[data-split]");
      headings.forEach((el) => {
        const words = el.innerText.trim().split(" ");
        el.innerHTML = words
          .map((w) => `<span class="inline-block overflow-hidden"><span class="inline-block word-span">${w} </span></span>`)
          .join("");
        const spans = el.querySelectorAll<HTMLElement>(".word-span");
        gsap.fromTo(
          spans,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power4.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      /* ── 4. Hero parallax — background grid moves slower than content ── */
      const heroBg = document.querySelector<HTMLElement>("[data-parallax-bg]");
      if (heroBg) {
        gsap.to(heroBg, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: heroBg.parentElement,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      /* ── 5. Horizontal line growth (section dividers) ── */
      const lines = document.querySelectorAll<HTMLElement>("[data-line]");
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: line,
              start: "top 90%",
              once: true,
            },
          }
        );
      });

      /* ── 6. Metric counters ── */
      const counters = document.querySelectorAll<HTMLElement>("[data-counter]");
      counters.forEach((el) => {
        const target = parseFloat(el.getAttribute("data-counter") ?? "0");
        const isFloat = target % 1 !== 0;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate() {
            el.textContent = isFloat
              ? obj.val.toFixed(1)
              : Math.round(obj.val).toLocaleString("fr-FR");
          },
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });

      /* ── 7. Floating cards in hero — subtle continuous drift ── */
      const floatCards = document.querySelectorAll<HTMLElement>("[data-float]");
      floatCards.forEach((card, i) => {
        const dir = i % 2 === 0 ? -8 : 8;
        gsap.to(card, {
          y: dir,
          duration: 3 + i * 0.7,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      /* ── 8. Pricing card on-hover tilt ── */
      const cards = document.querySelectorAll<HTMLElement>("[data-tilt]");
      cards.forEach((card) => {
        card.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const rx = ((e.clientY - cy) / (rect.height / 2)) * -4;
          const ry = ((e.clientX - cx) / (rect.width / 2)) * 4;
          gsap.to(card, { rotateX: rx, rotateY: ry, duration: 0.3, ease: "power1.out", transformPerspective: 800 });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
        });
      });
    }

    init();
  }, []);

  return null;
}
