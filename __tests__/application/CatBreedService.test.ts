import { CatBreedService } from '../../src/application/CatBreedService';
import { ICatBreedRepository } from '../../src/domain/ports/repositories/ICatBreedRepository';
import { CatBreed } from '../../src/domain/entities/CatBreed';

describe('CatBreedService', () => {
  let mockRepository: jest.Mocked<ICatBreedRepository>;
  let service: CatBreedService;

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
      getAllBreeds: jest.fn(),
      getBreedById: jest.fn(),
    } as any;

    service = new CatBreedService(mockRepository);
  });

  describe('getAllBreeds', () => {
    it('should call the use case and return all breeds', async () => {
      const mockBreeds = [mockBreed];
      mockRepository.getAllBreeds.mockResolvedValue(mockBreeds);

      const result = await service.getAllBreeds();

      expect(result).toEqual(mockBreeds);
      expect(mockRepository.getAllBreeds).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when there are no breeds', async () => {
      mockRepository.getAllBreeds.mockResolvedValue([]);

      const result = await service.getAllBreeds();

      expect(result).toEqual([]);
    });
  });

  describe('getBreedById', () => {
    it('should call the use case and return a breed by ID', async () => {
      mockRepository.getBreedById.mockResolvedValue(mockBreed);

      const result = await service.getBreedById('test-id');

      expect(result).toEqual(mockBreed);
      expect(mockRepository.getBreedById).toHaveBeenCalledWith('test-id');
    });

    it('should return null when breed does not exist', async () => {
      mockRepository.getBreedById.mockResolvedValue(null);

      const result = await service.getBreedById('non-existent-id');

      expect(result).toBeNull();
    });
  });
});

