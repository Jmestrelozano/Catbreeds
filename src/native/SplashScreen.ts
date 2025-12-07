import { NativeModules } from 'react-native';

interface SplashScreenInterface {
  hide(): void;
}

// Get the native module - name must match the getName() in SplashScreenModule.kt (Android) 
// or moduleName() in SplashScreenModule.swift (iOS)
const getSplashScreenModule = (): SplashScreenInterface | null => {
  try {
    const { SplashScreen } = NativeModules;
    if (SplashScreen && typeof SplashScreen.hide === 'function') {
      return SplashScreen as SplashScreenInterface;
    }
  } catch (error) {
    console.warn('Error accessing SplashScreen module:', error);
  }
  
  return null;
};

export default {
  hide: () => {
    console.log('SplashScreen.hide() called from JavaScript');
    const module = getSplashScreenModule();
    if (module) {
      console.log('SplashScreen module found, calling hide()');
      try {
        module.hide();
      } catch (error) {
        console.warn('Error hiding splash screen:', error);
      }
    } else {
      console.warn('SplashScreen native module not available');
    }
  },
};

