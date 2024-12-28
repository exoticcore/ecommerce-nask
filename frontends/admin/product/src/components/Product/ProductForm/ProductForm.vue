<script setup lang="ts">
import * as Theme from 'main/Styles';
import { useRoute } from 'vue-router';
import { onMounted, ref, watch, watchEffect } from 'vue';
import {
  getBrandList,
  changeLocale,
  getProductAdmin,
  clearAddProduct,
} from 'store/Store';
import { useDispath, useSelector } from '../../../redux/helper';
import ProductInformation from './ProductInformation/ProductInformation.vue';
import ProductData from './ProductData/ProductData.vue';
import ProductDescription from './ProductDescription/ProductDescription.vue';
import PublishProduct from './PublishProduct/PublishProduct.vue';
import ProductImage from './ProductImage/ProductImage.vue';
import ProductGallery from './ProductGallery/ProductGallery.vue';
import ProductCategory from './ProductCategory/ProductCategory.vue';
import ProductBrand from './ProductBrand/ProductBrand.vue';
import ProductTag from './ProductTag/ProductTag.vue';
import { FormType } from '../../../types/FormType';

const dispath = useDispath();
const catalog = useSelector((state) => state.catalog);

const add_product_state = useSelector((state) => state.product.add_product);
const locale_state = useSelector((state) => state.product.add_product.locale);
const form_state = useSelector((state) => state.product.form_state);

const product_title = ref('');

const brands = ref([]);
const route = useRoute();

const slug = ref(route.params.slug);
const brand_name = ref('');

const locale = [
  { name: 'ภาษาไทย', value: 'th' },
  { name: 'English', value: 'en' },
];

const selected_locale = ref<string>('en');

const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 1500
): ((...args: Parameters<T>) => void) => {
  let timeoutID: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const debounceInput = debounce((event: Event) => {
  const target = event.target as HTMLInputElement;
  getProduct();
  console.log(target.value);
});

const getProduct = () => {
  dispath(getBrandList());
};

watch(
  [locale_state, add_product_state, form_state, slug],
  () => {
    if (add_product_state.value.translate[0].title.length) {
      product_title.value = add_product_state.value.translate[0].title;
    }
    selected_locale.value = locale_state.value;
  },
  { immediate: true }
);

onMounted(() => {
  if (location.pathname.includes('edit') && slug.value) {
    dispath(getProductAdmin(slug.value.toString()));
  } else {
    dispath(clearAddProduct());
  }
});

function localeOnChange(e: Event) {
  const target = e.target as HTMLOptionElement;
  dispath(changeLocale(target.value));
}
</script>

<template>
  <div class="p-6 relative">
    <div class="flex content-center justify-between">
      <h5 v-if="slug">Edit {{ product_title }}</h5>
      <h5 v-else>Add new product</h5>
      <div class="form-dropdown">
        <select v-on:change="(e) => localeOnChange(e)">
          <option
            v-for="(loc, l_index) in locale"
            :value="loc.value"
            :key="l_index"
            :selected="selected_locale === loc.value"
          >
            {{ loc.name }}
          </option>
        </select>
        <div class="dropdown__icon">
          <v-icon name="fa-angle-down" scale="1" />
        </div>
      </div>
    </div>
    <div class="product-form">
      <div class="product-form__grid">
        <ProductInformation :product_state="FormType.AddProduct" />
        <ProductData />
        <ProductDescription />
      </div>
      <div class="product-form__grid">
        <PublishProduct :product_state="FormType.AddProduct" />
        <ProductImage />
        <ProductGallery />
        <ProductCategory />
        <ProductTag />
        <ProductBrand />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h6 {
  color: v-bind('Theme.grey400');
  font-weight: 300;
  font-size: 1rem;
}
.product-form {
  display: grid;
  grid-template-columns: 5fr 2fr;
  padding: 1rem 0;
  width: 100%;
  position: relative;
  gap: 1.25rem;

  .card {
    background: v-bind('Theme.white');
    border-radius: v-bind('Theme.borderRadius');
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
  }

  .product-form__grid {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .product-form__basic-information {
    background: v-bind('Theme.white');
    padding: 1.5rem 1rem;
    border-radius: v-bind('Theme.borderRadius');
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: 1rem;
  }
}
</style>
