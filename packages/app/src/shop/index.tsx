import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShopScreen } from './ShopScreen';
import { ItemDetailScreen } from './ItemDetailScreen';

const ShopStack = createNativeStackNavigator();
export const ShopStackScreens = () => (
  <ShopStack.Navigator screenOptions={{ headerLargeTitle: true }}>
    <ShopStack.Screen name="Shop" component={ShopScreen} />
    <ShopStack.Screen name="ItemDetail" component={ItemDetailScreen} />
  </ShopStack.Navigator>
);

/** Barrel Files */
export * from './ShopScreen';
