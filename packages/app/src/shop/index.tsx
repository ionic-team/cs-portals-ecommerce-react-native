import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShopScreen } from './ShopScreen';
import { ItemDetailScreen } from './ItemDetailScreen';
import { HelpScreen } from './HelpScreen';
import { HelpHeaderButton } from './components';

const ShopStack = createNativeStackNavigator();
export const ShopStackScreens = () => (
  <ShopStack.Navigator>
    <ShopStack.Screen
      options={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
      }}
      name="Shop"
      component={ShopScreen}
    />
    <ShopStack.Screen
      name="ItemDetail"
      component={ItemDetailScreen}
      options={{
        title: '',
        headerRight: () => <HelpHeaderButton />,
      }}
    />
    <ShopStack.Screen
      name="Help"
      component={HelpScreen}
      options={{
        title: '',
        headerBackTitleVisible: false,
        headerShadowVisible: false,
      }}
    />
  </ShopStack.Navigator>
);

export * from './ShopScreen';
export * from './ItemDetailScreen';
