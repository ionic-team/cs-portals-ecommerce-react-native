import React from 'react';
import { PortalView } from '@ionic/portals-react-native';
import { Styles } from '../shared';

export const HelpScreen: React.FC = () => {
  return (
    <PortalView
      name="shopwebapp"
      style={[Styles.flex]}
      initialContext={{ startingRoute: '/help' }}
    />
  );
};
