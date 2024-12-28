'use client';

import Image from 'next/image';
import Visa from '../../../public/visa.png';
import Master from '../../../public/master.png';
import PromptPay from '../../../public/PromptPay.png';
import { BsBank2 } from 'react-icons/bs';
import { useMemo, useState } from 'react';
import { useAppSelector } from '../../hooks';

export default function PaymentMain() {
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

  return (
    <div className="payment-main">
      <div className="payment-section">
        <div className="payment-section__method">
          <h6>Select payment methods</h6>
          <div className="payment-section__method__select">
            <div className="flex items-center gap-3 h-full">
              <input
                type="radio"
                name="payment_method"
                className="input-radio"
              />
              <p>Credit card</p>
            </div>
            <div className="flex gap-5 items-center h-full">
              <div className="relative w-7 h-7">
                <Image alt="visa" src={Visa} fill />
              </div>
              <div className="relative w-6 h-6">
                <Image alt="visa" src={Master} fill />
              </div>
            </div>
          </div>
          <div className="payment-section__method__select">
            <div className="flex items-center gap-3 h-full">
              <input
                type="radio"
                name="payment_method"
                className="input-radio"
              />
              <p>PromptPay</p>
            </div>
            <div className="flex gap-3 items-center h-full">
              <div className="relative w-10 h-7">
                <Image alt="visa" src={PromptPay} fill />
              </div>
            </div>
          </div>
          <div className="payment-section__method__select">
            <div className="flex items-center gap-3 h-full">
              <input
                type="radio"
                name="payment_method"
                className="input-radio"
              />
              <p>Bank Transfer</p>
            </div>
            <div className="flex gap-3 items-center h-full">
              <BsBank2 className="w-4 h-4 mt-1 mb-1" />
            </div>
          </div>
        </div>
        <div className="payment-section__billing">
          <h6>Billing address</h6>
          <div className="billing__same-addres">
            <input type="checkbox" />
            <p>Same as my shipping address</p>
          </div>
        </div>
      </div>
      <div className="payment-action">
        <div className="payment-action__card">
          <h6>Your Order</h6>
          {cartState.cart?.map((cart, index) => {
            return (
              <div className="payment-action__card__product-lists" key={index}>
                <div className="flex gap-3 w-full">
                  <div className="image-container relative w-16 h-16 rounded overflow-hidden">
                    <Image  alt={cart.title}
                                              src={cart.image_url}
                                              sizes="100vh"
                                              fill
                                              className="w-full h-full top-0 left-0 object-cover"
                                              priority />
                  </div>
                  <div className="flex flex-col justify-between overflow-hidden">
                    <p>{cart.title}</p>
                    <span>{cart.value.join(', ')}</span>
                    <div className="qty">x{cart.qty}</div>
                  </div>
                </div>
                <p>฿{Number(parseFloat(cart.price) * cart.qty).toLocaleString()}</p>
              </div>
            );
          })}
          <hr />
          <h6>Discount Code</h6>
          <div className="flex gap-2">
            <div className="form-input">
              <input type="text" placeholder="Add discount code" />
            </div>
            <button>Apply</button>
          </div>
          <hr />
          <div className="payment-action__card__summary">
            <div className="subtotal flex justify-between">
              <span>Subtotal</span>
              <p>฿{subTotal}</p>
            </div>
            <div className="discount flex justify-between">
              <span>Discount</span>
              <span>-฿0</span>
            </div>
            <div className="shipment-cost flex justify-between">
              <span>Shipment cost</span>
              <span>฿0</span>
            </div>
            <hr />
            <div className="grand-total flex justify-between">
              <span>Grand total</span>
              <p>฿1,610</p>
            </div>
          </div>
          <div
            className={
              allow
                ? 'payment-action__card__button'
                : 'payment-action__card__button disable'
            }
          >
            <p>Continune to payment</p>
          </div>
        </div>
      </div>
    </div>
  );
}
