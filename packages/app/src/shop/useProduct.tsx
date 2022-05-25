/* eslint-disable curly */
import { useContext } from 'react';
import { ProductContext } from './ProductProvider';

export const useProduct = () => {
  const { products, mustHaves, productImages } = useContext(ProductContext);

  if (ProductContext === undefined)
    throw new Error('useProduct must be used within a ProductProvider');

  return { products, mustHaves, productImages };
};
