import { CatBreed } from '../entities/CatBreed';
import { ICatBreedRepository } from '../ports/repositories/ICatBreedRepository';

/**
 * Use case: Get all cat breeds.
 * Contains the application logic for this use case.
 */
export class GetAllCatBreedsUseCase {
  constructor(private catBreedRepository: ICatBreedRepository) {}

  async execute(): Promise<CatBreed[]> {
    // Business logic could be added here such as:
    // - Validations
    // - Caching
    // - Additional filtering
    // - Transformations
    return await this.catBreedRepository.getAllBreeds();
  }
}

