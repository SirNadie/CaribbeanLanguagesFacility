/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "primary": "#3B82F6",
                "secondary": "#F97316",
                "accent": "#10B981",
                "background-light": "#F7FAFC",
                "background-dark": "#1A202C",
                "text-light": "#1A202C",
                "text-dark": "#F7FAFC"
            },
            fontFamily: {
                "display": ["Nunito", "sans-serif"]
            },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries')
    ],
}
