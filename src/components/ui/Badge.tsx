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
    "inline-flex items-center px-2.5 py-0.5 rounded-xs text-xs font-medium tracking-wide uppercase";

  const variantStyles = {
    purity: "bg-[#0F3D2E] text-[#F3E5AB] border border-[#D4AF37]/40",
    available: "bg-[#EEF3EE] text-[#0F3D2E] border border-[#C5D5C4]",
    maroon: "bg-[#6B1F23] text-white border border-[#D4AF37]/30",
    quote: "bg-[#F9F5EB] text-[#925700] border border-[#D4AF37]/40",
    estimate: "bg-[#EAF0F6] text-[#1A4B75] border border-[#D0DFEE]",
    draft: "bg-[#EDE9E3] text-[#4B3F36]",
    demo: "bg-[#FFF0F0] text-[#A61C1C] border border-[#FFD0D0]",
    warning: "bg-[#FFF8E7] text-[#925700] border border-[#FFE5A3]",
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

