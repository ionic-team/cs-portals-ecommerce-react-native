import React from 'react';
import { PortalView } from '@ionic/portals-react-native';
import { Styles, useData } from '../shared';

export const ProfileScreen: React.FC = () => {
  const { user } = useData();
  return (
    <PortalView
      name="shopwebapp"
      style={[Styles.flex]}
      initialContext={{ startingRoute: '/user', user }}
    />
  );
};
