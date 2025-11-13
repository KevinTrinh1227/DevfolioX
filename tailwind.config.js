/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "muted-foreground": "var(--muted)",
        accent: "var(--accent)",
      },
      // Optional: small tweaks for nicer code/pre inside prose
      typography: {
        DEFAULT: {
          css: {
            "code::before": { content: "none" },
            "code::after": { content: "none" },
            pre: {
              padding: "0.75rem",
              borderRadius: "0.5rem",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
