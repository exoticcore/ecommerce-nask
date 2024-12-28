import axios, { AxiosError } from 'axios';
// @ts-ignore
import { MEDIA_API } from 'container/Config';
import {
  clearAddImage,
  getAccessToken,
  getImage,
  setActivatedSelect,
  setAddBrandImage,
} from '../../store';

interface IUploadImage {
  image_name: string;
  file: File;
}

export const checkImageNameThunk = async (
  { image_name, file_type }: { image_name: string; file_type: string },
  thunkApi
) => {
  try {
    const token = await thunkApi.dispatch(getAccessToken());

    const resp = await axios.post(
      `${MEDIA_API}/image/name`,
      { image_name, file_type },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token.payload}`,
        },
      }
    );

    if (resp.status === 200) {
      thunkApi.state.media.add_media.allow_name = true;
      return thunkApi.rejectWithValue(true);
    }

    return thunkApi.rejectWithValue(resp.data.message);
  } catch (err) {
    if (err instanceof AxiosError) {
      return thunkApi.rejectWithValue(err.response?.data.message);
    }
  }
};

export const uploadImageThunk = async (data: IUploadImage, thunkApi) => {
  try {
    const token = await thunkApi.dispatch(getAccessToken());

    const uploadImageForm = new FormData();
    uploadImageForm.append('image', data.file);
    uploadImageForm.append('name', data.image_name);

    const resp = await axios.post(`${MEDIA_API}/image`, uploadImageForm, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.payload}`,
      },
    });

    if (resp.status === 201) {
      thunkApi.dispatch(clearAddImage({}));
      thunkApi.dispatch(getImage({}));
      return thunkApi.fulfillWithValue(resp.data);
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      return thunkApi.rejectWithValue(err.response);
    }
  }
};

export const getImageList = async (_, thunkApi) => {
  try {
    const token = await thunkApi.dispatch(getAccessToken());

    const resp = await axios.get(`${MEDIA_API}/image/list`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.payload}`,
      },
    });

    return thunkApi.fulfillWithValue(resp.data);
  } catch (err) {
    if (err instanceof AxiosError) {
      return thunkApi.rejectWithValue(err.response?.data.message);
    }
  }
};

export const deleteImageThunk = async (image_name: string, thunkApi) => {
  try {
    thunkApi.dispatch(getImageList);
    const token = await thunkApi.dispatch(getAccessToken());

    const resp = await axios.delete(`${MEDIA_API}/image/${image_name}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.payload}`,
      },
    });

    if (resp.status === 204) {
      return thunkApi.fulfillWithValue(image_name);
    }

    return thunkApi.rejectWithValue(resp.data.message);
  } catch (err) {
    if (err instanceof AxiosError) {
      return thunkApi.rejectWithValue(err.response?.data.message);
    }
  }
};

// export const selectImageThunk = async (image_name: string, thunkApi) => {
//   const state = thunkApi.getState();
//   const state_name = state.media.select_image.state_name;

//   if (state_name == 'add_brand') {
//     // thunkApi.dispatch(setAddBrandImage(image_name));
//     thunkApi.dispatch(setActivatedSelect(false));
//     return thunkApi.fulfillWithValue(image_name);
//   }

//   return thunkApi.fulfilled();
// };
