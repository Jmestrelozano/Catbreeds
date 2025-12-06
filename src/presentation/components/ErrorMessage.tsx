import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { errorMessageStyles } from '../styles/ErrorMessage.styles';
import { ErrorMessageProps } from '../interfaces/ErrorMessageProps';

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
}) => {
  const styles = errorMessageStyles;
  
  // Determine icon based on error type
  const getIcon = () => {
    if (message.toLowerCase().includes('connection') || message.toLowerCase().includes('internet')) {
      return '📡'; // No connection
    }
    if (message.toLowerCase().includes('server')) {
      return '🔧'; // Server error
    }
    if (message.toLowerCase().includes('timeout') || message.toLowerCase().includes('took too long')) {
      return '⏱️'; // Timeout
    }
    return '😿'; // Generic error
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

