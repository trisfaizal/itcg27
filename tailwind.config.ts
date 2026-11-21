import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        itcg: {
          navy: "#0D2B6B",
          "navy-dark": "#071A42",
          "navy-light": "#153C8D",
          blue: "#0066E0",
          "blue-hover": "#0052B8",
          "blue-light": "#EBF3FD",
          red: "#E3062E",
          "red-hover": "#C00426",
          "red-subtle": "rgba(227, 6, 46, 0.08)",
          gray: "#E6E9F2",
          "gray-light": "#F5F7FA",
          "gray-dark": "#75829C",
          white: "#FFFFFF",
        },
        semantic: {
          warning: "#FACC15",
        },
      },
      fontFamily: {
        heading: ["Montserrat", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        body: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      spacing: {
        '22': '5.5rem',
      },
      backgroundImage: {
        'slant-pattern': "repeating-linear-gradient(30deg, transparent, transparent 40px, rgba(13, 43, 107, 0.03) 40px, rgba(13, 43, 107, 0.03) 80px)",
        'slant-grid': "repeating-linear-gradient(30deg, rgba(0, 102, 224, 0.04) 0px, rgba(0, 102, 224, 0.04) 1px, transparent 1px, transparent 48px)",
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
