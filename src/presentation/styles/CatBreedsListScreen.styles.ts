import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from './sharedStyles';

export const catBreedsListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tagContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  floatingTag: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    ...Shadows.card,
  },
  tagText: {
    fontSize: Typography.size.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.white,
    fontWeight: Typography.weight.medium,
  },
});

