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

export const CatBreedCard: React.FC<CatBreedCardProps> = ({
  breed,
  onPress,
  isFavorite = false,
}) => {
  const styles = catBreedCardStyles;
  const imageUrl = breed.referenceImageId
    ? `https://cdn2.thecatapi.com/images/${breed.referenceImageId}.jpg`
    : null;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.imageContainer}>
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
        {isFavorite && (
          <View style={styles.favoriteBadge}>
            <Text style={styles.favoriteIcon}>❤️</Text>
          </View>
        )}
      </View>
      <View style={styles.header}>
        <Text style={styles.name}>{breed.name}</Text>
        <Text style={styles.origin}>{breed.origin}</Text>
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {breed.description}
      </Text>
      <View style={styles.tagsContainer}>
        <Text style={styles.tagsLabel}>Temperament:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Text style={styles.tags}>
            {breed.temperament || 'Not available'}
          </Text>
        </ScrollView>
      </View>
      <View style={styles.statsContainer}>
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

