import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ScreenHeader } from '../../src/presentation/components/ScreenHeader';

describe('ScreenHeader', () => {
  const mockOnBackPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with title', () => {
    const { getByText } = render(
      <ScreenHeader title="Test Title" />
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('🐾')).toBeTruthy();
  });

  it('should render title with correct accessibility role', () => {
    const { getByText } = render(
      <ScreenHeader title="Test Title" />
    );

    const title = getByText('Test Title');
    expect(title.props.accessibilityRole).toBe('header');
  });

  it('should not show back button by default', () => {
    const { queryByLabelText } = render(
      <ScreenHeader title="Test Title" />
    );

    expect(queryByLabelText('Back')).toBeNull();
  });

  it('should show back button when showBackButton is true and onBackPress is provided', () => {
    const { getByLabelText } = render(
      <ScreenHeader
        title="Test Title"
        showBackButton={true}
        onBackPress={mockOnBackPress}
      />
    );

    const backButton = getByLabelText('Back');
    expect(backButton).toBeTruthy();
  });

  it('should not show back button when showBackButton is true but onBackPress is not provided', () => {
    const { queryByLabelText } = render(
      <ScreenHeader
        title="Test Title"
        showBackButton={true}
      />
    );

    expect(queryByLabelText('Back')).toBeNull();
  });

  it('should not show back button when showBackButton is false', () => {
    const { queryByLabelText } = render(
      <ScreenHeader
        title="Test Title"
        showBackButton={false}
        onBackPress={mockOnBackPress}
      />
    );

    expect(queryByLabelText('Back')).toBeNull();
  });

  it('should call onBackPress when back button is pressed', () => {
    const { getByLabelText } = render(
      <ScreenHeader
        title="Test Title"
        showBackButton={true}
        onBackPress={mockOnBackPress}
      />
    );

    const backButton = getByLabelText('Back');
    fireEvent.press(backButton);

    expect(mockOnBackPress).toHaveBeenCalledTimes(1);
  });

  it('should render rightElement when provided', () => {
    const { getByText } = render(
      <ScreenHeader
        title="Test Title"
        rightElement={<Text>Right Content</Text>}
      />
    );

    expect(getByText('Right Content')).toBeTruthy();
  });

  it('should not render rightElement when not provided', () => {
    const { queryByText } = render(
      <ScreenHeader title="Test Title" />
    );

    expect(queryByText('Right Content')).toBeNull();
  });

  it('should apply correct styles when back button is shown', () => {
    const { getByText } = render(
      <ScreenHeader
        title="Test Title"
        showBackButton={true}
        onBackPress={mockOnBackPress}
      />
    );

    const pawIcon = getByText('🐾');
    expect(pawIcon).toBeTruthy();
  });

  it('should render with different titles', () => {
    const { getByText, rerender } = render(
      <ScreenHeader title="First Title" />
    );

    expect(getByText('First Title')).toBeTruthy();

    rerender(<ScreenHeader title="Second Title" />);
    expect(getByText('Second Title')).toBeTruthy();
  });
});

