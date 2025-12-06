import { CatBreed } from '../entities/CatBreed';
import { IFavoritesRepository } from '../ports/repositories/IFavoritesRepository';

/**
 * Use case: Add a cat breed to favorites.
 * Contains the application logic for this use case.
 */
export class AddFavoriteUseCase {
  constructor(private favoritesRepository: IFavoritesRepository) {}

  async execute(breed: CatBreed): Promise<boolean> {
    if (!breed || !breed.id) {
      throw new Error('Breed is required and must have an ID');
    }
    
    const isFavorite = await this.favoritesRepository.isFavorite(breed.id);
    if (isFavorite) {
      return false;
    }
    
    return await this.favoritesRepository.addFavorite(breed);
  }
}

