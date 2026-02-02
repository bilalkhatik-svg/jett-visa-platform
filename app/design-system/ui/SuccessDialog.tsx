import React, { useEffect } from "react";

export interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function SuccessDialog({
  isOpen,
  onClose,
  title = "Success!",
  message,
  buttonText = "Continue",
  onButtonClick,
}: SuccessDialogProps) {
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

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
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
            {/* Success Icon - Light Green Circle with Darker Green Checkmark */}
            <div className="mb-4">
              <div className="w-12 h-12 bg-[#D1F5D3] rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#059669]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            {/* Title */}
            <h2
              id="success-title"
              className="text-h4 font-bold text-gray-900 mb-3"
            >
              {title}
            </h2>
            {/* Message */}
            <p className="text-body text-gray-900">{message}</p>
          </div>
        </div>

        {/* Footer with single button */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-center">
          <button
            onClick={handleButtonClick}
            className="px-4 py-2 text-body bg-black text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

