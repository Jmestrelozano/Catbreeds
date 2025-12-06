import React, { createContext, useContext, ReactNode } from 'react';
import { CatBreedService } from '../../application/CatBreedService';
import { FavoritesService } from '../../application/FavoritesService';
import { DependencyContainer } from '../../infrastructure/dependencies/DependencyContainer';

interface ServicesContextType {
  catBreedService: CatBreedService;
  favoritesService: FavoritesService;
}

export const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

interface ServicesProviderProps {
  children: ReactNode;
}

/**
 * Services provider that injects dependencies through context.
 * This allows components to depend on abstractions instead of concretions.
 */
export const ServicesProvider: React.FC<ServicesProviderProps> = ({ children }) => {
  const catBreedService = DependencyContainer.getCatBreedService();
  const favoritesService = DependencyContainer.getFavoritesService();

  const value: ServicesContextType = {
    catBreedService,
    favoritesService,
  };

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
};

/**
 * Hook to access services from context.
 * Follows Dependency Inversion Principle (DIP).
 */
export const useServices = (): ServicesContextType => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within ServicesProvider');
  }
  return context;
};

