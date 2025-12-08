import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from './sharedStyles';

export const favoritesScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  filtersContainer: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filtersScroll: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  filterChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: Spacing.sm,
  },
  filterChipSelected: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  filterChipText: {
    fontSize: Typography.size.md,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.textPrimary,
    fontWeight: Typography.weight.medium,
  },
  filterChipTextSelected: {
    color: Colors.white,
  },
});

