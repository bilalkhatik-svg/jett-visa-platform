import React from "react";

export interface ListViewLayoutProps {
  title?: string;
  searchAndFilters?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function ListViewLayout({
  title,
  searchAndFilters,
  children,
  className = "",
}: ListViewLayoutProps) {
  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="flex flex-col">
        {/* Header / Page Title */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
          {title ? (
            <h1 className="text-h2 font-bold text-gray-900">{title}</h1>
          ) : (
            <p className="text-sm text-gray-400">Header / Page Title</p>
          )}
        </div>

        {/* Search & Filters Bar */}
        {searchAndFilters ? (
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            {searchAndFilters}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-400">Search & Filters Bar</p>
          </div>
        )}

        {/* List Items */}
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
}

export interface ListViewItemProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ListViewItem({
  children,
  onClick,
  className = "",
}: ListViewItemProps) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-4 ${
        onClick ? "cursor-pointer hover:border-gray-300 transition-colors" : ""
      } ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

