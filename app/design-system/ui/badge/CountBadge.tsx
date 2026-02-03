import React from "react";

export interface CountBadgeProps {
  count: number;
  variant?: "default" | "danger" | "info";
  className?: string;
}

export default function CountBadge({
  count,
  variant = "default",
  className = "",
}: CountBadgeProps) {
  const variants = {
    default: "bg-black text-white",
    danger: "bg-[#DC2626] text-white",
    info: "bg-[#2563EB] text-white",
  };

  return (
    <span
      className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {count}
    </span>
  );
}

