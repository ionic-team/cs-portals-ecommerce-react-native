import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShopScreen } from './ShopScreen';
import { ItemDetailScreen } from './ItemDetailScreen';
import { ProductProvider } from './ProductProvider';

const ShopStack = createNativeStackNavigator();
export const ShopStackScreens = () => (
  <ProductProvider>
    <ShopStack.Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
      }}>
      <ShopStack.Screen name="Shop" component={ShopScreen} />
      <ShopStack.Screen name="ItemDetail" component={ItemDetailScreen} />
    </ShopStack.Navigator>
  </ProductProvider>
);

export * from './ShopScreen';
