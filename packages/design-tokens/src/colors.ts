export const colors = {
  primary: {
    DEFAULT: '#9C3A50',
    container: '#BB5268',
    fixed: '#FFD9DE',
    fixedDim: '#FFB2BD',
    onPrimary: '#FFFFFF',
    onContainer: '#FFFBFF',
  },
  secondary: {
    DEFAULT: '#7D5710',
    container: '#FDC979',
    fixed: '#FFDEAE',
    onSecondary: '#FFFFFF',
    onContainer: '#78530A',
  },
  tertiary: {
    DEFAULT: '#346647',
    container: '#4D7F5E',
    fixed: '#B9EFC8',
    onTertiary: '#FFFFFF',
  },
  surface: {
    DEFAULT: '#FFF8F6',
    containerLowest: '#FFFFFF',
    containerLow: '#FDF1EE',
    container: '#F7EBE8',
    containerHigh: '#F1E6E2',
    containerHighest: '#ECE0DD',
    variant: '#ECE0DD',
  },
  text: {
    primary: '#201A19',
    secondary: '#554244',
    inverse: '#FAEEEB',
  },
  outline: {
    DEFAULT: '#887174',
    variant: '#DBC0C3',
  },
  status: {
    error: '#BA1A1A',
    errorContainer: '#FFDAD6',
    success: '#346647',
    warning: '#7D5710',
  },
} as const;
