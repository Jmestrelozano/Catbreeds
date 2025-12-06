import { useState, useCallback } from 'react';
import { CatBreed } from '../../domain/entities/CatBreed';
import { useServices } from '../context/ServicesContext';

/**
 * Custom hook to manage cat breed detail logic.
 * Separates business logic from presentation (SRP).
 */
export const useCatBreedDetail = (breedId: string) => {
  const { catBreedService } = useServices();
  const [breed, setBreed] = useState<CatBreed | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadBreed = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await catBreedService.getBreedById(breedId);
      if (data) {
        setBreed(data);
      } else {
        setError('Cat breed not found');
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error loading breed details',
      );
    } finally {
      setLoading(false);
    }
  }, [catBreedService, breedId]);

  return {
    breed,
    loading,
    error,
    loadBreed,
  };
};

