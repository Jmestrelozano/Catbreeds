jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

import { renderHook, act } from '@testing-library/react-native';
import { useCatBreedDetail } from '../../../src/presentation/hooks/useCatBreedDetail';
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

describe('useCatBreedDetail', () => {
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

  it('should load breed details correctly', async () => {
    mockCatBreedService.getBreedById.mockResolvedValue(mockBreed);

    const { result } = renderHook(() => useCatBreedDetail('test-id'), { wrapper });

    expect(result.current.loading).toBe(true);
    expect(result.current.breed).toBeNull();

    await act(async () => {
      await result.current.loadBreed();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.breed).toEqual(mockBreed);
    expect(result.current.error).toBeNull();
  });

  it('should handle when breed does not exist', async () => {
    mockCatBreedService.getBreedById.mockResolvedValue(null);

    const { result } = renderHook(() => useCatBreedDetail('non-existent-id'), {
      wrapper,
    });

    await act(async () => {
      await result.current.loadBreed();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.breed).toBeNull();
    expect(result.current.error).toBe('Cat breed not found');
  });

  it('should handle errors correctly', async () => {
    const errorMessage = 'Error loading breed';
    mockCatBreedService.getBreedById.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useCatBreedDetail('test-id'), { wrapper });

    await act(async () => {
      await result.current.loadBreed();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.breed).toBeNull();
  });

  it('should handle errors that are not Error instances', async () => {
    mockCatBreedService.getBreedById.mockRejectedValue('String error');

    const { result } = renderHook(() => useCatBreedDetail('test-id'), { wrapper });

    await act(async () => {
      await result.current.loadBreed();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Error loading breed details');
  });

  it('should allow reloading details', async () => {
    mockCatBreedService.getBreedById.mockResolvedValue(mockBreed);

    const { result } = renderHook(() => useCatBreedDetail('test-id'), { wrapper });

    await act(async () => {
      await result.current.loadBreed();
    });

    expect(result.current.loading).toBe(false);

    mockCatBreedService.getBreedById.mockClear();
    await act(async () => {
      await result.current.loadBreed();
    });

    expect(mockCatBreedService.getBreedById).toHaveBeenCalledWith('test-id');
  });
});

