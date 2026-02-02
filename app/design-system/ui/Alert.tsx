import React from "react";

export interface AlertProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "error" | "info";
  title?: string;
  onClose?: () => void;
  className?: string;
}

export default function Alert({
  children,
  variant = "info",
  title,
  onClose,
  className = "",
}: AlertProps) {
  const variants = {
    success: {
      bg: "bg-[#D1F5D3]",
      border: "border-[#059669]",
      text: "text-[#059669]",
      icon: (
        <div className="w-5 h-5 rounded-full bg-[#059669] flex items-center justify-center">
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      ),
    },
    warning: {
      bg: "bg-yellow-100",
      border: "border-yellow-500",
      text: "text-yellow-700",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 22h20L12 2z" fill="currentColor" />
          <path
            d="M12 8v4"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="16" r="1" fill="white" />
        </svg>
      ),
    },
    error: {
      bg: "bg-red-100",
      border: "border-[#DC2626]",
      text: "text-[#DC2626]",
      icon: (
        <div className="w-5 h-5 rounded-full bg-[#DC2626] flex items-center justify-center">
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      ),
    },
    info: {
      bg: "bg-blue-100",
      border: "border-[#2563EB]",
      text: "text-[#2563EB]",
      icon: (
        <div className="w-5 h-5 rounded-full bg-[#2563EB] flex items-center justify-center">
          <span className="text-white text-xs font-bold">i</span>
        </div>
      ),
    },
  };

  const variantStyles = variants[variant];

  return (
    <div
      className={`${variantStyles.bg} ${variantStyles.border} border rounded-md p-4 ${className}`}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {variantStyles.icon}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-bold ${variantStyles.text} mb-1`}>
              {title}
            </h3>
          )}
          <div className={`text-sm ${variantStyles.text}`}>{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto flex-shrink-0 text-gray-600 hover:text-gray-900 focus:outline-none rounded-md p-1"
            aria-label="Close alert"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

