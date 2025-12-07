import { StyleSheet } from 'react-native';
import { Colors, Shadows } from './sharedStyles';

export const backButtonStyles = StyleSheet.create({
  defaultButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    borderRadius: 22,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.card,
  },
});

