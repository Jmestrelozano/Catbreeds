import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ErrorMessage } from '../../src/presentation/components/ErrorMessage';

describe('ErrorMessage', () => {
  it('should render error message', () => {
    const { getByText } = render(
      <ErrorMessage message="Error de conexión" />
    );

    expect(getByText('Error de conexión')).toBeTruthy();
  });

  it('should show retry button when onRetry is provided', () => {
    const mockOnRetry = jest.fn();
    const { getByText } = render(
      <ErrorMessage message="Error" onRetry={mockOnRetry} />
    );

    const retryButton = getByText('Retry');
    expect(retryButton).toBeTruthy();

    fireEvent.press(retryButton);
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('should not show retry button when onRetry is not provided', () => {
    const { queryByText } = render(
      <ErrorMessage message="Error" />
    );

    expect(queryByText('Retry')).toBeNull();
  });

  it('should show correct icon for connection errors', () => {
    const { getByText } = render(
      <ErrorMessage message="Connection error" />
    );

    expect(getByText('📡')).toBeTruthy();
  });

  it('should show correct icon for server errors', () => {
    const { getByText } = render(
      <ErrorMessage message="Server error" />
    );

    expect(getByText('🔧')).toBeTruthy();
  });

  it('should show correct icon for timeouts', () => {
    const { getByText } = render(
      <ErrorMessage message="Request timeout" />
    );

    expect(getByText('⏱️')).toBeTruthy();
  });

  it('should show generic icon for other errors', () => {
    const { getByText } = render(
      <ErrorMessage message="Unknown error" />
    );

    expect(getByText('😿')).toBeTruthy();
  });
});

