/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

type TabStackParamList = {
  Home: undefined;
  Details: { itemId: number; otherParam: string } | undefined;
};

type HomeScreenProps = NativeStackScreenProps<TabStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          })
        }
      />
    </View>
  );
};

type DetailsScreenProps = NativeStackScreenProps<TabStackParamList, 'Details'>;
const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { itemId, otherParam } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>

      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
};

const Stack = createNativeStackNavigator<TabStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerLargeTitle: true }}>
        <Stack.Screen name="Home" options={{ title: 'Shop' }}>
          {(props) => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          initialParams={{ itemId: 42 }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
