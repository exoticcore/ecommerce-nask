'use client';

import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';

export default function Checkout() {
  const t = useTranslations('CartPage');

  const cartState = useAppSelector((state) => state.addToCart);
  const [subTotal, setSubTotal] = useState<number>();
  const [allow, setAllow] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    let total: number = 0;
    let count: number = 0;
    if (cartState.cart?.length) {
      cartState.cart.forEach((cart) => {
        if (cart.selected) {
          const price = parseFloat(cart.price) * cart.qty;
          total += price;
          count += 1;
          setAllow(true);
        }
      });
    }
    if (count <= 0) setAllow(false);
    setSubTotal(total);
  }, [cartState]);

  function handleCheckout() {
    if (allow) {
      router.push({
        pathname: '/checkout',
      });
    }
  }

  return (
    <div className="cart-page__checkout__main">
      <div className="cart-page__checkout__card">
        <div className="cart-page__checkout__card__subtotal">
          <span>{t('subtotal')}</span>
          <p>฿{Number(subTotal).toLocaleString()}</p>
        </div>
        <div className="cart-page__checkout__card__subtotal">
          <span>{t('discount')}</span>
          <p>฿0</p>
        </div>
        <hr />
        <div className="cart-page__checkout__card__grandtotal">
          <span>{t('grandtotal')}</span>
          <p>฿{Number(subTotal).toLocaleString()}</p>
        </div>
        <div
          className={
            allow
              ? 'cart-page__checkout__card__button'
              : 'cart-page__checkout__card__button disable'
          }
          onClick={handleCheckout}
        >
          <p>{t('checkout')}</p>
        </div>
      </div>
    </div>
  );
}
