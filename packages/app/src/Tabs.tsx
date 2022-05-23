import React from 'react';
import { Button, StyleProp, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const style: StyleProp = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const DetailsScreen = () => (
  <View style={style}>
    <Text>Details</Text>
  </View>
);

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={style}>
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

const SettingsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={style}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ headerLargeTitle: true }}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Details" component={DetailsScreen} />
  </HomeStack.Navigator>
);

const SettingsStack = createNativeStackNavigator();
const SettingsStackScreen = () => (
  <SettingsStack.Navigator screenOptions={{ headerLargeTitle: true }}>
    <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    <SettingsStack.Screen name="Details" component={DetailsScreen} />
  </SettingsStack.Navigator>
);

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="HomeStack" component={HomeStackScreen} />
        <Tabs.Screen name="SettingsStack" component={SettingsStackScreen} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};
export default App;
