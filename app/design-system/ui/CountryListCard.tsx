import React from "react";
import Badge from "./Badge";

export interface CountryItem {
  id: string;
  name: string;
  applicationCount: string;
  status?: "active" | "inactive";
}

export interface CountryListCardProps {
  title: string;
  viewAllLabel?: string;
  onViewAll?: () => void;
  countries: CountryItem[];
  className?: string;
}

export default function CountryListCard({
  title,
  viewAllLabel = "View all",
  onViewAll,
  countries,
  className = "",
}: CountryListCardProps) {
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
      <ul className="space-y-4">
        {countries.map((country) => (
          <li key={country.id} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-body font-medium text-gray-900">
                  {country.name}
                </p>
                {country.status === "active" && (
                  <Badge variant="success" className="bg-[#059669] text-white">
                    Active
                  </Badge>
                )}
              </div>
              <p className="text-caption text-gray-500 mt-1">
                {country.applicationCount} applications
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

