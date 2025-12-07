import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { BackButton } from '../../src/presentation/components/BackButton';

describe('BackButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with default props', () => {
    const { getByLabelText } = render(
      <BackButton onPress={mockOnPress} />
    );

    const button = getByLabelText('Back');
    expect(button).toBeTruthy();
    expect(button.props.accessibilityRole).toBe('button');
  });

  it('should call onPress when pressed', () => {
    const { getByLabelText } = render(
      <BackButton onPress={mockOnPress} />
    );

    const button = getByLabelText('Back');
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should render with default size of 40', () => {
    const { getByLabelText } = render(
      <BackButton onPress={mockOnPress} />
    );

    const button = getByLabelText('Back');
    const style = Array.isArray(button.props.style) 
      ? button.props.style.find(s => s?.width === 40) 
      : button.props.style;
    expect(style).toMatchObject({ width: 40, height: 40 });
  });

  it('should render with custom size', () => {
    const { getByLabelText } = render(
      <BackButton onPress={mockOnPress} size={60} />
    );

    const button = getByLabelText('Back');
    const style = Array.isArray(button.props.style) 
      ? button.props.style.find(s => s?.width === 60) 
      : button.props.style;
    expect(style).toMatchObject({ width: 60, height: 60 });
  });

  it('should render with default style', () => {
    const { getByLabelText } = render(
      <BackButton onPress={mockOnPress} style="default" />
    );

    const button = getByLabelText('Back');
    expect(button).toBeTruthy();
  });

  it('should render with floating style', () => {
    const { getByLabelText } = render(
      <BackButton onPress={mockOnPress} style="floating" />
    );

    const button = getByLabelText('Back');
    expect(button).toBeTruthy();
  });

  it('should use custom accessibilityLabel', () => {
    const { getByLabelText } = render(
      <BackButton
        onPress={mockOnPress}
        accessibilityLabel="Go back"
      />
    );

    expect(getByLabelText('Go back')).toBeTruthy();
  });

  it('should use custom accessibilityHint', () => {
    const { getByLabelText } = render(
      <BackButton
        onPress={mockOnPress}
        accessibilityHint="Returns to the home screen"
      />
    );

    const button = getByLabelText('Back');
    expect(button.props.accessibilityHint).toBe('Returns to the home screen');
  });

  it('should use default accessibilityLabel when not provided', () => {
    const { getByLabelText } = render(
      <BackButton onPress={mockOnPress} />
    );

    expect(getByLabelText('Back')).toBeTruthy();
  });

  it('should use default accessibilityHint when not provided', () => {
    const { getByLabelText } = render(
      <BackButton onPress={mockOnPress} />
    );

    const button = getByLabelText('Back');
    expect(button.props.accessibilityHint).toBe('Returns to the previous screen');
  });
});

