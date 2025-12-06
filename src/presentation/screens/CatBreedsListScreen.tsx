import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../App';
import { CatBreedCard } from '../components/CatBreedCard';
import { ScreenContentWrapper } from '../components/ScreenContentWrapper';
import { catBreedsListStyles } from '../styles/CatBreedsListScreen.styles';
import { useCatBreeds } from '../hooks/useCatBreeds';
import { useBreedFilter } from '../hooks/useBreedFilter';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CatBreedsListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
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
      {/* Navbar */}
      <View style={[styles.navbar, { paddingTop: Platform.OS === 'android' ? Math.max(insets.top, 16) : 16 }]}>
        <View style={styles.navbarLeft}>
          <Text style={styles.pawIcon}>🐾</Text>
          <Text style={styles.navbarTitle}>Catbreeds</Text>
        </View>
        <View style={styles.navbarRight}>
          <TouchableOpacity
            style={styles.navbarIcon}
            onPress={() => navigation.navigate('Favorites')}>
            <Text style={styles.favoriteIcon}>❤️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or origin..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.subtitle}>
          {filteredBreeds.length} breed{filteredBreeds.length !== 1 ? 's' : ''}{' '}
          found
        </Text>
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
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
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

