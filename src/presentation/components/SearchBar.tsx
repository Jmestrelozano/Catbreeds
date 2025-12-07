import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { searchBarStyles } from '../styles/SearchBar.styles';
import { SearchBarProps } from '../interfaces/SearchBarProps';
import SearchIcon from '../../../assets/svg/search.svg';
import FavoriteFillIcon from '../../../assets/svg/favorite_fill.svg';

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder,
  showIcon = true,
  showFavoriteButton = false,
  onFavoritePress,
  accessibilityLabel = 'Search',
  accessibilityHint,
}) => {
  const styles = searchBarStyles;
  
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        {showIcon && (
          <View style={styles.searchIconContainer}>
            <SearchIcon width={20} height={20} testID="search-icon" />
          </View>
        )}
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          accessibilityRole="search"
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityHint}
        />
      </View>
      {showFavoriteButton && onFavoritePress && (
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onFavoritePress}
          accessibilityRole="button"
          accessibilityLabel="View favorites"
          accessibilityHint="Opens the favorites screen">
          <FavoriteFillIcon width={28} height={28} />
        </TouchableOpacity>
      )}
    </View>
  );
};

