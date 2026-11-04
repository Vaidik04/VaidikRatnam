"use client";

import React, { useId } from "react";

interface SplitTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  staggerMs?: number;
  mode?: "words" | "chars";
  italicIndices?: number[];
  italicClass?: string;
}

export function SplitText({
  children,
  className = "",
  as: Component = "h2",
  staggerMs = 45,
  mode = "words",
  italicIndices = [],
  italicClass = "italic text-gold-gradient font-serif",
}: SplitTextProps) {
  const baseId = useId();

  if (mode === "chars") {
    const chars = children.split("");
    return (
      <Component className={`inline-block overflow-hidden ${className}`}>
        {chars.map((char, index) => (
          <span
            key={`${baseId}-c-${index}`}
            className="inline-block transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transitionDelay: `${index * staggerMs}ms`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </Component>
    );
  }

  const words = children.split(" ");
  return (
    <Component className={`block overflow-hidden leading-tight ${className}`}>
      {words.map((word, index) => {
        const isItalic = italicIndices.includes(index);
        return (
          <span
            key={`${baseId}-w-${index}`}
            className="inline-block overflow-hidden mr-[0.28em] align-top"
          >
            <span
              className={`inline-block transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isItalic ? italicClass : ""
              }`}
              style={{
                transitionDelay: `${index * staggerMs}ms`,
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </Component>
  );
}

