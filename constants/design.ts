import { getBlinkThemePalettes, BLINK_DESIGN_THEMES } from '@blinkdotnew/mobile-ui';

// Using 'ocean-teal' as the primary palette for a clean, Mediterranean feel
const palette = getBlinkThemePalettes('ocean-teal');

export const colors = {
  ...palette.base,
  primary: palette.accent.$color9,
  accent: palette.accent.$color9,
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  background: palette.base.$color1,
  surface: palette.base.$color2,
  text: palette.base.$color12,
  textSecondary: palette.base.$color11,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
};
