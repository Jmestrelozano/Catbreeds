import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../App';
import { CatBreedCard } from '../components/CatBreedCard';
import { ScreenContentWrapper } from '../components/ScreenContentWrapper';
import { SearchBar } from '../components/SearchBar';
import { catBreedsListStyles } from '../styles/CatBreedsListScreen.styles';
import { useCatBreeds } from '../hooks/useCatBreeds';
import { useBreedFilter } from '../hooks/useBreedFilter';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CatBreedsListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { breeds, loading, error, loadBreeds } = useCatBreeds();
  const {
    searchQuery,
    setSearchQuery,
    filteredBreeds,
  } = useBreedFilter(breeds, { includeDescriptionInSearch: false });

  useEffect(() => {
    loadBreeds();
  }, [loadBreeds]);

  const styles = catBreedsListStyles;

  return (
    <ScreenContentWrapper loading={loading} error={error} onRetry={loadBreeds}>
    <SafeAreaView style={styles.container}>

      <View style={styles.navbar}>
        <View style={styles.navbarLeft}>
          <Text style={styles.pawIcon} accessibilityRole="none">🐾</Text>
          <Text style={styles.navbarTitle} accessibilityRole="header">Catbreeds</Text>
        </View>
      </View>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search here...."
        showIcon={true}
        showFavoriteButton={true}
        onFavoritePress={() => navigation.navigate('Favorites')}
        accessibilityLabel="Search cat breeds"
        accessibilityHint="Type to search breeds by name or origin"
      />
      <View style={styles.tagContainer}>
        <View style={styles.floatingTag}>
          <Text style={styles.tagText} accessibilityRole="text">
            {filteredBreeds.length} breed{filteredBreeds.length !== 1 ? 's' : ''}{' '}
            found
          </Text>
        </View>
      </View>
      <FlatList
        data={filteredBreeds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CatBreedCard
            breed={item}
            onPress={() =>
              navigation.navigate('CatBreedDetail', { breedId: item.id })
            }
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        accessibilityRole="list"
        accessibilityLabel={`Cat breeds list. ${filteredBreeds.length} ${filteredBreeds.length === 1 ? 'breed found' : 'breeds found'}`}
        ListEmptyComponent={
          <View style={styles.emptyContainer} accessibilityRole="text">
            <Text style={styles.emptyText}>
              No breeds found matching your search
            </Text>
          </View>
        }
      />
    </SafeAreaView>
    </ScreenContentWrapper>
  );
};

