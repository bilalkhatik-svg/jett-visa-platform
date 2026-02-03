import { useState } from "react";
import type { ReactNode } from "react";
import { Button, IconButton, Pagination } from "../../../design-system/ui";
import Input from "../../../design-system/ui/form-input/Input";
import Select from "../../../design-system/ui/form-input/Select";

export interface Tab {
  id: string;
  label: string;
}

export interface MasterSetupLayoutProps {
  title: string;
  description: string;
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  categoryFilter?: string;
  onCategoryFilterChange?: (value: string) => void;
  categoryOptions?: string[];
  children: ReactNode;
  onAddNew?: () => void;
  addButtonLabel?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalResults: number;
    resultsPerPage: number;
    onPageChange: (page: number) => void;
  };
}

export default function MasterSetupLayout({
  title,
  description,
  tabs,
  activeTab,
  onTabChange,
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  categoryOptions = [],
  children,
  onAddNew,
  addButtonLabel = "Add New",
  pagination,
}: MasterSetupLayoutProps) {
  return (
    <div className="max-w-[1440px] mx-auto space-y-6 p-8">
      {/* Header Section */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-slate-500 mt-1">{description}</p>
        </div>
        {onAddNew && (
          <Button onClick={onAddNew} variant="primary" size="md" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">add</span>
            <span>{addButtonLabel}</span>
          </Button>
        )}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Tabs and Filters */}
        <div className="border-b border-slate-100 flex items-center px-4 justify-between bg-white">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-6 py-4 border-b-2 transition-colors text-sm font-medium ${
                  activeTab === tab.id
                    ? "border-black text-black font-semibold"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {categoryFilter !== undefined && onCategoryFilterChange && categoryOptions.length > 0 && (
              <div className="w-48 [&_label]:hidden">
                <Select
                  label="Category"
                  options={categoryOptions.map((opt) => ({ value: opt, label: opt }))}
                  value={categoryFilter}
                  onChange={(e) => onCategoryFilterChange(e.target.value)}
                  className="text-sm"
                />
              </div>
            )}
            <IconButton
              variant="ghost"
              size="sm"
              icon={<span className="material-symbols-outlined">filter_list</span>}
              aria-label="Filter"
              className="border border-slate-200"
            />
          </div>
        </div>

        {/* Search Bar */}
        {searchValue !== undefined && onSearchChange && (
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <div className="max-w-md [&_label]:hidden">
              <Input
                label="Search"
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                leftIcon={<span className="material-symbols-outlined text-lg">search</span>}
                className="text-sm"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div>{children}</div>

        {/* Pagination Footer */}
        {pagination && (
          <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-100">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={pagination.onPageChange}
              variant="with-info"
              totalItems={pagination.totalResults}
              itemsPerPage={pagination.resultsPerPage}
              itemsLabel="results"
            />
          </div>
        )}
      </div>
    </div>
  );
}
