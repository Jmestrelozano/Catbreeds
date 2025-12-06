import { useState, useCallback, useEffect } from 'react';
import { useServices } from '../context/ServicesContext';
import { CatBreed } from '../../domain/entities/CatBreed';

/**
 * Custom hook to manage favorite state of a breed.
 * Separates business logic from presentation (SRP).
 */
export const useFavoriteToggle = (breedId: string | null) => {
  const { favoritesService } = useServices();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const checkFavorite = useCallback(async () => {
    if (breedId) {
      const favorite = await favoritesService.isFavorite(breedId);
      setIsFavorite(favorite);
    }
  }, [favoritesService, breedId]);

  useEffect(() => {
    if (breedId) {
      checkFavorite();
    }
  }, [breedId, checkFavorite]);

  const toggleFavorite = useCallback(
    async (breed: CatBreed) => {
      if (isFavorite) {
        await favoritesService.removeFavorite(breed.id);
        setIsFavorite(false);
      } else {
        await favoritesService.addFavorite(breed);
        setIsFavorite(true);
      }
    },
    [favoritesService, isFavorite],
  );

  return {
    isFavorite,
    checkFavorite,
    toggleFavorite,
  };
};

