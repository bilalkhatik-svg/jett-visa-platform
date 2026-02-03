import React from "react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
}

export default function Checkbox({
  label,
  error,
  id,
  className = "",
  disabled,
  ...props
}: CheckboxProps) {
  const checkboxId =
    id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const getLabelColor = () => {
    if (disabled) return "text-gray-400";
    return "text-gray-900";
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center">
        <input
          id={checkboxId}
          type="checkbox"
          disabled={disabled}
          className={`h-4 w-4 text-[#2563EB] border-gray-300 rounded focus:ring-[#2563EB] focus:ring-2 disabled:bg-gray-100 disabled:border-gray-300 disabled:cursor-not-allowed ${className}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${checkboxId}-error` : undefined}
          {...props}
        />
        <label
          htmlFor={checkboxId}
          className={`ml-2 text-body ${getLabelColor()} ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {label}
        </label>
      </div>
      {error && (
        <span id={`${checkboxId}-error`} className="text-[#DC2626] text-xs ml-6">
          {error}
        </span>
      )}
    </div>
  );
}

