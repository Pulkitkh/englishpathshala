import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const runtime = 'nodejs';
export const alt = `${site.name} — live spoken English classes`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** The card people see when the link is shared on WhatsApp or Instagram DMs. */
export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #072d4d 0%, #0067aa 55%, #02a3f5 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 26,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#b6e6ff',
          }}
        >
          {site.name}
        </div>

        <div style={{ display: 'flex', fontSize: 82, fontWeight: 700, lineHeight: 1.1, marginTop: 28 }}>
          Stop translating in
        </div>
        <div style={{ display: 'flex', fontSize: 82, fontWeight: 700, lineHeight: 1.1 }}>
          your head. <span style={{ color: '#fbbf24', marginLeft: 20 }}>Just speak.</span>
        </div>

        <div style={{ display: 'flex', fontSize: 32, marginTop: 36, color: '#def1ff' }}>
          Live online classes with {site.founder} · Max 12 students a batch
        </div>

        <div style={{ display: 'flex', gap: 20, marginTop: 44 }}>
          {['Free demo class', 'Hindi + English', 'Daily speaking practice'].map((chip) => (
            <div
              key={chip}
              style={{
                display: 'flex',
                padding: '14px 28px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.14)',
                border: '2px solid rgba(255,255,255,0.25)',
                fontSize: 26,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
