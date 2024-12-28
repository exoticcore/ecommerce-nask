import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  checkImageNameThunk,
  deleteImageThunk,
  getImageList,
  // selectImageThunk,
  uploadImageThunk,
} from './mediaThunk';
import { IImageList } from '../../interface/mediaApiInterface';

interface IMediaState {
  image_list: IImageList[];
  add_media: {
    activated: boolean;
    image_name: string;
    file: string | null;
    new_name: string;
    allow_name: boolean | null;
    file_type: string | null;
  };
  select_image: {
    activated: boolean;
    is_single: boolean;
    single: string;
    gallery: string[];
    state_name: string;
  };
}

const initialState: IMediaState = {
  image_list: [],
  add_media: {
    activated: false,
    image_name: '',
    file: null,
    new_name: '',
    allow_name: null,
    file_type: null,
  },
  select_image: {
    activated: false,
    is_single: true,
    single: '',
    gallery: [],
    state_name: '',
  },
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    addmedia: (state, { payload }) => {
      state.image_list = payload;
    },
    activatedUpload: (state, { payload }) => {
      state.add_media.activated = payload;
    },
    setActivatedSelect: (state, { payload }) => {
      if (payload && !state.select_image.activated) {
        state.select_image.state_name = payload.state_name;
        state.select_image.activated = true;
        state.select_image.is_single = payload.is_single;
      } else {
        state.select_image = initialState.select_image;
      }
    },
    selectImage: (state, { payload }) => {
      if (payload.length) {
        if (state.select_image.is_single) {
          state.select_image.single = payload;
        } else {
          state.select_image.gallery = payload;
        }
      }
    },
    setNewName: (state, { payload }) => {
      state.add_media.new_name = payload;
    },
    setFile: (state, { payload }) => {
      state.add_media.file = payload.file_preview;
      state.add_media.file_type = payload.file_type;
    },
    clearAddImage: (state, { payload }) => {
      state.add_media = initialState.add_media;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getImage.fulfilled, (state, action) => {
        state.image_list = action.payload;
      })
      .addCase(getImage.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        const new_list: IImageList[] = [];
        state.image_list.map((image) => {
          if (image.name !== action.payload) {
            new_list.push(image);
          }
        });
        state.image_list = new_list;
      })
      .addCase(deleteImage.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(checkImageName.fulfilled, (state, action) => {
        state.add_media.allow_name = true;
      })
      .addCase(checkImageName.rejected, (state, action) => {
        state.add_media.allow_name = false;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        clearAddImage({});
        activatedUpload(false);
      });
  },
});
export const getImage = createAsyncThunk('media/list', getImageList);

export const uploadImage = createAsyncThunk(
  'media/uploadImage',
  uploadImageThunk
);

export const deleteImage = createAsyncThunk(
  'media/deleteImage',
  deleteImageThunk
);

export const checkImageName = createAsyncThunk(
  'media/checkNameImage',
  checkImageNameThunk
);

// export const selectImage = createAsyncThunk(
//   'media/selectImage',
//   selectImageThunk
// );

export const {
  activatedUpload,
  setNewName,
  setFile,
  clearAddImage,
  setActivatedSelect,
  selectImage,
} = mediaSlice.actions;

export default mediaSlice.reducer;
