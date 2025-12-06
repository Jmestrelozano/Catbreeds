import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { errorMessageStyles } from '../styles/ErrorMessage.styles';
import { ErrorMessageProps } from '../interfaces/ErrorMessageProps';

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
}) => {
  const styles = errorMessageStyles;
  
  const getIcon = () => {
    if (message.toLowerCase().includes('connection') || message.toLowerCase().includes('internet')) {
      return '📡';
    }
    if (message.toLowerCase().includes('server')) {
      return '🔧';
    }
    if (message.toLowerCase().includes('timeout') || message.toLowerCase().includes('took too long')) {
      return '⏱️';
    }
    return '😿';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{getIcon()}</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

