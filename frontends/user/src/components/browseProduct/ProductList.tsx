'use server';

import Image from 'next/image';
import { IProductList } from '../../interface/product.list.interface';
import { Link } from '@/i18n/routing';
import ShowingCount from './ShowingCount';

export default async function ProductList({ data }: { data: IProductList }) {
  return (
    <div>
      <ShowingCount product={data} />
      <div className="product-list-main">
        {data.products.map((product, index) => {
          return (
            <>
              <div key={index} className="product-list-main__card">
                <Link
                  href={{
                    pathname: `/product/${product.slug}`,
                  }}
                >
                  <div className="product-list-main__card-image pt-[100%]">
                    <Image
                      src={product.image_url}
                      alt={product.translate[0].title}
                      sizes="100vh"
                      fill
                      className="w-full h-full top-0 left-0 object-cover object-top"
                      priority
                    />
                  </div>
                </Link>
                <div className="product-list-main__card-details">
                  <div className="product-list-main__card-details-title">
                    <Link
                      href={{
                        pathname: `/product/${product.slug}`,
                      }}
                    >
                      <h6>{product.translate[0].title}</h6>
                    </Link>
                    <span>{product.subcat_attr.translate[0].name}</span>
                  </div>
                  <div className="product-list-main__card-details-price">
                    {product.s_price ? (
                      <>
                        <p>฿{Number(product.s_price).toLocaleString()}</p>
                        <span>฿{Number(product.price).toLocaleString()}</span>
                      </>
                    ) : (
                      <p>฿{Number(product.price).toLocaleString()}</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
