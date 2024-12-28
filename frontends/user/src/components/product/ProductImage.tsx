'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Controller } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/bundle';
import { useAppSelector } from '../../hooks';
import ImageWithFallback from '../shared/ImageWithFallback';

export default function ProductImage(images: { images: string[] }) {
  const [mainSwiper, setMainSwiper] = useState<SwiperType>();
  const [previewSwiper, setPreviewSwiper] = useState<SwiperType>();
  const [activeIndex, setActiveIndex] = useState<number>();
  const selectState = useAppSelector((state) => state.addToCart);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (selectState.index) {
      mainSwiper?.slideTo(selectState.index, 300);
    }
  }, [selectState]);

  return (
    <div className="product-main-images">
      <div className="main-product-image">
        <Swiper
          modules={[Navigation, Controller]}
          slidesPerView={1}
          spaceBetween={10}
          loop={false}
          navigation
          onSwiper={(swiper) => {
            setMainSwiper(swiper);
            setActiveIndex(swiper.activeIndex);
          }}
          onRealIndexChange={(element) => {
            previewSwiper?.slideTo(element.activeIndex, 300);
            setActiveIndex(element.activeIndex);
          }}
        >
          {images.images.map((productImage, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="product-image pt-[100%]">
                  <Image
                    alt=""
                    src={productImage}
                    sizes="100vh"
                    fill
                    className="w-full h-full top-0 left-0 object-cover object-top"
                    priority
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className={isLoading ? 'hidden' : 'preview-product-image h-0'}>
        <Swiper
          spaceBetween={10}
          loop={false}
          onSwiper={(swiper) => {
            setPreviewSwiper(swiper);
          }}
          onAfterInit={() => {
            setIsLoading(false);
          }}
          breakpoints={{
            0: {
              slidesPerView: 4.5,
            },
            // 850: {
            //   slidesPerView: 2.8,
            // },
            // 930: {
            //   slidesPerView: 3.2,
            // },
            // 1024: {
            //   slidesPerView: 3.5,
            // },
            // 1280: {
            //   slidesPerView: 4.5,
            // },
          }}
        >
          {images.images.map((productImage, index) => {
            return (
              <SwiperSlide key={index}>
                <div
                  className={
                    index === activeIndex
                      ? 'preview-image active pt-[100%]'
                      : 'preview-image pt-[100%]'
                  }
                  onClick={() => mainSwiper?.slideTo(index, 300)}
                >
                  <Image
                    alt=""
                    src={productImage}
                    sizes="100vh"
                    fill
                    className="w-full h-full top-0 left-0 object-cover object-top"
                    loading="lazy"
                  />
                  <div className="preview-image-filter"></div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

// const ProductImageWrapper = styled.div.attrs({ className: 'select-none' })`
//   width: 100%;
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;

//   .main-product-image {
//     width: 100%;
//     position: relative;

//     .product-image {
//       position: relative;
//       width: 100%;
//       height: 40rem;
//       border-radius: ${variables.borderRadius};
//       overflow: hidden;
//       z-index: -1;
//     }

//     .swiper-button-prev,
//     .swiper-button-next {
//       color: ${variables.grey500};
//       border-radius: ${variables.borderRadius};
//       padding: 0 1.25rem;
//       background: ${variables.white};
//       &::after {
//         font-size: 0.9rem;
//         font-weight: 600;
//       }

//       &:hover {
//         color: ${variables.black};
//       }
//     }
//   }

//   .preview-product-image {
//     width: 100%;
//     position: relative;

//     .preview-image {
//       position: relative;
//       width: 7rem;
//       height: 7rem;
//       border-radius: ${variables.borderRadius};
//       overflow: hidden;
//       cursor: pointer;

//       &-filter {
//         position: absolute;
//         width: 100%;
//         height: 100%;
//         border: 2px solid transparent;
//         border-radius: ${variables.borderRadius};
//         z-index: 1;
//         top: 0;
//         transition: ${variables.transition};
//       }

//       &.active {
//         cursor: default;

//         .preview-image-filter {
//           border-color: ${variables.grey300};
//         }
//       }
//     }
//   }
// `;
