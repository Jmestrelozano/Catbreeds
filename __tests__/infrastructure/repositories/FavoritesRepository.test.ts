import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoritesRepository } from '../../../src/infrastructure/repositories/FavoritesRepository';
import { CatBreed } from '../../../src/domain/entities/CatBreed';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('FavoritesRepository', () => {
  let repository: FavoritesRepository;

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

  beforeEach(() => {
    repository = new FavoritesRepository();
    jest.clearAllMocks();
  });

  describe('getFavorites', () => {
    it('should get all favorites from AsyncStorage', async () => {
      const mockFavorites = [mockBreed];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify(mockFavorites),
      );

      const result = await repository.getFavorites();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@catbreeds_favorites');
      expect(result).toEqual(mockFavorites);
    });

    it('should return an empty array when there are no favorites', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await repository.getFavorites();

      expect(result).toEqual([]);
    });

    it('should return an empty array when an error occurs', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('Storage error'));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await repository.getFavorites();

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('addFavorite', () => {
    it('should add a favorite to AsyncStorage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([]));
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      const result = await repository.addFavorite(mockBreed);

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@catbreeds_favorites');
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@catbreeds_favorites',
        JSON.stringify([mockBreed]),
      );
      expect(result).toBe(true);
    });

    it('should add to existing favorites', async () => {
      const existingFavorites = [{ ...mockBreed, id: 'existing-id' }];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify(existingFavorites),
      );
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      const result = await repository.addFavorite(mockBreed);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@catbreeds_favorites',
        JSON.stringify([...existingFavorites, mockBreed]),
      );
      expect(result).toBe(true);
    });

    it('should return false when an error occurs while saving', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([]));
      (AsyncStorage.setItem as jest.Mock).mockRejectedValue(new Error('Storage error'));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await repository.addFavorite(mockBreed);

      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('removeFavorite', () => {
    it('should remove a favorite from AsyncStorage', async () => {
      const favorites = [mockBreed, { ...mockBreed, id: 'other-id' }];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(favorites));
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      const result = await repository.removeFavorite('test-id');

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@catbreeds_favorites',
        JSON.stringify([{ ...mockBreed, id: 'other-id' }]),
      );
      expect(result).toBe(true);
    });

    it('should return false when an error occurs while saving', async () => {
      const favorites = [mockBreed];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(favorites));
      (AsyncStorage.setItem as jest.Mock).mockRejectedValue(new Error('Storage error'));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await repository.removeFavorite('test-id');

      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('isFavorite', () => {
    it('should return true when favorite exists', async () => {
      const favorites = [mockBreed];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(favorites));

      const result = await repository.isFavorite('test-id');

      expect(result).toBe(true);
    });

    it('should return false when favorite does not exist', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([]));

      const result = await repository.isFavorite('test-id');

      expect(result).toBe(false);
    });

    it('should return false when an error occurs', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('Storage error'));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await repository.isFavorite('test-id');

      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});

