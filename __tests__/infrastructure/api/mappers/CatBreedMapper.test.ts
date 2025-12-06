import { CatBreedMapper } from '../../../../src/infrastructure/api/mappers/CatBreedMapper';
import { CatBreedDTO } from '../../../../src/infrastructure/api/dtos/CatBreedDTO';
import { CatBreed } from '../../../../src/domain/entities/CatBreed';

describe('CatBreedMapper', () => {
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

  const expectedBreed: CatBreed = {
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

  describe('toDomain', () => {
    it('should transform a DTO to a domain entity', () => {
      const result = CatBreedMapper.toDomain(mockDTO);

      expect(result).toEqual(expectedBreed);
    });

    it('should handle DTO without reference_image_id', () => {
      const dtoWithoutImage = { ...mockDTO };
      delete dtoWithoutImage.reference_image_id;

      const result = CatBreedMapper.toDomain(dtoWithoutImage);

      expect(result.referenceImageId).toBeUndefined();
    });
  });

  describe('toDomainList', () => {
    it('should transform multiple DTOs to domain entities', () => {
      const dtos = [mockDTO, { ...mockDTO, id: 'test-id-2', name: 'Test Breed 2' }];
      const result = CatBreedMapper.toDomainList(dtos);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(expectedBreed);
      expect(result[1].id).toBe('test-id-2');
      expect(result[1].name).toBe('Test Breed 2');
    });

    it('should return an empty array when an empty array is passed', () => {
      const result = CatBreedMapper.toDomainList([]);

      expect(result).toEqual([]);
    });
  });
});

