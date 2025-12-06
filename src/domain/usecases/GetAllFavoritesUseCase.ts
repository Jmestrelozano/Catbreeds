import { CatBreed } from '../entities/CatBreed';
import { IFavoritesRepository } from '../ports/repositories/IFavoritesRepository';

/**
 * Caso de uso: Obtener todas las razas de gatos favoritas.
 * Contiene la lógica de aplicación para este caso de uso.
 */
export class GetAllFavoritesUseCase {
  constructor(private favoritesRepository: IFavoritesRepository) {}

  async execute(): Promise<CatBreed[]> {
    // Aquí se podría añadir lógica de negocio como:
    // - Ordenamiento
    // - Filtrado
    // - Validaciones
    return await this.favoritesRepository.getFavorites();
  }
}

