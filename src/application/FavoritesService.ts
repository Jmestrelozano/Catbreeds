import { CatBreed } from '../domain/entities/CatBreed';
import { GetAllFavoritesUseCase } from '../domain/usecases/GetAllFavoritesUseCase';
import { AddFavoriteUseCase } from '../domain/usecases/AddFavoriteUseCase';
import { RemoveFavoriteUseCase } from '../domain/usecases/RemoveFavoriteUseCase';
import { IsFavoriteUseCase } from '../domain/usecases/IsFavoriteUseCase';
import { IFavoritesRepository } from '../domain/ports/repositories/IFavoritesRepository';

/**
 * Servicio de aplicación para favoritos.
 * Orquesta casos de uso y puede contener lógica de aplicación que involucra múltiples casos de uso.
 * 
 * NOTA: En una arquitectura hexagonal estricta, la presentación podría usar
 * directamente los casos de uso. Este servicio añade una capa de orquestación
 * que puede ser útil para operaciones complejas que involucran múltiples casos de uso.
 */
export class FavoritesService {
  private getAllFavoritesUseCase: GetAllFavoritesUseCase;
  private addFavoriteUseCase: AddFavoriteUseCase;
  private removeFavoriteUseCase: RemoveFavoriteUseCase;
  private isFavoriteUseCase: IsFavoriteUseCase;

  constructor(favoritesRepository: IFavoritesRepository) {
    this.getAllFavoritesUseCase = new GetAllFavoritesUseCase(favoritesRepository);
    this.addFavoriteUseCase = new AddFavoriteUseCase(favoritesRepository);
    this.removeFavoriteUseCase = new RemoveFavoriteUseCase(favoritesRepository);
    this.isFavoriteUseCase = new IsFavoriteUseCase(favoritesRepository);
  }

  async getFavorites(): Promise<CatBreed[]> {
    return await this.getAllFavoritesUseCase.execute();
  }

  async addFavorite(breed: CatBreed): Promise<boolean> {
    return await this.addFavoriteUseCase.execute(breed);
  }

  async removeFavorite(breedId: string): Promise<boolean> {
    return await this.removeFavoriteUseCase.execute(breedId);
  }

  async isFavorite(breedId: string): Promise<boolean> {
    return await this.isFavoriteUseCase.execute(breedId);
  }
}
