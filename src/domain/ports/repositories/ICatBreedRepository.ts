import { CatBreed } from '../../entities/CatBreed';

/**
 * Port (interface) defined by the domain.
 * Defines the contract that repository adapters must fulfill.
 */
export interface ICatBreedRepository {
  getAllBreeds(): Promise<CatBreed[]>;
  getBreedById(id: string): Promise<CatBreed | null>;
}

