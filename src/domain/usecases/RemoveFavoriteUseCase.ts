import { IFavoritesRepository } from '../ports/repositories/IFavoritesRepository';

/**
 * Use case: Remove a cat breed from favorites.
 * Contains the application logic for this use case.
 */
export class RemoveFavoriteUseCase {
  constructor(private favoritesRepository: IFavoritesRepository) {}

  async execute(breedId: string): Promise<boolean> {
    if (!breedId || breedId.trim() === '') {
      throw new Error('Breed ID is required');
    }
    
    return await this.favoritesRepository.removeFavorite(breedId);
  }
}

