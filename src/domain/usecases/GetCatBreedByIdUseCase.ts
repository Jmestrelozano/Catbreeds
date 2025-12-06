import { CatBreed } from '../entities/CatBreed';
import { ICatBreedRepository } from '../ports/repositories/ICatBreedRepository';

/**
 * Caso de uso: Obtener una raza de gato por ID.
 * Contiene la lógica de aplicación para este caso de uso.
 */
export class GetCatBreedByIdUseCase {
  constructor(private catBreedRepository: ICatBreedRepository) {}

  async execute(id: string): Promise<CatBreed | null> {
    // Validación de entrada
    if (!id || id.trim() === '') {
      throw new Error('Breed ID is required');
    }
    
    return await this.catBreedRepository.getBreedById(id);
  }
}

