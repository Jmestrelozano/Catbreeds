import { IFavoritesRepository } from '../ports/repositories/IFavoritesRepository';

/**
 * Caso de uso: Eliminar una raza de gato de favoritos.
 * Contiene la lógica de aplicación para este caso de uso.
 */
export class RemoveFavoriteUseCase {
  constructor(private favoritesRepository: IFavoritesRepository) {}

  async execute(breedId: string): Promise<boolean> {
    // Validación de entrada
    if (!breedId || breedId.trim() === '') {
      throw new Error('Breed ID is required');
    }
    
    return await this.favoritesRepository.removeFavorite(breedId);
  }
}

