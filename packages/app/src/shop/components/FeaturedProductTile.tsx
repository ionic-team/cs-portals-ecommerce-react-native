import React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Product } from '@portals-ecommerce/shared';
import { useProduct } from '../useProduct';

type Props = { item: Product };

export const FeaturedProductTile: React.FC<Props> = ({ item }) => {
  const navigation = useNavigation<any>();
  const { productImages } = useProduct();

  return (
    <Pressable
      style={styles.item}
      onPress={() => navigation.navigate('ItemDetail', { id: item.id })}>
      <Image
        source={productImages[item.id - 1]}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.text}>{item.title}</Text>
      <Text style={[styles.price, styles.text]}>${item.price}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    margin: 10,
    marginRight: 0,
  },
  image: {
    width: 208,
    height: 208,
    borderRadius: 12,
  },
  text: {
    fontSize: 15,
    paddingTop: 5,
  },
  price: {
    color: '#888',
  },
});
