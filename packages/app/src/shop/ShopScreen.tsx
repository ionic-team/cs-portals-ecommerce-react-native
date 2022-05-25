import React from 'react';
import {
  FlatList,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useProduct } from './useProduct';
import { FeaturedProductTile, ProductTile } from './components';

export const ShopScreen: React.FC = () => {
  const { products, mustHaves } = useProduct();

  const SECTIONS = [
    {
      title: 'Must Haves, Bestsellers & More',
      horizontal: true,
      data: mustHaves,
    },
    {
      title: 'Punk and hardcore',
      data: products,
    },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={SECTIONS}
          renderSectionHeader={({ section }) => (
            <>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              {section.horizontal ? (
                <FlatList
                  horizontal
                  data={mustHaves}
                  renderItem={({ item }) => <FeaturedProductTile item={item} />}
                  showsHorizontalScrollIndicator={false}
                />
              ) : null}
            </>
          )}
          renderItem={({ item, section }) => {
            if (section.horizontal) {
              return null;
            }
            return <ProductTile item={item} />;
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sectionHeader: {
    fontSize: 20,
    marginTop: 0,
    marginBottom: 5,
  },
  item: {
    margin: 10,
    marginLeft: 0,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemText: {
    marginTop: 5,
  },
});
