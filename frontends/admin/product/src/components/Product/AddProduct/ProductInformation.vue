<template>
  <div class="card">
    <div class="flex flex-col gap-3">
      <h6>Product Information</h6>
      <div class="flex gap-3">
        <div class="form-input">
          <input
            type="text"
            required
            v-on:change="(e) => productInfoChange(e, ProductInfo.name_th)"
          />
          <label>Product Name TH</label>
        </div>
        <div class="form-input">
          <input
            type="text"
            required
            v-on:change="(e) => productInfoChange(e, ProductInfo.name_en)"
          />
          <label>Product Name EN</label>
        </div>
      </div>
      <div class="form-input">
        <input
          type="text"
          :value="product_slug"
          required
          v-on:change="changeProductSlug"
        />
        <label>slug</label>
      </div>
      <div class="form-input text-area">
        <textarea
          v-on:change="(e) => productInfoChange(e, ProductInfo.des_th)"
          required
        ></textarea>
        <label>description TH</label>
      </div>
      <div class="form-input text-area">
        <textarea
          required
          v-on:change="(e) => productInfoChange(e, ProductInfo.des_en)"
        ></textarea>
        <label>description EN</label>
      </div>
      <div class="form-input text-area">
        <textarea
          v-on:change="(e) => productInfoChange(e, ProductInfo.info_th)"
          required
        ></textarea>
        <label>information TH</label>
      </div>
      <div class="form-input text-area">
        <textarea
          required
          v-on:change="(e) => productInfoChange(e, ProductInfo.info_en)"
        ></textarea>
        <label>information EN</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useDispath, useSelector } from '../../../redux/helper';
import { onMounted, ref, watch } from 'vue';
import {
  setProductSlug,
  setProductTitle,
  setProductDescription,
  setProductInformation,
} from 'store/Store';

export default {
  setup() {
    const dispatch = useDispath();
    const add_product_state = useSelector((state) => state.product.add_product);

    interface IProductInfo {}

    const product_slug = ref<string>('');

    const test = '';

    enum ProductInfo {
      name_th,
      name_en,
      des_th,
      des_en,
      info_th,
      info_en,
      slug,
    }

    const productInfoChange = (e: Event, type: ProductInfo) => {
      const target = e.target as HTMLInputElement;
      switch (type) {
        case ProductInfo.name_th:
          dispatch(setProductTitle({ locale: 'th', title: target.value }));
          break;
        case ProductInfo.name_en:
          dispatch(setProductTitle({ locale: 'en', title: target.value }));
          break;
        case ProductInfo.des_th:
          dispatch(
            setProductDescription({ locale: 'th', description: target.value })
          );
          break;
        case ProductInfo.des_en:
          dispatch(
            setProductDescription({ locale: 'en', description: target.value })
          );
          break;
        case ProductInfo.info_th:
          dispatch(
            setProductInformation({ locale: 'th', information: target.value })
          );
          break;
        case ProductInfo.info_en:
          dispatch(
            setProductInformation({ locale: 'en', information: target.value })
          );
          break;
        case ProductInfo.slug:
          dispatch(setProductSlug(target.value));
          break;
        default:
          break;
      }
    };

    const changeProductSlug = (e: Event) => {
      const target = e.target as HTMLInputElement;
      dispatch(setProductSlug(target.value));
    };

    watch([add_product_state], () => {
      console.log(add_product_state.value.product.slug);
      product_slug.value = add_product_state.value.product.slug || '';
    });

    return {
      ProductInfo,
      productInfoChange,
      product_slug,
      changeProductSlug,
    };
  },
};
</script>
