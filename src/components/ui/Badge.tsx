import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "purity" | "available" | "quote" | "estimate" | "draft" | "demo" | "warning" | "maroon";
}

export function Badge({
  className = "",
  variant = "available",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold";

  const variantStyles = {
    purity: "bg-[#04170f] text-[#f1d98a] border border-[#d4af37]/50 shadow-xs",
    available: "bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40",
    maroon: "bg-[#8e1b2e]/30 text-[#fca5a5] border border-[#8e1b2e]/50",
    quote: "bg-[#0a2a1d] text-[#f1d98a] border border-[#d4af37]/40",
    estimate: "bg-[#1d3b8b]/30 text-[#93c5fd] border border-[#1d3b8b]/50",
    draft: "bg-[#04170f] text-[#a8b6af] border border-white/10",
    demo: "bg-[#8e1b2e]/30 text-[#fca5a5] border border-[#8e1b2e]/50",
    warning: "bg-[#8e1b2e]/25 text-[#f6e7b4] border border-[#d4af37]/40",
  };

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

