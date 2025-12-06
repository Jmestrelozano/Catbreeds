import React from 'react';

export interface ScreenContentWrapperProps {
  loading: boolean;
  error?: string | null;
  onRetry?: () => void;
  children: React.ReactNode;
}

