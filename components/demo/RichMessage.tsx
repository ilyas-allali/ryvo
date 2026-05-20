"use client";

/* Parses structured AI responses into rich visual components.
   The API returns plain text with special tags:
   [ALERT]title\nbody[/ALERT]
   [OPPORTUNITY]title\nbody[/OPPORTUNITY]
   [ACTIONS]action1 | action2 | action3[/ACTIONS]
   **text** for bold numbers
*/

import { AlertTriangle, Lightbulb, ChevronRight } from "lucide-react";

type Segment =
  | { type: "text";        content: string }
  | { type: "alert";       title: string; body: string }
  | { type: "opportunity"; title: string; body: string }
  | { type: "actions";     items: string[] };

function parseMessage(raw: string): Segment[] {
  const segments: Segment[] = [];
  let cursor = 0;

  const tagRe = /\[(ALERT|OPPORTUNITY|ACTIONS)\]([\s\S]*?)\[\/(ALERT|OPPORTUNITY|ACTIONS)\]/g;
  let match: RegExpExecArray | null;

  while ((match = tagRe.exec(raw)) !== null) {
    // Text before this tag
    if (match.index > cursor) {
      const before = raw.slice(cursor, match.index).trim();
      if (before) segments.push({ type: "text", content: before });
    }

    const tag = match[1];
    const inner = match[2].trim();

    if (tag === "ACTIONS") {
      const items = inner.split("|").map((s) => s.trim()).filter(Boolean);
      segments.push({ type: "actions", items });
    } else {
      const nl = inner.indexOf("\n");
      const title = nl === -1 ? inner : inner.slice(0, nl).trim();
      const body  = nl === -1 ? ""    : inner.slice(nl + 1).trim();
      segments.push({ type: tag === "ALERT" ? "alert" : "opportunity", title, body });
    }

    cursor = match.index + match[0].length;
  }

  // Remaining text
  if (cursor < raw.length) {
    const tail = raw.slice(cursor).trim();
    if (tail) segments.push({ type: "text", content: tail });
  }

  return segments.length ? segments : [{ type: "text", content: raw }];
}

/* Render **bold** inline patterns */
function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**")
          ? <strong key={i} className="font-bold text-[#1A2B24]">{p.slice(2, -2)}</strong>
          : <span key={i}>{p}</span>
      )}
    </>
  );
}

export default function RichMessage({
  content,
  onAction,
}: {
  content: string;
  onAction?: (action: string) => void;
}) {
  const segments = parseMessage(content);

  return (
    <div className="space-y-3">
      {segments.map((seg, i) => {
        if (seg.type === "text") {
          /* Split on newlines to render paragraphs */
          const paras = seg.content.split(/\n+/).filter(Boolean);
          return (
            <div key={i} className="space-y-1.5">
              {paras.map((p, j) => (
                <p key={j} className="text-sm text-[#1A2B24] leading-relaxed">
                  <InlineText text={p} />
                </p>
              ))}
            </div>
          );
        }

        if (seg.type === "alert") {
          return (
            <div
              key={i}
              className="rounded-xl border border-[#C0392B]/20 bg-[#C0392B]/5 p-4"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <AlertTriangle size={13} className="text-[#C0392B] shrink-0" />
                <p className="text-xs font-bold text-[#C0392B]">{seg.title}</p>
              </div>
              <p className="text-xs text-[#4A5E56] leading-relaxed">
                <InlineText text={seg.body} />
              </p>
            </div>
          );
        }

        if (seg.type === "opportunity") {
          return (
            <div
              key={i}
              className="rounded-xl border border-[#B8935A]/25 bg-[#B8935A]/8 p-4"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Lightbulb size={13} className="text-[#B8935A] shrink-0" />
                <p className="text-xs font-bold text-[#8B6B3C]">{seg.title}</p>
              </div>
              <p className="text-xs text-[#4A5E56] leading-relaxed">
                <InlineText text={seg.body} />
              </p>
            </div>
          );
        }

        if (seg.type === "actions") {
          return (
            <div key={i} className="pt-1">
              <p className="text-xs text-[#8A9E97] mb-2">Que souhaitez-vous approfondir ?</p>
              <div className="flex flex-wrap gap-2">
                {seg.items.map((item) => (
                  <button
                    key={item}
                    onClick={() => onAction?.(item)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#2A5240] bg-white border border-[rgba(42,82,64,0.18)] hover:border-[#2A5240]/40 hover:bg-[#2A5240]/5 rounded-lg transition-all"
                  >
                    <ChevronRight size={11} />
                    {item}
                  </button>
                ))}
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
