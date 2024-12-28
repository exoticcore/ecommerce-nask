export interface IProductList {
  products: {
    slug: string;
    price: string;
    s_price?: string | null;
    rating: string;
    image_url: string;
    translate: {
      title: string;
    }[];
    subcat_attr: {
      slug: string;
      translate: {
        name: string;
      }[];
    };
  }[];
  count: number;
  page: number;
}
