import React, { useState, useRef, useEffect } from "react";

export interface TooltipProps {
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
  className?: string;
  trigger?: "hover" | "click";
}

export default function Tooltip({
  content,
  position = "top",
  children,
  className = "",
  trigger = "hover",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    let top = 0;
    let left = 0;

    switch (position) {
      case "top":
        top = triggerRect.top + scrollTop - tooltipRect.height - 8;
        left = triggerRect.left + scrollLeft + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case "bottom":
        top = triggerRect.bottom + scrollTop + 8;
        left = triggerRect.left + scrollLeft + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case "left":
        top = triggerRect.top + scrollTop + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left + scrollLeft - tooltipRect.width - 8;
        break;
      case "right":
        top = triggerRect.top + scrollTop + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + scrollLeft + 8;
        break;
    }

    setTooltipPosition({ top, left });
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isVisible, position]);

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    if (trigger === "click") {
      setIsVisible(!isVisible);
    }
  };

  const arrowClasses = {
    top: "bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full",
    bottom: "top-0 left-1/2 transform -translate-x-1/2 -translate-y-full",
    left: "right-0 top-1/2 transform translate-x-full -translate-y-1/2",
    right: "left-0 top-1/2 transform -translate-x-full -translate-y-1/2",
  };

  const arrowBorders = {
    top: "border-l-transparent border-r-transparent border-b-gray-900 border-t-0",
    bottom: "border-l-transparent border-r-transparent border-t-gray-900 border-b-0",
    left: "border-t-transparent border-b-transparent border-l-gray-900 border-r-0",
    right: "border-t-transparent border-b-transparent border-r-gray-900 border-l-0",
  };

  return (
    <div
      ref={triggerRef}
      className={`inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-50 pointer-events-none"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          <div className="relative bg-gray-900 text-white text-sm font-medium px-3 py-2 rounded-md shadow-lg">
            {content}
            <div
              className={`absolute w-0 h-0 ${arrowClasses[position]} ${arrowBorders[position]}`}
              style={{
                borderWidth: "6px",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

