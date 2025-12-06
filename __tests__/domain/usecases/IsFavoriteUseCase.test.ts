import { IsFavoriteUseCase } from '../../../src/domain/usecases/IsFavoriteUseCase';
import { IFavoritesRepository } from '../../../src/domain/ports/repositories/IFavoritesRepository';

describe('IsFavoriteUseCase', () => {
  let useCase: IsFavoriteUseCase;
  let mockRepository: jest.Mocked<IFavoritesRepository>;

  beforeEach(() => {
    mockRepository = {
      getFavorites: jest.fn(),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn(),
    } as any;

    useCase = new IsFavoriteUseCase(mockRepository);
  });

  it('should return true when it is favorite', async () => {
    mockRepository.isFavorite.mockResolvedValue(true);

    const result = await useCase.execute('test-id');

    expect(result).toBe(true);
    expect(mockRepository.isFavorite).toHaveBeenCalledWith('test-id');
  });

  it('should return false when it is not favorite', async () => {
    mockRepository.isFavorite.mockResolvedValue(false);

    const result = await useCase.execute('test-id');

    expect(result).toBe(false);
    expect(mockRepository.isFavorite).toHaveBeenCalledWith('test-id');
  });

  it('should return false when ID is empty', async () => {
    const result = await useCase.execute('');

    expect(result).toBe(false);
    expect(mockRepository.isFavorite).not.toHaveBeenCalled();
  });

  it('should return false when ID is only spaces', async () => {
    const result = await useCase.execute('   ');

    expect(result).toBe(false);
    expect(mockRepository.isFavorite).not.toHaveBeenCalled();
  });
});

