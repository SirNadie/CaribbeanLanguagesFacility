/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                "primary": "#3B82F6",
                "secondary": "#F97316",
                "accent": "#10B981",
                "background-light": "#F7FAFC",
                "text-light": "#1A202C"
            },
            fontFamily: {
                "display": ["Nunito", "sans-serif"]
            },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
                'fade-in-down': 'fadeInDown 0.5s ease-out forwards',
                'fade-in-left': 'fadeInLeft 0.6s ease-out forwards',
                'fade-in-right': 'fadeInRight 0.6s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
                'slide-down': 'slideDown 0.3s ease-out forwards',
                'scale-in': 'scaleIn 0.4s ease-out forwards',
                'float': 'float 3s ease-in-out infinite',
                'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
                'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
                'wiggle': 'wiggle 1s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                fadeInRight: {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                pulseSoft: {
                    '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.4)' },
                    '50%': { transform: 'scale(1.05)', boxShadow: '0 0 0 15px rgba(37, 211, 102, 0)' },
                },
                bounceGentle: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries')
    ],
}
