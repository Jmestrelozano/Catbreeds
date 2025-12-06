import AsyncStorage from '@react-native-async-storage/async-storage';
import { CatBreed } from '../../domain/entities/CatBreed';
import { IFavoritesRepository } from '../../domain/ports/repositories/IFavoritesRepository';

const FAVORITES_KEY = '@catbreeds_favorites';

/**
 * Implementación del repositorio de favoritos usando AsyncStorage.
 * Adaptador que implementa el puerto definido por el dominio.
 */
export class FavoritesRepository implements IFavoritesRepository {
  async getFavorites(): Promise<CatBreed[]> {
    try {
      const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
      if (favoritesJson) {
        return JSON.parse(favoritesJson);
      }
      return [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }

  async addFavorite(breed: CatBreed): Promise<boolean> {
    try {
      // El repositorio asume que las validaciones de negocio ya fueron hechas
      // por el caso de uso. Solo se encarga de persistir los datos.
      const favorites = await this.getFavorites();
      favorites.push(breed);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return true;
    } catch (error) {
      console.error('Error adding favorite:', error);
      return false;
    }
  }

  async removeFavorite(breedId: string): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      const filtered = favorites.filter((f) => f.id !== breedId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error removing favorite:', error);
      return false;
    }
  }

  async isFavorite(breedId: string): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites.some((f) => f.id === breedId);
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
  }
}
