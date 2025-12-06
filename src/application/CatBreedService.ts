import { CatBreed } from '../domain/entities/CatBreed';
import { GetAllCatBreedsUseCase } from '../domain/usecases/GetAllCatBreedsUseCase';
import { GetCatBreedByIdUseCase } from '../domain/usecases/GetCatBreedByIdUseCase';
import { ICatBreedRepository } from '../domain/ports/repositories/ICatBreedRepository';

/**
 * Servicio de aplicación para razas de gatos.
 * Orquesta casos de uso y puede contener lógica de aplicación que involucra múltiples casos de uso.
 * 
 * NOTA: En una arquitectura hexagonal estricta, la presentación podría usar
 * directamente los casos de uso. Este servicio añade una capa de orquestación
 * que puede ser útil para operaciones complejas que involucran múltiples casos de uso.
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
