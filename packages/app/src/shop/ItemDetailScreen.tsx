import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import { Product } from '@portals-ecommerce/shared';
import { useProduct } from './useProduct';
import Styles from './Styles';
import { BlockButton, Colors, setForegroundColor } from '../shared';

export const ItemDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const { params } = useRoute<any>();
  const { getProduct, productImages } = useProduct();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (params.id) {
      setProduct(getProduct(params.id));
      product && navigation.setOptions({ title: product.title });
    }
  }, [product, getProduct, params, navigation]);

  const renderErrorView = () => (
    <View style={[Styles.center, Styles.flex]}>
      <Text style={styles.heading}>Something went wrong</Text>
      <Text style={styles.subheading}>Why don't you try again?</Text>
      <Button title="Back to Shopping" onPress={() => navigation.goBack()} />
    </View>
  );

  return (
    <View style={[Styles.bgWhite, Styles.flex]}>
      {!product ? (
        renderErrorView()
      ) : (
        <>
          <View style={styles.containerImage}>
            <Image
              source={productImages[product.id - 1]}
              style={styles.image}
            />
          </View>
          <View style={styles.containerDescription}>
            <Text style={styles.heading}>{product.title}</Text>
            <Text style={[setForegroundColor(Colors.medium), styles.price]}>
              ${product.price}
            </Text>
            <Text style={[styles.description]}>{product.description}</Text>
          </View>
          <BlockButton
            onPress={() => Alert.alert('You pressed me!')}
            title="Add to cart"
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
  },
  subheading: {
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 20,
  },
  containerImage: {
    height: '60%',
  },
  containerDescription: {
    padding: 10,
    justifyContent: 'flex-end',
    flex: 3,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  price: {
    marginVertical: 8,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 20,
  },
});
