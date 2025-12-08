import React from 'react';
import { View, Text } from 'react-native';
import { sharedStyles } from '../styles/sharedStyles';
import { EmptyListMessageProps } from '../interfaces/EmptyListMessageProps';

export const EmptyListMessage: React.FC<EmptyListMessageProps> = ({ message }) => {
  return (
    <View style={sharedStyles.emptyContainer} accessibilityRole="text">
      <Text style={sharedStyles.emptyText}>{message}</Text>
    </View>
  );
};

