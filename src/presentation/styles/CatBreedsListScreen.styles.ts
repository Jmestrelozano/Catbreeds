import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from './sharedStyles';

export const catBreedsListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  navbarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pawIcon: {
    fontSize: Typography.size.xxl,
    marginRight: Spacing.sm,
  },
  navbarTitle: {
    fontSize: Typography.size.xl,
    fontFamily: Typography.fontFamily.bold,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  navbarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  navbarIcon: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: Typography.size.xl,
  },
  favoriteIcon: {
    fontSize: Typography.size.xl,
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
  listContent: {
    paddingVertical: Spacing.sm,
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
});

