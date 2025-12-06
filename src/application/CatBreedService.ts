import { CatBreed } from '../domain/entities/CatBreed';
import { GetAllCatBreedsUseCase } from '../domain/usecases/GetAllCatBreedsUseCase';
import { GetCatBreedByIdUseCase } from '../domain/usecases/GetCatBreedByIdUseCase';
import { ICatBreedRepository } from '../domain/ports/repositories/ICatBreedRepository';

/**
 * Application service for cat breeds.
 * Orchestrates use cases and may contain application logic involving multiple use cases.
 * 
 * NOTE: In a strict hexagonal architecture, the presentation layer could use
 * use cases directly. This service adds an orchestration layer
 * that can be useful for complex operations involving multiple use cases.
 */
export class CatBreedService {
  private getAllBreedsUseCase: GetAllCatBreedsUseCase;
  private getBreedByIdUseCase: GetCatBreedByIdUseCase;

  constructor(catBreedRepository: ICatBreedRepository) {
    this.getAllBreedsUseCase = new GetAllCatBreedsUseCase(catBreedRepository);
    this.getBreedByIdUseCase = new GetCatBreedByIdUseCase(catBreedRepository);
  }

  async getAllBreeds(): Promise<CatBreed[]> {
    return await this.getAllBreedsUseCase.execute();
  }

  async getBreedById(id: string): Promise<CatBreed | null> {
    return await this.getBreedByIdUseCase.execute(id);
  }
}
