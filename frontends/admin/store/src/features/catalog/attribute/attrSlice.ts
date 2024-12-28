import { createSlice } from '@reduxjs/toolkit';
import { Locale } from '../../../interface/locale.enum';

export interface AttributeState {
  attribute_form: {
    locale: Locale;
    attribute: {
      name: string;
      type: string;
      description: string | null;
      value: {
        id: number;
        value: string;
        more: string | null;
      }[];
    };
  };
}

const initialState: AttributeState = {
  attribute_form: {
    locale: Locale.th,
    attribute: {
      name: '',
      type: '',
      description: null,
      value: [],
    },
  },
};

export const attributeSlice = createSlice({
  name: 'attribute',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = attributeSlice.actions;

export default attributeSlice.reducer;
