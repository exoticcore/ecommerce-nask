'use client';

import { useTranslations } from 'next-intl';
import { IProductList } from '../../interface/product.list.interface';
import { GoChevronDown } from 'react-icons/go';

export default function ShowingCount({ product }: { product: IProductList }) {
  const t = useTranslations('shop.showing');
  return (
    <div className="showing-count-main">
      <div>
        {t('showing')} {product.products.length} {t('results')}{' '}
        <b>{product.count}</b> {t('items')}
      </div>
      <div className="showing-count-main__filter">
        <div className="showing-count-main__filter__sort">
          <span>{t('sort.sort')}</span>
          <div>
            {t('sort.popular')} <GoChevronDown />
          </div>
        </div>
      </div>
    </div>
  );
}
