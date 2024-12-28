'use client';

import { useAppDispatch, useAppSelector } from '../../hooks';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { HiPlus, HiMinus } from 'react-icons/hi2';
import { RiDeleteBin6Line } from 'react-icons/ri';
import {
  decreaseCartQty,
  handleAll,
  handleSelect,
  increaseCartQty,
  removeAllSelect,
  removeItem,
} from '../../redux/features/addToCart/addToCartSlice';
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface ProductSkuList {
  sku: string;
  name: string;
  value: string[];
  price: string;
  image_url: string;
}

export default function ProductLists() {
  const t = useTranslations('CartPage');

  const dispatch = useAppDispatch();
  const cartState = useAppSelector((state) => state.addToCart);

  const [selAll, setSelAll] = useState<boolean>(false);
  const [delSel, setDelSel] = useState<boolean>(false);

  useEffect(() => {
    if (cartState.cart?.length) {
      let count: number = 0;
      cartState.cart.forEach((c) => {
        if (c.selected === true) {
          count += 1;
          setDelSel(true);
        }
      });

      if (count === 0) {
        setDelSel(false);
      }

      if (count === cartState.cart.length && count !== 0) {
        setSelAll(true);
      } else {
        setSelAll(false);
      }
    }
  }, [cartState]);

  return (
    <>
      <div className="cart-main__title">
        <h1>{t('cart')}</h1>
        <div
          className={
            delSel
              ? 'cart-main__title__remove active'
              : 'cart-main__title__remove'
          }
          onClick={() => dispatch(removeAllSelect())}
        >
          <RiDeleteBin6Line />
          <span>{t('remove_select')}</span>
        </div>
      </div>
      <div className="cart-main__product-list-main">
        <div className="cart-main__product-list-main__list border-none">
          <div className="cart-main__product-list-main__list__product">
            <div
              className="cart-main__product-list-main__list__product__selector"
              onClick={() => dispatch(handleAll({ deselect: selAll }))}
            >
              {selAll ? (
                <MdOutlineCheckBox className="select__icon" />
              ) : (
                <MdOutlineCheckBoxOutlineBlank className="select__icon" />
              )}
            </div>
            <div className="cart-main__product-list-main__list__product__details">
              <p>{t('product')}</p>
            </div>
          </div>
          <div className="cart-main__product-list-main__list__qty">
            <p>{t('qty')}</p>
          </div>
          <div className="cart-main__product-list-main__list__price">
            <p>{t('price')}</p>
          </div>
        </div>
        {cartState.cart?.length
          ? cartState.cart.map((cart, index) => {
              return (
                <div className="cart-main__product-list-main__list" key={index}>
                  <div className="cart-main__product-list-main__list__product">
                    <div
                      className="cart-main__product-list-main__list__product__selector"
                      onClick={() => dispatch(handleSelect({ index }))}
                    >
                      {cart.selected ? (
                        <MdOutlineCheckBox className="select__icon" />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank className="select__icon" />
                      )}
                    </div>
                    <div className="cart-main__product-list-main__list__product__details">
                      <div
                        className="list-detail__product__image pt-[100%]"
                        onClick={() => dispatch(handleSelect({ index }))}
                      >
                        <Image
                          alt={cart.title}
                          src={cart.image_url}
                          sizes="100vh"
                          fill
                          className="w-full h-full top-0 left-0 object-cover"
                          priority
                        />
                      </div>
                      <div className="list-detail__product__title">
                        <Link
                          href={{
                            pathname: `/product/${cart.slug}`,
                          }}
                        >
                          <p>{cart.title}</p>
                        </Link>
                        <span>
                          {cart.value.map((v, index) => {
                            const length = cart.value.length;
                            return `${v} ${index !== length - 1 ? ' | ' : ''}`;
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="cart-main__product-list-main__list__qty">
                    <div className="qty-button">
                      <div
                        className="qty-button-click"
                        onClick={() => dispatch(decreaseCartQty({ index }))}
                      >
                        <HiMinus />
                      </div>
                      <div className="qty-button-input">{cart.qty}</div>
                      <div
                        className="qty-button-click"
                        onClick={() => dispatch(increaseCartQty({ index }))}
                      >
                        <HiPlus />
                      </div>
                    </div>
                    <div
                      className="remove"
                      onClick={() => dispatch(removeItem({ index }))}
                    >
                      <RiDeleteBin6Line />
                      <span>{t('remove')}</span>
                    </div>
                  </div>
                  <div className="cart-main__product-list-main__list__price">
                    <p>
                      ฿
                      {Number(
                        (parseFloat(cart.price) * cart.qty).toFixed(2)
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })
          : 'Your cart is empty'}
      </div>
    </>
  );
}
