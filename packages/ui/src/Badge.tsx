import React from 'react';

export interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  children,
  style,
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 10px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: 700,
    fontFamily: "'Manrope', sans-serif",
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: { backgroundColor: '#FFD9DE', color: '#400014' },
    secondary: { backgroundColor: '#FFDEAE', color: '#604100' },
    success: { backgroundColor: '#B9EFC8', color: '#00210F' },
    warning: { backgroundColor: '#FDC979', color: '#78530A' },
    error: { backgroundColor: '#FFDAD6', color: '#93000A' },
    neutral: { backgroundColor: '#F7EBE8', color: '#554244' },
  };

  return (
    <span style={{ ...baseStyle, ...variantStyles[variant], ...style }}>
      {children}
    </span>
  );
};
