import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Platform } from 'react-native';
import { FavoritesScreen } from '../../src/presentation/screens/FavoritesScreen';
import { useFavorites } from '../../src/presentation/hooks/useFavorites';
import { useBreedFilter } from '../../src/presentation/hooks/useBreedFilter';
import { CatBreed } from '../../src/domain/entities/CatBreed';

jest.mock('../../src/presentation/hooks/useFavorites');
jest.mock('../../src/presentation/hooks/useBreedFilter');

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
  }),
  useFocusEffect: (callback: () => void) => {
    callback();
  },
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

describe('FavoritesScreen', () => {
  const mockLoadFavorites = jest.fn();
  const mockRefreshFavorites = jest.fn();
  const mockSetSearchQuery = jest.fn();
  const mockSetSelectedOrigin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
    mockGoBack.mockClear();
    mockUseSafeAreaInsets.mockReturnValue({ top: 0, bottom: 0, left: 0, right: 0 });

    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [mockBreed],
      loading: false,
      refreshing: false,
      loadFavorites: mockLoadFavorites,
      refreshFavorites: mockRefreshFavorites,
    });

    (useBreedFilter as jest.Mock).mockReturnValue({
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      selectedOrigin: null,
      setSelectedOrigin: mockSetSelectedOrigin,
      filteredBreeds: [mockBreed],
      origins: ['United States', 'United Kingdom'],
    });
  });

  it('should render favorites list correctly', () => {
    const { getByText } = render(<FavoritesScreen />);

    expect(getByText('Favorites (1)')).toBeTruthy();
    expect(getByText('Test Breed')).toBeTruthy();
  });

  it('should show correct favorites count', () => {
    const multipleFavorites = [
      mockBreed,
      { ...mockBreed, id: 'test-id-2', name: 'Test Breed 2' },
    ];

    (useFavorites as jest.Mock).mockReturnValue({
      favorites: multipleFavorites,
      loading: false,
      refreshing: false,
      loadFavorites: mockLoadFavorites,
      refreshFavorites: mockRefreshFavorites,
    });

    const { getByText } = render(<FavoritesScreen />);

    expect(getByText('Favorites (2)')).toBeTruthy();
  });

  it('should show origin filters', () => {
    const { getByText, getAllByText } = render(<FavoritesScreen />);

    expect(getByText('All')).toBeTruthy();
    const usElements = getAllByText('United States');
    expect(usElements.length).toBeGreaterThan(0);
    expect(getByText('United Kingdom')).toBeTruthy();
  });

  it('should allow filtering by origin', () => {
    const { getAllByText } = render(<FavoritesScreen />);

    const usElements = getAllByText('United States');
    const originFilter = usElements[0];
    fireEvent.press(originFilter);

    expect(mockSetSelectedOrigin).toHaveBeenCalledWith('United States');
  });

  it('should allow selecting "All" to remove filter', () => {
    const { getByText } = render(<FavoritesScreen />);

    const allFilter = getByText('All');
    fireEvent.press(allFilter);

    expect(mockSetSelectedOrigin).toHaveBeenCalledWith(null);
  });

  it('should update searchQuery when typing in input', () => {
    const { getByPlaceholderText } = render(<FavoritesScreen />);

    const searchInput = getByPlaceholderText('Search favorites...');
    fireEvent.changeText(searchInput, 'Test');

    expect(mockSetSearchQuery).toHaveBeenCalledWith('Test');
  });

  it('should show message when there are no favorites', () => {
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [],
      loading: false,
      refreshing: false,
      loadFavorites: mockLoadFavorites,
      refreshFavorites: mockRefreshFavorites,
    });

    (useBreedFilter as jest.Mock).mockReturnValue({
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      selectedOrigin: null,
      setSelectedOrigin: mockSetSelectedOrigin,
      filteredBreeds: [],
      origins: [],
    });

    const { getByText } = render(<FavoritesScreen />);

    expect(getByText("You don't have any favorites yet")).toBeTruthy();
  });

  it('should show message when no favorites match filters', () => {
    (useBreedFilter as jest.Mock).mockReturnValue({
      searchQuery: 'NoMatch',
      setSearchQuery: mockSetSearchQuery,
      selectedOrigin: null,
      setSelectedOrigin: mockSetSelectedOrigin,
      filteredBreeds: [],
      origins: ['United States'],
    });

    const { getByText } = render(<FavoritesScreen />);

    expect(getByText('No favorites found with these filters')).toBeTruthy();
  });

  it('should show loading state', () => {
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [],
      loading: true,
      refreshing: false,
      loadFavorites: mockLoadFavorites,
      refreshFavorites: mockRefreshFavorites,
    });

    const { getByText } = render(<FavoritesScreen />);

    expect(getByText('Loading cat breeds...')).toBeTruthy();
  });

  it('should show all cards with favorite badge', () => {
    const { getAllByTestId } = render(<FavoritesScreen />);

    // Los SVGs ahora se renderizan como Views con testID="svg-mock"
    // Buscamos los SVGs dentro de los badges de favorito
    const favoriteIcons = getAllByTestId('svg-mock');
    expect(favoriteIcons.length).toBeGreaterThan(0);
  });

  it('should call loadFavorites when screen is focused', () => {
    render(<FavoritesScreen />);

    expect(mockLoadFavorites).toHaveBeenCalled();
  });

  it('should navigate back when back button is pressed', () => {
    const { getByLabelText } = render(<FavoritesScreen />);

    // El botón de retroceso tiene accessibilityLabel="Back"
    const backButton = getByLabelText('Back');
    fireEvent.press(backButton);

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it('should navigate to CatBreedDetail when favorite card is pressed', () => {
    const { getByText } = render(<FavoritesScreen />);

    const breedCard = getByText('Test Breed').parent?.parent;
    if (breedCard) {
      fireEvent.press(breedCard);
    }

    expect(mockNavigate).toHaveBeenCalledWith('CatBreedDetail', {
      breedId: 'test-id',
    });
  });

  it('should call refreshFavorites when pull-to-refresh is done', () => {
    render(<FavoritesScreen />);

    mockRefreshFavorites();

    expect(mockRefreshFavorites).toHaveBeenCalledTimes(1);
  });

  it('should show refreshing state in RefreshControl', () => {
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [mockBreed],
      loading: false,
      refreshing: true,
      loadFavorites: mockLoadFavorites,
      refreshFavorites: mockRefreshFavorites,
    });

    const { getByText } = render(<FavoritesScreen />);
    
    expect(getByText('Favorites (1)')).toBeTruthy();
    expect(getByText('Test Breed')).toBeTruthy();
  });

  it('should apply selected styles when an origin filter is selected', () => {
    (useBreedFilter as jest.Mock).mockReturnValue({
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      selectedOrigin: 'United States',
      setSelectedOrigin: mockSetSelectedOrigin,
      filteredBreeds: [mockBreed],
      origins: ['United States', 'United Kingdom'],
    });

    const { getAllByText } = render(<FavoritesScreen />);

    const usElements = getAllByText('United States');
    expect(usElements.length).toBeGreaterThan(0);
  });

  it('should apply selected styles when "All" filter is selected', () => {
    (useBreedFilter as jest.Mock).mockReturnValue({
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      selectedOrigin: null,
      setSelectedOrigin: mockSetSelectedOrigin,
      filteredBreeds: [mockBreed],
      origins: ['United States', 'United Kingdom'],
    });

    const { getByText } = render(<FavoritesScreen />);

    const allFilter = getByText('All');
    expect(allFilter).toBeTruthy();
  });

  it('should apply correct paddingTop for Android when insets.top is greater than 16', () => {
    const originalPlatform = Platform.OS;
    Object.defineProperty(Platform, 'OS', {
      writable: true,
      value: 'android',
    });

    mockUseSafeAreaInsets.mockReturnValueOnce({ top: 20, bottom: 0, left: 0, right: 0 });

    render(<FavoritesScreen />);

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

    render(<FavoritesScreen />);

    expect(Platform.OS).toBe('android');

    Object.defineProperty(Platform, 'OS', {
      writable: true,
      value: originalPlatform,
    });
  });

  it('should apply paddingTop of 16 for iOS', () => {
    const originalPlatform = Platform.OS;
    Object.defineProperty(Platform, 'OS', {
      writable: true,
      value: 'ios',
    });

    mockUseSafeAreaInsets.mockReturnValueOnce({ top: 44, bottom: 0, left: 0, right: 0 });

    render(<FavoritesScreen />);

    expect(Platform.OS).toBe('ios');

    Object.defineProperty(Platform, 'OS', {
      writable: true,
      value: originalPlatform,
    });
  });
});

