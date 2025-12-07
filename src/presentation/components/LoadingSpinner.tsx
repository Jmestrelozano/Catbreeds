import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { loadingSpinnerStyles } from '../styles/LoadingSpinner.styles';
import { Colors } from '../styles/sharedStyles';

export const LoadingSpinner: React.FC = () => {
  const styles = loadingSpinnerStyles;
  
  return (
    <View style={styles.container} accessibilityRole="progressbar" accessibilityLabel="Loading cat breeds">
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={styles.text} accessibilityRole="text">Loading cat breeds...</Text>
    </View>
  );
};

