import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CatBreedCard } from '../../src/presentation/components/CatBreedCard';
import { CatBreed } from '../../src/domain/entities/CatBreed';

const mockBreed: CatBreed = {
  id: 'test-id',
  name: 'Test Breed',
  description: 'This is a test breed description',
  temperament: 'Active, Friendly',
  origin: 'United States',
  lifeSpan: '12 - 15 years',
  adaptability: 5,
  affectionLevel: 4,
  childFriendly: 3,
  dogFriendly: 2,
  energyLevel: 4,
  grooming: 3,
  healthIssues: 2,
  intelligence: 5,
  sheddingLevel: 3,
  socialNeeds: 4,
  strangerFriendly: 3,
  vocalisation: 2,
  experimental: 0,
  hairless: 0,
  natural: 1,
  rare: 0,
  rex: 0,
  suppressedTail: 0,
  shortLegs: 0,
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Test_Breed',
  hypoallergenic: 0,
  referenceImageId: 'test-image-id',
};

describe('CatBreedCard', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with all data', () => {
    const { getByText } = render(
      <CatBreedCard breed={mockBreed} onPress={mockOnPress} />
    );

    expect(getByText('Test Breed')).toBeTruthy();
    expect(getByText('United States')).toBeTruthy();
    expect(getByText('This is a test breed description')).toBeTruthy();
    expect(getByText('Temperament:')).toBeTruthy();
    expect(getByText('Active, Friendly')).toBeTruthy();
    expect(getByText('Life expectancy:')).toBeTruthy();
    expect(getByText('12 - 15 years')).toBeTruthy();
    expect(getByText('Energy level:')).toBeTruthy();
    expect(getByText('4/5')).toBeTruthy();
  });

  it('should show favorite badge when isFavorite is true', () => {
    const { getByTestId } = render(
      <CatBreedCard breed={mockBreed} onPress={mockOnPress} isFavorite={true} />
    );

    expect(getByTestId('svg-mock')).toBeTruthy();
  });

  it('should not show favorite badge when isFavorite is false', () => {
    const { queryByTestId } = render(
      <CatBreedCard breed={mockBreed} onPress={mockOnPress} isFavorite={false} />
    );

    const favoriteBadge = queryByTestId('svg-mock');
    expect(favoriteBadge).toBeNull();
  });

  it('should call onPress when card is pressed', () => {
    const { getByText } = render(
      <CatBreedCard breed={mockBreed} onPress={mockOnPress} />
    );

    const card = getByText('Test Breed').parent?.parent;
    fireEvent.press(card!);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should show placeholder when there is no referenceImageId', () => {
    const breedWithoutImage = { ...mockBreed, referenceImageId: undefined };
    const { getByText } = render(
      <CatBreedCard breed={breedWithoutImage} onPress={mockOnPress} />
    );

    expect(getByText('🐱')).toBeTruthy();
    expect(getByText('No image available')).toBeTruthy();
  });

  it('should show "Not available" when there is no temperament', () => {
    const breedWithoutTemperament = { ...mockBreed, temperament: '' };
    const { getByText } = render(
      <CatBreedCard breed={breedWithoutTemperament} onPress={mockOnPress} />
    );

    expect(getByText('Not available')).toBeTruthy();
  });

  it('should truncate description to 2 lines', () => {
    const longDescription = 'A'.repeat(200);
    const breedWithLongDescription = { ...mockBreed, description: longDescription };
    const { getByText } = render(
      <CatBreedCard breed={breedWithLongDescription} onPress={mockOnPress} />
    );

    const description = getByText(longDescription);
    expect(description).toBeTruthy();
    expect(description.props.numberOfLines).toBe(2);
  });
});

