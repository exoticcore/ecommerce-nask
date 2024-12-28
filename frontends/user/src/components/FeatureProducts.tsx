'use client';

import styled from 'styled-components';
import variables from '@/scss/variables.module.scss';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaCartPlus } from 'react-icons/fa';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Scrollbar, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/scrollbar';
import { useTranslations } from 'next-intl';

const featureProduct = [
  {
    title: '',
    brand: '',
    image: '',
  },
];

export default function FeatureProducts({
  isScroll,
  perView,
  isGeneral,
}: {
  isScroll: boolean;
  perView: number;
  isGeneral: boolean;
}) {
  const t = useTranslations('Main');
  return (
    <FeatureProductsWrapper>
      <div className="flex">
        <h4>{t('feature')}</h4>
      </div>
      <div className="w-full">
        <Swiper
          modules={[Scrollbar]}
          slidesPerView={perView}
          spaceBetween={isGeneral ? 30 : 50}
          loop={false}
          scrollbar={{
            dragClass: 'swiper-scrollbar-drag',
            horizontalClass: 'swiper-scrollbar-horizontal',
            el: '.swiper-scrollbar',
            draggable: false,
          }}
          style={{ position: 'static' }}
        >
          <SwiperButton />
          <SwiperSlide>
            <div className="feature-product">
              <div
                className={
                  isGeneral
                    ? 'feature-product__image general'
                    : 'feature-product__image'
                }
              >
                <Image
                  src="https://images.unsplash.com/photo-1523380744952-b7e00e6e2ffa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center right' }}
                />
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="feature-product__detail">
                  <div className="feature-product__detail__title">
                    Black Cap
                  </div>
                  <div className="feature-product__detail__price">
                    {true ? (
                      <>
                        <p>${Math.ceil(48 - 48 * 0.15)}</p>
                        <span>$48</span>
                      </>
                    ) : (
                      <p>$48</p>
                    )}
                  </div>
                </div>
                <div className="feature-product__detail__add-cart">
                  <FaCartPlus />
                </div>
              </div>
              <div
                className={
                  true
                    ? 'feature-product__discount active'
                    : 'feature-product__discount'
                }
              >
                sale
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="feature-product">
              <div
                className={
                  isGeneral
                    ? 'feature-product__image general'
                    : 'feature-product__image'
                }
              >
                <Image
                  src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center center',
                  }}
                />
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="feature-product__detail">
                  <div className="feature-product__detail__title">
                    Skull Shirt
                  </div>
                  <div className="feature-product__detail__price">
                    {false ? (
                      <>
                        <p>${Math.ceil(65 - 65 * 0.15)}</p>
                        <span>$65</span>
                      </>
                    ) : (
                      <p>$65</p>
                    )}
                  </div>
                </div>
                <div className="feature-product__detail__add-cart">
                  <FaCartPlus />
                </div>
              </div>
              <div
                className={
                  false
                    ? 'feature-product__discount active'
                    : 'feature-product__discount'
                }
              >
                sale
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="feature-product">
              <div
                className={
                  isGeneral
                    ? 'feature-product__image general'
                    : 'feature-product__image'
                }
              >
                <Image
                  src="https://images.unsplash.com/photo-1547547908-dddfb9113547?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center center',
                  }}
                />
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="feature-product__detail">
                  <div className="feature-product__detail__title">
                    Black Dress
                  </div>
                  <div className="feature-product__detail__price">
                    {true ? (
                      <>
                        <p>${Math.ceil(74 - 74 * 0.25)}</p>
                        <span>$74</span>
                      </>
                    ) : (
                      <p>$48</p>
                    )}
                  </div>
                </div>
                <div className="feature-product__detail__add-cart">
                  <FaCartPlus />
                </div>
              </div>
              <div
                className={
                  true
                    ? 'feature-product__discount active'
                    : 'feature-product__discount'
                }
              >
                sale
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="feature-product">
              <div
                className={
                  isGeneral
                    ? 'feature-product__image general'
                    : 'feature-product__image'
                }
              >
                <Image
                  src="https://images.unsplash.com/photo-1654514435830-d3a7d0a1308e?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center center',
                  }}
                />
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="feature-product__detail">
                  <div className="feature-product__detail__title">
                    Autumn Dress
                  </div>
                  <div className="feature-product__detail__price">
                    {false ? (
                      <>
                        <p>${Math.ceil(74 - 74 * 0.25)}</p>
                        <span>$74</span>
                      </>
                    ) : (
                      <p>$88</p>
                    )}
                  </div>
                </div>
                <div className="feature-product__detail__add-cart">
                  <FaCartPlus />
                </div>
              </div>
              <div
                className={
                  false
                    ? 'feature-product__discount active'
                    : 'feature-product__discount'
                }
              >
                sale
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="feature-product">
              <div
                className={
                  isGeneral
                    ? 'feature-product__image general'
                    : 'feature-product__image'
                }
              >
                <Image
                  src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center top',
                  }}
                />
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="feature-product__detail">
                  <div className="feature-product__detail__title">
                    Gentleman Suit
                  </div>
                  <div className="feature-product__detail__price">
                    {false ? (
                      <>
                        <p>${Math.ceil(74 - 74 * 0.25)}</p>
                        <span>$74</span>
                      </>
                    ) : (
                      <p>$109</p>
                    )}
                  </div>
                </div>
                <div className="feature-product__detail__add-cart">
                  <FaCartPlus />
                </div>
              </div>
              <div
                className={
                  false
                    ? 'feature-product__discount active'
                    : 'feature-product__discount'
                }
              >
                sale
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="feature-product">
              <div
                className={
                  isGeneral
                    ? 'feature-product__image general'
                    : 'feature-product__image'
                }
              >
                <Image
                  src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center top',
                  }}
                />
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="feature-product__detail">
                  <div className="feature-product__detail__title">
                    Red Shirt
                  </div>
                  <div className="feature-product__detail__price">
                    {true ? (
                      <>
                        <p>${Math.ceil(48 - 48 * 0.3)}</p>
                        <span>$48</span>
                      </>
                    ) : (
                      <p>$109</p>
                    )}
                  </div>
                </div>
                <div className="feature-product__detail__add-cart">
                  <FaCartPlus />
                </div>
              </div>
              <div
                className={
                  true
                    ? 'feature-product__discount active'
                    : 'feature-product__discount'
                }
              >
                sale
              </div>
            </div>
          </SwiperSlide>
          {isScroll ? (
            <div className="flex w-full items-center justify-center px-80 mt-12 relative">
              <div className="swiper-scrollbar"></div>
            </div>
          ) : (
            ''
          )}
        </Swiper>
      </div>
    </FeatureProductsWrapper>
  );
}

function SwiperButton() {
  const swiper = useSwiper();
  return (
    <div className="swiper-button">
      <div className="prev-button" onClick={() => swiper.slidePrev()}>
        <FaChevronLeft />
      </div>
      <div className="next-button" onClick={() => swiper.slideNext()}>
        <FaChevronRight />
      </div>
    </div>
  );
}

const FeatureProductsWrapper = styled.div.attrs({ className: 'select-none' })`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  padding: 3rem 0;
  gap: 3rem;
  margin: 3rem 0;
  cursor: default;

  .swiper-button {
    position: absolute;
    margin-top: 3rem;
    top: 0;
    right: 0;
    display: flex;
    border-radius: ${variables.borderRadius};
    background: ${variables.white};
    box-shadow: 0 0 0 1px ${variables.grey200};
    overflow: hidden;
    z-index: 2;

    div {
      cursor: pointer;
      padding: 0.75rem;
      color: ${variables.grey400};
      transition: ${variables.transition};
      box-shadow: 0 0 0 1px ${variables.grey200};

      &:hover {
        color: ${variables.black};
      }
    }
  }

  .feature-product {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;

    &__image {
      position: relative;
      height: 25rem;
      border-radius: ${variables.borderRadius};
      overflow: hidden;
      z-index: -1;

      &.general {
        height: 14rem;
      }
    }

    &__detail {
      padding: 0.3rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;

      &__title {
        font-weight: 300;
      }

      &__price {
        display: flex;
        width: 100%;
        align-items: flex-start;
        gap: 0.5rem;

        p {
          font-size: 1.35rem;
        }

        span {
          font-size: 0.9rem;
          font-weight: 200;
          text-decoration: line-through;
          color: ${variables.grey400};
        }
      }

      &__add-cart {
        padding: 0.75rem;
        border-radius: ${variables.borderRadius};
        background: rgb(31, 36, 45);
        color: ${variables.white};
        font-size: 1rem;
        cursor: pointer;
        transition: ${variables.transition};
        margin-right: 0.1rem;

        &:hover {
          background: rgb(59, 66, 86);
        }
      }
    }

    &__discount {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0.5rem 1rem;
      border-radius: ${variables.borderRadius};
      color: ${variables.white};
      margin: 1rem;
      background: #ab0003;
      text-transform: uppercase;
      font-size: 0.9rem;
      box-shadow: ${variables.shadow1};
      letter-spacing: ${variables.letterSpacing};
      display: none;

      &.active {
        display: block;
      }
    }
  }

  .swiper-scrollbar {
    position: relative;
  }

  .swiper-scrollbar-drag {
    background: rgb(31, 36, 45);
  }

  .swiper-scrollbar-horizontal {
    height: 0.5rem;
    background: ${variables.grey300};
  }
`;
