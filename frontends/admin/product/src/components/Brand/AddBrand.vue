<script setup lang="ts">
import * as Theme from 'main/Styles';
import { onMounted, ref, watch } from 'vue';
import ThImage from 'main/ThImage';
import {
  setActivatedSelect,
  brandSlugHandle,
  setAddBrandForm,
  createBrand,
  getBrandList,
  deleteBrand,
  setAddBrandImage,
} from 'store/Store';
import { useDispath, useSelector } from '../../redux/helper';
import { MEDIA_API } from 'main/Config';

interface BrandListState {
  slug: string;
  title: string;
  image_url?: string | null;
  product: number;
}

const dispatch = useDispath();
const add_brand: any = useSelector((state) => state.catalog.add_brand);
const brand_list_state: any = useSelector((state) => state.catalog.brand_list);
const select_image_state = useSelector((state) => state.media);

const image_url = ref<string>('');
const brand_name = ref<string>('');
const slug_input = ref<string>('');
const slug_warn = ref<boolean | null>(null);
const brand_list = ref<BrandListState[]>([]);

const selectImage = () => {
  dispatch(setActivatedSelect({ state_name: 'add_brand', is_single: true }));
};

const newBrandName = (e: Event) => {
  const inputValue = e.target as HTMLInputElement;
  brand_name.value = inputValue.value;
};

const handleSlug = (e: Event) => {
  const slugInput = e.target as HTMLInputElement;
  const slugValue = slugInput.value;
  dispatch(brandSlugHandle(slugValue));
  slug_input.value = slugValue;
};

const addNewBrand = () => {
  if (brand_name.value && slug_input.value && slug_warn.value) {
    dispatch(
      createBrand({
        slug: slug_input.value,
        title: brand_name.value,
        image_url: image_url.value,
      })
    );
  }
};

const deleteBrandClick = (slug: string) => {
  dispatch(deleteBrand(slug));
};

watch([add_brand, brand_list_state, select_image_state], () => {
  if (add_brand.value.image_url) {
    image_url.value = add_brand.value.image_url;
  }

  if (add_brand.value.allow_slug !== undefined) {
    slug_warn.value = add_brand.value.allow_slug;
  }

  if (brand_list_state.value) {
    brand_list.value = brand_list_state.value;
  }

  if (select_image_state) {
    const select_image_value = select_image_state.value.select_image;
    if (select_image_value.activated && select_image_value.single.length) {
      if (select_image_value.state_name === 'add_brand') {
        dispatch(setAddBrandImage(select_image_value.single));
        dispatch(setActivatedSelect(false));
      }
    }
  }
});

onMounted(() => {
  dispatch(getBrandList());
  brand_list.value = brand_list_state.value;
});
</script>

<template>
  <div class="brand_add__main p-6 relative">
    <h5>Add new brand</h5>
    <div class="brand_add__main__detail">
      <div class="brand_add__main__detail__image" v-on:click="selectImage">
        <button v-if="!add_brand.image_url">add image</button>
        <img
          v-if="image_url"
          :src="MEDIA_API + '/image/' + image_url"
          crossorigin="anonymous"
        />
      </div>
      <div class="brand_add__main__detail__form">
        <div class="flex gap-3">
          <div class="form-input">
            <input
              type="text"
              :value="brand_name"
              @input="newBrandName"
              required
            />
            <label>Brand name</label>
          </div>
          <div :class="`form-input ${slug_warn === false && 'alert'}`">
            <input
              type="text"
              required
              :value="slug_input"
              @input="handleSlug"
            />
            <label>Slug</label>
          </div>
        </div>
        <div class="form-input text-area">
          <textarea required></textarea>
          <label>description</label>
        </div>
      </div>
    </div>
    <div class="flex">
      <button class="button" v-on:click="addNewBrand">Add Brand</button>
    </div>
  </div>
  <div>
    <table>
      <tbody>
        <tr>
          <td>brand name</td>
          <td>delete</td>
        </tr>
      </tbody>
      <thead>
        <tr v-for="(brand, index) in brand_list" :key="index">
          <td>{{ brand.title }}</td>
          <td><button @click="deleteBrandClick(brand.slug)">delete</button></td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.brand_add__main {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .brand_add__main__detail {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1fr;
    width: 100%;
    border: 1px solid black;
    padding: 1rem;
    border-radius: v-bind('Theme.borderRadius');
    background: v-bind('Theme.white');
    overflow: hidden;

    .brand_add__main__detail__image {
      display: flex;
      overflow: hidden;
      justify-content: center;
      height: 14rem;
      padding: 1rem;
      img {
        display: flex;
        flex: 0 1 auto;
        object-fit: contain;
      }
    }

    .brand_add__main__detail__form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
}
</style>
