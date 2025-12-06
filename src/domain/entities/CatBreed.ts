/**
 * Entidad del dominio.
 * Representa una raza de gato en el dominio de negocio.
 * Usa convenciones del dominio (camelCase), no de la API.
 */
export interface CatBreed {
  id: string;
  name: string;
  description: string;
  temperament: string;
  origin: string;
  lifeSpan: string;
  adaptability: number;
  affectionLevel: number;
  childFriendly: number;
  dogFriendly: number;
  energyLevel: number;
  grooming: number;
  healthIssues: number;
  intelligence: number;
  sheddingLevel: number;
  socialNeeds: number;
  strangerFriendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressedTail: number;
  shortLegs: number;
  wikipediaUrl: string;
  hypoallergenic: number;
  referenceImageId?: string;
}
