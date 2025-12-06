import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from './sharedStyles';

export const catBreedsListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  header: {
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  subtitle: {
    fontSize: Typography.size.md,
    color: Colors.textSecondary,
  },
  searchContainer: {
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchInput: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: Typography.size.base,
    color: Colors.textPrimary,
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
    color: Colors.textPlaceholder,
    textAlign: 'center',
  },
});

