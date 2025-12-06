import { renderHook, act } from '@testing-library/react-native';
import { useBreedFilter } from '../../../src/presentation/hooks/useBreedFilter';
import { CatBreed } from '../../../src/domain/entities/CatBreed';

const mockBreed1: CatBreed = {
  id: 'test-id-1',
  name: 'Persian',
  description: 'Persian cat description',
  temperament: 'Calm',
  origin: 'Iran',
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
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Persian',
  hypoallergenic: 0,
  referenceImageId: 'test-image-id-1',
};

const mockBreed2: CatBreed = {
  id: 'test-id-2',
  name: 'Siamese',
  description: 'Siamese cat description',
  temperament: 'Active',
  origin: 'Thailand',
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
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Siamese',
  hypoallergenic: 0,
  referenceImageId: 'test-image-id-2',
};

describe('useBreedFilter', () => {
  it('should return all breeds when there are no filters', () => {
    const breeds = [mockBreed1, mockBreed2];
    const { result } = renderHook(() => useBreedFilter(breeds));

    expect(result.current.filteredBreeds).toEqual(breeds);
    expect(result.current.searchQuery).toBe('');
    expect(result.current.selectedOrigin).toBeNull();
  });

  it('should filter by name', () => {
    const breeds = [mockBreed1, mockBreed2];
    const { result } = renderHook(() => useBreedFilter(breeds));

    act(() => {
      result.current.setSearchQuery('Persian');
    });

    expect(result.current.filteredBreeds).toEqual([mockBreed1]);
  });

  it('should filter by origin', () => {
    const breeds = [mockBreed1, mockBreed2];
    const { result } = renderHook(() => useBreedFilter(breeds));

    act(() => {
      result.current.setSearchQuery('Iran');
    });

    expect(result.current.filteredBreeds).toEqual([mockBreed1]);
  });

  it('should filter by description when includeDescriptionInSearch is true', () => {
    const breeds = [mockBreed1, mockBreed2];
    const { result } = renderHook(() =>
      useBreedFilter(breeds, { includeDescriptionInSearch: true }),
    );

    act(() => {
      result.current.setSearchQuery('Persian cat');
    });

    expect(result.current.filteredBreeds).toEqual([mockBreed1]);
  });

  it('should not filter by description when includeDescriptionInSearch is false', () => {
    const breeds = [mockBreed1, mockBreed2];
    const { result } = renderHook(() =>
      useBreedFilter(breeds, { includeDescriptionInSearch: false }),
    );

    act(() => {
      result.current.setSearchQuery('description');
    });

    expect(result.current.filteredBreeds).toEqual([]);
  });

  it('should filter by selected origin', () => {
    const breeds = [mockBreed1, mockBreed2];
    const { result } = renderHook(() => useBreedFilter(breeds));

    act(() => {
      result.current.setSelectedOrigin('Iran');
    });

    expect(result.current.filteredBreeds).toEqual([mockBreed1]);
  });

  it('should combine search and origin filters', () => {
    const breeds = [mockBreed1, mockBreed2];
    const { result } = renderHook(() => useBreedFilter(breeds));

    act(() => {
      result.current.setSearchQuery('Persian');
      result.current.setSelectedOrigin('Iran');
    });

    expect(result.current.filteredBreeds).toEqual([mockBreed1]);
  });

  it('should return unique and sorted origins', () => {
    const breeds = [
      mockBreed1,
      mockBreed2,
      { ...mockBreed1, id: 'test-id-3', origin: 'Iran' },
    ];
    const { result } = renderHook(() => useBreedFilter(breeds));

    expect(result.current.origins).toEqual(['Iran', 'Thailand']);
  });

  it('should allow removing origin filter', () => {
    const breeds = [mockBreed1, mockBreed2];
    const { result } = renderHook(() => useBreedFilter(breeds));

    act(() => {
      result.current.setSelectedOrigin('Iran');
    });

    expect(result.current.selectedOrigin).toBe('Iran');

    act(() => {
      result.current.setSelectedOrigin(null);
    });

    expect(result.current.selectedOrigin).toBeNull();
    expect(result.current.filteredBreeds).toEqual(breeds);
  });

  it('should be case-insensitive in search', () => {
    const breeds = [mockBreed1, mockBreed2];
    const { result } = renderHook(() => useBreedFilter(breeds));

    act(() => {
      result.current.setSearchQuery('persian');
    });

    expect(result.current.filteredBreeds).toEqual([mockBreed1]);
  });
});

