'use client';

import styled from 'styled-components';
import variables from '../../scss/variables.module.scss';
import {
  FaChevronLeft,
  FaChevronRight,
  FaLongArrowAltRight,
} from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import Image from 'next/image';

const listing = [1, 2, 3, 4];

export default function Marketing() {
  return (
    <MarketingStyle>
      <div className="market_button">
        <div className="prev-button">
          <FaChevronLeft />
        </div>
        <div className="next-button">
          <FaChevronRight />
        </div>
      </div>
      <div className="merket_listing">
        {listing.map((list, index) => {
          return (
            <div
              className={list === 1 ? 'listing_dot selected' : 'listing_dot'}
              key={index}
            ></div>
          );
        })}
      </div>
      <div className="image-cover">
        <h1>Level up your style with our winter collections</h1>
        <div className="shop-button">
          Shop now <FaArrowRightLong style={{ paddingTop: '0.15rem' }} />
        </div>
      </div>
      {/* <Image
        src="https://images.unsplash.com/photo-1519698363407-c948d65fbc94?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="marketing"
        fill
        className="market_image"
      /> */}
      <Image
        src="https://images.unsplash.com/photo-1464666495445-5a33228a808e?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="marketing"
        fill
        className="market_image"
      />
    </MarketingStyle>
  );
}

const MarketingStyle = styled.div.attrs({ className: 'select-none' })`
  width: 100%;
  height: 30rem;
  border-radius: ${variables.borderRadius};
  overflow: hidden;
  position: relative;
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

  .merket_listing {
    display: flex;
    gap: 1rem;
    position: absolute;
    width: 100%;
    justify-content: center;
    padding: 0.5rem;
    bottom: 1rem;
    z-index: 2;
    margin-bottom: 1.5rem;

    .listing_dot {
      cursor: pointer;
      padding: 0.25rem;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      transition: ${variables.transition};

      &:hover {
        transform: scale(1.25);
        background: rgba(255, 255, 255, 1);
      }

      &.selected {
        transform: scale(1.25);
        background: rgba(255, 255, 255, 1);
        cursor: default;
      }
    }
  }

  .image-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    padding: 6rem;
    h1 {
      text-align: center;
      color: ${variables.white};
      line-height: 4.5rem;
      font-size: 3.8rem;
      text-transform: none;
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
  .market_image {
    z-index: 0;
    object-fit: cover;
  }
`;
