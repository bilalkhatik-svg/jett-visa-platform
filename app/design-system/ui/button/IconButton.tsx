import React from "react";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon: React.ReactNode;
  "aria-label": string;
}

export default function IconButton({
  variant = "primary",
  size = "md",
  icon,
  className = "",
  ...props
}: IconButtonProps) {
  const base =
    "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed flex items-center justify-center";

  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const variants = {
    primary:
      "bg-black text-white hover:bg-gray-700 active:bg-gray-900 focus:ring-gray-900 disabled:bg-gray-300 disabled:text-gray-500",
    secondary:
      "border border-black text-black bg-white hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-900 disabled:border-gray-300 disabled:text-gray-400 disabled:bg-white",
    ghost:
      "text-gray-900 bg-transparent hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-900 disabled:text-gray-400",
    danger:
      "bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-900",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className={iconSizes[size]}>{icon}</span>
    </button>
  );
}

