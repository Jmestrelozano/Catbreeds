import { CatBreed } from '../../entities/CatBreed';

/**
 * Port (interface) defined by the domain.
 * Defines the contract that repository adapters must fulfill.
 */
export interface IFavoritesRepository {
  getFavorites(): Promise<CatBreed[]>;
  addFavorite(breed: CatBreed): Promise<boolean>;
  removeFavorite(breedId: string): Promise<boolean>;
  isFavorite(breedId: string): Promise<boolean>;
}

