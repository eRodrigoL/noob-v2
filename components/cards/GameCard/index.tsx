import React from 'react';
import { Text, Image, Pressable } from 'react-native';
import stylesGameCard from './styles';
import { images } from '@constants/index';

interface GameCardProps {
  title: string;
  year?: number;
  image?: string;
  rating: string;
  onPress: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ title, year, image, rating, onPress }) => {
  return (
    <Pressable style={stylesGameCard.card} onPress={onPress}>
      <Image source={image ? { uri: image } : images.unavailable} style={stylesGameCard.image} />
      <Text style={stylesGameCard.title}>
        {title} {year ? `(${year})` : ''}
      </Text>
      <Text style={stylesGameCard.rating}>{rating}</Text>
    </Pressable>
  );
};

export default GameCard;
