import React from "react";

export interface DetailViewLayoutProps {
  header?: React.ReactNode;
  leftColumn?: React.ReactNode;
  rightColumn?: React.ReactNode;
  className?: string;
}

export default function DetailViewLayout({
  header,
  leftColumn,
  rightColumn,
  className = "",
}: DetailViewLayoutProps) {
  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="flex flex-col">
        {/* Header with Back Button */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
          {header ? (
            header
          ) : (
            <p className="text-sm text-gray-400">Header with Back Button</p>
          )}
        </div>

        {/* Two Column Layout */}
        <div className="flex gap-4">
          {/* Left Column - 2/3 width */}
          <div className="flex-[2] flex flex-col gap-4">
            {leftColumn ? (
              leftColumn
            ) : (
              <>
                <div className="bg-white border border-gray-200 rounded-lg p-4 min-h-[200px]" />
                <div className="bg-white border border-gray-200 rounded-lg p-4 min-h-[200px]" />
              </>
            )}
          </div>

          {/* Right Column - 1/3 width */}
          <div className="flex-1 flex flex-col gap-4">
            {rightColumn ? (
              rightColumn
            ) : (
              <>
                <div className="bg-white border border-gray-200 rounded-lg p-4 min-h-[200px]" />
                <div className="bg-white border border-gray-200 rounded-lg p-4 min-h-[200px]" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export interface DetailViewSectionProps {
  children?: React.ReactNode;
  className?: string;
}

export function DetailViewSection({
  children,
  className = "",
}: DetailViewSectionProps) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}
    >
      {children}
    </div>
  );
}

