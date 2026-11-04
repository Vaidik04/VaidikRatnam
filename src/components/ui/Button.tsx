import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "maroon" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variantStyles = {
      primary:
        "bg-gold-gradient text-[#04170f] font-semibold hover:brightness-105 shadow-md focus-visible:ring-[#d4af37]",
      secondary:
        "bg-[#0a2a1d] text-[#f1d98a] border border-[#d4af37]/40 hover:bg-[#0f3a28] focus-visible:ring-[#d4af37]",
      gold:
        "bg-gold-gradient text-[#04170f] font-semibold hover:brightness-110 shadow-lg focus-visible:ring-[#d4af37]",
      maroon:
        "bg-[#8e1b2e] text-white hover:bg-[#a52137] border border-[#d4af37]/40 focus-visible:ring-[#8e1b2e]",
      outline:
        "border border-[#d4af37]/60 bg-transparent text-[#f1d98a] hover:bg-[#d4af37]/15 hover:border-[#d4af37] focus-visible:ring-[#d4af37]",
      ghost:
        "bg-transparent text-[#a8b6af] hover:text-[#f1d98a] hover:bg-white/5 focus-visible:ring-[#d4af37]",
    };

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 rounded-full gap-1.5 font-mono",
      md: "text-xs px-5 py-2.5 rounded-full gap-2 font-mono uppercase tracking-wider",
      lg: "text-sm px-7 py-3.5 rounded-full gap-2.5 font-mono uppercase tracking-widest",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

