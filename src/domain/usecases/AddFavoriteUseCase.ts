import { CatBreed } from '../entities/CatBreed';
import { IFavoritesRepository } from '../ports/repositories/IFavoritesRepository';

/**
 * Caso de uso: Añadir una raza de gato a favoritos.
 * Contiene la lógica de aplicación para este caso de uso.
 */
export class AddFavoriteUseCase {
  constructor(private favoritesRepository: IFavoritesRepository) {}

  async execute(breed: CatBreed): Promise<boolean> {
    // Validación de entrada (validación de datos)
    if (!breed || !breed.id) {
      throw new Error('Breed is required and must have an ID');
    }
    
    // Regla de negocio: no se puede añadir un favorito duplicado
    // Esta validación DEBE estar en el caso de uso, no en el repositorio
    const isFavorite = await this.favoritesRepository.isFavorite(breed.id);
    if (isFavorite) {
      return false; // Ya está en favoritos - regla de negocio aplicada
    }
    
    // El repositorio solo persiste, asume que las validaciones ya se hicieron
    return await this.favoritesRepository.addFavorite(breed);
  }
}

