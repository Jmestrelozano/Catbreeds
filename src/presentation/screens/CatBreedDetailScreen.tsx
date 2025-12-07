import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useRoute, RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaskedView from '@react-native-masked-view/masked-view';
import Svg, { Path } from 'react-native-svg';
import { RootStackParamList } from '../../../App';
import { ScreenContentWrapper } from '../components/ScreenContentWrapper';
import { catBreedDetailStyles } from '../styles/CatBreedDetailScreen.styles';
import { Spacing } from '../styles/sharedStyles';
import { useCatBreedDetail } from '../hooks/useCatBreedDetail';
import { useFavoriteToggle } from '../hooks/useFavoriteToggle';
import ExpandLeftIcon from '../../../assets/svg/expand_left.svg';
import FavoriteIcon from '../../../assets/svg/favorite.svg';
import FavoriteFillIcon from '../../../assets/svg/favorite_fill.svg';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type CatBreedDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'CatBreedDetail'
>;

interface CurvedMaskProps {
  width: number;
  height: number;
  curveHeight: number;
}

const CurvedMask: React.FC<CurvedMaskProps> = ({ width, height, curveHeight }) => {
  const maskPath = `M0,0 L${width},0 L${width},${height - curveHeight} Q${width / 2},${height} 0,${height - curveHeight} Z`;
  
  return (
    <Svg width={width} height={height}>
      <Path d={maskPath} fill="white" />
    </Svg>
  );
};

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
    <View style={styles.statRow} accessibilityRole="progressbar" accessibilityLabel={`${label}: ${value} out of 5`}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statBarContainer} accessible={false}>
        <View style={[styles.statBar, { width: `${(value / 5) * 100}%` }]} />
      </View>
      <Text style={styles.statValue}>{value}/5</Text>
    </View>
  );

  const imageUrl = breed?.referenceImageId
    ? `https://cdn2.thecatapi.com/images/${breed.referenceImageId}.jpg`
    : null;

  const screenWidth = Dimensions.get('window').width;
  const imageHeight = 400;
  const curveHeight = 30;

  return (
    <ScreenContentWrapper loading={loading} error={displayError} onRetry={loadBreed}>
      {breed && (
        <View style={styles.container}>
          <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
          <View style={styles.imageContainer}>
            {imageUrl ? (
              <MaskedView
                style={styles.maskedView}
                maskElement={<CurvedMask width={screenWidth} height={imageHeight} curveHeight={curveHeight} />}>
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.image}
                  resizeMode="cover"
                  accessibilityRole="image"
                  accessibilityLabel={`Image of ${breed.name}`}
                />
              </MaskedView>
            ) : (
              <View style={styles.placeholderContainer} accessibilityRole="image" accessibilityLabel={`Image not available for ${breed.name}`}>
                <Text style={styles.placeholderIcon} accessibilityRole="none">🐱</Text>
                <Text style={styles.placeholderText} accessibilityRole="none">No image available</Text>
              </View>
            )}
            <View style={[styles.floatingButtons, { paddingTop: Math.max(insets.top, Spacing.lg) + Spacing.md }]}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
                accessibilityRole="button"
                accessibilityLabel="Back"
                accessibilityHint="Returns to the breeds list">
                <ExpandLeftIcon width={24} height={24} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.favoriteButtonFloating}
                onPress={handleToggleFavorite}
                accessibilityRole="button"
                accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
                accessibilityState={{ selected: isFavorite }}
                accessibilityHint={isFavorite ? "Removes this breed from your favorites" : "Saves this breed to your favorites"}>
                {isFavorite ? (
                  <FavoriteFillIcon width={24} height={24} />
                ) : (
                  <FavoriteIcon width={24} height={24} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView 
            style={styles.scrollView} 
            contentContainerStyle={{ paddingBottom: insets.bottom }}
            showsVerticalScrollIndicator={false}
            accessibilityRole="scrollbar">
            <View style={styles.contentContainer}>
              <View style={styles.header}>
                <Text style={styles.name} accessibilityRole="header">{breed.name}</Text>
                <Text style={styles.origin} accessibilityRole="text">{breed.origin}</Text>
              </View>

              <View style={styles.tagsContainer}>
                <View style={[styles.tag, styles.tagOrange]}>
                  <Text style={styles.tagValue}>{breed.lifeSpan}</Text>
                  <Text style={styles.tagLabel}>Life Span</Text>
                </View>
                <View style={[styles.tag, styles.tagPurple]}>
                  <Text style={styles.tagValue}>{breed.adaptability}/5</Text>
                  <Text style={styles.tagLabel}>Adaptability</Text>
                </View>
                <View style={[styles.tag, styles.tagRed]}>
                  <Text style={styles.tagValue}>{breed.affectionLevel}/5</Text>
                  <Text style={styles.tagLabel}>Affection</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle} accessibilityRole="header">About</Text>
                <Text style={styles.description} accessibilityRole="text">{breed.description}</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle} accessibilityRole="header">Temperament</Text>
                <Text style={styles.temperament} accessibilityRole="text">{breed.temperament}</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle} accessibilityRole="header">General Information</Text>
                <View style={styles.infoRow} accessibilityRole="text">
                  <Text style={styles.infoLabel}>Life expectancy:</Text>
                  <Text style={styles.infoValue}>{breed.lifeSpan}</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle} accessibilityRole="header">Characteristics</Text>
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
                  <Text style={styles.sectionTitle} accessibilityRole="header">More information</Text>
                  <Text style={styles.link} accessibilityRole="link" accessibilityLabel={`Wikipedia link about ${breed.name}`} accessibilityHint={`Opens ${breed.wikipediaUrl} in the browser`}>{breed.wikipediaUrl}</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </ScreenContentWrapper>
  );
};

