import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DataProvider } from './src/shared/DataProvider';
import TabsContainer from './src/Tabs';
// import { register } from '@ionic/portals-react-native';
// import { PORTALS_API_KEY } from '@env';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [barStyle, setBarStyle] = useState<StatusBarStyle>('light-content');

  //useEffect(() => register(PORTALS_API_KEY));

  useEffect(() => {
    setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
  }, [isDarkMode]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={barStyle} />
      <SafeAreaProvider>
        <DataProvider>
          <TabsContainer />
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
