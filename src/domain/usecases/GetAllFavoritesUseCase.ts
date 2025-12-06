import { CatBreed } from '../entities/CatBreed';
import { IFavoritesRepository } from '../ports/repositories/IFavoritesRepository';

/**
 * Use case: Get all favorite cat breeds.
 * Contains the application logic for this use case.
 */
export class GetAllFavoritesUseCase {
  constructor(private favoritesRepository: IFavoritesRepository) {}

  async execute(): Promise<CatBreed[]> {
    // Business logic could be added here such as:
    // - Sorting
    // - Filtering
    // - Validations
    return await this.favoritesRepository.getFavorites();
  }
}

