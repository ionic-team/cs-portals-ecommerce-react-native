import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { ImageSourcePropType } from 'react-native';
import { Product, ShopAPI } from '@portals-ecommerce/shared';

export const ProductContext = createContext<{
  products: Product[];
  mustHaves: Product[];
  productImages: ImageSourcePropType[];
  getProduct: (id: number) => Product | undefined;
}>({
  products: [],
  mustHaves: [],
  productImages: [],
  getProduct: () => {
    throw new Error('Method not implemented');
  },
});

export const ProductProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [mustHaves, setMustHaves] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(ShopAPI.getProducts());
  }, []);

  useEffect(() => {
    setMustHaves(products.filter((p) => p.category === 'MustHaves'));
  }, [products]);

  const productImages = [
    require('@portals-ecommerce/shared/assets/images/capacitor-hat.png'),
    require('@portals-ecommerce/shared/assets/images/portals-tote.png'),
    require('@portals-ecommerce/shared/assets/images/capacitor-mask.png'),
    require('@portals-ecommerce/shared/assets/images/portals-shirt.png'),
    require('@portals-ecommerce/shared/assets/images/capacitor-shirt.png'),
    require('@portals-ecommerce/shared/assets/images/capacitor-sticker.png'),
    require('@portals-ecommerce/shared/assets/images/capacitor-bottle.png'),
    require('@portals-ecommerce/shared/assets/images/ionitron-ascii-shirt.png'),
    require('@portals-ecommerce/shared/assets/images/ionic-hoodie.png'),
    require('@portals-ecommerce/shared/assets/images/ionic-shirt.png'),
    require('@portals-ecommerce/shared/assets/images/ionitron-sticker.png'),
    require('@portals-ecommerce/shared/assets/images/stencil-shirt.png'),
    require('@portals-ecommerce/shared/assets/images/stencil-pin.png'),
    require('@portals-ecommerce/shared/assets/images/ionic-sticker.png'),
    require('@portals-ecommerce/shared/assets/images/ionitron-shirt.png'),
  ];

  const getProduct = (id: number) => products.find((p) => p.id === id);

  return (
    <ProductContext.Provider
      value={{ products, mustHaves, productImages, getProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
