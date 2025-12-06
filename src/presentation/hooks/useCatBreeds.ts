import { useState, useCallback } from 'react';
import { CatBreed } from '../../domain/entities/CatBreed';
import { useServices } from '../context/ServicesContext';

export const useCatBreeds = () => {
  const { catBreedService } = useServices();
  const [breeds, setBreeds] = useState<CatBreed[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadBreeds = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await catBreedService.getAllBreeds();
      setBreeds(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error loading cat breeds',
      );
    } finally {
      setLoading(false);
    }
  }, [catBreedService]);

  return {
    breeds,
    loading,
    error,
    loadBreeds,
  };
};

