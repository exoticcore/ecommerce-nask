'use client';

import styled from 'styled-components';
import variables from '@/scss/variables.module.scss';
import Image from 'next/image';

import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';

export default function PromoteCarousel() {
  return (
    <CarouselWrapper>
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        loop={false}
        pagination={{
          el: '.promote__pagination',
          clickable: true,
          bulletClass: 'promote__pagination__bullet',
          bulletActiveClass: 'promote__pagination__bullet-active',
        }}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        speed={800}
      >
        <SwiperSlide>
          <div className="promote">
            <div className="promote__cover">
              <h1>
                CIGARETTE IS DEATH
                <br />
                THE VAPE IS FUTURE
              </h1>
              <div className="shop-button">
                Shop now <FaArrowRightLong style={{ paddingTop: '0.15rem' }} />
              </div>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1495098894060-d3bf72198549?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="marketing"
              fill
              className="promote__image"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="promote">
            <div className="promote__cover">
              <h1>Level up your style with our winter collections</h1>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1495098894060-d3bf72198549?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="marketing"
              fill
              className="promote__image"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="promote">
            <div className="promote__cover">
              <h1>Level up your style with our winter collections</h1>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1495098894060-d3bf72198549?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="marketing"
              fill
              className="promote__image"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="promote">
            <div className="promote__cover">
              <h1>Level up your style with our winter collections</h1>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1495098894060-d3bf72198549?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="marketing"
              fill
              className="promote__image"
            />
          </div>
        </SwiperSlide>
        <div className="promote__pagination"></div>
        <SlideButton />
      </Swiper>
    </CarouselWrapper>
  );
}

function SlideButton() {
  const swiper = useSwiper();
  return (
    <div className="market_button">
      <div className="prev-button" onClick={() => swiper.slidePrev()}>
        <FaChevronLeft />
      </div>
      <div className="next-button" onClick={() => swiper.slideNext()}>
        <FaChevronRight />
      </div>
    </div>
  );
}

const CarouselWrapper = styled.div.attrs({ className: 'select-none' })`
  width: 100%;
  padding-top: 1.5rem;
  border-radius: ${variables.borderRadius};
  overflow: hidden;
  cursor: default;

  .market_button {
    display: flex;
    position: absolute;
    right: 2rem;
    top: 2rem;
    border-radius: ${variables.borderRadius};
    background: ${variables.white};
    z-index: 2;

    div {
      cursor: pointer;
      padding: 0.75rem;
      color: ${variables.grey400};
      transition: ${variables.transition};

      &:hover {
        color: ${variables.black};
      }
    }
  }

  .promote {
    width: 100%;
    height: 25rem;
    position: relative;

    &__pagination {
      width: 100%;
      position: absolute;
      display: flex;
      gap: 0.75rem;
      align-items: center;
      justify-content: center;
      z-index: 2;
      padding: 2rem 0;

      &__bullet {
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        padding: 0.35rem;
        transform: scale(0.7);
        transition: ${variables.transition};
        cursor: pointer;

        &-active {
          cursor: default;
        }

        &-active,
        &:hover {
          background: ${variables.white};
          transform: scale(0.95);
        }
      }
    }
    &__cover {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 3rem;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.45);

      h1 {
        width: 90%;
        text-align: center;
        font-size: 3.5rem;
        text-transform: none;
        font-weight: 400;
        line-height: 4.5rem;
        color: ${variables.white};
      }

      .shop-button {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        align-items: center;
        padding: 1rem;
        background: ${variables.white};
        border-radius: ${variables.borderRadius};
        font-weight: 300;
        cursor: pointer;

        &:hover {
        }
      }
    }

    &__image {
      z-index: -1;
      object-fit: cover;
    }
  }
`;
