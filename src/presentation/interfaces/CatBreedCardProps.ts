import { CatBreed } from '../../domain/entities/CatBreed';

export interface CatBreedCardProps {
  breed: CatBreed;
  onPress?: () => void;
  isFavorite?: boolean;
}

