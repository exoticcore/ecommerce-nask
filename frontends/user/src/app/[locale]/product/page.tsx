'use client';

import styled from 'styled-components';
import variables from '@/scss/variables.module.scss';

import Navigation from '@/components/product/Navigation';
import ProductImage from '@/components/product/ProductImage';
import ProductDetail from '@/components/product/ProductDetail';
import ProductDescription from '@/components/product/ProductDescription';
import FeatureProducts from '@/components/FeatureProducts';

const navi = ['Browse Products', 'Men', 'Black Clothes'];

export default function Product() {
  return <ProductWrapper></ProductWrapper>;
}

const ProductWrapper = styled.div`
  width: 100%;
  min-height: 60svh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  cursor: default;

  .product-main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    padding: 1rem 0;
    position: relative;
  }
`;
