'use client';

import styled from 'styled-components';
import variables from '@/scss/variables.module.scss';

import { FaPlus, FaMinus, FaRegHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getProductBySKU } from '../../redux/features/addToCart/addToCartSlice';

export default function ProductAddCart() {
  const cartState = useAppSelector((state) => state.addToCart);
  const dispatch = useAppDispatch();

  const [allowCart, setAllowCart] = useState<boolean>(false);

  const [cartQty, setCartQty] = useState<number>(0);
  const t = useTranslations('ProductPage');

  const increaseQty = () => {
    if (cartQty === cartState.stock || !cartState.is_stock || !cartQty) {
      setAllowCart(false);
      return;
    }

    setCartQty(cartQty + 1);
  };

  const decreaseQty = () => {
    if (!cartQty || cartQty === 1 || cartQty < 1) return;

    setCartQty(cartQty - 1);
  };

  const handleAddToCart = () => {
    if ((cartState.is_stock || cartState.stock) && cartQty) {
      if (
        cartState.stock &&
        cartState.sku &&
        cartQty > 0 &&
        cartQty <= cartState.stock
      ) {
        dispatch(
          getProductBySKU({
            sku: cartState.sku,
            qty: cartQty,
          })
        );
      } else if (cartState.is_stock && cartState.sku && cartQty > 0) {
        dispatch(
          getProductBySKU({
            sku: cartState.sku,
            qty: cartQty,
          })
        );
      }
    }
  };

  useEffect(() => {
    if (cartState.is_stock) {
      setAllowCart(true);
      setCartQty(1);
    } else {
      setCartQty(0);
    }
  }, [cartState]);

  return (
    <ProductAddCartWrapper>
      <span>
        {cartState.sku
          ? cartState.stock || cartState.is_stock
            ? `In stock`
            : `Out of stock`
          : 'Please select options'}
      </span>
      <div className="flex gap-4">
        <div className="flex gap-3">
          <div className="qty-button">
            <div
              className={
                cartState.stock === 0 || cartQty === 1
                  ? 'qty-button-click disable'
                  : 'qty-button-click'
              }
              onClick={() => decreaseQty()}
            >
              <FaMinus />
            </div>
            <div
              className={
                cartQty === 0 ? 'qty-button-input disable' : 'qty-button-input'
              }
            >
              {cartQty || 0}
            </div>
            <div
              className={
                !allowCart ? 'qty-button-click disable' : 'qty-button-click'
              }
              onClick={() => increaseQty()}
            >
              <FaPlus />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <div
          className={
            cartState.sku ? 'add-cart-button active' : 'add-cart-button disable'
          }
          onClick={() => {
            if (cartState.sku) {
              handleAddToCart();
            }
          }}
        >
          {t('add_cart')}
        </div>
        <div className="wish-button">
          <FaRegHeart />
        </div>
      </div>
    </ProductAddCartWrapper>
  );
}

const ProductAddCartWrapper = styled.div.attrs({ className: 'select-none' })`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;

  span {
    color: ${variables.grey400};
    font-weight: 300;
  }

  .qty-button {
    display: flex;
    background: ${variables.white};
    border-radius: ${variables.borderRadius};
    align-items: center;

    &-input {
      padding: 1rem;

      &.disable {
        color: ${variables.grey300};
      }
    }

    &-click {
      padding: 0.5rem;
      margin: 0.5rem;
      cursor: pointer;
      border-radius: ${variables.borderRadius};

      &:hover {
        background: ${variables.primary500};
        color: ${variables.white};
      }

      &.disable {
        cursor: default;
        color: ${variables.grey300};

        &:hover {
          background: transparent;
        }
      }
    }
  }

  .add-cart-button {
    display: flex;
    padding: 1rem 5rem;
    justify-content: center;
    align-items: center;
    border-radius: ${variables.borderRadius};
    font-weight: 300;

    transition: ${variables.transition};

    &.active {
      cursor: pointer;
      background: ${variables.primary600};
      color: ${variables.white};

      &:hover {
        background: ${variables.primary500};
      }
    }

    &.disable {
      cursor: not-allowed;
      background: ${variables.grey300};
      color: ${variables.white};
    }
  }

  .wish-button {
    padding: 0.9rem;
    display: flex;
    align-items: center;
    border-radius: ${variables.borderRadius};
    box-shadow: 0 0 0 1px ${variables.grey400};
    color: ${variables.grey400};
    font-size: 1.25rem;
    transition: ${variables.transition};
    cursor: pointer;

    &:hover {
      color: ${variables.primary600};
      /* box-shadow: 0 0 0 1px ${variables.primary600}; */
    }
  }
`;
