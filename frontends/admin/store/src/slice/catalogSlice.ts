import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
// @ts-ignore
import { CATALOG_API } from 'container/Config';
import { getAccessToken } from '../store';

export interface CatalogState {
  category_list: any[];
  brand_list: any[];
  add_brand: {
    name: string;
    slug: string;
    image_url: string;
    allow_slug: boolean | null;
  };
}

const initialState: CatalogState = {
  category_list: [],
  brand_list: [],
  add_brand: {
    name: '',
    slug: '',
    image_url: '',
    allow_slug: null,
  },
};

export const getAllSubcategory = createAsyncThunk(
  'subcategory/list',
  async (_, thunkApi) => {
    try {
      const resp = await axios.get(`${CATALOG_API}/subcat-attr`);

      if (resp.status === 200 && resp.data) {
        return thunkApi.fulfillWithValue(resp.data);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        return thunkApi.rejectWithValue(err.response?.data.message);
      }
    }
  }
);

export const createSubcategory = createAsyncThunk(
  'subcategory/list',
  async (data: object, thunkApi) => {
    try {
      const token = (await thunkApi.dispatch(getAccessToken())).payload;
      const resp = await axios.post(
        `${CATALOG_API}/subcat-attr`,
        { ...data },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (resp.status === 201) {
        thunkApi.dispatch(getAllSubcategory());
        return thunkApi.fulfillWithValue(resp.data);
      }

      return thunkApi.rejectWithValue(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        return thunkApi.rejectWithValue(err.response?.data.message);
      }
    }
  }
);

export const deleteSubcategory = createAsyncThunk(
  'subcategory/list',
  async (slug: string, thunkApi) => {
    try {
      const token = (await thunkApi.dispatch(getAccessToken())).payload;
      const resp = await axios.delete(`${CATALOG_API}/subcat-attr/${slug}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (resp.status === 204) {
        thunkApi.dispatch(getAllSubcategory());
        return thunkApi.fulfillWithValue(true);
      }

      return thunkApi.rejectWithValue(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        return thunkApi.rejectWithValue(err.response?.data.message);
      }
    }
  }
);

export const getBrandList = createAsyncThunk(
  'brand/list',
  async (_, thunkApi) => {
    try {
      const resp = await axios.get(`${CATALOG_API}/brand`, {
        withCredentials: true,
      });

      if (resp.status === 200 && resp.data) {
        return thunkApi.fulfillWithValue(resp.data);
      }

      return thunkApi.rejectWithValue(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        return thunkApi.rejectWithValue(err.response?.data.message);
      }
    }
  }
);

export const brandSlugHandle = createAsyncThunk(
  'brand/slug',
  async (slug: string, thunkApi) => {
    try {
      const token = (await thunkApi.dispatch(getAccessToken())).payload;
      const resp = await axios.post(
        `${CATALOG_API}/brand/slug/check`,
        {
          slug,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.status === 200) {
        return thunkApi.fulfillWithValue(resp.data);
      }

      return thunkApi.rejectWithValue(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        return thunkApi.rejectWithValue(err.response?.data.message);
      }
    }
  }
);

export const createBrand = createAsyncThunk(
  'brand/create',
  async (data: object, thunkApi) => {
    try {
      console.log(data);
      const token = (await thunkApi.dispatch(getAccessToken())).payload;
      const resp = await axios.post(
        `${CATALOG_API}/brand`,
        {
          ...data,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.status === 201) {
        thunkApi.dispatch(getBrandList());
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        return thunkApi.rejectWithValue(err.response?.data.message);
      }
    }
  }
);

export const deleteBrand = createAsyncThunk(
  'brand/delete',
  async (slug: string, thunkApi) => {
    try {
      const token = (await thunkApi.dispatch(getAccessToken())).payload;
      const resp = await axios.delete(`${CATALOG_API}/brand/${slug}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (resp.status === 204) {
        thunkApi.dispatch(getBrandList());
        return thunkApi.fulfillWithValue(true);
      }

      return thunkApi.rejectWithValue(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        return thunkApi.rejectWithValue(err.response?.data.message);
      }
    }
  }
);

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setAddBrandImage: (state, { payload }) => {
      state.add_brand.image_url = payload;
    },
    clearData: (state, { payload }) => {
      state.brand_list = [];
    },
    setAddBrandForm: (state, { payload }) => {
      state.add_brand = {
        slug: payload.slug,
        name: payload.name || state.add_brand.name,
        image_url: payload.image_url || state.add_brand.image_url,
        allow_slug: state.add_brand.allow_slug,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBrandList.fulfilled, (state, action) => {
        if (action.payload.brands.length) {
          state.brand_list = [...action.payload.brands];
        } else {
          state.brand_list = [];
        }
      })
      .addCase(getBrandList.rejected, (state, action) => {
        state.brand_list = [];
      })
      .addCase(brandSlugHandle.fulfilled, (state, action) => {
        state.add_brand.allow_slug = true;
      })
      .addCase(brandSlugHandle.rejected, (state, action) => {
        state.add_brand.allow_slug = false;
      })
      .addCase(getAllSubcategory.fulfilled, (state, action) => {
        state.category_list = action.payload;
      });
  },
});

export const { clearData, setAddBrandImage, setAddBrandForm } =
  catalogSlice.actions;

export default catalogSlice.reducer;
