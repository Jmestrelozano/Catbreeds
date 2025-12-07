import React from 'react';
import { TouchableOpacity } from 'react-native';
import ExpandLeftIcon from '../../../assets/svg/expand_left.svg';
import { backButtonStyles } from '../styles/BackButton.styles';
import { BackButtonProps } from '../interfaces/BackButtonProps';

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  size = 40,
  style = 'default',
  accessibilityLabel = 'Back',
  accessibilityHint = 'Returns to the previous screen',
}) => {
  const styles = backButtonStyles;
  const buttonStyle = style === 'floating' ? styles.floatingButton : styles.defaultButton;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[buttonStyle, { width: size, height: size }]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}>
      <ExpandLeftIcon width={size * 0.6} height={size * 0.6} />
    </TouchableOpacity>
  );
};

