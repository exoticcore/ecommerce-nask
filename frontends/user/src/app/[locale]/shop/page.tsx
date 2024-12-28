'use server';

import Sidebar from '@/components/browseProduct/SideBar';
import ProductList from '@/components/browseProduct/ProductList';
import Navigation from '@/components/product/Navigation';
import Promotion from '@/components/Promotion';
import Subscribe from '@/components/Subscribe';
import axios from 'axios';
import { IProductList } from '../../../interface/product.list.interface';
import { getTranslations } from 'next-intl/server';
import { ISubcatAttr } from '../../../interface/subcat-attr-interface';
import { IBrand } from '../../../interface/brand.interface';

export default async function BrowseProudctPage() {
  const catalogUrl = 'http://localhost:3001/api/v1/catalog';
  const locale = await getTranslations();
  const { data: products }: { data: IProductList } = await axios.get(
    `${catalogUrl}/product?lang=${locale('locale')}`
  );
  const { data: subcatAttrs }: { data: ISubcatAttr[] } = await axios.get(
    `${catalogUrl}/subcat-attr?lang=${locale('locale')}`
  );

  const { data: brands }: { data: IBrand } = await axios.get(
    `${catalogUrl}/brand?lang${locale('locale')}`
  );
  return (
    <div className="shop-main select-none">
      <Navigation
        navigate={[
          { title: locale('Navbar.home'), link: '/' },
          { title: locale('Navbar.shop'), none: true },
        ]}
      />
      <div className="display">
        <Sidebar subcatAttrs={subcatAttrs} brands={brands} />
        <ProductList data={products} />
      </div>
    </div>
  );
}
