/** @type {import('next').NextConfig} */
const nextConfig = {
    // Image optimization
    images: {
        // IMPORTANT:
        // Disables the runtime Image Optimization API (`/_next/image`) which relies on `sharp`
        // and can generate high CPU usage on some hosting providers.
        //
        // Images will be served as static assets (no on-demand resizing/format conversion).
        unoptimized: true,
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // Enable compression
    compress: true,

    // Cache headers for static assets
    async headers() {
        return [
            {
                source: '/:all*(svg|jpg|png|webp|avif)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
