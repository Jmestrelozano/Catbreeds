import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { catBreedCardStyles } from '../styles/CatBreedCard.styles';
import { CatBreedCardProps } from '../interfaces/CatBreedCardProps';
import FavoriteFillIcon from '../../../assets/svg/favorite_fill.svg';

export const CatBreedCard: React.FC<CatBreedCardProps> = ({
  breed,
  onPress,
  isFavorite = false,
}) => {
  const styles = catBreedCardStyles;
  const imageUrl = breed.referenceImageId
    ? `https://cdn2.thecatapi.com/images/${breed.referenceImageId}.jpg`
    : null;

  const accessibilityLabel = `${breed.name}${breed.origin ? `, origin: ${breed.origin}` : ''}. ${breed.description || ''}. Life expectancy: ${breed.lifeSpan}. Energy level: ${breed.energyLevel} out of 5.${breed.temperament ? ` Temperament: ${breed.temperament}.` : ''}${isFavorite ? ' Marked as favorite.' : ''} Double tap to view details.`;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint="Opens details for this cat breed">
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
            accessibilityRole="image"
            accessibilityLabel={`Image of ${breed.name}`}
            accessible={false}
          />
        ) : (
          <View style={styles.placeholderContainer} accessible={false}>
            <Text style={styles.placeholderIcon} accessibilityRole="none">🐱</Text>
            <Text style={styles.placeholderText} accessibilityRole="none">No image available</Text>
          </View>
        )}
        {isFavorite && (
          <View style={styles.favoriteBadge} accessible={false}>
            <FavoriteFillIcon width={24} height={24} />
          </View>
        )}
      </View>
      <View style={styles.header} accessible={false}>
        <Text style={styles.name}>{breed.name}</Text>
        <Text style={styles.origin}>{breed.origin}</Text>
      </View>
      <Text style={styles.description} numberOfLines={2} accessible={false}>
        {breed.description}
      </Text>
      <View style={styles.tagsContainer} accessible={false}>
        <Text style={styles.tagsLabel}>Temperament:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Text style={styles.tags}>
            {breed.temperament || 'Not available'}
          </Text>
        </ScrollView>
      </View>
      <View style={styles.statsContainer} accessible={false}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Life expectancy:</Text>
          <Text style={styles.statValue}>{breed.lifeSpan}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Energy level:</Text>
          <Text style={styles.statValue}>{breed.energyLevel}/5</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

