import { StyleSheet } from 'react-native';

/**
 * Shared design constants
 * Following Single Responsibility Principle (SRP)
 */
export const Colors = {
  background: '#F5F5F5',
  white: '#FFFFFF',
  textPrimary: '#333',
  textSecondary: '#666',
  textTertiary: '#555',
  textPlaceholder: '#999',
  textLight: '#888',
  border: '#E0E0E0',
  primary: '#4A90E2',
  accent: '#FF6B35',
  shadow: '#000',
  // Pastel colors for detail screen
  pinkLight: '#FFE5E5',
  orangeLight: '#FFB366',
  purpleLight: '#D4A5FF',
  redLight: '#FF9999',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 40,
};

export const Typography = {
  fontFamily: {
    regular: 'Nunito-Regular',
    medium: 'Nunito-Medium',
    semibold: 'Nunito-SemiBold',
    bold: 'Nunito-Bold',
    extraBold: 'Nunito-ExtraBold',
  },
  size: {
    xs: 11,
    sm: 12,
    md: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    icon: 28,
    largeIcon: 48,
    hugeIcon: 64,
  },
  weight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
 
  getFontFamily: (weight?: string): string => {
    switch (weight) {
      case Typography.weight.medium:
        return Typography.fontFamily.medium;
      case Typography.weight.semibold:
        return Typography.fontFamily.semibold;
      case Typography.weight.bold:
        return Typography.fontFamily.bold;
      case '800':
        return Typography.fontFamily.extraBold;
      default:
        return Typography.fontFamily.regular;
    }
  },
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 20,
  full: 9999,
};

export const Shadows = {
  card: {
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

/**
 * Common shared styles between components
 */
export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  emptyContainer: {
    padding: Spacing.xxxl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: Typography.size.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.textPlaceholder,
    textAlign: 'center',
  },
  listContent: {
    paddingVertical: Spacing.sm,
  },
});

