import React, { useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../App';
import { CatBreedCard } from '../components/CatBreedCard';
import { ScreenContentWrapper } from '../components/ScreenContentWrapper';
import { favoritesScreenStyles } from '../styles/FavoritesScreen.styles';
import { useFavorites } from '../hooks/useFavorites';
import { useBreedFilter } from '../hooks/useBreedFilter';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const {
    favorites,
    loading,
    refreshing,
    loadFavorites,
    refreshFavorites,
  } = useFavorites();
  const {
    searchQuery,
    setSearchQuery,
    selectedOrigin,
    setSelectedOrigin,
    filteredBreeds: filteredFavorites,
    origins,
  } = useBreedFilter(favorites);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites]),
  );

  const styles = favoritesScreenStyles;

  return (
    <ScreenContentWrapper loading={loading}>
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Platform.OS === 'android' ? Math.max(insets.top, 16) : 16 }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.pawIcon}>🐾</Text>
          <Text style={styles.headerTitle}>
            Favorites ({favorites.length})
          </Text>
        </View>
      </View>

      {/* Category Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}>
          <TouchableOpacity
            style={[
              styles.filterChip,
              selectedOrigin === null && styles.filterChipSelected,
            ]}
            onPress={() => setSelectedOrigin(null)}>
            <Text
              style={[
                styles.filterChipText,
                selectedOrigin === null && styles.filterChipTextSelected,
              ]}>
              All
            </Text>
          </TouchableOpacity>
          {origins.map((origin) => (
            <TouchableOpacity
              key={origin}
              style={[
                styles.filterChip,
                selectedOrigin === origin && styles.filterChipSelected,
              ]}
              onPress={() => setSelectedOrigin(origin)}>
              <Text
                style={[
                  styles.filterChipText,
                  selectedOrigin === origin && styles.filterChipTextSelected,
                ]}>
              {origin}
            </Text>
          </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search favorites..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Favorites List */}
      <FlatList
        data={filteredFavorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CatBreedCard
            breed={item}
            isFavorite={true}
            onPress={() =>
              navigation.navigate('CatBreedDetail', { breedId: item.id })
            }
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshFavorites} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {favorites.length === 0
                ? "You don't have any favorites yet"
                : 'No favorites found with these filters'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
    </ScreenContentWrapper>
  );
};

