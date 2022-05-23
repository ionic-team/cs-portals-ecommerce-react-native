import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Button, View } from 'react-native';
import Styles from './Styles';

export const ItemDetailScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={Styles.center}>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};
