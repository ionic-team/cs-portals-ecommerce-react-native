import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartScreen } from './CartScreen';

const CartStack = createNativeStackNavigator();
export const CartStackScreens = () => (
  <CartStack.Navigator
    screenOptions={{
      headerLargeTitle: true,
      headerLargeTitleShadowVisible: false,
    }}>
    <CartStack.Screen name="Cart" component={CartScreen} />
  </CartStack.Navigator>
);

export * from './CartScreen';
