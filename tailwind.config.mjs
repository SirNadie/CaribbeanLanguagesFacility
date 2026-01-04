/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // "Royal" Palette
                primary: '#0f172a', // Slate 900 (Deep Navy)
                secondary: '#b45309', // Amber 700 (Bronze/Gold-ish)
                accent: '#0e7490', // Cyan 700 (Deep Teal)

                "text-light": "#1e293b", // Slate 800
                "text-muted": "#64748b", // Slate 500
                "background-light": "#f8fafc", // Slate 50
                "surface-light": "#ffffff",
            },
            fontFamily: {
                display: ["var(--font-jakarta)", "sans-serif"], // Unified to Sans for modern look
                body: ["var(--font-jakarta)", "sans-serif"],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'subtle-mesh': 'radial-gradient(at 40% 20%, rgba(14, 116, 144, 0.1) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(180, 83, 9, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(15, 23, 42, 0.05) 0px, transparent 50%)',
            },
        },
    },
    plugins: [],
}
