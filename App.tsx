/**
 * Catbreeds - React Native App
 * Arquitectura Hexagonal
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CatBreedsListScreen } from './src/presentation/screens/CatBreedsListScreen';
import { CatBreedDetailScreen } from './src/presentation/screens/CatBreedDetailScreen';
import { FavoritesScreen } from './src/presentation/screens/FavoritesScreen';
import { ServicesProvider } from './src/presentation/context/ServicesContext';

export type RootStackParamList = {
  CatBreedsList: undefined;
  CatBreedDetail: { breedId: string };
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <ServicesProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="#FFFFFF"
        />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="CatBreedsList"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#FFFFFF',
              },
              headerTintColor: '#333',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
            <Stack.Screen
              name="CatBreedsList"
              component={CatBreedsListScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CatBreedDetail"
              component={CatBreedDetailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Favorites"
              component={FavoritesScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ServicesProvider>
    </SafeAreaProvider>
  );
}

export default App;
