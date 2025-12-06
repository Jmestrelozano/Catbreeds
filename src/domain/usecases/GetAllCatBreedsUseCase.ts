import { CatBreed } from '../entities/CatBreed';
import { ICatBreedRepository } from '../ports/repositories/ICatBreedRepository';

/**
 * Caso de uso: Obtener todas las razas de gatos.
 * Contiene la lógica de aplicación para este caso de uso.
 */
export class GetAllCatBreedsUseCase {
  constructor(private catBreedRepository: ICatBreedRepository) {}

  async execute(): Promise<CatBreed[]> {
    // Aquí se podría añadir lógica de negocio como:
    // - Validaciones
    // - Caché
    // - Filtrado adicional
    // - Transformaciones
    return await this.catBreedRepository.getAllBreeds();
  }
}

