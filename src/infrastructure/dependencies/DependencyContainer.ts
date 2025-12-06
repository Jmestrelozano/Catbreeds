import { ICatBreedRepository } from '../../domain/ports/repositories/ICatBreedRepository';
import { IFavoritesRepository } from '../../domain/ports/repositories/IFavoritesRepository';
import { CatBreedRepository } from '../repositories/CatBreedRepository';
import { FavoritesRepository } from '../repositories/FavoritesRepository';
import { CatBreedService } from '../../application/CatBreedService';
import { FavoritesService } from '../../application/FavoritesService';
import { CatApiClient } from '../api/CatApiClient';

/**
 * Contenedor de dependencias para arquitectura hexagonal.
 * Centraliza la creación e inyección de dependencias.
 * 
 * NOTA: Usa Singleton para simplificar, pero en producción considerar
 * un contenedor de DI más robusto como tsyringe o InversifyJS.
 */
export class DependencyContainer {
  private static catBreedRepository: ICatBreedRepository | null = null;
  private static favoritesRepository: IFavoritesRepository | null = null;
  private static catBreedService: CatBreedService | null = null;
  private static favoritesService: FavoritesService | null = null;
  private static apiClient: CatApiClient | null = null;

  /**
   * Obtiene la instancia del cliente de API.
   * Singleton para evitar múltiples instancias.
   */
  private static getApiClient(): CatApiClient {
    if (!this.apiClient) {
      this.apiClient = new CatApiClient();
    }
    return this.apiClient;
  }

  /**
   * Obtiene la instancia del repositorio de razas de gatos.
   * Implementa patrón Singleton para evitar múltiples instancias.
   * Inyecta el cliente de API como dependencia.
   */
  static getCatBreedRepository(): ICatBreedRepository {
    if (!this.catBreedRepository) {
      const apiClient = this.getApiClient();
      this.catBreedRepository = new CatBreedRepository(apiClient);
    }
    return this.catBreedRepository;
  }

  /**
   * Obtiene la instancia del repositorio de favoritos.
   * Implementa patrón Singleton para evitar múltiples instancias.
   */
  static getFavoritesRepository(): IFavoritesRepository {
    if (!this.favoritesRepository) {
      this.favoritesRepository = new FavoritesRepository();
    }
    return this.favoritesRepository;
  }

  /**
   * Obtiene la instancia del servicio de razas de gatos.
   * Inyecta las dependencias necesarias.
   */
  static getCatBreedService(): CatBreedService {
    if (!this.catBreedService) {
      const repository = this.getCatBreedRepository();
      this.catBreedService = new CatBreedService(repository);
    }
    return this.catBreedService;
  }

  /**
   * Obtiene la instancia del servicio de favoritos.
   * Inyecta las dependencias necesarias.
   */
  static getFavoritesService(): FavoritesService {
    if (!this.favoritesService) {
      const repository = this.getFavoritesRepository();
      this.favoritesService = new FavoritesService(repository);
    }
    return this.favoritesService;
  }

  /**
   * Resetea todas las instancias (útil para testing).
   */
  static reset(): void {
    this.catBreedRepository = null;
    this.favoritesRepository = null;
    this.catBreedService = null;
    this.favoritesService = null;
    this.apiClient = null;
  }
}
