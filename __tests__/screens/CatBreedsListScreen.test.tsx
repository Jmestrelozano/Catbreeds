import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Platform } from 'react-native';
import { CatBreedsListScreen } from '../../src/presentation/screens/CatBreedsListScreen';
import { useCatBreeds } from '../../src/presentation/hooks/useCatBreeds';
import { useBreedFilter } from '../../src/presentation/hooks/useBreedFilter';
import { CatBreed } from '../../src/domain/entities/CatBreed';

jest.mock('../../src/presentation/hooks/useCatBreeds');
jest.mock('../../src/presentation/hooks/useBreedFilter');

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const mockUseSafeAreaInsets = jest.fn(() => ({ top: 0, bottom: 0, left: 0, right: 0 }));
jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native');
  return {
    SafeAreaView: View,
    useSafeAreaInsets: () => mockUseSafeAreaInsets(),
  };
});

jest.mock('../../src/presentation/context/ServicesContext', () => ({
  ServicesProvider: ({ children }: { children: React.ReactNode }) => children,
  useServices: () => ({
    catBreedService: {
      getAllBreeds: jest.fn(),
    },
    favoritesService: {
      getFavorites: jest.fn(),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn(),
    },
  }),
}));

const mockBreed: CatBreed = {
  id: 'test-id',
  name: 'Test Breed',
  description: 'Test description',
  temperament: 'Active',
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

describe('CatBreedsListScreen', () => {
  const mockLoadBreeds = jest.fn();
  const mockSetSearchQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();

    (useCatBreeds as jest.Mock).mockReturnValue({
      breeds: [mockBreed],
      loading: false,
      error: null,
      loadBreeds: mockLoadBreeds,
    });

    (useBreedFilter as jest.Mock).mockReturnValue({
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      filteredBreeds: [mockBreed],
    });
  });

  it('should render breeds list correctly', () => {
    const { getByText } = render(<CatBreedsListScreen />);

    expect(getByText('Test Breed')).toBeTruthy();
    expect(getByText('Catbreeds')).toBeTruthy();
  });

  it('should show found breeds count', () => {
    const { getByText } = render(<CatBreedsListScreen />);

    expect(getByText(/1 breed found/)).toBeTruthy();
  });

  it('should show plural count when there are multiple breeds', () => {
    const multipleBreeds = [mockBreed, { ...mockBreed, id: 'test-id-2', name: 'Test Breed 2' }];
    
    (useBreedFilter as jest.Mock).mockReturnValue({
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      filteredBreeds: multipleBreeds,
    });

    const { getByText } = render(<CatBreedsListScreen />);

    expect(getByText(/2 breeds found/)).toBeTruthy();
  });

  it('should call loadBreeds when component mounts', () => {
    render(<CatBreedsListScreen />);

    expect(mockLoadBreeds).toHaveBeenCalledTimes(1);
  });

  it('should update searchQuery when typing in input', () => {
    const { getByPlaceholderText } = render(<CatBreedsListScreen />);

    const searchInput = getByPlaceholderText('Search here....');
    fireEvent.changeText(searchInput, 'Test');

    expect(mockSetSearchQuery).toHaveBeenCalledWith('Test');
  });

  it('should show empty message when no filtered breeds', () => {
    (useBreedFilter as jest.Mock).mockReturnValue({
      searchQuery: 'NoMatch',
      setSearchQuery: mockSetSearchQuery,
      filteredBreeds: [],
    });

    const { getByText } = render(<CatBreedsListScreen />);

    expect(getByText('No breeds found matching your search')).toBeTruthy();
  });

  it('should show loading state', () => {
    (useCatBreeds as jest.Mock).mockReturnValue({
      breeds: [],
      loading: true,
      error: null,
      loadBreeds: mockLoadBreeds,
    });

    const { getByText } = render(<CatBreedsListScreen />);

    expect(getByText('Loading cat breeds...')).toBeTruthy();
  });

  it('should show error and allow retry', () => {
    const mockOnRetry = jest.fn();
    (useCatBreeds as jest.Mock).mockReturnValue({
      breeds: [],
      loading: false,
      error: 'Connection error',
      loadBreeds: mockOnRetry,
    });

    const { getByText } = render(<CatBreedsListScreen />);

    expect(getByText('Connection error')).toBeTruthy();
    
    const retryButton = getByText('Retry');
    const callsBeforeRetry = mockOnRetry.mock.calls.length;
    fireEvent.press(retryButton);
    
    expect(mockOnRetry.mock.calls.length).toBeGreaterThan(callsBeforeRetry);
  });

  it('should navigate to Favorites when favorites button is pressed', () => {
    const { getByLabelText } = render(<CatBreedsListScreen />);

    const favoriteButton = getByLabelText('View favorites');
    fireEvent.press(favoriteButton);

    expect(mockNavigate).toHaveBeenCalledWith('Favorites');
  });

  it('should navigate to CatBreedDetail when breed card is pressed', () => {
    const { getByText } = render(<CatBreedsListScreen />);

    const breedCard = getByText('Test Breed');
    fireEvent.press(breedCard);

    expect(mockNavigate).toHaveBeenCalledWith('CatBreedDetail', {
      breedId: 'test-id',
    });
  });

  it('should apply correct paddingTop for Android when insets.top is greater than 16', () => {
    const originalPlatform = Platform.OS;
    Object.defineProperty(Platform, 'OS', {
      writable: true,
      value: 'android',
    });

    mockUseSafeAreaInsets.mockReturnValueOnce({ top: 20, bottom: 0, left: 0, right: 0 });

    render(<CatBreedsListScreen />);

    expect(Platform.OS).toBe('android');

    Object.defineProperty(Platform, 'OS', {
      writable: true,
      value: originalPlatform,
    });
  });

  it('should apply correct paddingTop for Android when insets.top is less than 16', () => {
    const originalPlatform = Platform.OS;
    Object.defineProperty(Platform, 'OS', {
      writable: true,
      value: 'android',
    });

    mockUseSafeAreaInsets.mockReturnValueOnce({ top: 10, bottom: 0, left: 0, right: 0 });

    render(<CatBreedsListScreen />);

    expect(Platform.OS).toBe('android');

    Object.defineProperty(Platform, 'OS', {
      writable: true,
      value: originalPlatform,
    });
  });
});

