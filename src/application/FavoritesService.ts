import { CatBreed } from '../domain/entities/CatBreed';
import { GetAllFavoritesUseCase } from '../domain/usecases/GetAllFavoritesUseCase';
import { AddFavoriteUseCase } from '../domain/usecases/AddFavoriteUseCase';
import { RemoveFavoriteUseCase } from '../domain/usecases/RemoveFavoriteUseCase';
import { IsFavoriteUseCase } from '../domain/usecases/IsFavoriteUseCase';
import { IFavoritesRepository } from '../domain/ports/repositories/IFavoritesRepository';

/**
 * Application service for favorites.
 * Orchestrates use cases and may contain application logic involving multiple use cases.
 * 
 * NOTE: In a strict hexagonal architecture, the presentation layer could use
 * use cases directly. This service adds an orchestration layer
 * that can be useful for complex operations involving multiple use cases.
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
