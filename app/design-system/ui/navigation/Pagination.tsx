import React from "react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: "default" | "with-info";
  totalItems?: number;
  itemsPerPage?: number;
  showPageNumbers?: number;
  itemsLabel?: string;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  variant = "default",
  totalItems,
  itemsPerPage = 10,
  showPageNumbers = 5,
  itemsLabel = "results",
  className = "",
}: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const half = Math.floor(showPageNumbers / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + showPageNumbers - 1);

    if (end - start < showPageNumbers - 1) {
      start = Math.max(1, end - showPageNumbers + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const startItem = totalItems
    ? (currentPage - 1) * itemsPerPage + 1
    : undefined;
  const endItem = totalItems
    ? Math.min(currentPage * itemsPerPage, totalItems)
    : undefined;

  const pageNumbers = getPageNumbers();
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  if (variant === "with-info") {
    return (
      <div className={`flex items-center justify-between ${className}`}>
        {totalItems && startItem && endItem && (
          <div className="text-body text-gray-900">
            Showing{" "}
            <span className="font-semibold">
              {startItem}-{endItem}
            </span>{" "}
            of <span className="font-semibold">{totalItems}</span> {itemsLabel}
          </div>
        )}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={isPreviousDisabled}
            className={`px-4 py-2 text-body rounded-md border border-gray-300 transition-colors ${
              isPreviousDisabled
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Previous
          </button>
          {pageNumbers.map((page, index) => {
            if (typeof page === "string") return null;
            const isActive = page === currentPage;
            return (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 text-body rounded-md border border-gray-300 transition-colors ${
                  isActive
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={handleNext}
            disabled={isNextDisabled}
            className={`px-4 py-2 text-body rounded-md border border-gray-300 transition-colors ${
              isNextDisabled
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  // Default variant with arrows
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <button
        onClick={handlePrevious}
        disabled={isPreviousDisabled}
        className={`w-10 h-10 text-body rounded-md border border-gray-300 transition-colors flex items-center justify-center ${
          isPreviousDisabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
        aria-label="Previous page"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      {pageNumbers.map((page, index) => {
        if (typeof page === "string") return null;
        const isActive = page === currentPage;
        return (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 text-body rounded-md border border-gray-300 transition-colors ${
              isActive
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        className={`w-10 h-10 text-body rounded-md border border-gray-300 transition-colors flex items-center justify-center ${
          isNextDisabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
        aria-label="Next page"
      >
        <svg
          className="w-4 h-4"
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
      </button>
    </div>
  );
}

