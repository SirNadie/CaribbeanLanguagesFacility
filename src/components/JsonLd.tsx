import { ADDRESS_LINE_1, ADDRESS_LINE_2, ADDRESS_FULL, PHONE_NUMBER, EMAIL_ADDRESS, SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export default function JsonLd() {
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_TITLE,
        url: SITE_URL,
        logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/images/logos/CLFlogo.png`, // Assuming this path
            width: 112,
            height: 112
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: PHONE_NUMBER,
            contactType: 'customer service',
            areaServed: ['TT', 'Caribbean'],
            availableLanguage: ['English', 'Spanish']
        },
        sameAs: [
            // "https://www.facebook.com/your-page", // We can add these later if provided
            // "https://www.instagram.com/your-page"
        ]
    };

    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#localBusiness`,
        name: SITE_TITLE,
        image: `${SITE_URL}/images/hero.jpg`,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        telephone: PHONE_NUMBER,
        email: EMAIL_ADDRESS,
        address: {
            '@type': 'PostalAddress',
            streetAddress: ADDRESS_LINE_1,
            addressLocality: ADDRESS_LINE_2, // Adjust if Line 2 is country/region
            addressCountry: 'TT'
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 10.2796, // Approximate San Fernando/Vistabella coords
            longitude: -61.4601
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            opens: "08:00",
            closes: "17:00"
        },
        priceRange: "$$"
    };

    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Translation and Interpretation',
        provider: {
            '@id': `${SITE_URL}/#organization`
        },
        areaServed: {
            '@type': 'Country',
            name: 'Trinidad and Tobago'
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Language Services',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Legal Translation'
                    }
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Educational Classes (Lisa\'s Kids)'
                    }
                }
            ]
        }
    };

    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
        </section>
    );
}
