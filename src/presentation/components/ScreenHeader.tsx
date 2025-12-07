import React from 'react';
import { View, Text } from 'react-native';
import { BackButton } from './BackButton';
import { screenHeaderStyles } from '../styles/ScreenHeader.styles';
import { ScreenHeaderProps } from '../interfaces/ScreenHeaderProps';

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  rightElement,
}) => {
  const styles = screenHeaderStyles;

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {showBackButton && onBackPress && (
          <BackButton
            onPress={onBackPress}
            size={40}
            style="default"
            accessibilityLabel="Back"
            accessibilityHint="Returns to the previous screen"
          />
        )}
        <Text style={[styles.pawIcon, showBackButton && styles.pawIconWithBack]} accessibilityRole="none">🐾</Text>
        <Text style={styles.headerTitle} accessibilityRole="header">
          {title}
        </Text>
      </View>
      {rightElement && <View style={styles.headerRight}>{rightElement}</View>}
    </View>
  );
};

