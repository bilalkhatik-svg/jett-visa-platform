import React from "react";

export interface BasicCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  entryCount: string;
  onClick?: () => void;
  className?: string;
}

export default function BasicCard({
  icon,
  title,
  description,
  entryCount,
  onClick,
  className = "",
}: BasicCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="w-12 h-12 bg-black rounded-md flex items-center justify-center mb-4">
        {icon}
      </div>
      <h4 className="text-h5 font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-body text-gray-600 mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-caption text-gray-500">{entryCount}</span>
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}

