'use client';

import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import Checkout from '../../../components/cart/Checkout';
import ProductLists from '../../../components/cart/Productlists';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function CartPage() {

  return (
    <div className="cart-page">
      <div className="main">
        <div className="cart-page__grid">
          <div className="cart-main">
            <ProductLists />
          </div>
          <Checkout />
        </div>
      </div>
    </div>
  );
}
