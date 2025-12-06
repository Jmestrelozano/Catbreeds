import { CatBreed } from '../../entities/CatBreed';

/**
 * Puerto (interfaz) definido por el dominio.
 * Define el contrato que deben cumplir los adaptadores de repositorio.
 */
export interface ICatBreedRepository {
  getAllBreeds(): Promise<CatBreed[]>;
  getBreedById(id: string): Promise<CatBreed | null>;
}

