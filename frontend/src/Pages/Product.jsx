import React, { useContext } from 'react'
import {ShopContext} from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../components/breadcrums/Breadcrum';
import ProductDisplay from '../components/productDisplay/ProductDisplay';
import DescriptionBox from '../components/descriptionBox/DescriptionBox';
import RelatedProducts from '../components/relatedProducts/RelatedProducts';

function Product() {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  if (!all_product) {
    return <div>Loading...</div>;
  }
  const product = all_product.find((e)=> e.id === Number(productId));
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
}

export default Product
