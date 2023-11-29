import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DataProvider, ProductProvider } from './src/shared';
import TabsContainer from './src/Tabs';
import initializePortals from './src/initializePortals';

initializePortals();

const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const [barStyle, setBarStyle] = useState<StatusBarStyle>('light-content');

  useEffect(() => {
    setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
  }, [isDarkMode]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={barStyle} backgroundColor="#ffffff" />
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
