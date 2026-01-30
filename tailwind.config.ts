import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#4c1d95", // Deep Violet
                "primary-light": "#5D2E8C",
                accent: "#8b5cf6", // Bright Purple
                "bg-base": "#fdf4ff", // Very light purple tint
                "text-main": "#2e1065", // Darkened violet for text
            },
            fontFamily: {
                sans: ['var(--font-outfit)'],
            }
        },
    },
    plugins: [],
};
export default config;
