import axios, { AxiosError } from 'axios';
import { getAccessToken, getProductAttr, getProductList } from '../../../store';
// @ts-ignore
import { CATALOG_API } from 'container/Config';

// Product
export const getProductListThunk = async (_, thunkApi) => {
  try {
    const token = await thunkApi.dispatch(getAccessToken());
    const resp = await axios.get(`${CATALOG_API}/product?lang=en`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.payload}`,
      },
    });

    if (resp.status === 200) {
      return thunkApi.fulfillWithValue(resp.data);
    }

    return thunkApi.rejected();
  } catch (err) {
    if (err instanceof AxiosError) {
      return thunkApi.rejectWithValue(err.response?.data.message);
    }
  }
};

export const getProductAdminThunk = async (slug: string, thunkApi) => {
  try {
    const token = await thunkApi.dispatch(getAccessToken());
    const resp = await axios.get(`${CATALOG_API}/product/admin/slug/${slug}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.payload}`,
      },
    });

    if (resp.status === 200) {
      return thunkApi.fulfillWithValue(resp.data);
    }

    return thunkApi.rejected();
  } catch (err) {
    if (err instanceof AxiosError) {
      return thunkApi.rejectWithValue(err.response?.data.message);
    }
  }
};

export const createProductThunk = async (data, thunkApi) => {
  try {
    const token = await thunkApi.dispatch(getAccessToken());
    const resp = await axios.post(
      `${CATALOG_API}/product`,
      {
        ...data,
        media: data.product.gallery,
        product: {
          ...data.product,
          publish_at: data.product.publish_at
            ? data.product.publish_at
            : new Date(Date.now()).toISOString(),
        },
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token.payload}`,
        },
      }
    );

    if (resp.status === 201) {
      await thunkApi.dispatch(getProductList({}));
      return thunkApi.fulfillWithValue(resp.data);
    }

    return thunkApi.rejectedWithValue(resp.data.message);
  } catch (err) {
    if (err instanceof AxiosError) {
      return thunkApi.rejectWithValue(err.response?.data.message);
    }
  }
};

export const deleteProductThunk = async (slug: string, thunkApi) => {
  try {
    const token = await thunkApi.dispatch(getAccessToken());
    const resp = await axios.delete(`${CATALOG_API}/product/slug/${slug}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token.payload}` },
    });

    if (resp.status === 204) {
      await thunkApi.dispatch(getProductList({}));
      return thunkApi.fulfillWithValue(true);
    }

    return thunkApi.rejected();
  } catch (err) {
    if (err instanceof AxiosError) {
      return thunkApi.rejectedWithValue(err.response?.data.message);
    }
  }
};

// Subcategory Attribute
export const createProductAttrThunk = async (data, thunkApi) => {
  try {
    const token = await thunkApi.dispatch(getAccessToken());
    const resp = await axios.post(
      `${CATALOG_API}/product-attr`,
      { ...data },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token.payload}`,
        },
      }
    );

    if (resp.status === 201) {
      await thunkApi.dispatch(getProductAttr({}));
      return thunkApi.fulfillWithValue(resp.data);
    }

    return thunkApi.rejectedWithValue(resp.data.message);
  } catch (err) {
    if (err instanceof AxiosError) {
      return thunkApi.rejectWithValue(err.response?.data.message);
    }
  }
};

export const getProductAttrThunk = async (_, thunkApi) => {
  try {
    const token = await thunkApi.dispatch(getAccessToken());
    const resp = await axios.get(`${CATALOG_API}/product-attr?lang=en`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.payload}`,
      },
    });

    if (resp.status === 200) {
      return thunkApi.fulfillWithValue(resp.data);
    }

    return thunkApi.rejected();
  } catch (err) {
    if (err instanceof AxiosError) {
      return thunkApi.rejectWithValue(err.response?.data.message);
    }
  }
};

export const getProductAttrByIdThunk = async (id: number, thunkApi) => {
  try {
    const token = await thunkApi.dispatch(getAccessToken());
    const resp = await axios.get(
      `${CATALOG_API}/product-attr/single?id=${id}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token.payload}`,
        },
      }
    );

    if (resp.status === 200) {
      return thunkApi.fulfillWithValue(resp.data);
    }

    return thunkApi.rejected();
  } catch (err) {
    if (err instanceof AxiosError) {
      return thunkApi.rejectWithValue(err.response?.data.message);
    }
  }
};

export const deleteProductAttrThunk = async (id: number, thunkApi) => {
  try {
    const token = await thunkApi.dispatch(getAccessToken());
    console.log(token);
    const resp = await axios.delete(`${CATALOG_API}/product-attr?id=${id}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token.payload}` },
    });

    console.log(resp);

    if (resp.status === 204) {
      await thunkApi.dispatch(getProductAttr({}));
      return thunkApi.fulfillWithValue(true);
    }

    return thunkApi.rejected();
  } catch (err) {
    if (err instanceof AxiosError) {
      return thunkApi.rejectedWithValue(err.response?.data.message);
    }
  }
};
