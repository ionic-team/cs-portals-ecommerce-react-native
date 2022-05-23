import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.center}>
      <Text>Profile Screen</Text>
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
