import { CatBreed } from '../../domain/entities/CatBreed';
import { ICatBreedRepository } from '../../domain/ports/repositories/ICatBreedRepository';
import { CatApiClient } from '../api/CatApiClient';
import { CatBreedDTO } from '../api/dtos/CatBreedDTO';
import { CatBreedMapper } from '../api/mappers/CatBreedMapper';

/**
 * Implementación del repositorio de razas de gatos.
 * Adaptador que implementa el puerto definido por el dominio.
 * Utiliza el cliente de API y mappers para transformar DTOs a entidades.
 */
export class CatBreedRepository implements ICatBreedRepository {
  private apiClient: CatApiClient;

  constructor(apiClient?: CatApiClient) {
    // Inyección de dependencias: permite inyectar un mock para testing
    this.apiClient = apiClient || new CatApiClient();
  }

  async getAllBreeds(): Promise<CatBreed[]> {
    const dtos = await this.apiClient.get<CatBreedDTO[]>('/breeds');
    return CatBreedMapper.toDomainList(dtos);
  }

  async getBreedById(id: string): Promise<CatBreed | null> {
    try {
      const dtos = await this.apiClient.get<CatBreedDTO[]>('/breeds');
      const dto = dtos.find((b) => b.id === id);
      if (!dto) {
        return null;
      }
      return CatBreedMapper.toDomain(dto);
    } catch {
      return null;
    }
  }
}
