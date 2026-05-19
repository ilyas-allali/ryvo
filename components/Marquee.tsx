"use client";

const companies = [
  "Groupe Duval", "BTP Morel", "Réseau Martin", "SARL Lefèvre",
  "Ateliers Dubois", "Constructions Loire", "PME Express", "Solutions Rémy",
  "Groupe Perrin", "Services Lacroix", "Industries Blanc", "Conseil Girard",
];

function Logo({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2.5 px-6 py-3 bg-white border border-[rgba(42,82,64,0.1)] rounded-xl whitespace-nowrap shrink-0 shadow-sm">
      <div className="w-6 h-6 rounded-md bg-[#2A5240]/10 border border-[#2A5240]/15 flex items-center justify-center">
        <span className="text-[10px] font-bold text-[#2A5240]">{name[0]}</span>
      </div>
      <span className="text-sm font-medium text-[#4A5E56]">{name}</span>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="py-10 bg-[#F3F1EB] border-y border-[rgba(42,82,64,0.08)] overflow-hidden">
      <p className="text-center text-[11px] font-semibold tracking-[0.22em] text-[#8A9E97] uppercase mb-8">
        Plus de 200 PME nous font confiance
      </p>

      <div className="marquee-container relative">
        <div className="flex gap-3 w-max animate-marquee">
          {[...companies, ...companies].map((name, i) => (
            <Logo key={i} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}
