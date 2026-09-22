export const typography = {
  fontFamily: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'Manrope', system-ui, -apple-system, sans-serif",
  },
  fontSize: {
    'display-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '700' }],
    'display-md': ['36px', { lineHeight: '44px', letterSpacing: '-0.01em', fontWeight: '700' }],
    'headline-lg': ['30px', { lineHeight: '38px', fontWeight: '600' }],
    'headline-lg-mobile': ['24px', { lineHeight: '32px', fontWeight: '600' }],
    'headline-md': ['24px', { lineHeight: '32px', fontWeight: '600' }],
    'title-lg': ['20px', { lineHeight: '28px', fontWeight: '600' }],
    'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
    'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
    'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
    'label-md': ['14px', { lineHeight: '20px', letterSpacing: '0.01em', fontWeight: '600' }],
    'label-sm': ['12px', { lineHeight: '16px', letterSpacing: '0.04em', fontWeight: '700' }],
  },
} as const;
