'use server';

import styled from 'styled-components';
import variables from '@/scss/variables.module.scss';

import Navigation from '@/components/product/Navigation';
import ProductImage from '@/components/product/ProductImage';
import ProductDetail from '@/components/product/ProductDetail';
import ProductDescription from '@/components/product/ProductDescription';
import FeatureProducts from '@/components/FeatureProducts';
import axios from 'axios';
import { getTranslations } from 'next-intl/server';
import IProduct from '../../../../interface/product.interface';

// let navi = ['Browse Products', 'Men', 'Black Clothes'];

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const slug = params.slug;

  const product = await fetch(
    `http://localhost:3001/api/v1/catalog/product/slug/${slug}`
  ).then((res) => res.json());

  return {
    title: product.translate[0].title,
    description: product.translate[0].information || product.translate[0].title,
  };
}

export default async function Product(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const t = await getTranslations('Navbar');
  const lang = await getTranslations();

  const { data }: { data: IProduct } = await axios.get(
    `http://localhost:3001/api/v1/catalog/product/slug/${
      params.slug
    }?lang=${lang('locale')}`
  );

  const images = [];
  const navi: { title: string; link?: string }[] = [
    { title: t('shop'), link: `shop` },
  ];

  if (data.image_url) images.push(data.image_url);

  if (data.media?.length) {
    data.media.map((image) => {
      images.push(image);
    });
  }

  // data.selection.map((select) => {
  //   if (select.image_url) images.push(select.image_url);
  // });

  navi.push({ title: data.subcat_attr.translate[0].name });
  navi.push({ title: data.translate[0].title });

  return (
    <div className="product">
      <Navigation navigate={navi} />
      <div className="product-main">
        <ProductImage images={images} />
        <ProductDetail data={data} />
      </div>
      <ProductDescription data={data} />
      {/* <FeatureProducts isScroll={false} perView={5} isGeneral={true} /> */}
    </div>
  );
}

// const ProductWrapper = styled.div`
//   width: 100%;
//   min-height: 60svh;
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
//   cursor: default;

//   .product-main {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 3rem;
//     padding: 1rem 0;
//     position: relative;
//   }
// `;
