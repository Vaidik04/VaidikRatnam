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
            className="block text-xs font-mono uppercase tracking-wider text-[#d4af37] mb-1.5 font-semibold"
          >
            {label} {required && <span className="text-[#f1d98a]">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          className={`w-full px-3.5 py-2.5 bg-[#04170f] border rounded-xl text-sm text-white placeholder-[#7a8a83] transition-colors focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 disabled:opacity-50 ${
            error ? "border-[#8e1b2e] focus:border-[#ff6b6b]" : "border-[#d4af37]/30"
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-[#ff8888] font-mono">{error}</p>}
        {!error && helperText && (
          <p className="mt-1 text-xs text-[#a8b6af] font-mono">{helperText}</p>
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
            className="block text-xs font-mono uppercase tracking-wider text-[#d4af37] mb-1.5 font-semibold"
          >
            {label} {required && <span className="text-[#f1d98a]">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          required={required}
          rows={props.rows || 4}
          className={`w-full px-3.5 py-2.5 bg-[#04170f] border rounded-xl text-sm text-white placeholder-[#7a8a83] transition-colors focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 disabled:opacity-50 ${
            error ? "border-[#8e1b2e] focus:border-[#ff6b6b]" : "border-[#d4af37]/30"
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-[#ff8888] font-mono">{error}</p>}
        {!error && helperText && (
          <p className="mt-1 text-xs text-[#a8b6af] font-mono">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: Array<{ value: string; label: string }>;
  children?: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", label, error, helperText, id, required, options, children, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-mono uppercase tracking-wider text-[#d4af37] mb-1.5 font-semibold"
          >
            {label} {required && <span className="text-[#f1d98a]">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          required={required}
          className={`w-full px-3.5 py-2.5 bg-[#04170f] border rounded-xl text-sm text-white transition-colors focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 disabled:opacity-50 ${
            error ? "border-[#8e1b2e] focus:border-[#ff6b6b]" : "border-[#d4af37]/30"
          } ${className}`}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#04170f] text-white">
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        {error && <p className="mt-1.5 text-xs text-[#ff8888] font-mono">{error}</p>}
        {!error && helperText && (
          <p className="mt-1 text-xs text-[#a8b6af] font-mono">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
