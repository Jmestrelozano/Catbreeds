import React from 'react';
import { render } from '@testing-library/react-native';
import { ScreenContentWrapper } from '../../../src/presentation/components/ScreenContentWrapper';
import { View, Text } from 'react-native';

describe('ScreenContentWrapper', () => {
  it('should show LoadingSpinner when loading is true', () => {
    const { getByText } = render(
      <ScreenContentWrapper loading={true}>
        <View><Text>Children</Text></View>
      </ScreenContentWrapper>,
    );

    expect(getByText('Loading cat breeds...')).toBeTruthy();
  });

  it('should show ErrorMessage when there is an error', () => {
    const { getByText } = render(
      <ScreenContentWrapper loading={false} error="Error message">
        <View><Text>Children</Text></View>
      </ScreenContentWrapper>,
    );

    expect(getByText('Error message')).toBeTruthy();
  });

  it('should show ErrorMessage with retry button when onRetry is provided', () => {
    const mockOnRetry = jest.fn();
    const { getByText } = render(
      <ScreenContentWrapper
        loading={false}
        error="Error message"
        onRetry={mockOnRetry}>
        <View><Text>Children</Text></View>
      </ScreenContentWrapper>,
    );

    expect(getByText('Error message')).toBeTruthy();
    expect(getByText('Retry')).toBeTruthy();
  });

  it('should show children when there is no loading or error', () => {
    const { getByText } = render(
      <ScreenContentWrapper loading={false} error={null}>
        <View><Text>Children content</Text></View>
      </ScreenContentWrapper>,
    );

    expect(getByText('Children content')).toBeTruthy();
  });
});

