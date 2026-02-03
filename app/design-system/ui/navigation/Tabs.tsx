import React from "react";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: "default" | "pill" | "icon";
  className?: string;
}

export default function Tabs({
  items,
  activeTab,
  onTabChange,
  variant = "default",
  className = "",
}: TabsProps) {
  if (variant === "pill") {
    return (
      <div className={`flex gap-2 ${className}`}>
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`px-4 py-2 rounded-full text-body font-medium transition-colors ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex border-b border-gray-200 ${className}`}>
      {items.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`px-4 py-3 text-body font-medium transition-colors relative ${
              isActive
                ? "text-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center gap-2">
              {variant === "icon" && item.icon && (
                <span className="w-4 h-4">{item.icon}</span>
              )}
              <span className={isActive ? "font-bold" : ""}>{item.label}</span>
            </div>
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
            )}
          </button>
        );
      })}
    </div>
  );
}

