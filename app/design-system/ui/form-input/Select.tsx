import React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label: string | React.ReactNode;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
}

export default function Select({
  label,
  options,
  error,
  placeholder,
  id,
  className = "",
  disabled,
  ...props
}: SelectProps) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  const getBorderClasses = () => {
    if (error) return "border-2 border-[#DC2626] focus:ring-[#DC2626]";
    return "border border-gray-300 focus:ring-gray-900";
  };

  const getBackgroundColor = () => {
    if (disabled) return "bg-gray-100";
    return "bg-white";
  };

  const getLabelColor = () => {
    if (disabled) return "text-gray-500";
    return "text-gray-900";
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={selectId}
        className={`text-sm font-medium ${getLabelColor()}`}
      >
        {typeof label === "string" ? label : label}
      </label>
      <select
        id={selectId}
        disabled={disabled}
        className={`w-full rounded-md px-3 py-2 text-body focus:outline-none focus:ring-2 ${getBorderClasses()} ${getBackgroundColor()} ${className}`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${selectId}-error` : undefined}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span id={`${selectId}-error`} className="text-[#DC2626] text-xs">
          {error}
        </span>
      )}
    </div>
  );
}

