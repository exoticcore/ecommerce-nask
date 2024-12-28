export default interface IProduct {
  id: number;
  slug: string;
  price: string;
  s_price?: string;
  rating?: string | null;
  image_url?: string | null;
  media?: string[];
  brand?: {
    title: string;
    slug: string;
  };
  subcat_attr: {
    slug: string;
    translate: {
      name: string;
    }[];
  };
  translate: {
    title: string;
    information?: string | null;
    description?: string | null;
  }[];
  tag?: string[];
  selection: {
    sku: string;
    price?: number | null;
    stock?: number | null;
    is_stock: boolean;
    image_url?: string | null;
    options: {
      attr: string;
      value: string;
      type?: string;
      more?: string;
    }[];
  }[];
}
