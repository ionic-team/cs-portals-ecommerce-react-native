import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ShopStackScreens } from './shop';
import { CartStackScreens } from './cart';
import { ProfileScreen } from './profile';

const Tabs = createBottomTabNavigator();
const TabsContainer = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="ShopStack" component={ShopStackScreens} />
        <Tabs.Screen name="CartStack" component={CartStackScreens} />
        <Tabs.Screen name="Profile" component={ProfileScreen} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};
export default TabsContainer;
