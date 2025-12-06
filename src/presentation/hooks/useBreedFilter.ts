import { useState, useMemo } from 'react';
import { CatBreed } from '../../domain/entities/CatBreed';

interface UseBreedFilterOptions {
  includeDescriptionInSearch?: boolean;
}

/**
 * Custom hook to manage cat breed filtering logic.
 * Separates filtering logic from presentation (SRP).
 */
export const useBreedFilter = (
  breeds: CatBreed[],
  options: UseBreedFilterOptions = {},
) => {
  const { includeDescriptionInSearch = true } = options;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null);

  const filteredBreeds = useMemo(() => {
    let filtered = [...breeds];

    // Filter by origin
    if (selectedOrigin) {
      filtered = filtered.filter(
        (breed) => breed.origin.toLowerCase() === selectedOrigin.toLowerCase(),
      );
    }

    // Filter by search
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter((breed) => {
        const matchesName = breed.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesOrigin = breed.origin
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesDescription = includeDescriptionInSearch
          ? breed.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          : false;

        return matchesName || matchesOrigin || matchesDescription;
      });
    }

    return filtered;
  }, [breeds, searchQuery, selectedOrigin, includeDescriptionInSearch]);

  const origins = useMemo(
    () =>
      Array.from(
        new Set(breeds.map((breed) => breed.origin).filter((o) => o)),
      ).sort(),
    [breeds],
  );

  return {
    searchQuery,
    setSearchQuery,
    selectedOrigin,
    setSelectedOrigin,
    filteredBreeds,
    origins,
  };
};

