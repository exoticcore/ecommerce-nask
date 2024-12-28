<script setup lang="ts">
import * as Theme from 'main/Styles';
import { useRoute } from 'vue-router';
import { ref, watch, watchEffect } from 'vue';
import ThImage from 'main/ThImage';
import { getBrandList, createProduct, setProductPrice } from 'store/Store';
import { useDispath, useSelector } from '../../../redux/helper';
import AddProductAttribute from './AddProductAttribute.vue';
import AddProductWholesale from './AddProductWholesale.vue';
import ProductSKU from './ProductSKU.vue';
import AddGallery from './AddGallery.vue';
import ProductImage from './ProductImage.vue';
import SelectCategory from './SelectCategory.vue';
import SelectBrand from './SelectBrand.vue';
import ProductInformation from './ProductInformation.vue';

const dispath = useDispath();
const add_prdouct_state = useSelector((state) => state.product.add_product);
const catalog = useSelector((state) => state.catalog);
const brands = ref([]);
const route = useRoute();

const price = ref(0);

const slug = ref(route.params.slug);
const brand_name = ref('');

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

watch(add_prdouct_state, () => {});

const debounceInput = debounce((event: Event) => {
  const target = event.target as HTMLInputElement;
  getProduct();
  console.log(target.value);
});

const getProduct = () => {
  dispath(getBrandList());
};

const PublishOnClick = () => {
  dispath(createProduct(add_prdouct_state.value));
};

const PreviewOnClick = () => {
  console.log(add_prdouct_state.value);
};

function setProductPriceOnChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (parseFloat(target.value)) {
    dispath(setProductPrice(parseFloat(target.value)));
  }
}
</script>

<template>
  <div class="p-6 relative">
    <h5 v-if="slug">Edit {{ slug }}</h5>
    <h5 v-else>Add new product</h5>
    <div class="product-form">
      <div class="product-form__grid">
        <div class="product-form__basic-information">
          <div>
            <div class="flex gap-5">
              <div class="flex items-center justify-center gap-2">
                <input
                  type="radio"
                  name="lang"
                  class="input-radio"
                  id="th_lang"
                  :value="'th'"
                  checked
                /><label class="pt-2" for="th_lang">Thai</label>
              </div>
              <div class="flex items-center justify-center gap-2">
                <input
                  type="radio"
                  name="lang"
                  class="input-radio"
                  :value="'en'"
                  id="en_lang"
                /><label class="pt-2" for="en_lang">English</label>
              </div>
            </div>
          </div>
          <div class="form-input">
            <input type="text" required />
            <label>product title</label>
          </div>
          <div class="form-input">
            <input type="text" required />
            <label>slug</label>
          </div>
          <div class="form-input text-area">
            <textarea required></textarea>
            <label>description</label>
          </div>
        </div>
        <div class="product-form__data">
          <div class="flex w-full items-center gap-2">
            <span>Product Data - </span>
            <select>
              <option>General Product</option>
              <option>Many Options Product</option>
              <option>Dropship Product</option>
            </select>
          </div>
          <div class="product-form__data__menu">
            <div class="menu__sidebar">
              <div class="menu__sidebar__option">
                <span>General</span>
              </div>
              <div class="menu__sidebar__option">
                <span>Inventory</span>
              </div>
              <div class="menu__sidebar__option">
                <span>Shipment</span>
              </div>
              <div class="menu__sidebar__option">
                <span>Attribute</span>
              </div>
              <div class="menu__sidebar__option">
                <span>Advanced</span>
              </div>
            </div>
            <div class="menu__form">
              <div class="form-input">
                <input
                  type="text"
                  v-on:change="setProductPriceOnChange"
                  required
                />
                <label>normal price</label>
              </div>
              <div class="form-input">
                <input type="text" required />
                <label>special price</label>
              </div>
              <div>
                <label for="price_start">Price Start:</label>
                <input type="date" id="price_start" />
              </div>
              <div>
                <label for="price_start">Price End:</label>
                <input type="date" id="price_start" />
              </div>
            </div>
          </div>
        </div>
        <ProductInformation />
        <AddProductAttribute />
        <ProductSKU />
        <AddProductWholesale />
      </div>
      <div class="product-form__grid">
        <div class="product-form__publish card">
          <h6>Publish</h6>
          <div class="publish__edit">
            <div class="flex gap-2">
              <span>Visibility: Public</span>
              <div>Edit</div>
            </div>
          </div>
          <div class="publish__edit">
            <div class="flex gap-2">
              <span>Publish: Now</span>
              <div>Edit</div>
            </div>
          </div>
          <div class="flex gap-3">
            <button v-on:click="PublishOnClick">Publish</button>
            <button v-on:click="PreviewOnClick">Preview</button>
          </div>
        </div>
        <div class="product-form__category card">
          <h6>Image</h6>
          <ProductImage />
        </div>
        <div class="product-form__category card">
          <h6>Category</h6>
          <SelectCategory />
        </div>
        <div class="product-form__category card">
          <h6>Tags</h6>
        </div>
        <div class="product-form__category card">
          <h6>Gallerry</h6>
          <AddGallery />
        </div>
        <div class="product-form__brand card">
          <h6>Brand</h6>
          <SelectBrand />
          <!-- <div class="flex gap-3 pt-2">
            <div class="form-input">
              <input
                type="text"
                required
                v-model="brand_name"
                @input="debounceInput"
              />
              <label>Add new brand</label>
            </div>
            <button class="button">Add</button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-form {
  display: grid;
  grid-template-columns: 5fr 2fr;
  padding: 1rem 0;
  width: 100%;
  position: relative;
  gap: 1.25rem;

  h6 {
    color: v-bind('Theme.grey400');
    font-weight: 300;
    font-size: 1rem;
  }

  .card {
    background: v-bind('Theme.white');
    border-radius: v-bind('Theme.borderRadius');
    overflow: hidden;
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

  .product-form__data {
    background: v-bind('Theme.white');
    border-radius: v-bind('Theme.borderRadius');
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;

    .product-form__data__menu {
      display: grid;
      grid-template-columns: 1fr 2.5fr;
      gap: 1rem;
      width: 100%;

      .menu__form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }
  }
}
</style>
