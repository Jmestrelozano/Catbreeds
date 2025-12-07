import React from 'react';

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  showIcon?: boolean;
  showFavoriteButton?: boolean;
  onFavoritePress?: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}


