/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0f172a',
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                },
                secondary: {
                    DEFAULT: '#ea580c',
                    50: '#fff7ed',
                    100: '#ffedd5',
                    200: '#fed7aa',
                    300: '#fdba74',
                    400: '#fb923c',
                    500: '#f97316',
                    600: '#ea580c',
                    700: '#c2410c',
                    800: '#9a3412',
                    900: '#7c2d12',
                },
                accent: {
                    DEFAULT: '#0891b2',
                    50: '#ecfeff',
                    100: '#cffafe',
                    200: '#a5f3fc',
                    300: '#67e8f9',
                    400: '#22d3ee',
                    500: '#06b6d4',
                    600: '#0891b2',
                    700: '#0e7490',
                    800: '#155e75',
                    900: '#164e63',
                },
                success: '#10b981',
                warning: '#f59e0b',
                error: '#ef4444',
                "text-light": "#1e293b",
                "text-muted": "#64748b",
                "background-light": "#f8fafc",
            },
            fontFamily: {
                display: ["var(--font-jakarta)", "sans-serif"],
                body: ["var(--font-jakarta)", "sans-serif"],
            },
            fontSize: {
                'display-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'display-lg': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
                'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
                'display-sm': ['1.875rem', { lineHeight: '1.25' }],
                'body-lg': ['1.125rem', { lineHeight: '1.75' }],
                'body-md': ['1rem', { lineHeight: '1.65' }],
                'body-sm': ['0.875rem', { lineHeight: '1.5' }],
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(14, 116, 144, 0.3)',
                'glow-lg': '0 0 40px rgba(14, 116, 144, 0.4)',
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
            },
        },
    },
    plugins: [],
}
