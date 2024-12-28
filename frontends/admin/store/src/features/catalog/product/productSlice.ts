import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createProductAttrThunk,
  createProductThunk,
  deleteProductAttrThunk,
  deleteProductThunk,
  getProductAdminThunk,
  getProductAttrByIdThunk,
  getProductAttrThunk,
  getProductListThunk,
} from './productThunk';
import { Locale } from '../../../interface/locale.enum';

interface ProductForm {
  locale: Locale;
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

export interface ProductState {
  product_list: any[];
  product_attr: {
    id: number;
    name: string;
    type: string;
    description: string | null;
    value: {
      id: number;
      value: string;
      more: string | null;
    }[];
  }[];
  add_product: ProductForm;
  edit_product?: ProductForm;
}

const initialState: ProductState = {
  product_list: [],
  product_attr: [],
  add_product: {
    locale: Locale.th,
    product: {
      slug: '',
      price: null,
      image_url: null,
      publish_at: null,
      visibility: 'public',
      gallery: [],
    },
    translate: [
      {
        locale: Locale.th,
        title: '',
        information: '',
        description: '',
      },
      {
        locale: Locale.en,
        title: '',
        information: '',
        description: '',
      },
    ],
    ref: {
      subcat_attr_slug: '',
      brand_slug: '',
    },
    options: [
      {
        sku: {
          sku: '',
          stock: null,
          is_primary: false,
          image_url: null,
        },
        attr_value_id: [],
      },
    ],
    tag: [],
  },
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    generateSKU: (state, { payload }: { payload: number[][] }) => {
      const new_sku: {
        sku: {
          sku: string;
          stock: number | null;
          is_primary: boolean;
          image_url: string | null;
        };
        attr_value_id: number[];
      }[] = [];
      payload.forEach((attr) => {
        new_sku.push({
          sku: { sku: '', stock: null, is_primary: false, image_url: null },
          attr_value_id: attr,
        });
      });

      state.add_product.options = new_sku;
    },
    changeLocale: (state, { payload }) => {
      state.add_product.locale = payload;
    },
    setPublishAt: (state, { payload }) => {
      state.add_product.product.publish_at = payload;
    },
    setNormalPrice: (state, { payload }) => {
      let price = parseFloat(payload);
      if (isNaN(price)) price = 0;
      state.add_product.product.price = price;
    },
    setSpecialPrice: (state, { payload }) => {
      let price = parseFloat(payload);
      if (isNaN(price)) price = 0;
      state.add_product.product.s_price = price;
    },
    setSpecialPriceStart: (state, { payload }) => {
      state.add_product.product.s_price_start = payload;
    },
    setSpecialPriceEnd: (state, { payload }) => {
      state.add_product.product.s_price_end = payload;
    },
    setSkuValue: (state, { payload }) => {
      state.add_product.options[payload.index].sku.sku = payload.value;
    },
    addImageSku: (state, { payload }) => {
      state.add_product.options[payload.index].sku.image_url =
        payload.image_url;
    },
    addGalleryProduct: (state, { payload }) => {
      state.add_product.product.gallery = payload;
    },
    addImageProduct: (state, { payload }) => {
      state.add_product.product.image_url = payload;
    },
    addBrandSlug: (state, { payload }) => {
      state.add_product.ref.brand_slug = payload;
    },
    addSubcatAttrSlug: (state, { payload }) => {
      state.add_product.ref.subcat_attr_slug = payload;
    },
    setProductPrice: (state, { payload }) => {
      state.add_product.product.price = payload;
    },
    setProductSlug: (state, { payload }) => {
      state.add_product.product.slug = payload;
    },
    setProductTitle: (state, { payload }) => {
      if (
        state.add_product.translate.some((t) => t.locale === payload.locale)
      ) {
        state.add_product.translate = state.add_product.translate.map((t) => {
          if (t.locale === payload.locale) {
            t.title = payload.title;
          }
          return t;
        });
      } else {
        state.add_product.translate.push({
          locale: payload.locale,
          title: payload.title,
          information: '',
          description: '',
        });
      }
    },
    setProductDescription: (state, { payload }) => {
      if (
        state.add_product.translate.some((t) => t.locale === payload.locale)
      ) {
        state.add_product.translate = state.add_product.translate.map((t) => {
          if (t.locale === payload.locale) {
            t.description = payload.description;
          }
          return t;
        });
      } else {
        state.add_product.translate.push({
          locale: payload.locale,
          title: '',
          information: '',
          description: payload.description,
        });
      }
    },
    setProductInformation: (state, { payload }) => {
      if (
        state.add_product.translate.some((t) => t.locale === payload.locale)
      ) {
        state.add_product.translate = state.add_product.translate.map((t) => {
          if (t.locale === payload.locale) {
            t.information = payload.information;
          }
          return t;
        });
      } else {
        state.add_product.translate.push({
          locale: payload.locale,
          title: '',
          information: payload.information,
          description: '',
        });
      }
    },
    setTag: (state, { payload }) => {
      state.add_product.tag = payload;
    },
    clearAddProduct: (state) => {
      state.add_product = initialState.add_product;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductAttr.fulfilled, (state, { payload }) => {
        state.product_attr = payload;
      })
      .addCase(getProductList.fulfilled, (state, { payload }) => {
        state.product_list = payload;
      })
      .addCase(getProductAdmin.fulfilled, (state, { payload }) => {
        state.add_product = { ...payload, locale: Locale.th };
        state.edit_product = state.add_product;
      })
      .addCase(getProductAdmin.rejected, (state) => {
        state.add_product = initialState.add_product;
      });
  },
});

export const getProductList = createAsyncThunk(
  'catalog/product/read',
  getProductListThunk
);

export const getProductAdmin = createAsyncThunk(
  'catalog/product/admin/read',
  getProductAdminThunk
);

export const createProduct = createAsyncThunk(
  'catalog/product/create',
  createProductThunk
);

export const deleteProduct = createAsyncThunk(
  'catalog/product/delete',
  deleteProductThunk
);

export const createProductAttr = createAsyncThunk(
  'catalog/product-attr/create',
  createProductAttrThunk
);

export const getProductAttr = createAsyncThunk(
  'catalog/product-attr/read',
  getProductAttrThunk
);

export const getProductAttrBySlug = createAsyncThunk(
  'catalog/product-attr/read/single',
  getProductAttrByIdThunk
);

export const deleteProductAttr = createAsyncThunk(
  'catalog/product-attr/delete',
  deleteProductAttrThunk
);

export const {
  changeLocale,
  setPublishAt,
  generateSKU,
  addImageSku,
  setNormalPrice,
  setSpecialPrice,
  setSpecialPriceStart,
  setSpecialPriceEnd,
  setSkuValue,
  addGalleryProduct,
  addImageProduct,
  addBrandSlug,
  addSubcatAttrSlug,
  setProductSlug,
  setProductTitle,
  setProductDescription,
  setProductInformation,
  setProductPrice,
  setTag,
  clearAddProduct,
} = productSlice.actions;

export default productSlice.reducer;
