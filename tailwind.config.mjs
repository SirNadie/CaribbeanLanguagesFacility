/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0f172a',
                secondary: '#b45309',
                accent: '#0e7490',
                "text-light": "#1e293b",
                "text-muted": "#64748b",
                "background-light": "#f8fafc",
            },
            fontFamily: {
                display: ["var(--font-jakarta)", "sans-serif"],
                body: ["var(--font-jakarta)", "sans-serif"],
            },
        },
    },
    plugins: [],
}
