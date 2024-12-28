'use client';

import styled from 'styled-components';
import MySwiper from '@/components/BrandSwiper';
import { useTranslations } from 'next-intl';
import { IBrand } from '../interface/brand.interface';

export default function Brands(brands: { brands: IBrand }) {
  const t = useTranslations('Main');
  return (
    <BrandWrapper>
      <h4>{t('brand')}</h4>
      <MySwiper brands={brands.brands} />
    </BrandWrapper>
  );
}

const BrandWrapper = styled.div.attrs({ className: 'select-none' })`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  overflow-x: hidden;
  gap: 2rem;
  padding: 3rem 0;
  cursor: default;

  .brands {
    display: flex;
    gap: 5.75rem;
  }
`;
