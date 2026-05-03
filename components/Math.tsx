"use client";

import katex from "katex";
import { useMemo } from "react";

/**
 * Рендерит текст с inline ($...$) и блочными ($$...$$) формулами KaTeX.
 * Безопасно: между формулами обрабатываются только переводы строк, остальной
 * текст вставляется как обычный текст (без HTML-инъекций).
 */
export function MathText({ text, className }: { text: string; className?: string }) {
  const html = useMemo(() => renderMathText(text), [text]);
  return (
    <div
      className={className ?? "prose-card"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderMathText(text: string): string {
  // Разбиваем текст на токены: $$...$$, $...$ и обычный текст.
  const tokens: { type: "block" | "inline" | "text"; value: string }[] = [];
  const re = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIndex) {
      tokens.push({ type: "text", value: text.slice(lastIndex, m.index) });
    }
    if (m[1] !== undefined) {
      tokens.push({ type: "block", value: m[1] });
    } else if (m[2] !== undefined) {
      tokens.push({ type: "inline", value: m[2] });
    }
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push({ type: "text", value: text.slice(lastIndex) });
  }

  return tokens
    .map((t) => {
      if (t.type === "text") {
        // \\\n превращаем в <br/> (для переносов строк внутри Markdown).
        const escaped = escapeHtml(t.value)
          .replace(/\\\\\n/g, "<br/>")
          .replace(/\\\n/g, "<br/>")
          .replace(/\n/g, "<br/>");
        return escaped;
      }
      try {
        return katex.renderToString(t.value, {
          displayMode: t.type === "block",
          throwOnError: false,
          strict: "ignore",
        });
      } catch {
        return escapeHtml(t.value);
      }
    })
    .join("");
}
