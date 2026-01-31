import { MetadataRoute } from 'next';
import { SITE_URL } from '../consts';

export const revalidate = 60 * 60 * 24; // 24h

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
