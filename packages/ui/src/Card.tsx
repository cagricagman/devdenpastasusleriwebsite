import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  elevation?: 0 | 1 | 2 | 3;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevation = 1,
  style,
  className = '',
  onClick,
}) => {
  const shadows = {
    0: 'none',
    1: '0 2px 8px rgba(32, 26, 25, 0.04)',
    2: '0 10px 20px rgba(32, 26, 25, 0.08)',
    3: '0 20px 40px rgba(32, 26, 25, 0.12)',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: shadows[elevation],
    border: '1px solid #ECE0DD',
    transition: 'all 200ms ease-in-out',
    ...style,
  };

  return (
    <div style={cardStyle} className={className} onClick={onClick}>
      {children}
    </div>
  );
};
