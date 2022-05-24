import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import Styles from './Styles';

export const ShopScreen: React.FC = () => {
  const navigation = useNavigation<BottomTabNavigationProp<any>>();
  return (
    <View style={Styles.center}>
      <Text>Shop Screen</Text>
      <Button
        title="Get this item!"
        onPress={() => navigation.navigate('ItemDetail')}
      />
    </View>
  );
};
