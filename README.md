# Catbreeds

Aplicación React Native para explorar razas de gatos utilizando la API de The Cat API.

## 📋 Requisitos

- Node.js >= 20
- npm o yarn
- React Native CLI
- Android Studio (para Android)
- Xcode (para iOS)

## 🏗️ Arquitectura

Este proyecto utiliza **Arquitectura Hexagonal** (también conocida como Arquitectura de Puertos y Adaptadores), que separa la lógica de negocio de los detalles de implementación.

Para más detalles sobre la arquitectura, consulta la [Guía de Arquitectura](./GUIA_ARQUITECTURA.md).

### Estructura del Proyecto

```
src/
├── domain/              # Capa de Dominio
│   ├── entities/        # Entidades del dominio
│   ├── ports/           # Puertos (Interfaces)
│   │   └── repositories/ # Interfaces de repositorios
│   └── usecases/        # Casos de uso
├── application/         # Capa de Aplicación
│   ├── CatBreedService.ts
│   └── FavoritesService.ts
├── infrastructure/      # Capa de Infraestructura
│   ├── api/            # Cliente HTTP y DTOs
│   ├── dependencies/   # Contenedor de dependencias
│   └── repositories/   # Implementaciones de repositorios
├── native/             # Código nativo
│   └── SplashScreen.ts
└── presentation/       # Capa de Presentación
    ├── screens/        # Pantallas
    ├── components/     # Componentes UI
    ├── context/        # Context providers
    ├── hooks/          # Custom hooks
    ├── interfaces/     # Interfaces TypeScript
    └── styles/         # Estilos
```

## ✨ Características

- ✅ Lista de todas las razas de gatos
- ✅ Búsqueda por nombre y origen
- ✅ Detalles completos de cada raza
- ✅ Sistema de favoritos con almacenamiento local
- ✅ Navegación entre pantallas
- ✅ Arquitectura hexagonal bien estructurada
- ✅ Manejo de errores y estados de carga
- ✅ Diseño moderno y responsive
- ✅ Splash screen nativo
- ✅ Testing con Jest y React Native Testing Library
- ✅ Accesibilidad para personas con discapacidad

## 🚀 Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd Catbreeds
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura las variables de entorno:

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
CAT_API_KEY=tu_api_key_aqui
CAT_API_BASE_URL=https://api.thecatapi.com/v1
```

**Nota:** Puedes obtener una API key gratuita en [The Cat API](https://thecatapi.com/).

**Para los tests:** Opcionalmente, puedes crear un archivo `.env.test` con las mismas variables para usar en los tests. Si no existe, se usarán valores por defecto.

4. Para iOS, instala los pods:

```bash
cd ios && pod install && cd ..
```

## 🏃 Ejecución

### Desarrollo

Inicia el Metro Bundler:

```bash
npm start
```

En otra terminal, ejecuta la app:

#### Android
```bash
npm run android
```
Esto compila e instala la app en un emulador o dispositivo conectado.

#### iOS
```bash
npm run ios
```

### Build de Producción

#### Android

**Generar APK Release:**
```bash
cd android
./gradlew assembleRelease
```
El APK se generará en: `android/app/build/outputs/apk/release/app-release.apk`

**Generar AAB (Android App Bundle) para Google Play:**
```bash
cd android
./gradlew bundleRelease
```
El AAB se generará en: `android/app/build/outputs/bundle/release/app-release.aab`

**Nota:** Para producción, necesitarás configurar un keystore de firma. Consulta la [documentación oficial de React Native](https://reactnative.dev/docs/signed-apk-android).

#### iOS

Abre el proyecto en Xcode y genera el build desde ahí, o usa:

```bash
cd ios
xcodebuild -workspace Catbreeds.xcworkspace -scheme Catbreeds -configuration Release
```

## 📥 Descarga

### Android APK

Puedes descargar la versión más reciente de la aplicación directamente:

**[Descargar APK](https://drive.google.com/file/d/1KTFI9AH_ss9cCd6_8hR-5LJrtu8FbSTQ/view?usp=drive_link)**

**Nota:** Para instalar el APK en tu dispositivo Android, necesitarás habilitar la instalación desde fuentes desconocidas en la configuración de seguridad de tu dispositivo.

## 🧪 Testing

Ejecuta los tests:

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con cobertura
npm run test:coverage

# Ejecutar tests con cobertura en modo watch
npm run test:coverage:watch
```

Los reportes de cobertura se generan en la carpeta `coverage/`.

## 📡 API

La aplicación consume la API de The Cat API:
- **Endpoint base**: `https://api.thecatapi.com/v1`
- **Endpoint principal**: `/breeds`
- **Autenticación**: Header `x-api-key` o query parameter `api_key`

Para obtener una API key gratuita, visita [The Cat API](https://thecatapi.com/).

## 🛠️ Tecnologías

### Core
- **React Native** 0.82.1
- **React** 19.1.1
- **TypeScript** 5.8.3

### Navegación
- **React Navigation** 7.x
  - @react-navigation/native
  - @react-navigation/native-stack

### HTTP y Almacenamiento
- **Axios** 1.7.9 - Cliente HTTP
- **AsyncStorage** 2.2.0 - Almacenamiento local para favoritos

### UI y Estilos
- **React Native SVG** 15.15.1 - Soporte para iconos SVG
- **React Native Safe Area Context** 5.5.2 - Manejo de áreas seguras
- **React Native Gesture Handler** 2.29.1 - Gestos nativos

### Testing
- **Jest** 29.6.3 - Framework de testing
- **React Native Testing Library** 13.3.3 - Utilidades para testing
- **Jest Native** 5.4.3 - Matchers adicionales

### Desarrollo
- **ESLint** - Linter
- **Prettier** - Formateador de código
- **React Native Dotenv** - Variables de entorno

### Arquitectura
- **Arquitectura Hexagonal** (Ports & Adapters)
- **Inyección de Dependencias**

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm start              # Inicia Metro Bundler
npm run android        # Ejecuta en Android
npm run ios            # Ejecuta en iOS

# Testing
npm test               # Ejecuta todos los tests
npm run test:watch     # Tests en modo watch
npm run test:coverage  # Tests con cobertura
npm run test:coverage:watch  # Tests con cobertura en modo watch

# Linting
npm run lint           # Ejecuta ESLint
```

## 📄 Licencia

MIT
