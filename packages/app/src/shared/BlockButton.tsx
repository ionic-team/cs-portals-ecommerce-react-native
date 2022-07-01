import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import { Colors } from './Colors';

type BlockButtonProps = {
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
  title: string;
};

export const BlockButton: React.FC<BlockButtonProps> = ({ onPress, title }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? '#3171e0' : Colors.primary },
      ]}
      onPress={(e) => onPress && onPress(e)}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.white,
  },
});
