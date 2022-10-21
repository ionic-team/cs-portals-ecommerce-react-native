import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  PortalView,
  subscribe,
  syncOne,
  unsubscribe,
} from '@ionic/portals-react-native';
import { ProductTile } from './components';
import { LiveUpdate, Styles, useProduct } from '../shared';
import { useNavigation } from '@react-navigation/native';

const FeaturedProductPortal: React.FC = () => {
  const topic = 'featured:select-item';
  const navigation = useNavigation<any>();
  const selectItemRef = useRef<number>();

  const subscribeToSelectItem = useCallback(async () => {
    selectItemRef.current = await subscribe(topic, ({ data: id }) => {
      navigation.navigate('ItemDetail', { id });
    });
  }, [navigation, selectItemRef]);

  useEffect(() => {
    subscribeToSelectItem();

    return () => unsubscribe(topic, selectItemRef.current!);
  }, [subscribeToSelectItem]);

  return (
    <PortalView
      portal={{ name: 'featuredproductsapp' }}
      style={styles.portalContainer}
    />
  );
};

const LoadingTextContainer: React.FC = () => (
  <View style={styles.loadingContainer}>
    <Text>Applying Live Update...</Text>
  </View>
);

export const ShopScreen: React.FC = () => {
  const { products } = useProduct();
  const refreshLUSubRef = useRef<number>();
  const topic = 'live-update:sync';
  const [showPortal, setShowPortal] = useState<boolean>(true);

  /**
   * WARNING!
   *
   * Ionic recommends applying Live Updates in the default background mode.
   * Manual syncing is implemented solely for ** DEMO PURPOSES **.
   */
  const subscribeToRefreshLiveUpdate = useCallback(async () => {
    refreshLUSubRef.current = await subscribe(topic, async () => {
      try {
        setShowPortal(false);
        await syncOne(LiveUpdate.appId);
      } catch (error) {
        console.log('Live Update failed', error);
      } finally {
        setShowPortal(true);
      }
    });
  }, [refreshLUSubRef]);

  useEffect(() => {
    subscribeToRefreshLiveUpdate();

    return () => {
      unsubscribe(topic, refreshLUSubRef.current!);
    };
  }, [subscribeToRefreshLiveUpdate]);

  return (
    <View style={[Styles.flex, Styles.bgWhite]}>
      <SafeAreaView style={[Styles.flex, styles.viewMarginLeft]}>
        <ScrollView>
          {showPortal ? <FeaturedProductPortal /> : <LoadingTextContainer />}
          <Text style={[Styles.subHeadingFontSize, styles.sectionHeader]}>
            Products
          </Text>
          <View style={styles.productArray}>
            {products.map((item) => (
              <ProductTile item={item} key={item.id.toString()} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewMarginLeft: { marginLeft: 5 },
  portalContainer: {
    height: 400,
    width: '100%',
  },
  productArray: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  sectionHeader: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  loadingContainer: {
    height: 400,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
