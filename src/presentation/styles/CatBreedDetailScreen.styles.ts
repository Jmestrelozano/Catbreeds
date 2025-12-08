import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from './sharedStyles';

export const catBreedDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: Colors.white,
    overflow: 'hidden',
    marginTop: 0,
  },
  maskedView: {
    width: '100%',
    height: 400,
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  placeholderContainer: {
    width: '100%',
    height: 400,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: Typography.size.hugeIcon,
    marginBottom: Spacing.md,
  },
  placeholderText: {
    fontSize: Typography.size.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.textPlaceholder,
    textAlign: 'center',
  },
  floatingButtons: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  favoriteButtonFloating: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.card,
  },
  contentContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    marginTop: -20,
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxxl,
    minHeight: '100%',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  name: {
    fontSize: Typography.size.xxxl,
    fontFamily: Typography.fontFamily.bold,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  origin: {
    fontSize: Typography.size.md,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.xl,
    marginHorizontal: -Spacing.xs,
  },
  tag: {
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    minWidth: 100,
    alignItems: 'center',
    margin: Spacing.xs,
  },
  tagValue: {
    fontSize: Typography.size.lg,
    fontFamily: Typography.fontFamily.bold,
    fontWeight: Typography.weight.bold,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  tagLabel: {
    fontSize: Typography.size.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.white,
    opacity: 0.9,
  },
  tagOrange: {
    backgroundColor: Colors.orangeLight,
  },
  tagPurple: {
    backgroundColor: Colors.purpleLight,
  },
  tagRed: {
    backgroundColor: Colors.redLight,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.size.xl,
    fontFamily: Typography.fontFamily.bold,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: Typography.size.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.textTertiary,
    lineHeight: 24,
  },
  temperament: {
    fontSize: Typography.size.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.textTertiary,
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  infoLabel: {
    fontSize: Typography.size.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontSize: Typography.size.base,
    fontFamily: Typography.fontFamily.semibold,
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
    fontFamily: Typography.fontFamily.regular,
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
    fontFamily: Typography.fontFamily.semibold,
    fontWeight: Typography.weight.semibold,
    color: Colors.textPrimary,
    width: 40,
    textAlign: 'right',
  },
  link: {
    fontSize: Typography.size.md,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});

