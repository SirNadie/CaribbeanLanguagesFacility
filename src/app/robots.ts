import { MetadataRoute } from 'next';
import { SITE_URL } from '../consts';

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
