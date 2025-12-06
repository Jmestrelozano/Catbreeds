import React from 'react';
import { render } from '@testing-library/react-native';
import { LoadingSpinner } from '../../src/presentation/components/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should render correctly', () => {
    const { getByText } = render(<LoadingSpinner />);

    expect(getByText('Loading cat breeds...')).toBeTruthy();
  });

  it('should show loading text', () => {
    const { getByText } = render(<LoadingSpinner />);
    const loadingText = getByText('Loading cat breeds...');
    
    expect(loadingText).toBeTruthy();
  });
});

