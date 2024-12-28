'use client';

import styled from 'styled-components';
import variables from '@/scss/variables.module.scss';
import Image from 'next/image';
import { FaArrowRightLong } from 'react-icons/fa6';

export default function Promotion() {
  return (
    <PromotionStyle>
      <div className="promotion__image">
        <Image
          src="https://images.unsplash.com/photo-1654765827358-97fd19c8baf3?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'center center' }}
        />
      </div>
      <div className="promotion__details">
        <span>limited offer</span>
        <h1>35% off only this friday and get special gift</h1>
        <div className="promotion__details__button">
          Grab it now <FaArrowRightLong />
        </div>
      </div>
    </PromotionStyle>
  );
}

const PromotionStyle = styled.div.attrs({ className: 'select-none' })`
  display: grid;
  cursor: default;
  border-radius: ${variables.borderRadius};
  width: 100%;
  grid-template-columns: 2fr 3fr;
  height: 20rem;
  background: rgb(31, 36, 45);
  overflow: hidden;

  .promotion {
    &__image {
      position: relative;
      width: 100%;
      height: 100%;
    }

    &__details {
      padding: 2rem 4rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      justify-content: center;
      color: ${variables.white};

      span {
        text-transform: uppercase;
        font-weight: 200;
        font-size: 0.9rem;
      }

      h1 {
        text-transform: lowercase;
      }

      &__button {
        margin-top: 1rem;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        width: 10rem;
        border-radius: ${variables.borderRadius};
        padding: 1rem;
        background: ${variables.white};
        color: ${variables.black};
        font-weight: 300;
      }
    }
  }
`;
