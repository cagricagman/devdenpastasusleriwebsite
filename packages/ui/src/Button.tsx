import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled,
  children,
  className = '',
  style,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Manrope', sans-serif",
    fontWeight: 600,
    borderRadius: '8px',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 200ms ease-in-out',
    border: '1px solid transparent',
    outline: 'none',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled || isLoading ? 0.6 : 1,
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '6px 14px', fontSize: '13px', lineHeight: '18px' },
    md: { padding: '10px 20px', fontSize: '14px', lineHeight: '20px' },
    lg: { padding: '14px 28px', fontSize: '16px', lineHeight: '24px' },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: '#9C3A50',
      color: '#FFFFFF',
    },
    secondary: {
      backgroundColor: '#FDC979',
      color: '#78530A',
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: '#9C3A50',
      color: '#9C3A50',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#554244',
    },
    danger: {
      backgroundColor: '#BA1A1A',
      color: '#FFFFFF',
    },
  };

  const combinedStyles: React.CSSProperties = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  return (
    <button
      style={combinedStyles}
      disabled={disabled || isLoading}
      className={className}
      {...props}
    >
      {isLoading ? (
        <span style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }}>⏳</span>
      ) : null}
      {children}
    </button>
  );
};
