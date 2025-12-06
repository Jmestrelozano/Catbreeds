import { GetAllFavoritesUseCase } from '../../../src/domain/usecases/GetAllFavoritesUseCase';
import { IFavoritesRepository } from '../../../src/domain/ports/repositories/IFavoritesRepository';
import { CatBreed } from '../../../src/domain/entities/CatBreed';

describe('GetAllFavoritesUseCase', () => {
  let useCase: GetAllFavoritesUseCase;
  let mockRepository: jest.Mocked<IFavoritesRepository>;

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

    useCase = new GetAllFavoritesUseCase(mockRepository);
  });

  it('should get all favorites from repository', async () => {
    const mockFavorites = [mockBreed];
    mockRepository.getFavorites.mockResolvedValue(mockFavorites);

    const result = await useCase.execute();

    expect(result).toEqual(mockFavorites);
    expect(mockRepository.getFavorites).toHaveBeenCalledTimes(1);
  });

  it('should return an empty array when there are no favorites', async () => {
    mockRepository.getFavorites.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(mockRepository.getFavorites).toHaveBeenCalledTimes(1);
  });
});

