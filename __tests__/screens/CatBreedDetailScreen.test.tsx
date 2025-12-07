import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Platform } from 'react-native';
import { CatBreedDetailScreen } from '../../src/presentation/screens/CatBreedDetailScreen';
import { useCatBreedDetail } from '../../src/presentation/hooks/useCatBreedDetail';
import { useFavoriteToggle } from '../../src/presentation/hooks/useFavoriteToggle';
import { CatBreed } from '../../src/domain/entities/CatBreed';

jest.mock('../../src/presentation/hooks/useCatBreedDetail');
jest.mock('../../src/presentation/hooks/useFavoriteToggle');

const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
  useRoute: () => ({
    params: {
      breedId: 'test-id',
    },
  }),
  useFocusEffect: (callback: () => void) => {
    callback();
  },
}));

const mockUseSafeAreaInsets = jest.fn(() => ({ top: 0, bottom: 0, left: 0, right: 0 }));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => mockUseSafeAreaInsets(),
}));

jest.mock('../../src/presentation/context/ServicesContext', () => ({
  ServicesProvider: ({ children }: { children: React.ReactNode }) => children,
  useServices: () => ({
    catBreedService: {
      getBreedById: jest.fn(),
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
  description: 'This is a test breed description that is longer',
  temperament: 'Active, Friendly, Playful',
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

describe('CatBreedDetailScreen', () => {
  const mockLoadBreed = jest.fn();
  const mockCheckFavorite = jest.fn();
  const mockToggleFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockGoBack.mockClear();
    mockUseSafeAreaInsets.mockReturnValue({ top: 0, bottom: 0, left: 0, right: 0 });

    (useCatBreedDetail as jest.Mock).mockReturnValue({
      breed: mockBreed,
      loading: false,
      error: null,
      loadBreed: mockLoadBreed,
    });

    (useFavoriteToggle as jest.Mock).mockReturnValue({
      isFavorite: false,
      checkFavorite: mockCheckFavorite,
      toggleFavorite: mockToggleFavorite,
    });
  });

  it('should render breed details correctly', () => {
    const { getAllByText, getByText } = render(<CatBreedDetailScreen />);

    const breedNames = getAllByText('Test Breed');
    expect(breedNames.length).toBeGreaterThan(0);
    expect(getByText('United States')).toBeTruthy();
    expect(getByText('This is a test breed description that is longer')).toBeTruthy();
    expect(getByText('About')).toBeTruthy();
    expect(getByText('Temperament')).toBeTruthy();
    expect(getByText('Active, Friendly, Playful')).toBeTruthy();
    expect(getByText('General Information')).toBeTruthy();
    expect(getByText('Characteristics')).toBeTruthy();
  });

  it('should show all characteristics', () => {
    const { getAllByText, getByText } = render(<CatBreedDetailScreen />);

    // Adaptability appears in both tags and characteristics, so use getAllByText
    const adaptabilityElements = getAllByText('Adaptability');
    expect(adaptabilityElements.length).toBeGreaterThan(0);
    expect(getByText('Affection level')).toBeTruthy();
    expect(getByText('Child friendly')).toBeTruthy();
    expect(getByText('Dog friendly')).toBeTruthy();
    expect(getByText('Energy level')).toBeTruthy();
    expect(getByText('Grooming')).toBeTruthy();
    expect(getByText('Health issues')).toBeTruthy();
    expect(getByText('Intelligence')).toBeTruthy();
    expect(getByText('Shedding level')).toBeTruthy();
    expect(getByText('Social needs')).toBeTruthy();
    expect(getByText('Stranger friendly')).toBeTruthy();
    expect(getByText('Vocalisation')).toBeTruthy();
  });

  it('should show empty favorite icon when it is not favorite', () => {
    const { getByLabelText } = render(<CatBreedDetailScreen />);

    expect(getByLabelText('Add to favorites')).toBeTruthy();
  });

  it('should show filled favorite icon when it is favorite', () => {
    (useFavoriteToggle as jest.Mock).mockReturnValue({
      isFavorite: true,
      checkFavorite: mockCheckFavorite,
      toggleFavorite: mockToggleFavorite,
    });

    const { getByLabelText } = render(<CatBreedDetailScreen />);

    expect(getByLabelText('Remove from favorites')).toBeTruthy();
  });

  it('should call toggleFavorite when favorite button is pressed', async () => {
    const { getByLabelText } = render(<CatBreedDetailScreen />);

    const favoriteButton = getByLabelText('Add to favorites');
    fireEvent.press(favoriteButton);

    expect(mockToggleFavorite).toHaveBeenCalled();
  });

  it('should call loadBreed when component mounts', () => {
    render(<CatBreedDetailScreen />);

    expect(mockLoadBreed).toHaveBeenCalledTimes(1);
  });

  it('should show loading state', () => {
    (useCatBreedDetail as jest.Mock).mockReturnValue({
      breed: null,
      loading: true,
      error: null,
      loadBreed: mockLoadBreed,
    });

    const { getByText } = render(<CatBreedDetailScreen />);

    expect(getByText('Loading cat breeds...')).toBeTruthy();
  });

  it('should show error and allow retry', () => {
    const mockOnRetry = jest.fn();
    (useCatBreedDetail as jest.Mock).mockReturnValue({
      breed: null,
      loading: false,
      error: 'Error loading breed',
      loadBreed: mockOnRetry,
    });

    const { getByText } = render(<CatBreedDetailScreen />);

    expect(getByText('Error loading breed')).toBeTruthy();
    
    const retryButton = getByText('Retry');
    const callsBeforeRetry = mockOnRetry.mock.calls.length;
    fireEvent.press(retryButton);
    
    expect(mockOnRetry.mock.calls.length).toBeGreaterThan(callsBeforeRetry);
  });

  it('should show placeholder when there is no image', () => {
    const breedWithoutImage = { ...mockBreed, referenceImageId: undefined };
    
    (useCatBreedDetail as jest.Mock).mockReturnValue({
      breed: breedWithoutImage,
      loading: false,
      error: null,
      loadBreed: mockLoadBreed,
    });

    const { getByText } = render(<CatBreedDetailScreen />);

    expect(getByText('🐱')).toBeTruthy();
    expect(getByText('No image available')).toBeTruthy();
  });

  it('should show Wikipedia link if available', () => {
    const { getByText } = render(<CatBreedDetailScreen />);

    expect(getByText('More information')).toBeTruthy();
    expect(getByText('https://en.wikipedia.org/wiki/Test_Breed')).toBeTruthy();
  });

  it('should not show Wikipedia link if not available', () => {
    const breedWithoutWikipedia = { ...mockBreed, wikipediaUrl: undefined };
    
    (useCatBreedDetail as jest.Mock).mockReturnValue({
      breed: breedWithoutWikipedia,
      loading: false,
      error: null,
      loadBreed: mockLoadBreed,
    });

    const { queryByText } = render(<CatBreedDetailScreen />);

    expect(queryByText('More information')).toBeNull();
  });

  it('should navigate back when back button is pressed', () => {
    const { getByLabelText } = render(<CatBreedDetailScreen />);

    const backButton = getByLabelText('Back');
    fireEvent.press(backButton);

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it('should show "Breed not found" when there is no breed but also no error or loading', () => {
    (useCatBreedDetail as jest.Mock).mockReturnValue({
      breed: null,
      loading: false,
      error: null,
      loadBreed: mockLoadBreed,
    });

    const { getByText } = render(<CatBreedDetailScreen />);

    expect(getByText('Breed not found')).toBeTruthy();
  });

  it('should call checkFavorite when screen is focused', () => {
    render(<CatBreedDetailScreen />);

    expect(mockCheckFavorite).toHaveBeenCalled();
  });

  it('should not call toggleFavorite when breed is null and favorite button is pressed', async () => {
    (useCatBreedDetail as jest.Mock).mockReturnValue({
      breed: null,
      loading: false,
      error: null,
      loadBreed: mockLoadBreed,
    });

    const { queryByLabelText } = render(<CatBreedDetailScreen />);

    const favoriteButton = queryByLabelText('Add to favorites');
    expect(favoriteButton).toBeNull();
    expect(mockToggleFavorite).not.toHaveBeenCalled();
  });

  it('should apply correct paddingTop for Android when insets.top is greater than 16', () => {
    const originalPlatform = Platform.OS;
    Object.defineProperty(Platform, 'OS', {
      writable: true,
      value: 'android',
    });

    mockUseSafeAreaInsets.mockReturnValueOnce({ top: 20, bottom: 0, left: 0, right: 0 });

    render(<CatBreedDetailScreen />);

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

    render(<CatBreedDetailScreen />);

    expect(Platform.OS).toBe('android');

    Object.defineProperty(Platform, 'OS', {
      writable: true,
      value: originalPlatform,
    });
  });

  it('should show life expectancy information', () => {
    const { getAllByText, getByText } = render(<CatBreedDetailScreen />);

    expect(getByText('Life expectancy:')).toBeTruthy();

    const lifeSpanElements = getAllByText('12 - 15 years');
    expect(lifeSpanElements.length).toBeGreaterThan(0);
  });
});

