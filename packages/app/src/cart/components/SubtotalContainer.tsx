import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../shared';

type Props = {
  subTotal: number;
};

export const SubtotalContainer: React.FC<Props> = ({ subTotal }) => (
  <>
    <View style={styles.horizontalRule} />
    <View style={styles.row}>
      <Text style={styles.label}>Subtotal</Text>
      <Text style={styles.label}>${subTotal}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Shipping</Text>
      <Text style={styles.label}>Standard - Free</Text>
    </View>
    <View style={[styles.row, styles.totalRowMargin]}>
      <Text style={[styles.label, styles.boldLabel]}>Estimated Total</Text>
      <Text style={[styles.label, styles.boldLabel]}>${subTotal} + Tax</Text>
    </View>
  </>
);

const styles = StyleSheet.create({
  horizontalRule: {
    backgroundColor: Colors.medium,
    height: 1,
    marginTop: 15,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    color: Colors.medium,
    fontSize: 16,
  },
  boldLabel: {
    color: Colors.dark,
    fontWeight: 'bold',
  },
  totalRowMargin: {
    marginBottom: 20,
  },
});
