import { FavoritesService } from '../../src/application/FavoritesService';
import { IFavoritesRepository } from '../../src/domain/ports/repositories/IFavoritesRepository';
import { CatBreed } from '../../src/domain/entities/CatBreed';

describe('FavoritesService', () => {
  let mockRepository: jest.Mocked<IFavoritesRepository>;
  let service: FavoritesService;

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
    mockRepository = {
      getFavorites: jest.fn(),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn(),
    } as any;

    service = new FavoritesService(mockRepository);
  });

  describe('getFavorites', () => {
    it('should call the repository and return all favorites', async () => {
      const mockFavorites = [mockBreed];
      mockRepository.getFavorites.mockResolvedValue(mockFavorites);

      const result = await service.getFavorites();

      expect(result).toEqual(mockFavorites);
      expect(mockRepository.getFavorites).toHaveBeenCalledTimes(1);
    });
  });

  describe('addFavorite', () => {
    it('should call the use case and add a favorite', async () => {
      mockRepository.isFavorite.mockResolvedValue(false);
      mockRepository.addFavorite.mockResolvedValue(true);

      const result = await service.addFavorite(mockBreed);

      expect(result).toBe(true);
      expect(mockRepository.isFavorite).toHaveBeenCalledWith(mockBreed.id);
      expect(mockRepository.addFavorite).toHaveBeenCalledWith(mockBreed);
    });

    it('should return false when favorite already exists', async () => {
      mockRepository.isFavorite.mockResolvedValue(true);

      const result = await service.addFavorite(mockBreed);

      expect(result).toBe(false);
      expect(mockRepository.addFavorite).not.toHaveBeenCalled();
    });
  });

  describe('removeFavorite', () => {
    it('should call the repository and remove a favorite', async () => {
      mockRepository.removeFavorite.mockResolvedValue(true);

      const result = await service.removeFavorite('test-id');

      expect(result).toBe(true);
      expect(mockRepository.removeFavorite).toHaveBeenCalledWith('test-id');
    });
  });

  describe('isFavorite', () => {
    it('should call the repository and check if it is favorite', async () => {
      mockRepository.isFavorite.mockResolvedValue(true);

      const result = await service.isFavorite('test-id');

      expect(result).toBe(true);
      expect(mockRepository.isFavorite).toHaveBeenCalledWith('test-id');
    });

    it('should return false when it is not favorite', async () => {
      mockRepository.isFavorite.mockResolvedValue(false);

      const result = await service.isFavorite('test-id');

      expect(result).toBe(false);
    });
  });
});

