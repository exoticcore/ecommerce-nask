'use server';

// export default function Index() {
//   const t = useTranslations('Index');
//   return <h1>{t('title')}</h1>;
// }

// import styled from 'styled-components';
import Marketing from '@/components/Marketing';
import Brands from '@/components/Brands';
import Qoutes from '@/components/Quotes';
import CurratedPicks from '@/components/CurratedPicks';
import Feature from '@/components/Feature';
import Promotion from '@/components/Promotion';
import Subscribe from '@/components/Subscribe';
import Carousel from '@/components/Carousel';
import FeatureProducts from '@/components/FeatureProducts';
import { getBrandListAPI } from '../../utils/api';
import { IBrand } from '../../interface/brand.interface';

export default async function Home() {
  const brands: IBrand | null = await getBrandListAPI();
  return (
    <div className="main">
      <Carousel />
      {brands ? <Brands brands={brands} /> : ''}
      <Qoutes />
      <CurratedPicks />
      <FeatureProducts isScroll={true} perView={3} isGeneral={false} />
      <Promotion />
      <Subscribe />
    </div>
  );
}

// const HomeStyle = styled.main.attrs({ className: 'main' })`
//   padding: 1rem 0;
// `;
