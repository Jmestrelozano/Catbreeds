import { GetCatBreedByIdUseCase } from '../../../src/domain/usecases/GetCatBreedByIdUseCase';
import { ICatBreedRepository } from '../../../src/domain/ports/repositories/ICatBreedRepository';
import { CatBreed } from '../../../src/domain/entities/CatBreed';

describe('GetCatBreedByIdUseCase', () => {
  let useCase: GetCatBreedByIdUseCase;
  let mockRepository: jest.Mocked<ICatBreedRepository>;

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

    useCase = new GetCatBreedByIdUseCase(mockRepository);
  });

  it('should get a breed by ID from repository', async () => {
    mockRepository.getBreedById.mockResolvedValue(mockBreed);

    const result = await useCase.execute('test-id');

    expect(result).toEqual(mockBreed);
    expect(mockRepository.getBreedById).toHaveBeenCalledWith('test-id');
  });

  it('should return null when breed does not exist', async () => {
    mockRepository.getBreedById.mockResolvedValue(null);

    const result = await useCase.execute('non-existent-id');

    expect(result).toBeNull();
  });

  it('should throw an error when ID is empty', async () => {
    await expect(useCase.execute('')).rejects.toThrow('Breed ID is required');
  });

  it('should throw an error when ID is only spaces', async () => {
    await expect(useCase.execute('   ')).rejects.toThrow('Breed ID is required');
  });
});

