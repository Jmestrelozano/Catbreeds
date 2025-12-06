import { CatBreedRepository } from '../../../src/infrastructure/repositories/CatBreedRepository';
import { CatApiClient } from '../../../src/infrastructure/api/CatApiClient';
import { CatBreedDTO } from '../../../src/infrastructure/api/dtos/CatBreedDTO';
import { CatBreed } from '../../../src/domain/entities/CatBreed';

jest.mock('../../../src/infrastructure/api/CatApiClient');
jest.mock('../../../src/infrastructure/api/mappers/CatBreedMapper');

describe('CatBreedRepository', () => {
  let repository: CatBreedRepository;
  let mockApiClient: jest.Mocked<CatApiClient>;

  const mockDTO: CatBreedDTO = {
    id: 'test-id',
    name: 'Test Breed',
    description: 'Test description',
    temperament: 'Active',
    origin: 'United States',
    life_span: '12 - 15 years',
    adaptability: 5,
    affection_level: 4,
    child_friendly: 3,
    dog_friendly: 2,
    energy_level: 4,
    grooming: 3,
    health_issues: 2,
    intelligence: 5,
    shedding_level: 3,
    social_needs: 4,
    stranger_friendly: 3,
    vocalisation: 2,
    experimental: 0,
    hairless: 0,
    natural: 1,
    rare: 0,
    rex: 0,
    suppressed_tail: 0,
    short_legs: 0,
    wikipedia_url: 'https://en.wikipedia.org/wiki/Test_Breed',
    hypoallergenic: 0,
    reference_image_id: 'test-image-id',
  };

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
    mockApiClient = {
      get: jest.fn(),
    } as any;

    repository = new CatBreedRepository(mockApiClient);
  });

  describe('getAllBreeds', () => {
    it('should get all breeds and transform them to domain entities', async () => {
      const { CatBreedMapper } = require('../../../src/infrastructure/api/mappers/CatBreedMapper');
      const mockDTOs = [mockDTO];
      mockApiClient.get.mockResolvedValue(mockDTOs);
      CatBreedMapper.toDomainList = jest.fn().mockReturnValue([mockBreed]);

      const result = await repository.getAllBreeds();

      expect(mockApiClient.get).toHaveBeenCalledWith('/breeds');
      expect(CatBreedMapper.toDomainList).toHaveBeenCalledWith(mockDTOs);
      expect(result).toEqual([mockBreed]);
    });
  });

  describe('getBreedById', () => {
    it('should get a breed by ID and transform it to domain entity', async () => {
      const { CatBreedMapper } = require('../../../src/infrastructure/api/mappers/CatBreedMapper');
      const mockDTOs = [mockDTO];
      mockApiClient.get.mockResolvedValue(mockDTOs);
      CatBreedMapper.toDomain = jest.fn().mockReturnValue(mockBreed);

      const result = await repository.getBreedById('test-id');

      expect(mockApiClient.get).toHaveBeenCalledWith('/breeds');
      expect(CatBreedMapper.toDomain).toHaveBeenCalledWith(mockDTO);
      expect(result).toEqual(mockBreed);
    });

    it('should return null when breed does not exist', async () => {
      mockApiClient.get.mockResolvedValue([]);

      const result = await repository.getBreedById('non-existent-id');

      expect(result).toBeNull();
    });

    it('should return null when an error occurs', async () => {
      mockApiClient.get.mockRejectedValue(new Error('API Error'));

      const result = await repository.getBreedById('test-id');

      expect(result).toBeNull();
    });
  });

  describe('constructor', () => {
    it('should create a CatApiClient instance if not provided', () => {
      const newRepository = new CatBreedRepository();
      expect(newRepository).toBeInstanceOf(CatBreedRepository);
    });
  });
});

