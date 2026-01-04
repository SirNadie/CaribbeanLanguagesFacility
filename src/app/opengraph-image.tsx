import { ImageResponse } from 'next/og';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export const runtime = 'edge';

export const alt = 'Caribbean Language Facility - Translations & Education';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    // Fonts can be loaded here if we had absolute URLs or file system access, 
    // but for simplicity and reliability on Vercel edge, we'll use system fonts/standard fetch if needed.
    // For a premium look without external font dependency risks during build, we use a clean design.

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    color: 'white',
                    padding: '80px',
                    position: 'relative',
                }}
            >
                {/* Decorative background circle */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-10%',
                        right: '-10%',
                        width: '600px',
                        height: '600px',
                        background: 'radial-gradient(circle, rgba(234, 88, 12, 0.15) 0%, transparent 70%)',
                        borderRadius: '50%',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-10%',
                        left: '-10%',
                        width: '500px',
                        height: '500px',
                        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)',
                        borderRadius: '50%',
                    }}
                />

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px',
                        marginBottom: '40px',
                    }}
                >
                    {/* We simulate the logo logic or just use text if image loading is complex in edge without fetch */}
                    <div style={{ display: 'flex', fontSize: 60, fontWeight: 'bold', color: '#f97316' }}>CLF</div>
                    <div style={{ width: 4, height: 60, background: 'rgba(255,255,255,0.2)', margin: '0 20px' }}></div>
                    <div style={{ fontSize: 40, fontWeight: 300, color: '#e2e8f0', letterSpacing: '4px' }}>TRINIDAD & TOBAGO</div>
                </div>

                <div
                    style={{
                        fontSize: 70,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        lineHeight: 1.1,
                        marginBottom: '30px',
                        backgroundImage: 'linear-gradient(to right, #ffffff, #94a3b8)',
                        backgroundClip: 'text',
                        color: 'transparent',
                    }}
                >
                    {SITE_TITLE}
                </div>

                <div
                    style={{
                        fontSize: 32,
                        textAlign: 'center',
                        color: '#94a3b8',
                        maxWidth: '900px',
                        lineHeight: 1.4,
                    }}
                >
                    {SITE_DESCRIPTION}
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
