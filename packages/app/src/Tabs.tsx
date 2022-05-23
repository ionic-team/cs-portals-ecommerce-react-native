import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ShopStackScreens } from './shop';
import { CartStackScreens } from './cart';
import { ProfileScreen } from './profile';

const getIconImage = (name: string) => {
  switch (name) {
    case 'CartStack':
      return require('./assets/images/tab-cart-icon.png');
    case 'Profile':
      return require('./assets/images/tab-profile-icon.png');
    default:
      return require('./assets/images/tab-shop-icon.png');
  }
};

const iconStyle = { width: 22, height: 22 };

const Tabs = createBottomTabNavigator();
const TabsContainer = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            return (
              <Image
                source={getIconImage(route.name)}
                style={{ ...iconStyle, tintColor: color }}
              />
            );
          },
          headerShown: false,
          tabBarShowLabel: false,
        })}>
        <Tabs.Screen name="ShopStack" component={ShopStackScreens} />
        <Tabs.Screen
          name="CartStack"
          component={CartStackScreens}
          options={{ tabBarBadge: 3 }}
        />
        <Tabs.Screen name="Profile" component={ProfileScreen} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};
export default TabsContainer;
