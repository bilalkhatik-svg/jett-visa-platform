import React from "react";

export interface StatsCardProps {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  change: string;
  changeType?: "positive" | "negative";
  className?: string;
}

export default function StatsCard({
  title,
  icon,
  value,
  change,
  changeType = "positive",
  className = "",
}: StatsCardProps) {
  const changeColor =
    changeType === "positive" ? "text-success" : "text-error";

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-100 p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-caption font-semibold text-gray-900 uppercase tracking-wider">
          {title}
        </h4>
        <div className="text-gray-400">{icon}</div>
      </div>
      <div className="text-h1 font-bold text-gray-900 mb-2">{value}</div>
      <div className={`text-caption ${changeColor}`}>{change}</div>
    </div>
  );
}

