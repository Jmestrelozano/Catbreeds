import { GetAllCatBreedsUseCase } from '../../../src/domain/usecases/GetAllCatBreedsUseCase';
import { ICatBreedRepository } from '../../../src/domain/ports/repositories/ICatBreedRepository';
import { CatBreed } from '../../../src/domain/entities/CatBreed';

describe('GetAllCatBreedsUseCase', () => {
  let useCase: GetAllCatBreedsUseCase;
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

    useCase = new GetAllCatBreedsUseCase(mockRepository);
  });

  it('should get all breeds from repository', async () => {
    const mockBreeds = [mockBreed];
    mockRepository.getAllBreeds.mockResolvedValue(mockBreeds);

    const result = await useCase.execute();

    expect(result).toEqual(mockBreeds);
    expect(mockRepository.getAllBreeds).toHaveBeenCalledTimes(1);
  });

  it('should return an empty array when there are no breeds', async () => {
    mockRepository.getAllBreeds.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(mockRepository.getAllBreeds).toHaveBeenCalledTimes(1);
  });
});

