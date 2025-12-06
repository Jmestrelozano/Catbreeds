import { RemoveFavoriteUseCase } from '../../../src/domain/usecases/RemoveFavoriteUseCase';
import { IFavoritesRepository } from '../../../src/domain/ports/repositories/IFavoritesRepository';

describe('RemoveFavoriteUseCase', () => {
  let useCase: RemoveFavoriteUseCase;
  let mockRepository: jest.Mocked<IFavoritesRepository>;

  beforeEach(() => {
    mockRepository = {
      getFavorites: jest.fn(),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn(),
    } as any;

    useCase = new RemoveFavoriteUseCase(mockRepository);
  });

  it('should remove a favorite from repository', async () => {
    mockRepository.removeFavorite.mockResolvedValue(true);

    const result = await useCase.execute('test-id');

    expect(result).toBe(true);
    expect(mockRepository.removeFavorite).toHaveBeenCalledWith('test-id');
  });

  it('should throw an error when ID is empty', async () => {
    await expect(useCase.execute('')).rejects.toThrow('Breed ID is required');
  });

  it('should throw an error when ID is only spaces', async () => {
    await expect(useCase.execute('   ')).rejects.toThrow('Breed ID is required');
  });
});

