import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  isLoading?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  isLoading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed";

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-body",
    lg: "px-6 py-3.5 text-base",
  };

  const variants = {
    primary:
      "bg-black text-white hover:bg-gray-700 active:bg-gray-900 focus:ring-gray-900 disabled:bg-gray-300 disabled:text-gray-500",
    secondary:
      "border border-black text-black bg-white hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-900 disabled:border-gray-300 disabled:text-gray-400 disabled:bg-white disabled:hover:bg-white",
    ghost:
      "text-gray-900 bg-transparent hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-900 disabled:text-gray-400 disabled:bg-transparent disabled:hover:bg-transparent",
    outline:
      "border-2 border-primary text-primary bg-transparent hover:bg-primary/5 focus:ring-primary",
    danger:
      "bg-danger text-white hover:bg-danger/90 focus:ring-danger",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="4" cy="12" r="2">
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="1.4s"
                repeatCount="indefinite"
                begin="0s"
              />
            </circle>
            <circle cx="12" cy="12" r="2">
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="1.4s"
                repeatCount="indefinite"
                begin="0.2s"
              />
            </circle>
            <circle cx="20" cy="12" r="2">
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="1.4s"
                repeatCount="indefinite"
                begin="0.4s"
              />
            </circle>
          </svg>
          Loading
        </span>
      ) : (
        children
      )}
    </button>
  );
}

