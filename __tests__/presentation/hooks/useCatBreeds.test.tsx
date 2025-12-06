import { renderHook, act } from '@testing-library/react-native';
import { useCatBreeds } from '../../../src/presentation/hooks/useCatBreeds';
import { CatBreedService } from '../../../src/application/CatBreedService';
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

describe('useCatBreeds', () => {
  let mockCatBreedService: jest.Mocked<CatBreedService>;

  beforeEach(() => {
    mockCatBreedService = {
      getAllBreeds: jest.fn(),
      getBreedById: jest.fn(),
    } as any;
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <ServicesContext.Provider
        value={{
          catBreedService: mockCatBreedService,
          favoritesService: {} as any,
        }}>
        {children}
      </ServicesContext.Provider>
    );
  };

  it('should load breeds correctly', async () => {
    const mockBreeds = [mockBreed];
    mockCatBreedService.getAllBreeds.mockResolvedValue(mockBreeds);

    const { result } = renderHook(() => useCatBreeds(), { wrapper });

    expect(result.current.loading).toBe(true);
    expect(result.current.breeds).toEqual([]);

    await act(async () => {
      await result.current.loadBreeds();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.breeds).toEqual(mockBreeds);
    expect(result.current.error).toBeNull();
  });

  it('should handle errors correctly', async () => {
    const errorMessage = 'Error loading breeds';
    mockCatBreedService.getAllBreeds.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useCatBreeds(), { wrapper });

    await act(async () => {
      await result.current.loadBreeds();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.breeds).toEqual([]);
  });

  it('should handle errors that are not Error instances', async () => {
    mockCatBreedService.getAllBreeds.mockRejectedValue('String error');

    const { result } = renderHook(() => useCatBreeds(), { wrapper });

    await act(async () => {
      await result.current.loadBreeds();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Error loading cat breeds');
  });

  it('should allow reloading breeds', async () => {
    const mockBreeds = [mockBreed];
    mockCatBreedService.getAllBreeds.mockResolvedValue(mockBreeds);

    const { result } = renderHook(() => useCatBreeds(), { wrapper });

    await act(async () => {
      await result.current.loadBreeds();
    });

    expect(result.current.loading).toBe(false);

    mockCatBreedService.getAllBreeds.mockClear();
    await act(async () => {
      await result.current.loadBreeds();
    });

    expect(mockCatBreedService.getAllBreeds).toHaveBeenCalledTimes(1);
  });
});

