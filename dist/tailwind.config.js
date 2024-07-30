"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultTheme_1 = __importDefault(require("tailwindcss/defaultTheme"));
const config = {
    darkMode: ["class"],
    content: ["./src/**/*.{html,pug,js}", "./public/**/*.{html,pug,js}"],
    theme: {
        screens: Object.assign({ xs: "425px" }, defaultTheme_1.default.screens),
        container: {
            center: true,
            padding: {
                DEFAULT: "0",
            },
            /* screens: {
                "2xl": "1400px",
            }, */
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                cetek: {
                    50: "#ffe2ec",
                    100: "#ffb1c5",
                    200: "#ff7f9e",
                    300: "#ff4d78",
                    400: "#fe1d51",
                    500: "#e50637",
                    600: "#b3002b",
                    700: "#81001f",
                    800: "#4f0011",
                    900: "#200005",
                },
            },
            fontFamily: { sans: ["Inter", ...defaultTheme_1.default.fontFamily.sans] },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
        ({ addComponents }) => {
            addComponents({
                ".container": {
                    "@apply max-sm:max-w-none sm:px-4": {},
                },
            });
        },
    ],
};
exports.default = config;
