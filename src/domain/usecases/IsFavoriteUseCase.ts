import { IFavoritesRepository } from '../ports/repositories/IFavoritesRepository';

/**
 * Use case: Check if a cat breed is in favorites.
 * Contains the application logic for this use case.
 */
export class IsFavoriteUseCase {
  constructor(private favoritesRepository: IFavoritesRepository) {}

  async execute(breedId: string): Promise<boolean> {
    if (!breedId || breedId.trim() === '') {
      return false;
    }
    
    return await this.favoritesRepository.isFavorite(breedId);
  }
}

