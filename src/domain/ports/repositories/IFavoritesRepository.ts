import { CatBreed } from '../../entities/CatBreed';

/**
 * Puerto (interfaz) definido por el dominio.
 * Define el contrato que deben cumplir los adaptadores de repositorio.
 */
export interface IFavoritesRepository {
  getFavorites(): Promise<CatBreed[]>;
  addFavorite(breed: CatBreed): Promise<boolean>;
  removeFavorite(breedId: string): Promise<boolean>;
  isFavorite(breedId: string): Promise<boolean>;
}

