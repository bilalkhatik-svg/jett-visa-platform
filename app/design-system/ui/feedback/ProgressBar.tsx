import React from "react";

export interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  variant?: "default" | "info" | "success";
  showPercentage?: boolean;
  className?: string;
}

export default function ProgressBar({
  value,
  label,
  variant = "default",
  showPercentage = true,
  className = "",
}: ProgressBarProps) {
  // Clamp value between 0 and 100
  const clampedValue = Math.min(100, Math.max(0, value));
  const percentage = Math.round(clampedValue);

  // Variant colors - using inline styles for reliability
  const variantColors = {
    default: "#000000", // Black
    info: "#2563EB", // Blue
    success: "#059669", // Green
  };

  const fillColor = variantColors[variant];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {label && (
        <span className="text-body text-gray-900 min-w-[120px]">{label}</span>
      )}
      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: fillColor
          }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label || `Progress: ${percentage}%`}
        />
      </div>
      {showPercentage && (
        <span className="text-body text-gray-500 min-w-[40px] text-right">
          {percentage}%
        </span>
      )}
    </div>
  );
}

