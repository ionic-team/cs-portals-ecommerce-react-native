import React, { useState } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { Colors } from '../../shared';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export const HelpHeaderButton: React.FC = () => {
  const navigation = useNavigation<BottomTabNavigationProp<any>>();

  const [opacity, setOpacity] = useState<number>(1.0);

  return (
    <Pressable
      onPress={() => navigation.navigate('Help')}
      onPressIn={() => setOpacity(0.25)}
      onPressOut={() => setOpacity(1.0)}>
      <Image
        style={[styles.icon, { opacity }]}
        source={require('../../assets/images/help-circle-outline.png')}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    tintColor: Colors.primary,
  },
});
