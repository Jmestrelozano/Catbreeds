import React from 'react';
import { render } from '@testing-library/react-native';
import { EmptyListMessage } from '../../src/presentation/components/EmptyListMessage';

describe('EmptyListMessage', () => {
  it('should render correctly with message', () => {
    const { getByText } = render(
      <EmptyListMessage message="No items found" />
    );

    expect(getByText('No items found')).toBeTruthy();
  });

  it('should render message with correct accessibility role', () => {
    const { getByRole } = render(
      <EmptyListMessage message="No items found" />
    );

    const container = getByRole('text');
    expect(container).toBeTruthy();
  });

  it('should render different messages', () => {
    const { getByText, rerender } = render(
      <EmptyListMessage message="First message" />
    );

    expect(getByText('First message')).toBeTruthy();

    rerender(<EmptyListMessage message="Second message" />);
    expect(getByText('Second message')).toBeTruthy();
  });

  it('should render empty message', () => {
    const { getByText } = render(
      <EmptyListMessage message="" />
    );

    const container = getByText('').parent;
    expect(container).toBeTruthy();
  });

  it('should render long messages', () => {
    const longMessage = 'This is a very long message that should still be displayed correctly in the empty list message component';
    const { getByText } = render(
      <EmptyListMessage message={longMessage} />
    );

    expect(getByText(longMessage)).toBeTruthy();
  });

  it('should render message with special characters', () => {
    const specialMessage = "You don't have any favorites yet! 🐱";
    const { getByText } = render(
      <EmptyListMessage message={specialMessage} />
    );

    expect(getByText(specialMessage)).toBeTruthy();
  });
});

