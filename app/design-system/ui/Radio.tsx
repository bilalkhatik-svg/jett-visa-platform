import React from "react";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
}

export default function Radio({
  label,
  error,
  id,
  className = "",
  disabled,
  ...props
}: RadioProps) {
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

  const getLabelColor = () => {
    if (disabled) return "text-gray-400";
    return "text-gray-900";
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center">
        <input
          id={radioId}
          type="radio"
          disabled={disabled}
          className={`h-4 w-4 text-[#2563EB] border-gray-300 focus:ring-[#2563EB] focus:ring-2 disabled:bg-gray-100 disabled:border-gray-300 disabled:cursor-not-allowed ${className}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${radioId}-error` : undefined}
          {...props}
        />
        <label
          htmlFor={radioId}
          className={`ml-2 text-body ${getLabelColor()} ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {label}
        </label>
      </div>
      {error && (
        <span id={`${radioId}-error`} className="text-[#DC2626] text-xs ml-6">
          {error}
        </span>
      )}
    </div>
  );
}

