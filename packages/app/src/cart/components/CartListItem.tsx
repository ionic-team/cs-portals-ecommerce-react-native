import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { Product } from '@portals-ecommerce/shared';

import { Colors, Styles, useData, useProduct } from '../../shared';
import { QuantitySelector } from './QuantitySelector';

type Props = { productId: number; quantity: number };

export const CartListItem: React.FC<Props> = ({ productId, quantity }) => {
  const { getProduct, productImages } = useProduct();
  const { updateQuantity } = useData();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    setProduct(getProduct(productId));
  }, [productId, getProduct]);

  const handleAdd = () => {
    if (product && quantity < 10) {
      updateQuantity(product, 'add');
    }
  };

  const handleSubtract = () => {
    if (product && quantity > 0) {
      updateQuantity(product, 'remove');
    }
  };

  return (
    <View style={styles.itemContainer}>
      <Image
        source={productImages[productId - 1]}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={[Styles.subHeadingFontSize, styles.itemTitle]}>
          {product?.title}
        </Text>
        <View style={styles.metadataRow}>
          <QuantitySelector
            quantity={quantity}
            onAdd={() => handleAdd()}
            onSubtract={() => handleSubtract()}
          />
          <Text style={styles.price}>${product?.price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 104,
    height: 104,
    borderRadius: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    width: '100%',
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: 15,
    justifyContent: 'center',
  },
  itemTitle: {
    marginBottom: 8,
  },
  metadataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    color: Colors.medium,
    fontSize: 16,
  },
});
