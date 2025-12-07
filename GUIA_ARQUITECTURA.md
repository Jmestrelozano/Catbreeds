# Guía de Arquitectura del Proyecto Catbreeds

## 📋 Índice
1. [Arquitectura General](#arquitectura-general)
2. [Capas de la Aplicación](#capas-de-la-aplicación)
3. [Inyección de Dependencias](#inyección-de-dependencias)
4. [Hooks de Presentación](#-hooks-de-presentación)
5. [Ejemplo Práctico: Cargar Lista de Razas](#ejemplo-práctico-cargar-lista-de-razas)
6. [Ejemplo Práctico: Añadir a Favoritos](#ejemplo-práctico-añadir-a-favoritos)
7. [Conceptos Clave](#-conceptos-clave)
8. [Resumen del Flujo](#-resumen-del-flujo)
9. [Archivos Clave por Responsabilidad](#-archivos-clave-por-responsabilidad)
10. [Preguntas Frecuentes](#-preguntas-frecuentes)
11. [Conclusión](#-conclusión)

---

## 🏗️ Arquitectura General

### ¿Qué Arquitectura Usa Este Proyecto?

Este proyecto sigue **Arquitectura Hexagonal (Ports & Adapters)**, también conocida como **Arquitectura de Puertos y Adaptadores**, creada por Alistair Cockburn.

### Diagrama Visual: Hexagonal Architecture

```
                    ┌─────────────────────┐
                    │   PRESENTATION       │
                    │   (Adaptador)        │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │   APPLICATION        │
                    │   (Servicios)        │
                    └──────────┬───────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
┌───────▼────────┐    ┌────────▼────────┐    ┌───────▼────────┐
│   DOMAIN       │    │   DOMAIN        │    │   DOMAIN       │
│   (Puertos)    │    │   (Use Cases)   │    │   (Entities)   │
│                │    │                 │    │                │
│ ICatBreedRepo  │    │ GetAllBreedsUC  │    │   CatBreed     │
│ IFavoritesRepo │    │ AddFavoriteUC   │    │                │
└───────┬────────┘    └─────────────────┘    └────────────────┘
        │                      │
        │         ┌────────────┴────────────┐
        │         │   INFRASTRUCTURE         │
        │         │   (Adaptadores)          │
        │         └──────────────────────────┘
        │                      │
        │         ┌─────────────┴─────────────┐
        │         │                           │
┌───────▼─────────▼──┐          ┌────────────▼──────────┐
│ CatBreedRepository │          │ FavoritesRepository    │
│ (Adaptador)        │          │ (Adaptador)            │
│                    │          │                        │
│ → CatApiClient     │          │ → AsyncStorage         │
│ → CatBreedMapper   │          │                        │
└────────────────────┘          └────────────────────────┘
```

**Características clave de Hexagonal Architecture en tu proyecto:**

1. **Puertos (Interfaces)**: `ICatBreedRepository`, `IFavoritesRepository` - definidos en el dominio
2. **Adaptadores (Implementaciones)**: `CatBreedRepository`, `FavoritesRepository` - en infrastructure
3. **Dominio independiente**: El dominio NO importa nada de otras capas
4. **Inversión de dependencias**: Infrastructure depende del dominio, no al revés

### ¿Por qué esta arquitectura?

1. **Separación de Responsabilidades**: Cada capa tiene un propósito claro
2. **Testabilidad**: Fácil de testear porque las dependencias están invertidas
3. **Mantenibilidad**: Cambios en una capa no afectan a otras
4. **Flexibilidad**: Puedes cambiar la API o el almacenamiento sin tocar el dominio
5. **Independencia del dominio**: El dominio es el corazón y no depende de frameworks externos

---

---

## 📦 Capas de la Aplicación

### 1. **PRESENTATION** (Capa de Presentación)

**Ubicación**: `src/presentation/`

**Responsabilidades**:
- Mostrar la interfaz de usuario
- Manejar interacciones del usuario
- Gestionar estado de UI (loading, error, etc.)

**Componentes principales**:
- **Screens**: Pantallas completas (`CatBreedsListScreen`, `CatBreedDetailScreen`, `FavoritesScreen`)
- **Components**: Componentes reutilizables (`CatBreedCard`, `LoadingSpinner`, `ErrorMessage`, `SearchBar`, `ScreenContentWrapper`)
- **Hooks**: Lógica de presentación (`useCatBreeds`, `useFavorites`, `useFavoriteToggle`, `useCatBreedDetail`, `useBreedFilter`)
- **Context**: Inyección de servicios (`ServicesContext`)
- **Interfaces**: Definiciones TypeScript para props de componentes
- **Styles**: Estilos separados por componente

**Características**:
- ❌ NO conoce detalles de implementación (API, almacenamiento)
- ✅ Solo conoce servicios de aplicación
- ✅ Usa entidades del dominio
- ✅ Contiene lógica de UI (filtrado, búsqueda, estado de carga)

**Nota**: Para detalles sobre los hooks disponibles, ver la sección [Hooks de Presentación](#-hooks-de-presentación).

---

### 2. **APPLICATION** (Capa de Aplicación)

**Ubicación**: `src/application/`

**Responsabilidades**:
- Orquestar casos de uso
- Coordinar operaciones que involucran múltiples casos de uso

**Servicios**:
- `CatBreedService`: Orquesta casos de uso relacionados con razas
- `FavoritesService`: Orquesta casos de uso relacionados con favoritos

**Características**:
- ✅ Conoce el dominio (entidades y casos de uso)
- ✅ Conoce repositorios a través de interfaces (puertos)
- ❌ NO conoce detalles de implementación (HTTP, AsyncStorage)

---

### 3. **DOMAIN** (Capa de Dominio)

**Ubicación**: `src/domain/`

**Responsabilidades**:
- Contener la lógica de negocio pura
- Definir las reglas del negocio
- Definir contratos (puertos) que deben cumplir las implementaciones

**Componentes**:

#### 3.1. **Entities** (Entidades)
- `CatBreed`: Representa una raza de gato en el dominio
- Usa convenciones del dominio (camelCase), no de la API

#### 3.2. **Use Cases** (Casos de Uso)
- `GetAllCatBreedsUseCase`: Obtener todas las razas
- `GetCatBreedByIdUseCase`: Obtener una raza por ID
- `AddFavoriteUseCase`: Añadir a favoritos
- `RemoveFavoriteUseCase`: Eliminar de favoritos
- `IsFavoriteUseCase`: Verificar si es favorito
- `GetAllFavoritesUseCase`: Obtener todos los favoritos

**Características**:
- ✅ Contiene lógica de negocio
- ✅ Define validaciones
- ✅ Conoce repositorios solo a través de interfaces (puertos)
- ❌ NO conoce detalles de implementación

#### 3.3. **Ports** (Puertos/Interfaces)
- `ICatBreedRepository`: Contrato para repositorios de razas
- `IFavoritesRepository`: Contrato para repositorios de favoritos

**Características**:
- ✅ Define QUÉ se necesita, no CÓMO se implementa
- ✅ Permite cambiar implementaciones sin afectar el dominio

---

### 4. **INFRASTRUCTURE** (Capa de Infraestructura)

**Ubicación**: `src/infrastructure/`

**Responsabilidades**:
- Implementar los detalles técnicos
- Conectar con sistemas externos (API, almacenamiento)
- Transformar datos externos a entidades del dominio

**Componentes**:

#### 4.1. **API**
- `CatApiClient`: Cliente HTTP para la API de gatos
- `CatBreedDTO`: Objeto de transferencia de datos (formato de la API)
- `CatBreedMapper`: Transforma DTOs → Entidades del dominio

#### 4.2. **Repositories** (Adaptadores)
- `CatBreedRepository`: Implementa `ICatBreedRepository`
  - Usa `CatApiClient` para obtener datos
  - Usa `CatBreedMapper` para transformar DTOs a entidades
  
- `FavoritesRepository`: Implementa `IFavoritesRepository`
  - Usa `AsyncStorage` para persistir favoritos localmente

#### 4.3. **Dependencies**
- `DependencyContainer`: Contenedor de inyección de dependencias
  - Crea instancias de repositorios y servicios
  - Implementa patrón Singleton

**Características**:
- ✅ Implementa los puertos definidos por el dominio
- ✅ Conoce detalles técnicos (HTTP, AsyncStorage, etc.)
- ✅ Aísla al dominio de estos detalles

---

## 💉 Inyección de Dependencias

### ¿Cómo funciona?

El proyecto usa **Inversión de Dependencias** (Dependency Inversion Principle):

1. **DependencyContainer** crea todas las instancias
2. **ServicesContext** inyecta los servicios a través de React Context
3. Los componentes acceden a servicios mediante el hook `useServices()`

### Flujo de Inyección:

```
App.tsx
  └─> ServicesProvider
        └─> DependencyContainer.getCatBreedService()
              └─> DependencyContainer.getCatBreedRepository()
                    └─> DependencyContainer.getApiClient()
                          └─> new CatApiClient()
        
        └─> DependencyContainer.getFavoritesService()
              └─> DependencyContainer.getFavoritesRepository()
                    └─> new FavoritesRepository()
```

### Código Clave:

```typescript
// DependencyContainer.ts
static getCatBreedService(): CatBreedService {
  if (!this.catBreedService) {
    const repository = this.getCatBreedRepository(); // Inyección
    this.catBreedService = new CatBreedService(repository);
  }
  return this.catBreedService;
}

// Método útil para testing
static reset(): void {
  this.catBreedRepository = null;
  this.favoritesRepository = null;
  this.catBreedService = null;
  this.favoritesService = null;
  this.apiClient = null;
}
```

```typescript
// ServicesContext.tsx
export const ServicesProvider = ({ children }) => {
  const catBreedService = DependencyContainer.getCatBreedService();
  const favoritesService = DependencyContainer.getFavoritesService();
  // ... inyecta a través de Context
};
```

```typescript
// useCatBreeds.ts (hook)
const { catBreedService } = useServices(); // Obtiene servicio del contexto
```

---

## 🎣 Hooks de Presentación

Los hooks encapsulan la lógica de presentación y conectan la UI con los servicios de aplicación:

### `useCatBreeds`
- **Propósito**: Cargar y gestionar el estado de todas las razas de gatos
- **Retorna**: `{ breeds, loading, error, loadBreeds }`
- **Uso**: En `CatBreedsListScreen` para mostrar la lista completa

### `useCatBreedDetail`
- **Propósito**: Cargar y gestionar el estado de una raza específica por ID
- **Retorna**: `{ breed, loading, error, loadBreed }`
- **Uso**: En `CatBreedDetailScreen` para mostrar los detalles

### `useFavorites`
- **Propósito**: Gestionar la lista completa de favoritos
- **Retorna**: `{ favorites, loading, refreshing, loadFavorites, addFavorite, removeFavorite, isFavorite, refreshFavorites }`
- **Uso**: En `FavoritesScreen` para mostrar y gestionar favoritos

### `useFavoriteToggle`
- **Propósito**: Gestionar el estado de favorito de una raza específica
- **Retorna**: `{ isFavorite, checkFavorite, toggleFavorite }`
- **Uso**: En componentes que muestran el botón de favorito (como `CatBreedCard`)

### `useBreedFilter`
- **Propósito**: Filtrar y buscar razas por nombre y origen (lógica de UI)
- **Retorna**: `{ searchQuery, setSearchQuery, selectedOrigin, setSelectedOrigin, filteredBreeds, origins }`
- **Uso**: En `CatBreedsListScreen` para filtrar la lista mostrada
- **Nota**: Este hook es específico de la presentación y no pertenece al dominio

---

## 📖 Ejemplo Práctico: Cargar Lista de Razas

### Escenario: Usuario abre la app y se cargan las razas

#### Paso 1: UI se monta
```typescript
// CatBreedsListScreen.tsx
const { breeds, loading, error, loadBreeds } = useCatBreeds();
useEffect(() => {
  loadBreeds(); // Se ejecuta al montar
}, [loadBreeds]);
```

#### Paso 2: Hook llama al servicio
```typescript
// useCatBreeds.ts
const loadBreeds = useCallback(async () => {
  setLoading(true);
  const data = await catBreedService.getAllBreeds(); // ← Llamada al servicio
  setBreeds(data);
}, [catBreedService]);
```

#### Paso 3: Servicio ejecuta caso de uso
```typescript
// CatBreedService.ts
async getAllBreeds(): Promise<CatBreed[]> {
  return await this.getAllBreedsUseCase.execute(); // ← Ejecuta caso de uso
}
```

#### Paso 4: Caso de uso llama al repositorio
```typescript
// GetAllCatBreedsUseCase.ts
async execute(): Promise<CatBreed[]> {
  return await this.catBreedRepository.getAllBreeds(); // ← Llama al repositorio
}
```

#### Paso 5: Repositorio llama al API Client
```typescript
// CatBreedRepository.ts
async getAllBreeds(): Promise<CatBreed[]> {
  const dtos = await this.apiClient.get<CatBreedDTO[]>('/breeds'); // ← HTTP request
  return CatBreedMapper.toDomainList(dtos); // ← Transforma DTOs a entidades
}
```

#### Paso 6: API Client hace petición HTTP
```typescript
// CatApiClient.ts
async get<T>(endpoint: string): Promise<T> {
  const response = await this.client.get<T>(endpoint);
  return response.data; // ← Retorna DTOs
}
```

#### Paso 7: Mapper transforma datos
```typescript
// CatBreedMapper.ts
static toDomain(dto: CatBreedDTO): CatBreed {
  return {
    id: dto.id,
    name: dto.name,
    // ... transforma snake_case a camelCase
    lifeSpan: dto.life_span, // ← Conversión de formato
  };
}
```

#### Paso 8: Datos fluyen de vuelta
```
API Response (DTOs)
  ↓
Mapper (DTO → Entity)
  ↓
Repository (retorna Entities)
  ↓
Use Case (retorna Entities)
  ↓
Service (retorna Entities)
  ↓
Hook (actualiza estado)
  ↓
Hook de Filtrado (useBreedFilter - opcional)
  ↓
UI (se re-renderiza con datos)
```

**Nota**: El hook `useBreedFilter` se usa en la pantalla para filtrar las razas por nombre y origen. Esta lógica de filtrado es parte de la presentación y no del dominio, ya que es específica de cómo se muestra la información al usuario.

---

## ❤️ Ejemplo Práctico: Añadir a Favoritos

### Escenario: Usuario hace clic en el botón de favorito

#### Paso 1: Usuario interactúa
```typescript
// CatBreedCard.tsx o similar
<TouchableOpacity onPress={handleToggleFavorite}>
  <Text>❤️</Text>
</TouchableOpacity>
```

#### Paso 2: Hook maneja la acción
```typescript
// useFavoriteToggle.ts
const toggleFavorite = async () => {
  if (isFavorite) {
    await favoritesService.removeFavorite(breedId);
  } else {
    await favoritesService.addFavorite(breed);
  }
};
```

#### Paso 3: Servicio ejecuta caso de uso
```typescript
// FavoritesService.ts
async addFavorite(breed: CatBreed): Promise<boolean> {
  return await this.addFavoriteUseCase.execute(breed);
}
```

#### Paso 4: Caso de uso valida y llama al repositorio
```typescript
// AddFavoriteUseCase.ts
async execute(breed: CatBreed): Promise<boolean> {
  if (!breed || !breed.id) {
    throw new Error('Breed is required'); // ← Validación de negocio
  }
  
  const isFavorite = await this.favoritesRepository.isFavorite(breed.id);
  if (isFavorite) {
    return false; // ← Ya es favorito
  }
  
  return await this.favoritesRepository.addFavorite(breed);
}
```

#### Paso 5: Repositorio persiste en AsyncStorage
```typescript
// FavoritesRepository.ts
async addFavorite(breed: CatBreed): Promise<boolean> {
  const favorites = await this.getFavorites();
  favorites.push(breed);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)); // ← Persistencia
  return true;
}
```

#### Paso 6: UI se actualiza
- El hook detecta el cambio
- El componente se re-renderiza
- El ícono de favorito cambia de estado

---

## 🔑 Conceptos Clave

### 1. **Puertos y Adaptadores**
- **Puerto**: Interfaz definida por el dominio (`ICatBreedRepository`)
- **Adaptador**: Implementación concreta (`CatBreedRepository`)

### 2. **DTO vs Entity**
- **DTO**: Formato de datos de la API (snake_case, `life_span`)
- **Entity**: Formato del dominio (camelCase, `lifeSpan`)
- **Mapper**: Transforma entre ambos

### 3. **Inversión de Dependencias**
- El dominio define interfaces (puertos)
- La infraestructura implementa esas interfaces (adaptadores)
- El dominio NO depende de la infraestructura, es al revés

### 4. **Casos de Uso**
- Encapsulan lógica de negocio
- Son independientes de la UI y de la implementación
- Fáciles de testear

---

---

## 📝 Resumen del Flujo

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  Screen → Hook → Service (del contexto)                      │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                    APPLICATION LAYER                        │
│  Service → Use Case                                         │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                      DOMAIN LAYER                            │
│  Use Case → Repository Interface (Puerto)                    │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                  INFRASTRUCTURE LAYER                       │
│  Repository (Adaptador) → API Client → HTTP Request         │
│  Repository (Adaptador) → AsyncStorage → Local Storage      │
│  Mapper: DTO → Entity                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔍 Archivos Clave por Responsabilidad

| Responsabilidad | Archivo | Ubicación |
|----------------|---------|-----------|
| **Inyección de Dependencias** | `DependencyContainer.ts` | `infrastructure/dependencies/` |
| **Contexto de Servicios** | `ServicesContext.tsx` | `presentation/context/` |
| **Cliente de API** | `CatApiClient.ts` | `infrastructure/api/` |
| **Transformación de Datos** | `CatBreedMapper.ts` | `infrastructure/api/mappers/` |
| **Repositorio de Razas** | `CatBreedRepository.ts` | `infrastructure/repositories/` |
| **Repositorio de Favoritos** | `FavoritesRepository.ts` | `infrastructure/repositories/` |
| **Servicio de Razas** | `CatBreedService.ts` | `application/` |
| **Servicio de Favoritos** | `FavoritesService.ts` | `application/` |
| **Entidad del Dominio** | `CatBreed.ts` | `domain/entities/` |
| **Puerto de Repositorio de Razas** | `ICatBreedRepository.ts` | `domain/ports/repositories/` |
| **Puerto de Repositorio de Favoritos** | `IFavoritesRepository.ts` | `domain/ports/repositories/` |
| **Hook de Razas** | `useCatBreeds.ts` | `presentation/hooks/` |
| **Hook de Detalle de Raza** | `useCatBreedDetail.ts` | `presentation/hooks/` |
| **Hook de Favoritos** | `useFavorites.ts` | `presentation/hooks/` |
| **Hook de Toggle Favorito** | `useFavoriteToggle.ts` | `presentation/hooks/` |
| **Hook de Filtrado** | `useBreedFilter.ts` | `presentation/hooks/` |

---

## 💡 Preguntas Frecuentes

### ¿Por qué hay una capa de Application si ya hay Use Cases?
La capa de Application orquesta casos de uso. En operaciones complejas que involucran múltiples casos de uso, esta capa coordina. También proporciona una API más simple para la presentación.

### ¿Por qué usar Mappers?
Los Mappers aíslan el formato de la API del dominio. Si la API cambia su formato, solo necesitas actualizar el Mapper, no todo el código.

### ¿Por qué usar Context para servicios?
React Context permite inyectar dependencias sin prop drilling. Los componentes acceden a servicios sin conocer cómo se crean.

### ¿Qué hace el hook useBreedFilter?
El hook `useBreedFilter` maneja la lógica de filtrado y búsqueda en la capa de presentación. Permite filtrar razas por nombre, origen y opcionalmente por descripción. Es parte de la lógica de UI y no pertenece al dominio porque es específico de cómo se presenta la información al usuario.

### ¿Puedo cambiar la API sin afectar el código?
Sí, porque:
1. El dominio solo conoce interfaces (puertos)
2. El repositorio implementa esas interfaces
3. Si cambias la API, solo actualizas el repositorio y el mapper

---

## 🚀 Conclusión

Este proyecto usa **Arquitectura Hexagonal (Ports & Adapters)**, que proporciona:

**Beneficios:**
- ✅ **Separación clara de responsabilidades**: Cada capa tiene un propósito bien definido
- ✅ **Testabilidad**: Fácil de testear mediante mockeo de repositorios
- ✅ **Mantenibilidad**: Cambios localizados en una capa sin afectar otras
- ✅ **Flexibilidad**: Puedes cambiar la API o almacenamiento sin tocar el dominio
- ✅ **Escalabilidad**: Fácil añadir nuevas funcionalidades

**Principios aplicados:**
- Puertos (interfaces) definidos en el dominio, adaptadores (implementaciones) en infrastructure
- Dominio completamente independiente de frameworks externos
- Inversión de dependencias: el dominio define contratos que la infraestructura implementa

