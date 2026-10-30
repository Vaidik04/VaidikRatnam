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
    surface: "bg-white border border-[#E8DFC8]",
    cream: "bg-[#F9F5EB] border border-[#E8DFC8]",
    ivory: "bg-[#F9F5EB] border border-[#E8DFC8]",
    bordered: "bg-transparent border border-[#D4AF37]/50",
    emerald: "bg-[#0F3D2E] text-white border border-[#D4AF37]/40",
    maroon: "bg-[#6B1F23] text-white border border-[#D4AF37]/40",
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

