import React from "react";

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "danger";
  disabled?: boolean;
}

export interface DropdownSection {
  id: string;
  title: string;
  items: DropdownItem[];
}

export interface DropdownProps {
  items?: DropdownItem[];
  sections?: DropdownSection[];
  className?: string;
}

export default function Dropdown({
  items,
  sections,
  className = "",
}: DropdownProps) {
  const renderItem = (item: DropdownItem, index: number) => {
    const isDanger = item.variant === "danger";
    const textColor = isDanger
      ? "text-[#DC2626]"
      : item.disabled
      ? "text-gray-400"
      : "text-gray-900";

    return (
      <button
        key={item.id}
        onClick={item.onClick}
        disabled={item.disabled}
        className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium ${textColor} hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors ${
          index > 0 ? "mt-0" : ""
        }`}
      >
        {item.icon && (
          <span className={`w-4 h-4 ${isDanger ? "text-[#DC2626]" : "text-gray-500"}`}>
            {item.icon}
          </span>
        )}
        <span className="flex-1 text-left">{item.label}</span>
      </button>
    );
  };

  const renderSeparator = (key: string) => (
    <div key={key} className="h-px bg-gray-200 my-1" />
  );

  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-gray-100 py-2 min-w-[200px] ${className}`}
      role="menu"
    >
      {sections ? (
        <>
          {sections.map((section, sectionIndex) => (
            <div key={section.id}>
              {sectionIndex > 0 && renderSeparator(`section-sep-${section.id}`)}
              <div className="px-4 py-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {section.title}
                </h4>
              </div>
              {section.items.map((item, itemIndex) => (
                <React.Fragment key={item.id}>
                  {itemIndex > 0 && renderSeparator(`item-sep-${item.id}`)}
                  {renderItem(item, itemIndex)}
                </React.Fragment>
              ))}
            </div>
          ))}
        </>
      ) : (
        items &&
        items.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && renderSeparator(`sep-${item.id}`)}
            {renderItem(item, index)}
          </React.Fragment>
        ))
      )}
    </div>
  );
}

