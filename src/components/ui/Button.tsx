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
        "bg-[#0F3D2E] text-white hover:bg-[#08241B] focus-visible:ring-[#0F3D2E] active:bg-[#051A13]",
      secondary:
        "bg-[#EEF3EE] text-[#0F3D2E] hover:bg-[#DDE5DC] focus-visible:ring-[#0F3D2E]",
      gold:
        "bg-[#D4AF37] text-[#0F3D2E] font-semibold hover:bg-[#B59328] hover:text-white focus-visible:ring-[#D4AF37]",
      maroon:
        "bg-[#6B1F23] text-white hover:bg-[#4D1216] focus-visible:ring-[#6B1F23]",
      outline:
        "border border-[#D4AF37]/60 bg-transparent text-[#0F3D2E] hover:bg-[#F9F5EB] hover:border-[#D4AF37] focus-visible:ring-[#0F3D2E]",
      ghost:
        "bg-transparent text-[#182522] hover:bg-[#F0ECE2] focus-visible:ring-[#0F3D2E]",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 rounded-sm gap-1.5",
      md: "text-sm px-4 py-2.5 rounded-sm gap-2",
      lg: "text-base px-6 py-3 rounded-sm gap-2.5",
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

