import React from "react";

export interface ListItem {
  id: string;
  content: React.ReactNode;
  timestamp?: string;
  subtitle?: string;
}

export interface ListCardProps {
  title: string;
  viewAllLabel?: string;
  onViewAll?: () => void;
  items: ListItem[];
  className?: string;
}

export default function ListCard({
  title,
  viewAllLabel = "View all",
  onViewAll,
  items,
  className = "",
}: ListCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-100 p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-h5 font-semibold text-gray-900">{title}</h4>
        {onViewAll && (
          <button
            className="text-body text-[#2563EB] hover:underline"
            onClick={onViewAll}
          >
            {viewAllLabel}
          </button>
        )}
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <span className="text-gray-900 mt-1">•</span>
            <div className="flex-1">
              <div className="text-body text-gray-900">{item.content}</div>
              {item.timestamp && (
                <p className="text-caption text-gray-500 mt-1">
                  {item.timestamp}
                </p>
              )}
              {item.subtitle && (
                <p className="text-caption text-gray-500 mt-1">
                  {item.subtitle}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

