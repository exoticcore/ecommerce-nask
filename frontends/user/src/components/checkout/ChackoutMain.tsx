'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../../hooks';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';

export default function CheckoutMain() {
  const t = useTranslations('CheckoutPage');
  const router = useRouter();

  const cartState = useAppSelector((state) => state.addToCart);
  const [subTotal, setSubTotal] = useState<number>();
  const [allow, setAllow] = useState<boolean>(false);

  useMemo(() => {
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

  function handlePayment() {
    if (allow) {
      router.push({ pathname: '/payment' });
    }
  }

  return (
    <div className="checkout-page">
      <div className="checkout-main">
        <div className="checkout-main__section">
          <div className="checkout-main__section__shipping">
            <div className="checkout-main__section__shipping-country">
              <h6>{t('country_select')}</h6>
              <div className="shipping__country-select">{t('thailand')}</div>
            </div>
            <hr />
            <div className="checkout-main__section__shipping-details">
              <h6>{t('address')}</h6>
              <div className="form-input">
                <input type="text" required />
                <label>{t('name')}*</label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="form-input">
                  <input type="text" required />
                  <label>{t('email')}*</label>
                </div>
                <div className="form-input">
                  <input type="text" required />
                  <label>{t('email_confirm')}*</label>
                </div>
              </div>
              <div className="form-input">
                <input type="text" required />
                <label>{t('phone')}*</label>
              </div>
              <div className="form-input">
                <input type="text" required />
                <label>{t('address1')}*</label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="form-input">
                  <input type="text" required />
                  <label>{t('city')}*</label>
                </div>
                <div className="form-input">
                  <input type="text" required />
                  <label>{t('region')}*</label>
                </div>
              </div>
              <div className="form-input">
                <input type="text" required />
                <label>{t('postal')}*</label>
              </div>
            </div>
          </div>
          <div className="checkout-main__section__shipping-method">
            <h6>{t('shipping_method')}</h6>
            <div className="shipping-method__radio">
              <div className="flex gap-4">
                <input type="radio" name="payment" className="input-radio" />
                <div className="shipping-method__radio__details">
                  <p>Flash Express</p>
                  <span>1-3 {t('business_day')}</span>
                </div>
              </div>
              <div className="price">฿60</div>
            </div>
            <div className="shipping-method__radio">
              <div className="flex gap-4">
                <input type="radio" name="payment" className="input-radio" />
                <div className="shipping-method__radio__details">
                  <p>Kerry Express</p>
                  <span>1-3 {t('business_day')}</span>
                </div>
              </div>
              <div className="price">฿50</div>
            </div>
            <div className="shipping-method__radio">
              <div className="flex gap-4">
                <input type="radio" name="payment" className="input-radio" />
                <div className="shipping-method__radio__details">
                  <p>Thailand post</p>
                  <span>1-3 {t('business_day')}</span>
                </div>
              </div>
              <div className="price">฿70</div>
            </div>
          </div>
        </div>
        <div className="checkout-main__section__payment-action">
          <div className="payment-action__card">
            <h6>{t('your_order')}</h6>
            {cartState.cart?.map((cart, index) => {
              return (
                <div
                  className="payment-action__card__product-lists"
                  key={index}
                >
                  <div className="flex gap-3 w-full">
                    <div className="image-container relative w-16 h-16 rounded overflow-hidden">
                      <Image
                        alt={cart.title}
                        src={cart.image_url}
                        sizes="100vh"
                        fill
                        className="w-full h-full top-0 left-0 object-cover"
                        priority
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <p>{cart.title}</p>
                      <span>{cart.value.join(', ')}</span>
                      <div className="qty">x{cart.qty}</div>
                    </div>
                  </div>
                  <p>
                    ฿
                    {Number(parseFloat(cart.price) * cart.qty).toLocaleString()}
                  </p>
                </div>
              );
            })}
            <hr />
            <h6>{t('discount_code')}</h6>
            <div className="flex gap-2">
              <div className="form-input">
                <input type="text" placeholder={t('apply_discount')} />
              </div>
              <button>{t('apply')}</button>
            </div>
            <hr />
            <div className="payment-action__card__summary">
              <div className="subtotal flex justify-between">
                <span>{t('subtotal')}</span>
                <p>฿{Number(subTotal).toLocaleString()}</p>
              </div>
              <div className="discount flex justify-between">
                <span>{t('discount')}</span>
                <span>-฿0</span>
              </div>
              <div className="shipment-cost flex justify-between">
                <span>{t('shipping_cost')}</span>
                <span>฿0</span>
              </div>
              <hr />
              <div className="grand-total flex justify-between">
                <span>{t('grandtotal')}</span>
                <p>฿1,610</p>
              </div>
            </div>
            <div
              className={
                allow
                  ? 'payment-action__card__button'
                  : 'payment-action__card__button disable'
              }
              onClick={() => handlePayment()}
            >
              <p>{t('continune_payment')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
