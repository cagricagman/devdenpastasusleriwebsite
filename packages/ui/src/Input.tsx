import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  id,
  className = '',
  style,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Manrope', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    color: '#554244',
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: "'Manrope', sans-serif",
    fontSize: '15px',
    padding: '12px 16px',
    borderRadius: '8px',
    border: error ? '1px solid #BA1A1A' : '1px solid #DBC0C3',
    backgroundColor: '#FFFFFF',
    color: '#201A19',
    outline: 'none',
    transition: 'border-color 150ms ease-in-out',
    ...style,
  };

  const errorStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#BA1A1A',
    fontFamily: "'Manrope', sans-serif",
  };

  const helperStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#554244',
    fontFamily: "'Manrope', sans-serif",
  };

  return (
    <div style={containerStyle}>
      {label && <label htmlFor={inputId} style={labelStyle}>{label}</label>}
      <input id={inputId} style={inputStyle} className={className} {...props} />
      {error && <span style={errorStyle}>{error}</span>}
      {!error && helperText && <span style={helperStyle}>{helperText}</span>}
    </div>
  );
};
