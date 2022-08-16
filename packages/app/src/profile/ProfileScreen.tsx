import React, { useCallback, useEffect, useRef } from 'react';
import {
  PortalView,
  subscribe,
  unsubscribe,
} from '@ionic/portals-react-native';
import { Styles, useData } from '../shared';
import { User } from '@portals-ecommerce/shared';

export const ProfileScreen: React.FC = () => {
  const { user, updateUser } = useData();
  const subRef = useRef<number>();

  const subscribeToUserUpdated = useCallback(async () => {
    subRef.current = await subscribe('user:updated', ({ data }) =>
      updateUser(data as User),
    );
  }, [updateUser]);

  useEffect(() => {
    subscribeToUserUpdated();
    return () => unsubscribe('user:updated', subRef.current!);
  }, [subscribeToUserUpdated]);

  return (
    <PortalView
      portal={{
        name: 'shopwebapp',
        initialContext: {
          startingRoute: '/user',
          user,
        },
      }}
      style={[Styles.flex]}
    />
  );
};
