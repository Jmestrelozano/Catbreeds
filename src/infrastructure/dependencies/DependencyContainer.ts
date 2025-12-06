import { ICatBreedRepository } from '../../domain/ports/repositories/ICatBreedRepository';
import { IFavoritesRepository } from '../../domain/ports/repositories/IFavoritesRepository';
import { CatBreedRepository } from '../repositories/CatBreedRepository';
import { FavoritesRepository } from '../repositories/FavoritesRepository';
import { CatBreedService } from '../../application/CatBreedService';
import { FavoritesService } from '../../application/FavoritesService';
import { CatApiClient } from '../api/CatApiClient';

/**
 * Dependency container for hexagonal architecture.
 * Centralizes dependency creation and injection.
 *
 */
export class DependencyContainer {
  private static catBreedRepository: ICatBreedRepository | null = null;
  private static favoritesRepository: IFavoritesRepository | null = null;
  private static catBreedService: CatBreedService | null = null;
  private static favoritesService: FavoritesService | null = null;
  private static apiClient: CatApiClient | null = null;

  /**
   * Gets the API client instance.
   * Singleton pattern to avoid multiple instances.
   */
  private static getApiClient(): CatApiClient {
    if (!this.apiClient) {
      this.apiClient = new CatApiClient();
    }
    return this.apiClient;
  }

  /**
   * Gets the cat breed repository instance.
   * Private method: only used internally to build services.
   */
  private static getCatBreedRepository(): ICatBreedRepository {
    if (!this.catBreedRepository) {
      const apiClient = this.getApiClient();
      this.catBreedRepository = new CatBreedRepository(apiClient);
    }
    return this.catBreedRepository;
  }

  /**
   * Gets the favorites repository instance.
   * Private method: only used internally to build services.
   */
  private static getFavoritesRepository(): IFavoritesRepository {
    if (!this.favoritesRepository) {
      this.favoritesRepository = new FavoritesRepository();
    }
    return this.favoritesRepository;
  }

  /**
   * Gets the cat breed service instance.
   */
  static getCatBreedService(): CatBreedService {
    if (!this.catBreedService) {
      const repository = this.getCatBreedRepository();
      this.catBreedService = new CatBreedService(repository);
    }
    return this.catBreedService;
  }

  /**
   * Gets the favorites service instance.
   */
  static getFavoritesService(): FavoritesService {
    if (!this.favoritesService) {
      const repository = this.getFavoritesRepository();
      this.favoritesService = new FavoritesService(repository);
    }
    return this.favoritesService;
  }

  /**
   * Resets all instances (useful for testing).
   */
  static reset(): void {
    this.catBreedRepository = null;
    this.favoritesRepository = null;
    this.catBreedService = null;
    this.favoritesService = null;
    this.apiClient = null;
  }
}
