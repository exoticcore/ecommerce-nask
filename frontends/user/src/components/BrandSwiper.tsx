'use client';

import styled from 'styled-components';
import variables from '@/scss/variables.module.scss';
import Image from 'next/image';

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Chanel from '../../public/chenel.png';
import CK from '../../public/ck.png';
import Guess from '../../public/guess.png';
import Gucci from '../../public/gucci.png';
import Dior from '../../public/dior.png';
import Prada from '../../public/prada.png';
import Zara from '../../public/zara.png';
import Addidas from '../../public/adidas.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getBrandListAPI } from '../utils/api';
import { IBrand } from '../interface/brand.interface';
import ImageWithFallback from './shared/ImageWithFallback';

export default function MySwiper({ brands }: { brands: IBrand }) {
  return brands.brands.length >= 8 ? (
    <SwiperStyle>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 500,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        speed={2000}
        breakpoints={{
          0: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          700: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          1080: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
        }}
      >
        {brands.brands.map((brand, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="brands__image">
                <ImageWithFallback
                  src={brand.image_url}
                  alt={brand.title}
                  fill
                  className="brands__image-fit"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </SwiperStyle>
  ) : (
    ''
  );
}

const SwiperStyle = styled.div.attrs({ className: 'select-none' })`
  width: 100%;

  .brands__image {
    cursor: pointer;
    position: relative;
    width: 7rem;
    height: 7rem;
    transition: ${variables.transition};

    &-fit {
      transition: ${variables.transition};
      object-fit: contain;
      transform: scale(0.9);

      &:hover {
        transform: scale(1);
      }
    }
  }
`;
