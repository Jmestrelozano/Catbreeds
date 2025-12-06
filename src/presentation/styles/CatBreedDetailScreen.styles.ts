import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from './sharedStyles';

export const catBreedDetailStyles = StyleSheet.create({
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
  backButton: {
    marginRight: Spacing.lg,
  },
  backIcon: {
    fontSize: Typography.size.xxl,
    color: Colors.textPrimary,
  },
  pawIcon: {
    fontSize: Typography.size.xxl,
    marginRight: Spacing.sm,
  },
  navbarTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: Colors.border,
  },
  placeholderContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.border,
    borderStyle: 'dashed',
  },
  placeholderIcon: {
    fontSize: Typography.size.hugeIcon,
    marginBottom: Spacing.md,
  },
  placeholderText: {
    fontSize: Typography.size.base,
    color: Colors.textPlaceholder,
    textAlign: 'center',
  },
  header: {
    backgroundColor: Colors.white,
    padding: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTextContainer: {
    flex: 1,
  },
  name: {
    fontSize: Typography.size.xxxl,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  origin: {
    fontSize: Typography.size.lg,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  favoriteButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.lg,
  },
  favoriteIcon: {
    fontSize: Typography.size.icon,
  },
  section: {
    backgroundColor: Colors.white,
    padding: Spacing.xl,
    marginTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  sectionTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: Typography.size.base,
    color: Colors.textTertiary,
    lineHeight: 24,
  },
  temperament: {
    fontSize: Typography.size.base,
    color: Colors.textTertiary,
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: Colors.textPrimary,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  statLabel: {
    fontSize: Typography.size.md,
    color: Colors.textSecondary,
    width: 150,
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: BorderRadius.sm,
    marginHorizontal: Spacing.md,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.sm,
  },
  statValue: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.semibold,
    color: Colors.textPrimary,
    width: 40,
    textAlign: 'right',
  },
  link: {
    fontSize: Typography.size.md,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});

