export default interface ProductForm {
  product: {
    slug: string;
    price: number | null;
    s_price?: number | null;
    s_price_start?: Date | null;
    s_price_end?: Date | null;
    image_url: string | null;
    gallery: string[];
    publish_at?: Date | null;
    visibility?: string;
  };
  translate: {
    locale: string;
    title: string;
    information: string;
    description: string;
  }[];
  ref: {
    subcat_attr_slug: string;
    brand_slug: string;
  };
  options: {
    sku: {
      sku: string;
      stock: number | null;
      is_stock: boolean;
      is_primary: boolean;
      image_url: string | null;
      gallery?: string | null;
      price?: number | null;
      s_price?: number | null;
      s_price_start?: Date | null;
      s_price_end?: Date | null;
      is_active?: boolean;
    };
    attr_value_id: number[];
  }[];
  wholesale_price?: {
    valid_from: number;
    valid_to?: number | null;
    discount: number;
  }[];
  tag?: string[] | null;
}
