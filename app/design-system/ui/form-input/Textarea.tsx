import React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export default function Textarea({
  label,
  error,
  id,
  className = "",
  disabled,
  ...props
}: TextareaProps) {
  const textareaId =
    id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  const getBorderClasses = () => {
    if (error) return "border-2 border-[#DC2626] focus:ring-[#DC2626]";
    return "border border-gray-300 focus:ring-gray-900";
  };

  const getBackgroundColor = () => {
    if (disabled) return "bg-gray-100";
    return "bg-white";
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={textareaId}
        className="text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        disabled={disabled}
        className={`w-full rounded-md px-3 py-2 text-body focus:outline-none focus:ring-2 ${getBorderClasses()} ${getBackgroundColor()} ${className}`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${textareaId}-error`} className="text-[#DC2626] text-xs">
          {error}
        </span>
      )}
    </div>
  );
}

