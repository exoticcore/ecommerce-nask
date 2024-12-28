'use server';

import axios from 'axios';

export default async function ProductTitle() {
  const resp = await axios.get(
    'http://localhost:3001/api/v1/catalog/product/marbo-9000-puff'
  );
  const product = resp.data;

  console.log(product);

  return (
    <div className="product-detail__title">
      <h4>{product.s_price}</h4>
      <span>{product.ratting}</span>
    </div>
  );
}
