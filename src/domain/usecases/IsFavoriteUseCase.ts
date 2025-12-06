import { IFavoritesRepository } from '../ports/repositories/IFavoritesRepository';

/**
 * Caso de uso: Verificar si una raza de gato está en favoritos.
 * Contiene la lógica de aplicación para este caso de uso.
 */
export class IsFavoriteUseCase {
  constructor(private favoritesRepository: IFavoritesRepository) {}

  async execute(breedId: string): Promise<boolean> {
    // Validación de entrada
    if (!breedId || breedId.trim() === '') {
      return false;
    }
    
    return await this.favoritesRepository.isFavorite(breedId);
  }
}

