import React, { useRef } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CatBreedsListScreen } from './src/presentation/screens/CatBreedsListScreen';
import { CatBreedDetailScreen } from './src/presentation/screens/CatBreedDetailScreen';
import { FavoritesScreen } from './src/presentation/screens/FavoritesScreen';
import { ServicesProvider } from './src/presentation/context/ServicesContext';
import SplashScreen from './src/native/SplashScreen';
import { Colors } from './src/presentation/styles/sharedStyles';

export type RootStackParamList = {
  CatBreedsList: undefined;
  CatBreedDetail: { breedId: string };
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const navigationReadyRef = useRef(false);

  const handleNavigationReady = () => {
    // Only hide splash once when navigation is ready
    if (!navigationReadyRef.current) {
      navigationReadyRef.current = true;
      // Hide splash screen when NavigationContainer is ready
      // This ensures React Native is fully loaded and rendered
      // Use requestAnimationFrame to ensure native module is available
      requestAnimationFrame(() => {
        SplashScreen.hide();
      });
    }
  };

  return (
    <SafeAreaProvider>
      <ServicesProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.accent}
        />
        <View style={styles.navigationContainer}>
          <NavigationContainer 
            onReady={handleNavigationReady}
            theme={{
              dark: false,
              colors: {
                primary: Colors.primary,
                background: Colors.background,
                card: Colors.background,
                text: Colors.textPrimary,
                border: Colors.border,
                notification: Colors.accent,
              },
              fonts: {
                regular: {
                  fontFamily: 'Nunito-Regular',
                  fontWeight: '400' as const,
                },
                medium: {
                  fontFamily: 'Nunito-Medium',
                  fontWeight: '500' as const,
                },
                bold: {
                  fontFamily: 'Nunito-Bold',
                  fontWeight: '700' as const,
                },
                heavy: {
                  fontFamily: 'Nunito-ExtraBold',
                  fontWeight: '800' as const,
                },
              },
            }}>
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
                contentStyle: {
                  backgroundColor: Colors.background,
                },
                animation: 'simple_push',
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
        </View>
      </ServicesProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default App;
