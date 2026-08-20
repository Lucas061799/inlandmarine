import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Exact tokens sampled from the source SVG (lib-app-sidenavbar.svg)
        brand: {
          50: "#f2faf5",
          100: "#dbeee2",
          200: "#b5dcc4",
          300: "#92cfa4",  // <-- exact sidebar fill from SVG
          400: "#6cb884",
          500: "#4fa26a",
          600: "#3d8656",
          700: "#2f6a44",
          900: "#173521",
        },
        sage: {
          light: "#b5dcc4",
          DEFAULT: "#92cfa4",
          dark: "#6cb884",
        },
        btis: {
          navy: "#1B0750",     // --secondaryIndigoSlothColor
          paris: "#201155",    // --primaryParisM (heading indigo)
          teal: "#73c9b7",     // --primaryShockwave / --mintGreen
          mint: "#73c9b7",
        },
        ink: {
          DEFAULT: "#3b3b3b",
          soft: "#6b6f76",
          faint: "#c9cdd4",
        },
        accent: {
          yellow: "#FCDF50", // exact yellow from SVG
          coral: "#f16a5a",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "Montserrat", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(24, 39, 75, 0.05), 0 2px 6px rgba(24, 39, 75, 0.04)",
        card: "0 6px 24px rgba(24, 39, 75, 0.08)",
      },
      backgroundImage: {
        // Anchored on user-provided #88CBA7 — lighter at top, that base at bottom
        "brand-gradient":
          "linear-gradient(180deg, #b5decc 0%, #9ed4ba 45%, #88cba7 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
