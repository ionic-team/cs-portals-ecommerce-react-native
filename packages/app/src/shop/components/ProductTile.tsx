import React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Product } from '@portals-ecommerce/shared';
import { Colors, setForegroundColor, useProduct } from '../../shared';

type Props = { item: Product };

export const ProductTile: React.FC<Props> = ({ item }) => {
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
      <Text style={[setForegroundColor(Colors.medium), styles.text]}>
        ${item.price}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    margin: 10,
    marginRight: 'auto',
  },
  image: {
    width: 156,
    height: 142,
    borderRadius: 12,
  },
  text: {
    fontSize: 15,
    paddingTop: 5,
  },
});
