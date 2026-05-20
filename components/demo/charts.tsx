"use client";

/* Lightweight SVG chart primitives — no external lib so bundle stays lean. */

export function Sparkline({ values, color, w = 80, h = 28 }: { values: number[]; color: string; w?: number; h?: number }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  });
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      <circle cx={pts[pts.length - 1].split(",")[0]} cy={pts[pts.length - 1].split(",")[1]} r="2.5" fill={color} />
    </svg>
  );
}

/* Smooth line chart with optional area fill */
export function LineChart({
  series, labels, height = 220, padding = 32, yTicks = 4, currency = "K",
}: {
  series: { values: number[]; color: string; label?: string; dashed?: boolean; area?: boolean }[];
  labels: string[];
  height?: number;
  padding?: number;
  yTicks?: number;
  currency?: string;
}) {
  const all = series.flatMap((s) => s.values);
  const max = Math.max(...all);
  const min = Math.min(0, Math.min(...all));
  const range = max - min || 1;

  const w = 720;
  const innerW = w - padding * 2;
  const innerH = height - padding * 1.5;

  const xFor = (i: number, n: number) => padding + (i / (n - 1)) * innerW;
  const yFor = (v: number) => padding * 0.4 + (1 - (v - min) / range) * innerH;

  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => min + (range * i) / yTicks);

  const smoothPath = (vals: number[]) => {
    const pts = vals.map((v, i) => [xFor(i, vals.length), yFor(v)]);
    if (pts.length < 2) return "";
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const [x0, y0] = pts[i];
      const [x1, y1] = pts[i + 1];
      const cx = (x0 + x1) / 2;
      d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
    }
    return d;
  };

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full h-auto" preserveAspectRatio="none">
      {/* Y grid + labels */}
      {ticks.map((t, i) => (
        <g key={i}>
          <line x1={padding} y1={yFor(t)} x2={w - padding} y2={yFor(t)} stroke="rgba(42,82,64,0.08)" strokeWidth="1" strokeDasharray={t === 0 ? "" : "2 4"} />
          <text x={padding - 8} y={yFor(t) + 3} fontSize="10" fill="#8A9E97" textAnchor="end">
            {Math.round(t)}{currency}
          </text>
        </g>
      ))}
      {/* X labels */}
      {labels.map((l, i) => (
        <text key={i} x={xFor(i, labels.length)} y={height - 8} fontSize="10" fill="#8A9E97" textAnchor="middle">
          {l}
        </text>
      ))}
      {/* Series */}
      {series.map((s, idx) => {
        const d = smoothPath(s.values);
        const lastX = xFor(s.values.length - 1, s.values.length);
        const lastY = yFor(s.values[s.values.length - 1]);
        return (
          <g key={idx}>
            {s.area && (
              <path
                d={`${d} L ${lastX} ${yFor(0)} L ${padding} ${yFor(0)} Z`}
                fill={s.color}
                opacity="0.08"
              />
            )}
            <path
              d={d}
              fill="none"
              stroke={s.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={s.dashed ? "4 4" : ""}
            />
            <circle cx={lastX} cy={lastY} r="4" fill={s.color} />
          </g>
        );
      })}
    </svg>
  );
}

/* Grouped bars (encaissements vs décaissements) with optional line */
export function GroupedBarChart({
  groups, line, height = 260, padding = 36, currency = "K",
}: {
  groups: { label: string; values: { value: number; color: string }[] }[];
  line?: { values: number[]; color: string };
  height?: number;
  padding?: number;
  currency?: string;
}) {
  const all = groups.flatMap((g) => g.values.map((v) => v.value)).concat(line?.values ?? []);
  const max = Math.max(...all);
  const min = Math.min(0, Math.min(...all));
  const range = max - min || 1;

  const w = 760;
  const innerW = w - padding * 2;
  const innerH = height - padding * 1.5;

  const yFor = (v: number) => padding * 0.4 + (1 - (v - min) / range) * innerH;
  const slot = innerW / groups.length;
  const barsPerGroup = groups[0]?.values.length ?? 1;
  const barW = Math.max(6, (slot * 0.65) / barsPerGroup);

  const ticks = [0, 0.33, 0.66, 1].map((t) => min + range * t);

  const linePts = line?.values.map((v, i) => {
    const cx = padding + slot * i + slot / 2;
    return [cx, yFor(v)];
  }) ?? [];

  const smoothLine = (() => {
    if (linePts.length < 2) return "";
    let d = `M ${linePts[0][0]} ${linePts[0][1]}`;
    for (let i = 0; i < linePts.length - 1; i++) {
      const [x0, y0] = linePts[i];
      const [x1, y1] = linePts[i + 1];
      const cx = (x0 + x1) / 2;
      d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
    }
    return d;
  })();

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full h-auto">
      {ticks.map((t, i) => (
        <g key={i}>
          <line x1={padding} y1={yFor(t)} x2={w - padding} y2={yFor(t)} stroke="rgba(42,82,64,0.08)" strokeDasharray={t === 0 ? "" : "2 4"} />
          <text x={padding - 8} y={yFor(t) + 3} fontSize="10" fill="#8A9E97" textAnchor="end">
            {Math.round(t)}{currency}
          </text>
        </g>
      ))}
      {groups.map((g, gi) => {
        const cx = padding + slot * gi + slot / 2;
        const totalW = barW * g.values.length + (g.values.length - 1) * 3;
        return (
          <g key={gi}>
            {g.values.map((bar, bi) => {
              const x = cx - totalW / 2 + bi * (barW + 3);
              const y = bar.value >= 0 ? yFor(bar.value) : yFor(0);
              const h = Math.abs(yFor(bar.value) - yFor(0));
              return <rect key={bi} x={x} y={y} width={barW} height={h} rx="3" fill={bar.color} opacity="0.85" />;
            })}
            <text x={cx} y={height - 8} fontSize="10" fill="#8A9E97" textAnchor="middle">{g.label}</text>
          </g>
        );
      })}
      {line && (
        <>
          <path d={smoothLine} fill="none" stroke={line.color} strokeWidth="2.5" strokeLinecap="round" />
          {linePts.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill={line.color} />
          ))}
        </>
      )}
    </svg>
  );
}

/* Donut */
export function Donut({
  slices, size = 220, thickness = 28,
}: { slices: { value: number; color: string; label: string }[]; size?: number; thickness?: number }) {
  const total = slices.reduce((a, s) => a + s.value, 0);
  const radius = size / 2 - thickness / 2 - 2;
  const cx = size / 2;
  const cy = size / 2;
  let acc = 0;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      {slices.map((s, i) => {
        const start = (acc / total) * 2 * Math.PI - Math.PI / 2;
        acc += s.value;
        const end = (acc / total) * 2 * Math.PI - Math.PI / 2;
        const largeArc = end - start > Math.PI ? 1 : 0;
        const x1 = cx + radius * Math.cos(start);
        const y1 = cy + radius * Math.sin(start);
        const x2 = cx + radius * Math.cos(end);
        const y2 = cy + radius * Math.sin(end);
        const d = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
        return (
          <path key={i} d={d} fill="none" stroke={s.color} strokeWidth={thickness} strokeLinecap="butt" />
        );
      })}
    </svg>
  );
}

/* Score ring (used for "Santé financière") */
export function ScoreRing({ score, size = 88, thickness = 8, color = "#B8935A" }: { score: number; size?: number; thickness?: number; color?: string }) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const cx = size / 2;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <circle cx={cx} cy={cx} r={radius} fill="none" stroke="rgba(42,82,64,0.08)" strokeWidth={thickness} />
      <circle
        cx={cx} cy={cx} r={radius}
        fill="none" stroke={color} strokeWidth={thickness}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cx})`}
      />
      <text x={cx} y={cx + 5} fontSize="20" fontWeight="700" fill="#1A2B24" textAnchor="middle" fontFamily="var(--font-display, Georgia, serif)">
        {score}
      </text>
    </svg>
  );
}
