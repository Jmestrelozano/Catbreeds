import { renderHook, waitFor, act } from '@testing-library/react-native';
import { useFavoriteToggle } from '../../../src/presentation/hooks/useFavoriteToggle';
import { FavoritesService } from '../../../src/application/FavoritesService';
import { CatBreed } from '../../../src/domain/entities/CatBreed';
import { ServicesContext } from '../../../src/presentation/context/ServicesContext';
import React from 'react';

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

describe('useFavoriteToggle', () => {
  let mockFavoritesService: jest.Mocked<FavoritesService>;

  beforeEach(() => {
    mockFavoritesService = {
      getFavorites: jest.fn(),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn(),
    } as any;
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <ServicesContext.Provider
        value={{
          catBreedService: {} as any,
          favoritesService: mockFavoritesService,
        }}>
        {children}
      </ServicesContext.Provider>
    );
  };

  it('should check if it is favorite on mount', async () => {
    mockFavoritesService.isFavorite.mockResolvedValue(true);

    const { result } = renderHook(() => useFavoriteToggle('test-id'), { wrapper });

    await waitFor(() => {
      expect(result.current.isFavorite).toBe(true);
    });

    expect(mockFavoritesService.isFavorite).toHaveBeenCalledWith('test-id');
  });

  it('should add a favorite when it is not favorite', async () => {
    mockFavoritesService.isFavorite.mockResolvedValue(false);
    mockFavoritesService.addFavorite.mockResolvedValue(true);

    const { result } = renderHook(() => useFavoriteToggle('test-id'), { wrapper });

    await waitFor(() => {
      expect(result.current.isFavorite).toBe(false);
    });

    await act(async () => {
      await result.current.toggleFavorite(mockBreed);
    });

    expect(mockFavoritesService.addFavorite).toHaveBeenCalledWith(mockBreed);
    
    await waitFor(() => {
      expect(result.current.isFavorite).toBe(true);
    });
  });

  it('should remove a favorite when it is already favorite', async () => {
    mockFavoritesService.isFavorite.mockResolvedValue(true);
    mockFavoritesService.removeFavorite.mockResolvedValue(true);

    const { result } = renderHook(() => useFavoriteToggle('test-id'), { wrapper });

    await waitFor(() => {
      expect(result.current.isFavorite).toBe(true);
    });

    await act(async () => {
      await result.current.toggleFavorite(mockBreed);
    });

    expect(mockFavoritesService.removeFavorite).toHaveBeenCalledWith('test-id');
    
    await waitFor(() => {
      expect(result.current.isFavorite).toBe(false);
    });
  });

  it('should allow manually checking if it is favorite', async () => {
    mockFavoritesService.isFavorite.mockResolvedValue(false);

    const { result } = renderHook(() => useFavoriteToggle('test-id'), { wrapper });

    await waitFor(() => {
      expect(result.current.isFavorite).toBe(false);
    });

    mockFavoritesService.isFavorite.mockResolvedValue(true);

    await act(async () => {
      await result.current.checkFavorite();
    });

    expect(mockFavoritesService.isFavorite).toHaveBeenCalledWith('test-id');
    
    await waitFor(() => {
      expect(result.current.isFavorite).toBe(true);
    });
  });

  it('should not check if breedId is null', async () => {
    const { result } = renderHook(() => useFavoriteToggle(null), { wrapper });

    expect(mockFavoritesService.isFavorite).not.toHaveBeenCalled();
    expect(result.current.isFavorite).toBe(false);
  });
});

