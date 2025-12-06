// Mock de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock de react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => inset,
  };
});

// Mock de @react-navigation/native
jest.mock('@react-navigation/native', () => {
  return {
    NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
    useRoute: () => ({
      params: { breedId: 'test-breed-id' },
    }),
    useFocusEffect: jest.fn((callback) => callback()),
  };
});

// Mock de @react-navigation/native-stack
jest.mock('@react-navigation/native-stack', () => {
  return {
    createNativeStackNavigator: () => ({
      Navigator: ({ children }: { children: React.ReactNode }) => children,
      Screen: ({ children }: { children: React.ReactNode }) => children,
    }),
  };
});

// Mock de @env - carga las variables desde .env.test
// Leemos el archivo directamente en el factory para evitar problemas con el scope
jest.mock('@env', () => {
  const fs = require('fs');
  const path = require('path');
  
  // Usar process.cwd() para obtener el root del proyecto
  const projectRoot = process.cwd();
  const envTestPath = path.join(projectRoot, '.env.test');
  
  // Valores por defecto si no existe el archivo
  let envVars = {
    CAT_API_KEY: 'test-api-key',
    CAT_API_BASE_URL: 'https://api.test.com',
  };
  
  if (fs.existsSync(envTestPath)) {
    const envContent = fs.readFileSync(envTestPath, 'utf8');
    envVars = {};
    
    envContent.split('\n').forEach(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#')) {
        return;
      }
      const equalIndex = trimmedLine.indexOf('=');
      if (equalIndex !== -1) {
        const key = trimmedLine.substring(0, equalIndex).trim();
        const value = trimmedLine.substring(equalIndex + 1).trim();
        envVars[key] = value;
      }
    });
  }
  
  return envVars;
}, { virtual: true });

// Mock de react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    Pressable: View,
    FlatList: View,
    gestureHandlerRootHOC: jest.fn((x) => x),
    Directions: {},
  };
});

