import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ScrollView
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../App';
import { CatBreedCard } from '../components/CatBreedCard';
import { ScreenContentWrapper } from '../components/ScreenContentWrapper';
import { SearchBar } from '../components/SearchBar';
import { favoritesScreenStyles } from '../styles/FavoritesScreen.styles';
import { useFavorites } from '../hooks/useFavorites';
import { useBreedFilter } from '../hooks/useBreedFilter';
import ExpandLeftIcon from '../../../assets/svg/expand_left.svg';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
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

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Back"
            accessibilityHint="Returns to the previous screen">
            <ExpandLeftIcon width={40} height={40} />
          </TouchableOpacity>
          <Text style={styles.pawIcon} accessibilityRole="none">🐾</Text>
          <Text style={styles.headerTitle} accessibilityRole="header">
            Favorites ({favorites.length})
          </Text>
        </View>
      </View>


      <View style={styles.filtersContainer} accessibilityRole="radiogroup" accessibilityLabel="Filters by origin">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}
          accessibilityRole="none">
          <TouchableOpacity
            style={[
              styles.filterChip,
              selectedOrigin === null && styles.filterChipSelected,
            ]}
            onPress={() => setSelectedOrigin(null)}
            accessibilityRole="radio"
            accessibilityState={{ selected: selectedOrigin === null }}
            accessibilityLabel="All origins"
            accessibilityHint="Shows all favorite breeds">
            <Text
              style={[
                styles.filterChipText,
                selectedOrigin === null && styles.filterChipTextSelected,
              ]}
              accessibilityRole="none">
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
              onPress={() => setSelectedOrigin(origin)}
              accessibilityRole="radio"
              accessibilityState={{ selected: selectedOrigin === origin }}
              accessibilityLabel={`Filter by origin: ${origin}`}
              accessibilityHint={`Shows only favorite breeds from ${origin}`}>
              <Text
                style={[
                  styles.filterChipText,
                  selectedOrigin === origin && styles.filterChipTextSelected,
                ]}
                accessibilityRole="none">
              {origin}
            </Text>
          </TouchableOpacity>
          ))}
        </ScrollView>
      </View>


      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search favorites..."
        showIcon={true}
        showFavoriteButton={false}
        accessibilityLabel="Search favorites"
        accessibilityHint="Type to search favorite breeds by name"
      />

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
        accessibilityRole="list"
        accessibilityLabel={`Favorites list. ${filteredFavorites.length} ${filteredFavorites.length === 1 ? 'breed found' : 'breeds found'}`}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={refreshFavorites}
            accessibilityRole="none"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer} accessibilityRole="text">
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

