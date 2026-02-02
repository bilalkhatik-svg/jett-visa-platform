import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "danger" | "default" | "active" | "inactive" | "pending" | "draft";
  icon?: React.ReactNode;
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  icon,
  className = "",
}: BadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-[#D1F5D3] text-[#059669]",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-[#DC2626]",
    active: "bg-[#D1F5D3] text-[#059669]",
    inactive: "bg-red-100 text-[#DC2626]",
    pending: "bg-blue-100 text-blue-700",
    draft: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium ${variants[variant]} ${className}`}
    >
      {icon && <span className="w-3 h-3">{icon}</span>}
      {children}
    </span>
  );
}

