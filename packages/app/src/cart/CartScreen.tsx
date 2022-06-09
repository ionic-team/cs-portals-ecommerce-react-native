import React from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BlockButton, Colors, Styles, useData } from '../shared';
import { CartListItem } from './components/CartListItem';

export const CartScreen: React.FC = () => {
  const navigation = useNavigation<BottomTabNavigationProp<any>>();
  const { cart } = useData();

  const renderEmptyCartView = () => (
    <View style={[Styles.center, Styles.flex]}>
      <Text style={Styles.headingFontSize}>Your cart is empty</Text>
      <Button title="Go Shop!" onPress={() => navigation.navigate('Shop')} />
    </View>
  );

  return (
    <View style={[Styles.bgWhite, Styles.flex]}>
      {!cart?.basket.length ? (
        renderEmptyCartView()
      ) : (
        <SafeAreaView style={[Styles.flex]}>
          <FlatList
            style={styles.bodyMargin}
            data={cart!.basket}
            renderItem={({ item }) => (
              <CartListItem
                productId={item.productId}
                quantity={item.quantity}
              />
            )}
            keyExtractor={(item) => item.productId.toString()}
          />
          <View style={[styles.horizontalRule, styles.bodyMargin]} />
          <View style={[styles.bodyMargin, styles.row]}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.label}>{`$${cart!.subTotal}`}</Text>
          </View>
          <View style={[styles.bodyMargin, styles.row]}>
            <Text style={styles.label}>Shipping</Text>
            <Text style={styles.label}>Standard - Free</Text>
          </View>
          <View style={[styles.bodyMargin, styles.row, styles.totalRowMargin]}>
            <Text style={[styles.label, styles.boldLabel]}>
              Estimated Total
            </Text>
            <Text style={[styles.label, styles.boldLabel]}>
              {`$${cart!.subTotal}`} + Tax
            </Text>
          </View>
          <BlockButton title="Checkout" onPress={() => {}} />
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bodyMargin: {
    marginHorizontal: 15,
  },
  horizontalRule: {
    backgroundColor: Colors.medium,
    height: 1,
    marginTop: 15,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    color: Colors.medium,
    fontSize: 16,
  },
  boldLabel: {
    color: Colors.dark,
    fontWeight: 'bold',
  },
  totalRowMargin: {
    marginBottom: 20,
  },
});
