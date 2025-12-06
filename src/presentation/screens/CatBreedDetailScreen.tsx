import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRoute, RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../App';
import { ScreenContentWrapper } from '../components/ScreenContentWrapper';
import { catBreedDetailStyles } from '../styles/CatBreedDetailScreen.styles';
import { useCatBreedDetail } from '../hooks/useCatBreedDetail';
import { useFavoriteToggle } from '../hooks/useFavoriteToggle';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type CatBreedDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'CatBreedDetail'
>;

export const CatBreedDetailScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const route = useRoute<CatBreedDetailScreenRouteProp>();
  const { breedId } = route.params;
  const { breed, loading, error, loadBreed } = useCatBreedDetail(breedId);
  const { isFavorite, checkFavorite, toggleFavorite } = useFavoriteToggle(breedId);

  useEffect(() => {
    loadBreed();
  }, [loadBreed]);

  useFocusEffect(
    useCallback(() => {
      if (breedId) {
        checkFavorite();
      }
    }, [breedId, checkFavorite]),
  );

  const handleToggleFavorite = useCallback(async () => {
    if (!breed) return;
    await toggleFavorite(breed);
  }, [breed, toggleFavorite]);

  const styles = catBreedDetailStyles;
  
  // Handle special case where there's no breed but also no error
  const displayError = error || (!breed && !loading ? 'Breed not found' : null);

  const renderStatBar = (label: string, value: number) => (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statBarContainer}>
        <View style={[styles.statBar, { width: `${(value / 5) * 100}%` }]} />
      </View>
      <Text style={styles.statValue}>{value}/5</Text>
    </View>
  );

  const imageUrl = breed?.referenceImageId
    ? `https://cdn2.thecatapi.com/images/${breed.referenceImageId}.jpg`
    : null;

  return (
    <ScreenContentWrapper loading={loading} error={displayError} onRetry={loadBreed}>
      {breed && (
        <SafeAreaView style={styles.container}>

      <View style={[styles.navbar, { paddingTop: Platform.OS === 'android' ? Math.max(insets.top, 16) : 16 }]}>
        <View style={styles.navbarLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.pawIcon}>🐾</Text>
          <Text style={styles.navbarTitle}>
            {breed.name}
          </Text>
        </View>
      </View>

      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderIcon}>🐱</Text>
          <Text style={styles.placeholderText}>No image available</Text>
        </View>
      )}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.name}>{breed.name}</Text>
              <Text style={styles.origin}>{breed.origin}</Text>
            </View>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={handleToggleFavorite}>
              <Text style={styles.favoriteIcon}>
                {isFavorite ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{breed.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Temperament</Text>
          <Text style={styles.temperament}>{breed.temperament}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Life expectancy:</Text>
            <Text style={styles.infoValue}>{breed.lifeSpan}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Characteristics</Text>
          {renderStatBar('Adaptability', breed.adaptability)}
          {renderStatBar('Affection level', breed.affectionLevel)}
          {renderStatBar('Child friendly', breed.childFriendly)}
          {renderStatBar('Dog friendly', breed.dogFriendly)}
          {renderStatBar('Energy level', breed.energyLevel)}
          {renderStatBar('Grooming', breed.grooming)}
          {renderStatBar('Health issues', breed.healthIssues)}
          {renderStatBar('Intelligence', breed.intelligence)}
          {renderStatBar('Shedding level', breed.sheddingLevel)}
          {renderStatBar('Social needs', breed.socialNeeds)}
          {renderStatBar('Stranger friendly', breed.strangerFriendly)}
          {renderStatBar('Vocalisation', breed.vocalisation)}
        </View>

        {breed.wikipediaUrl && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>More information</Text>
            <Text style={styles.link}>{breed.wikipediaUrl}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
      )}
    </ScreenContentWrapper>
  );
};

