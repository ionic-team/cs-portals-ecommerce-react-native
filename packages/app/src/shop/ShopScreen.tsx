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
import { Styles } from '../shared';

export const ShopScreen: React.FC = () => {
  const { products, mustHaves } = useProduct();

  const sections = [
    {
      title: 'Must Haves, Bestsellers & More',
      key: 'must-haves',
      data: [
        {
          key: 'must-haves-data',
          list: mustHaves,
          horizontal: true,
        },
      ],
    },
    {
      title: 'Products',
      key: 'products',
      data: [
        {
          key: 'products-data',
          list: products,
          horizontal: false,
        },
      ],
    },
  ];

  const renderSection = ({ item: section }: any) => {
    return section.horizontal ? (
      <FlatList
        horizontal
        data={section.list}
        renderItem={({ item }) => <FeaturedProductTile item={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalFlatListPaddingBottom}
      />
    ) : (
      <FlatList
        data={section.list}
        numColumns={2}
        renderItem={({ item }) => <ProductTile item={item} />}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={styles.flatListJustifyContent}
      />
    );
  };

  return (
    <View style={[Styles.flex, Styles.bgWhite]}>
      <SafeAreaView style={[Styles.flex, styles.viewMarginLeft]}>
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={sections}
          renderSectionHeader={({ section }) => (
            <Text style={[Styles.subHeadingFontSize, styles.sectionHeader]}>
              {section.title}
            </Text>
          )}
          renderItem={renderSection}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewMarginLeft: { marginLeft: 5 },
  flatListJustifyContent: { justifyContent: 'space-between' },
  horizontalFlatListPaddingBottom: { paddingBottom: 10 },
  sectionHeader: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
  },
});
