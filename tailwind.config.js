/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: "#FAF7F2",
        "paper-warm": "#F2EDE4",
        ink: "#101820",
        "ink-soft": "#3D4852",
        night: "#0B1117",
        "night-raised": "#151E27",
        lake: "#1B5FD9",
        "lake-soft": "#DCE7FA",
        signal: "#E63329",
        gold: "#C9A227",
        line: "#E3DCD0",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        display: ["Archivo", "sans-serif"],
        serif: ["'Source Serif 4'", "serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      maxWidth: {
        content: "1280px",
        prose2: "720px",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "bounce-soft": { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(8px)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bounce-soft": "bounce-soft 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
