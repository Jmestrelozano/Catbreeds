import { AddFavoriteUseCase } from '../../../src/domain/usecases/AddFavoriteUseCase';
import { IFavoritesRepository } from '../../../src/domain/ports/repositories/IFavoritesRepository';
import { CatBreed } from '../../../src/domain/entities/CatBreed';

describe('AddFavoriteUseCase', () => {
  let useCase: AddFavoriteUseCase;
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

    useCase = new AddFavoriteUseCase(mockRepository);
  });

  it('should add a favorite when it does not exist', async () => {
    mockRepository.isFavorite.mockResolvedValue(false);
    mockRepository.addFavorite.mockResolvedValue(true);

    const result = await useCase.execute(mockBreed);

    expect(result).toBe(true);
    expect(mockRepository.isFavorite).toHaveBeenCalledWith('test-id');
    expect(mockRepository.addFavorite).toHaveBeenCalledWith(mockBreed);
  });

  it('should return false when favorite already exists', async () => {
    mockRepository.isFavorite.mockResolvedValue(true);

    const result = await useCase.execute(mockBreed);

    expect(result).toBe(false);
    expect(mockRepository.isFavorite).toHaveBeenCalledWith('test-id');
    expect(mockRepository.addFavorite).not.toHaveBeenCalled();
  });

  it('should throw an error when breed is null', async () => {
    await expect(useCase.execute(null as any)).rejects.toThrow(
      'Breed is required and must have an ID',
    );
  });

  it('should throw an error when breed does not have ID', async () => {
    const breedWithoutId = { ...mockBreed, id: '' };
    await expect(useCase.execute(breedWithoutId)).rejects.toThrow(
      'Breed is required and must have an ID',
    );
  });
});

