import React, { useCallback, useEffect, useRef } from 'react';
import {
  PortalView,
  subscribe,
  unsubscribe,
} from '@ionic/portals-react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { Styles, useData } from '../shared';

export const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation<BottomTabNavigationProp<any>>();
  const { user, cart, clearCart } = useData();
  const checkoutSubRef = useRef<number>();
  const dismissSubRef = useRef<number>();

  const subscribeToCheckout = useCallback(async () => {
    checkoutSubRef.current = await subscribe('cart:checkout', ({ data }) => {
      if (data.result === 'success') {
        clearCart();
        navigation.goBack();
      }
    });
  }, [clearCart, navigation]);

  const subscribeToModalDismiss = useCallback(async () => {
    dismissSubRef.current = await subscribe('modal:dismiss', () => {
      navigation.goBack();
    });
  }, [navigation]);

  useEffect(() => {
    subscribeToCheckout();
    subscribeToModalDismiss();

    return () => {
      unsubscribe('cart:checkout', checkoutSubRef.current!);
      unsubscribe('modal:dismiss', dismissSubRef.current!);
    };
  }, [subscribeToCheckout, subscribeToModalDismiss]);

  return (
    <PortalView
      name="shopwebapp"
      style={[Styles.flex]}
      initialContext={{ startingRoute: '/checkout', user, cart }}
    />
  );
};
