import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { addPortal, register } from '@ionic/portals-react-native';
import { PORTALS_API_KEY } from '@env';

import { DataProvider, ProductProvider } from './src/shared';
import TabsContainer from './src/Tabs';

register(PORTALS_API_KEY);
addPortal({
  name: 'shopwebapp',
  startDir: 'portals/shopwebapp',
  initialContext: { startingRoute: '/help' },
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [barStyle, setBarStyle] = useState<StatusBarStyle>('light-content');

  useEffect(() => {
    setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
  }, [isDarkMode]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={barStyle} />
      <SafeAreaProvider>
        <DataProvider>
          <ProductProvider>
            <TabsContainer />
          </ProductProvider>
        </DataProvider>
      </SafeAreaProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
});

export default App;
