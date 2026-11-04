import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "surface" | "cream" | "ivory" | "bordered" | "emerald" | "maroon";
}

export function Card({
  className = "",
  variant = "surface",
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    surface: "bg-[#0a2a1d]/85 text-[#faf7f0] border border-[#d4af37]/30 shadow-xl backdrop-blur-md",
    cream: "bg-[#04170f]/90 text-[#faf7f0] border border-[#d4af37]/25 shadow-lg",
    ivory: "bg-[#04170f]/90 text-[#faf7f0] border border-[#d4af37]/25 shadow-lg",
    bordered: "bg-transparent border border-[#d4af37]/50 text-[#faf7f0]",
    emerald: "bg-[#0a2a1d] text-white border border-[#d4af37]/40 shadow-2xl",
    maroon: "bg-[#8e1b2e]/30 text-white border border-[#d4af37]/40 shadow-2xl",
  };

  return (
    <div
      className={`rounded-sm transition-all duration-300 shadow-2xs ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

