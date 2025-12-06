import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { ScreenContentWrapperProps } from '../interfaces/ScreenContentWrapperProps';

export const ScreenContentWrapper: React.FC<ScreenContentWrapperProps> = ({
  loading,
  error,
  onRetry,
  children,
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  return <>{children}</>;
};

