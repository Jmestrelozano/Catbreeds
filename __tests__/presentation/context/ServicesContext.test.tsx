import React from 'react';
import { render } from '@testing-library/react-native';
import { ServicesProvider, useServices } from '../../../src/presentation/context/ServicesContext';
import { CatBreedService } from '../../../src/application/CatBreedService';
import { FavoritesService } from '../../../src/application/FavoritesService';
import { View, Text } from 'react-native';

jest.mock('../../../src/infrastructure/dependencies/DependencyContainer', () => ({
  DependencyContainer: {
    getCatBreedService: jest.fn(() => ({} as CatBreedService)),
    getFavoritesService: jest.fn(() => ({} as FavoritesService)),
  },
}));

describe('ServicesContext', () => {
  const TestComponent = () => {
    const services = useServices();
    return (
      <View>
        <Text>{services.catBreedService ? 'CatBreedService exists' : 'No CatBreedService'}</Text>
        <Text>{services.favoritesService ? 'FavoritesService exists' : 'No FavoritesService'}</Text>
      </View>
    );
  };

  it('should provide services through context', () => {
    const { getByText } = render(
      <ServicesProvider>
        <TestComponent />
      </ServicesProvider>,
    );

    expect(getByText('CatBreedService exists')).toBeTruthy();
    expect(getByText('FavoritesService exists')).toBeTruthy();
  });

  it('should throw an error when useServices is used outside provider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useServices must be used within ServicesProvider');

    consoleError.mockRestore();
  });
});

