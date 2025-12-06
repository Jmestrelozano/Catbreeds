import { CatBreed } from '../entities/CatBreed';
import { ICatBreedRepository } from '../ports/repositories/ICatBreedRepository';

/**
 * Use case: Get a cat breed by ID.
 * Contains the application logic for this use case.
 */
export class GetCatBreedByIdUseCase {
  constructor(private catBreedRepository: ICatBreedRepository) {}

  async execute(id: string): Promise<CatBreed | null> {
    if (!id || id.trim() === '') {
      throw new Error('Breed ID is required');
    }
    
    return await this.catBreedRepository.getBreedById(id);
  }
}

