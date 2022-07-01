import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartScreen } from './CartScreen';
import { CheckoutScreen } from './CheckoutScreen';

const CartStack = createNativeStackNavigator();
export const CartStackScreens = () => (
  <CartStack.Navigator
    screenOptions={{
      headerLargeTitle: true,
      headerLargeTitleShadowVisible: false,
    }}>
    <CartStack.Screen name="Cart" component={CartScreen} />
    <CartStack.Screen
      name="Checkout"
      component={CheckoutScreen}
      options={{
        presentation: 'modal',
        headerShown: false,
      }}
    />
  </CartStack.Navigator>
);

export * from './CartScreen';
export * from './CheckoutScreen';
