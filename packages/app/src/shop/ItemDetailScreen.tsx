import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { Product } from '@portals-ecommerce/shared';
import { Styles, useProduct } from '../shared';
import { BlockButton, Colors, setForegroundColor, useData } from '../shared';

export const ItemDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const { params } = useRoute<any>();
  const { getProduct, productImages } = useProduct();
  const { addToCart } = useData();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (params.id) {
      setProduct(getProduct(params.id));
      product && navigation.setOptions({ title: product.title });
    }
  }, [product, getProduct, params, navigation]);

  const renderErrorView = () => (
    <View style={[Styles.center, Styles.flex]}>
      <Text style={Styles.headingFontSize}>Something went wrong</Text>
      <Text style={[Styles.subHeadingFontSize, styles.subheading]}>
        Why don't you try again?
      </Text>
      <Button title="Back to Shopping" onPress={() => navigation.goBack()} />
    </View>
  );

  const handleAddToCart = (productToAdd: Product) => {
    addToCart(productToAdd);
    navigation.goBack();
  };

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
            <Text style={Styles.headingFontSize}>{product.title}</Text>
            <Text style={[setForegroundColor(Colors.medium), styles.price]}>
              ${product.price}
            </Text>
            <Text style={[styles.description]}>{product.description}</Text>
            <BlockButton
              onPress={() => handleAddToCart(product)}
              title="Add to cart"
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  subheading: {
    paddingTop: 10,
    textAlign: 'center',
  },
  containerImage: {
    height: '60%',
  },
  containerDescription: {
    padding: 15,
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
    marginVertical: 10,
    fontSize: 16,
    lineHeight: 20,
  },
});
