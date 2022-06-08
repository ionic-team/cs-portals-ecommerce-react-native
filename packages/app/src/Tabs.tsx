/* eslint-disable curly */
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ShopStackScreens } from './shop';
import { CartStackScreens } from './cart';
import { ProfileScreen } from './profile';
import { Colors, useData } from './shared';

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

const badgeStyle = {
  tabBarBadge: '',
  tabBarBadgeStyle: {
    backgroundColor: Colors.warning,
    marginTop: 6,
    marginLeft: 10,
    minWidth: 8,
    maxHeight: 8,
    borderRadius: 4,
  },
};

const iconStyle = { width: 22, height: 22 };

const Tabs = createBottomTabNavigator();
const TabsContainer = () => {
  const { cart } = useData();
  const [badgeOptions, setBadgeOptions] = useState({});

  useEffect(() => {
    setBadgeOptions(cart?.basket.length ? badgeStyle : {});
  }, [cart]);

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
          options={badgeOptions}
        />
        <Tabs.Screen name="Profile" component={ProfileScreen} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};
export default TabsContainer;
