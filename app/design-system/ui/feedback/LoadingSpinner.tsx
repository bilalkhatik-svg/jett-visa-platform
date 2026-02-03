import React from "react";

export interface LoadingSpinnerProps {
  variant?: "default" | "circle" | "sync";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function LoadingSpinner({
  variant = "default",
  size = "md",
  className = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const sizeValue = sizeClasses[size];

  if (variant === "circle") {
    return (
      <div
        className={`${sizeValue} ${className}`}
        role="status"
        aria-label="Loading"
      >
        <svg
          className="animate-spin text-gray-900"
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
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  }

  if (variant === "sync") {
    return (
      <div
        className={`${sizeValue} ${className}`}
        role="status"
        aria-label="Loading"
      >
        <svg
          className="animate-spin text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </div>
    );
  }

  // Default variant - dots spinner
  return (
    <div
      className={`${sizeValue} ${className} relative`}
      role="status"
      aria-label="Loading"
    >
      <svg
        className="animate-spin text-gray-900"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        {/* Dots arranged in a circle */}
        <circle cx="12" cy="4" r="2" fill="currentColor" opacity="0.3" />
        <circle cx="19" cy="7" r="2" fill="currentColor" opacity="0.4" />
        <circle cx="20" cy="12" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="19" cy="17" r="2" fill="currentColor" opacity="0.6" />
        <circle cx="12" cy="20" r="2" fill="currentColor" opacity="0.7" />
        <circle cx="5" cy="17" r="2" fill="currentColor" opacity="0.8" />
        <circle cx="4" cy="12" r="2" fill="currentColor" opacity="0.9" />
        <circle cx="5" cy="7" r="2" fill="currentColor" opacity="1" />
      </svg>
    </div>
  );
}

