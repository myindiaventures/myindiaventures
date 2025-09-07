/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",              // client/index.html
    "./src/**/*.{js,jsx,ts,tsx}" // client/src files
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",

        // ✅ MIV brand colors
        "miv-navy": "var(--miv-navy)",
        "miv-cyan": "var(--miv-cyan)",
        "miv-sky-blue": "var(--miv-sky-blue)",
        "miv-slate-gray": "var(--miv-slate-gray)",
      },
    },
  },
  plugins: [],
};
