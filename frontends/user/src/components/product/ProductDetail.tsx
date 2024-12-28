'use server';

import styled from 'styled-components';
import variables from '@/scss/variables.module.scss';
import ProductRatting from './ProductRatting';
import ProductOption from './ProductOption';
import ProductAddCart from './ProductAddCart';
import axios from 'axios';
import ProductTitle from './ProductTitle';
import IProduct from '../../interface/product.interface';

const productDetail = {
  title: 'Black Cloth',
  brand: 'zara',
  rating: 2.9,
  price: 2500,
  size: ['s', 'm', 'l'],
  color: [
    {
      name: 'black',
      hex: 'black',
    },
    {
      name: 'grey',
      hex: '#808080',
    },
  ],
};

export default async function ProductDetail(data: { data: IProduct }) {
  const rating = data.data.rating || '0.00';

  return (
    <div className="product-main-detail">
      <div className="product-detail__title">
        <h4>{data.data.translate[0].title}</h4>
        {data.data.brand && <span>{data.data.brand.title}</span>}
      </div>
      {/* <FetchProduct /> */}
      <ProductRatting ratting={parseFloat(rating)} />
      {/* <h4>${data.data.s_price}</h4> */}
      {data.data.s_price ? (
        <div className="flex gap-2 items-center">
          <h4 className="price">
            ฿{Number(data.data.s_price).toLocaleString()}
          </h4>
          <span className="original_price">
            ฿{Number(data.data.price).toLocaleString()}
          </span>
        </div>
      ) : (
        <h4 className="price">{data.data.price}</h4>
      )}
      <span className="product-detail__information">
        {data.data.translate[0].description}
      </span>
      <hr />
      <ProductOption data={data.data} />
      <hr />
      <ProductAddCart />
    </div>
  );
}

// const ProductDetailWrapper = styled.div.attrs({ className: 'select-none' })`
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   width: 100%;
//   gap: 1.2rem;

//   .product-detail {
//     &__title {
//       display: flex;
//       flex-direction: column;
//       gap: 0.2rem;
//       span {
//         color: ${variables.grey400};
//         text-transform: capitalize;
//         cursor: pointer;

//         &:hover {
//           color: ${variables.primary600};
//         }
//       }
//     }

//     &__rating {
//       color: #ffdd00;
//     }
//   }

//   hr {
//     border-width: 0.1rem;
//     margin: 0.65rem 0;
//   }
// `;
