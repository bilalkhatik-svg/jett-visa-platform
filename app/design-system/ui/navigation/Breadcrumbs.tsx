import React from "react";

export interface BreadcrumbItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showIcons?: boolean;
  className?: string;
}

export default function Breadcrumbs({
  items,
  showIcons = false,
  className = "",
}: BreadcrumbsProps) {
  return (
    <nav className={`flex items-center ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.id} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400" aria-hidden="true">
                  &gt;
                </span>
              )}
              <div className="flex items-center gap-2">
                {showIcons && item.icon && (
                  <span className="w-4 h-4 text-gray-700">{item.icon}</span>
                )}
                {item.href || item.onClick ? (
                  <a
                    href={item.href}
                    onClick={item.onClick}
                    className={`text-body text-gray-700 hover:text-gray-900 ${
                      isLast ? "font-medium" : ""
                    }`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    className={`text-body text-gray-700 ${
                      isLast ? "font-medium" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

