import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, helperText, id, required, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#182522] mb-1.5"
          >
            {label} {required && <span className="text-[#A61C1C]">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          className={`w-full px-3.5 py-2.5 bg-white border rounded-sm text-sm text-[#182522] placeholder-[#8F9691] transition-colors focus:outline-none focus:ring-1 focus:ring-[#173B32] focus:border-[#173B32] disabled:bg-[#F3EFE8] disabled:text-[#888] ${
            error ? "border-[#A61C1C] focus:ring-[#A61C1C]" : "border-[#D4CCC0]"
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-[#A61C1C]">{error}</p>}
        {!error && helperText && (
          <p className="mt-1 text-xs text-[#626A65]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", label, error, helperText, id, required, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#182522] mb-1.5"
          >
            {label} {required && <span className="text-[#A61C1C]">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          required={required}
          rows={props.rows || 4}
          className={`w-full px-3.5 py-2.5 bg-white border rounded-sm text-sm text-[#182522] placeholder-[#8F9691] transition-colors focus:outline-none focus:ring-1 focus:ring-[#173B32] focus:border-[#173B32] disabled:bg-[#F3EFE8] ${
            error ? "border-[#A61C1C] focus:ring-[#A61C1C]" : "border-[#D4CCC0]"
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-[#A61C1C]">{error}</p>}
        {!error && helperText && (
          <p className="mt-1 text-xs text-[#626A65]">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", label, error, helperText, id, required, options, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#182522] mb-1.5"
          >
            {label} {required && <span className="text-[#A61C1C]">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          required={required}
          className={`w-full px-3.5 py-2.5 bg-white border rounded-sm text-sm text-[#182522] transition-colors focus:outline-none focus:ring-1 focus:ring-[#173B32] focus:border-[#173B32] disabled:bg-[#F3EFE8] ${
            error ? "border-[#A61C1C] focus:ring-[#A61C1C]" : "border-[#D4CCC0]"
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-xs text-[#A61C1C]">{error}</p>}
        {!error && helperText && (
          <p className="mt-1 text-xs text-[#626A65]">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

