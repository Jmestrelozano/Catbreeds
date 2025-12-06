import { useState, useCallback } from 'react';
import { CatBreed } from '../../domain/entities/CatBreed';
import { useServices } from '../context/ServicesContext';

export const useFavorites = () => {
  const { favoritesService } = useServices();
  const [favorites, setFavorites] = useState<CatBreed[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const data = await favoritesService.getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [favoritesService]);

  const addFavorite = useCallback(
    async (breed: CatBreed): Promise<boolean> => {
      const success = await favoritesService.addFavorite(breed);
      if (success) {
        await loadFavorites();
      }
      return success;
    },
    [favoritesService, loadFavorites],
  );

  const removeFavorite = useCallback(
    async (breedId: string): Promise<boolean> => {
      const success = await favoritesService.removeFavorite(breedId);
      if (success) {
        await loadFavorites();
      }
      return success;
    },
    [favoritesService, loadFavorites],
  );

  const isFavorite = useCallback(
    async (breedId: string): Promise<boolean> => {
      return await favoritesService.isFavorite(breedId);
    },
    [favoritesService],
  );

  const refreshFavorites = useCallback(() => {
    setRefreshing(true);
    loadFavorites();
  }, [loadFavorites]);

  return {
    favorites,
    loading,
    refreshing,
    loadFavorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    refreshFavorites,
  };
};

