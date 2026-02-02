import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  success?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  success,
  helperText,
  leftIcon,
  rightIcon,
  id,
  className = "",
  disabled,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const getBorderClasses = () => {
    if (error) return "border-2 border-[#DC2626] focus:ring-[#DC2626]";
    if (success) return "border-2 border-[#059669] focus:ring-[#059669]";
    return "border border-gray-300 focus:ring-gray-900";
  };

  const getBackgroundColor = () => {
    if (disabled) return "bg-gray-100";
    return "bg-white";
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          disabled={disabled}
          className={`w-full rounded-md px-3 py-2 text-body focus:outline-none focus:ring-2 ${getBorderClasses()} ${getBackgroundColor()} ${
            leftIcon ? "pl-10" : ""
          } ${rightIcon ? "pr-10" : ""} ${className}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error
              ? `${inputId}-error`
              : success
              ? `${inputId}-success`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <span id={`${inputId}-error`} className="text-error text-xs">
          {error}
        </span>
      )}
      {success && !error && (
        <span id={`${inputId}-success`} className="text-success text-xs">
          {success}
        </span>
      )}
      {helperText && !error && !success && (
        <span id={`${inputId}-helper`} className="text-gray-500 text-xs">
          {helperText}
        </span>
      )}
    </div>
  );
}
