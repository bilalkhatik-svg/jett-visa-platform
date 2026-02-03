/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./design-system/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: "#00366B",
        secondary: "#707478",
        muted: "#BDBFC1",

        // Primary Colors
        black: "#000000",
        "gray-900": "#111827",
        "gray-700": "#374151",
        "gray-500": "#687280",
        white: "#FFFFFF",

        // Background Colors
        "gray-50": "#F9FAFB",
        "gray-100": "#F3F4F6",
        "gray-200": "#E5E7EB",
        "gray-300": "#D1D5DB",
        "gray-400": "#9CA3AF",

        // Status Colors
        "success-light": "#D1F5D3",
        success: "#059669",
        "info-light": "#DCEEFF",
        info: "#2563EB",
        error: "#DC2626",

        // Legacy support (keeping for backward compatibility)
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        // Typography Scale
        h1: "36px",
        h2: "30px",
        h3: "24px",
        h4: "20px",
        h5: "18px",
        "body-large": "16px",
        body: "14px",
        caption: "12px",
        label: "12px",
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      letterSpacing: {
        label: "0.05em",
      },
      borderRadius: {
        // Border Radius Scale
        none: "0px",
        sm: "2px",
        md: "6px",
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
        full: "9999px",
      },
      spacing: {
        // Spacing Scale
        "4": "4px",   // 0.25rem
        "8": "8px",   // 0.5rem
        "12": "12px", // 0.75rem
        "16": "16px", // 1rem
        "24": "24px", // 1.5rem
        "32": "32px", // 2rem
        "48": "48px", // 3rem
        "64": "64px", // 4rem
      },
      boxShadow: {
        none: "none",
        sm: "0 1px 2px rgba(0, 0, 0, 0.08)",
        md: "0 4px 6px rgba(0, 0, 0, 0.12)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
}
