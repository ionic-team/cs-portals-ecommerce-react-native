import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartScreen } from './CartScreen';

const CartStack = createNativeStackNavigator();
export const CartStackScreens = () => (
  <CartStack.Navigator screenOptions={{ headerLargeTitle: true }}>
    <CartStack.Screen name="Cart" component={CartScreen} />
  </CartStack.Navigator>
);

/** Barrel Files */
export * from './CartScreen';
