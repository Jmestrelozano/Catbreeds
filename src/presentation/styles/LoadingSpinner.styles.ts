import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from './sharedStyles';

export const loadingSpinnerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  text: {
    marginTop: Spacing.lg,
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
  },
});

