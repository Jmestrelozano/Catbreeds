import { DependencyContainer } from '../../../src/infrastructure/dependencies/DependencyContainer';
import { CatBreedService } from '../../../src/application/CatBreedService';
import { FavoritesService } from '../../../src/application/FavoritesService';

jest.mock('../../../src/infrastructure/api/CatApiClient');
jest.mock('../../../src/infrastructure/repositories/CatBreedRepository');
jest.mock('../../../src/infrastructure/repositories/FavoritesRepository');
jest.mock('../../../src/application/CatBreedService');
jest.mock('../../../src/application/FavoritesService');

describe('DependencyContainer', () => {
  beforeEach(() => {
    DependencyContainer.reset();
  });

  describe('getCatBreedService', () => {
    it('should return a CatBreedService instance', () => {
      const service = DependencyContainer.getCatBreedService();

      expect(service).toBeInstanceOf(CatBreedService);
    });

    it('should return the same instance on consecutive calls (singleton)', () => {
      const service1 = DependencyContainer.getCatBreedService();
      const service2 = DependencyContainer.getCatBreedService();

      expect(service1).toBe(service2);
    });
  });

  describe('getFavoritesService', () => {
    it('should return a FavoritesService instance', () => {
      const service = DependencyContainer.getFavoritesService();

      expect(service).toBeInstanceOf(FavoritesService);
    });

    it('should return the same instance on consecutive calls (singleton)', () => {
      const service1 = DependencyContainer.getFavoritesService();
      const service2 = DependencyContainer.getFavoritesService();

      expect(service1).toBe(service2);
    });
  });

  describe('reset', () => {
    it('should reset all instances', () => {
      const service1 = DependencyContainer.getCatBreedService();
      const favorites1 = DependencyContainer.getFavoritesService();

      DependencyContainer.reset();

      const service2 = DependencyContainer.getCatBreedService();
      const favorites2 = DependencyContainer.getFavoritesService();

      expect(service1).not.toBe(service2);
      expect(favorites1).not.toBe(favorites2);
    });
  });
});

