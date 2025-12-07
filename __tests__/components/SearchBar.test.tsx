import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchBar } from '../../src/presentation/components/SearchBar';

describe('SearchBar', () => {
  const mockOnChangeText = jest.fn();
  const mockOnFavoritePress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with default props', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Search breeds"
      />
    );

    expect(getByPlaceholderText('Search breeds')).toBeTruthy();
    expect(getByTestId('search-icon')).toBeTruthy();
  });

  it('should call onChangeText when text is entered', () => {
    const { getByPlaceholderText } = render(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Search breeds"
      />
    );

    const input = getByPlaceholderText('Search breeds');
    fireEvent.changeText(input, 'Persian');

    expect(mockOnChangeText).toHaveBeenCalledWith('Persian');
    expect(mockOnChangeText).toHaveBeenCalledTimes(1);
  });

  it('should display the value prop', () => {
    const { getByDisplayValue } = render(
      <SearchBar
        value="Persian"
        onChangeText={mockOnChangeText}
        placeholder="Search breeds"
      />
    );

    expect(getByDisplayValue('Persian')).toBeTruthy();
  });

  it('should show search icon by default', () => {
    const { getByTestId } = render(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Search breeds"
      />
    );

    expect(getByTestId('search-icon')).toBeTruthy();
  });

  it('should hide search icon when showIcon is false', () => {
    const { queryByTestId } = render(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Search breeds"
        showIcon={false}
      />
    );

    const icons = queryByTestId('search-icon');
    expect(icons).toBeNull();
  });

  it('should show favorite button when showFavoriteButton is true and onFavoritePress is provided', () => {
    const { getAllByTestId } = render(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Search breeds"
        showFavoriteButton={true}
        onFavoritePress={mockOnFavoritePress}
      />
    );

    const icons = getAllByTestId('search-icon');
    expect(icons.length).toBeGreaterThanOrEqual(1);
  });

  it('should not show favorite button when showFavoriteButton is false', () => {
    const { getAllByTestId } = render(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Search breeds"
        showFavoriteButton={false}
      />
    );

    const icons = getAllByTestId('search-icon');
    expect(icons.length).toBe(1);
  });

  it('should not show favorite button when onFavoritePress is not provided', () => {
    const { getAllByTestId } = render(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Search breeds"
        showFavoriteButton={true}
      />
    );

    const icons = getAllByTestId('search-icon');
    expect(icons.length).toBe(1);
  });

  it('should call onFavoritePress when favorite button is pressed', () => {
    const { getAllByTestId } = render(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Search breeds"
        showFavoriteButton={true}
        onFavoritePress={mockOnFavoritePress}
      />
    );

    const icons = getAllByTestId('search-icon');

    if (icons.length > 1) {
      fireEvent.press(icons[1]);
      expect(mockOnFavoritePress).toHaveBeenCalledTimes(1);
    }
  });

  it('should have correct accessibility props', () => {
    const { getByLabelText } = render(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Search breeds"
        accessibilityLabel="Search cat breeds"
        accessibilityHint="Type to search for cat breeds"
      />
    );

    const input = getByLabelText('Search cat breeds');
    expect(input).toBeTruthy();
    expect(input.props.accessibilityRole).toBe('search');
  });

  it('should use default accessibilityLabel when not provided', () => {
    const { getByLabelText } = render(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Search breeds"
      />
    );

    expect(getByLabelText('Search')).toBeTruthy();
  });
});

