import { MetadataRoute } from 'next';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: SITE_TITLE,
        short_name: 'CLF',
        description: SITE_DESCRIPTION,
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0f172a',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/images/logos/CLFlogo.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/images/logos/CLFlogo.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
