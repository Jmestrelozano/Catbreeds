import { CatBreed } from '../../../domain/entities/CatBreed';
import { CatBreedDTO } from '../dtos/CatBreedDTO';

/**
 * Mapper that transforms API DTOs to domain entities.
 * Isolates API implementation details from the domain.
 */
export class CatBreedMapper {
  /**
   * Transforms an API DTO to a domain entity.
   */
  static toDomain(dto: CatBreedDTO): CatBreed {
    return {
      id: dto.id,
      name: dto.name,
      description: dto.description,
      temperament: dto.temperament,
      origin: dto.origin,
      lifeSpan: dto.life_span,
      adaptability: dto.adaptability,
      affectionLevel: dto.affection_level,
      childFriendly: dto.child_friendly,
      dogFriendly: dto.dog_friendly,
      energyLevel: dto.energy_level,
      grooming: dto.grooming,
      healthIssues: dto.health_issues,
      intelligence: dto.intelligence,
      sheddingLevel: dto.shedding_level,
      socialNeeds: dto.social_needs,
      strangerFriendly: dto.stranger_friendly,
      vocalisation: dto.vocalisation,
      experimental: dto.experimental,
      hairless: dto.hairless,
      natural: dto.natural,
      rare: dto.rare,
      rex: dto.rex,
      suppressedTail: dto.suppressed_tail,
      shortLegs: dto.short_legs,
      wikipediaUrl: dto.wikipedia_url,
      hypoallergenic: dto.hypoallergenic,
      referenceImageId: dto.reference_image_id,
    };
  }

  /**
   * Transforms multiple DTOs to domain entities.
   */
  static toDomainList(dtos: CatBreedDTO[]): CatBreed[] {
    return dtos.map((dto) => this.toDomain(dto));
  }
}

