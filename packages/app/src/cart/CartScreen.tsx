import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export const CartScreen: React.FC = () => {
  const navigation = useNavigation<BottomTabNavigationProp<any>>();
  return (
    <View style={styles.center}>
      <Text>Cart Screen</Text>
      <Button title="Go Shop!" onPress={() => navigation.navigate('Shop')} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});
