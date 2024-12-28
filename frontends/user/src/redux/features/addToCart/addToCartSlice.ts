import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from '../../store';
import { CATALOG_API } from '../../../constant/config';

interface IGetProductBySKU {
  sku: string;
  slug: string;
  title: string;
  price: string;
  image_url?: string | null;
  value: string[];
  stock: number;
  is_stock: boolean;
}

export const getProductBySKU = createAsyncThunk(
  'addToCart/getProductBySKU',
  async (payload: { sku: string; qty: number }, thunkApi) => {
    try {
      const { data }: { data: IGetProductBySKU } = await axios.get(
        `${CATALOG_API}/sku/${payload.sku}`
      );

      return thunkApi.fulfillWithValue({
        ...data,
        qty: payload.qty,
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        return thunkApi.rejectWithValue(err.response?.data.message);
      }
    }
  }
);

interface ICartItem {
  sku: string;
  title: string;
  slug: string;
  price: string;
  value: string[];
  qty: number;
  image_url: string;
  is_stock: boolean;
  stock: number;
  selected: boolean;
}

interface ICartOptionState {
  isLoading: boolean;
  index?: number | null;
  stock?: number | null;
  is_stock: boolean;
  cleared: boolean;
  sku: string;
  cart: ICartItem[] | null;
}

let cart: ICartItem[] = [];
if (typeof window !== 'undefined') {
  cart = JSON.parse(localStorage.getItem('cart') || '[]');
}

const initialState: ICartOptionState = {
  isLoading: false,
  index: null,
  is_stock: false,
  cleared: false,
  stock: 0,
  sku: '',
  cart: cart || [],
};

export const addToCartSlice = createSlice({
  name: 'addToCart',
  initialState,
  reducers: {
    selectOptions: (state, { payload }) => {
      state.index = payload.index;
      state.stock = payload.stock;
      state.is_stock = payload.is_stock;
      state.sku = payload.sku;
    },
    clearedOptions: (state, { payload }) => {
      state.cleared = payload.cleared;
    },
    increaseCartQty: (state, { payload }) => {
      if (state.cart?.length && state.cart[payload.index]) {
        if (
          state.cart[payload.index].qty + 1 <=
          state.cart[payload.index].stock
        ) {
          state.cart[payload.index].qty += 1;
        }
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    decreaseCartQty: (state, { payload }) => {
      if (state.cart?.length && state.cart[payload.index]) {
        if (state.cart[payload.index].qty - 1 > 0) {
          state.cart[payload.index].qty -= 1;
        }
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    removeItem: (state, { payload }) => {
      if (state.cart?.length && state.cart[payload.index]) {
        state.cart.splice(payload.index, 1);
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    removeAllSelect: (state) => {
      if (state.cart?.length) {
        for (let i = 0; i <= state.cart.length + 1; i++) {
          state.cart.map((cart, index) => {
            if (cart.selected) {
              state.cart?.splice(index, 1);
            }
          });
        }
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    handleSelect: (state, { payload }) => {
      if (state.cart?.length && state.cart[payload.index]) {
        state.cart[payload.index].selected =
          !state.cart[payload.index].selected;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    handleAll: (state, { payload }) => {
      if (state.cart?.length) {
        state.cart.map((c) => {
          c.selected = payload.deselect ? false : true;
        });

        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductBySKU.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductBySKU.fulfilled, (state, action) => {
        let isRepeated = false;
        if (state.cart?.length && state.cart.length > 0) {
          state.cart.forEach((cart) => {
            if (cart.sku === action.payload?.sku) {
              cart.qty += action.payload.qty;
              isRepeated = true;
            }
          });
        }

        if (!isRepeated) {
          state.cart?.unshift({
            sku: action.payload?.sku || '',
            qty: action.payload?.qty || 0,
            price: action.payload?.price || '',
            slug: action.payload?.slug || '',
            title: action.payload?.title || '',
            value: action.payload?.value || [],
            image_url: action.payload?.image_url || '',
            stock: action.payload?.stock || 0,
            is_stock: action.payload?.is_stock || false,
            selected: true,
          });
        }

        state.index = null;
        state.stock = 0;
        state.is_stock = false;
        state.sku = '';
        state.cleared = true;

        localStorage.setItem('cart', JSON.stringify(state.cart));
        state.isLoading = false;
      });
  },
});

export const {
  selectOptions,
  clearedOptions,
  increaseCartQty,
  decreaseCartQty,
  removeItem,
  removeAllSelect,
  handleSelect,
  handleAll,
} = addToCartSlice.actions;

export default addToCartSlice.reducer;
