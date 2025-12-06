import { renderHook, waitFor, act } from '@testing-library/react-native';
import { useFavorites } from '../../../src/presentation/hooks/useFavorites';
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

describe('useFavorites', () => {
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

  it('should load favorites correctly', async () => {
    const mockFavorites = [mockBreed];
    mockFavoritesService.getFavorites.mockResolvedValue(mockFavorites);

    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(result.current.loading).toBe(true);
    expect(result.current.favorites).toEqual([]);

    await act(async () => {
      result.current.loadFavorites();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.favorites).toEqual(mockFavorites);
    expect(mockFavoritesService.getFavorites).toHaveBeenCalled();
  });

  it('should allow adding a favorite', async () => {
    mockFavoritesService.getFavorites.mockResolvedValue([]);
    mockFavoritesService.addFavorite.mockResolvedValue(true);

    const { result } = renderHook(() => useFavorites(), { wrapper });

    await act(async () => {
      result.current.loadFavorites();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    mockFavoritesService.getFavorites.mockResolvedValue([mockBreed]);
    let success: boolean;
    await act(async () => {
      success = await result.current.addFavorite(mockBreed);
    });

    expect(success!).toBe(true);
    expect(mockFavoritesService.addFavorite).toHaveBeenCalledWith(mockBreed);
    
    await waitFor(() => {
      expect(result.current.favorites).toEqual([mockBreed]);
    });
  });

  it('should allow removing a favorite', async () => {
    mockFavoritesService.getFavorites.mockResolvedValue([mockBreed]);
    mockFavoritesService.removeFavorite.mockResolvedValue(true);

    const { result } = renderHook(() => useFavorites(), { wrapper });

    await act(async () => {
      result.current.loadFavorites();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.favorites).toEqual([mockBreed]);

    mockFavoritesService.getFavorites.mockResolvedValue([]);
    let success: boolean;
    await act(async () => {
      success = await result.current.removeFavorite('test-id');
    });

    expect(success!).toBe(true);
    expect(mockFavoritesService.removeFavorite).toHaveBeenCalledWith('test-id');
    
    await waitFor(() => {
      expect(result.current.favorites).toEqual([]);
    });
  });

  it('should allow checking if it is favorite', async () => {
    mockFavoritesService.isFavorite.mockResolvedValue(true);

    const { result } = renderHook(() => useFavorites(), { wrapper });

    const isFav = await result.current.isFavorite('test-id');
    expect(isFav).toBe(true);
  });

  it('should allow refreshing favorites', async () => {
    const mockFavorites = [mockBreed];
    mockFavoritesService.getFavorites.mockResolvedValue(mockFavorites);

    const { result } = renderHook(() => useFavorites(), { wrapper });

    await act(async () => {
      result.current.loadFavorites();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    mockFavoritesService.getFavorites.mockClear();
    mockFavoritesService.getFavorites.mockResolvedValue(mockFavorites);
    
    await act(async () => {
      result.current.refreshFavorites();
    });

    await waitFor(() => {
      expect(result.current.refreshing).toBe(false);
    });

    expect(mockFavoritesService.getFavorites).toHaveBeenCalled();
    expect(result.current.favorites).toEqual(mockFavorites);
  });
});

