import React, { useEffect } from "react";

export interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  variant?: "danger" | "warning";
}

export default function ConfirmationDialog({
  isOpen,
  onClose,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  variant = "danger",
}: ConfirmationDialogProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const iconColor = variant === "danger" ? "#DC2626" : "#F59E0B";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-sm w-full mx-4 z-10">
        {/* Content - No header bar, icon and title in body */}
        <div className="px-6 py-6">
          <div className="flex flex-col items-center text-center">
            {/* Warning Icon - Red Triangle with White Exclamation */}
            <div className="mb-4">
              <svg
                className="w-12 h-12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Red Triangle */}
                <path
                  d="M12 2L2 22h20L12 2z"
                  fill={iconColor}
                />
                {/* White Exclamation Mark */}
                <path
                  d="M12 8v4"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="16"
                  r="1"
                  fill="white"
                />
              </svg>
            </div>
            {/* Title */}
            <h2
              id="confirmation-title"
              className="text-h4 font-bold text-gray-900 mb-3"
            >
              {title}
            </h2>
            {/* Message */}
            <p className="text-body text-gray-900">{message}</p>
          </div>
        </div>

        {/* Footer with buttons */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-body border border-gray-300 bg-white text-gray-900 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-body rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              variant === "danger"
                ? "bg-[#DC2626] text-white hover:bg-[#B91C1C] focus:ring-[#DC2626]"
                : "bg-[#F59E0B] text-white hover:bg-[#D97706] focus:ring-[#F59E0B]"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

