<template>
  <h6 class="mb-3">
    Variations
    {{ variation_sku.length > 0 ? `(${variation_sku.length})` : '' }}
  </h6>
  <div class="flex flex-col gap-3" v-if="variation_sku.length">
    <div
      class="flex flex-col gap-3 pb-3"
      v-for="(variation, v_index) in variation_sku"
      :key="v_index"
    >
      <hr />
      <div class="flex ml-2">
        <div
          v-for="(attr_value, a_index) in attr_value_name[v_index]"
          :key="a_index"
        >
          {{ a_index > 0 ? ' , ' + attr_value : attr_value }}
        </div>
      </div>
      <div class="flex items-end">
        <div class="w-full">
          <div class="sku-image" v-on:click="selectSkuImageOnClick(v_index)">
            <v-icon
              name="bi-image-fill"
              class="image-icon"
              v-if="!variation.sku.image_url"
            />
            <img
              v-else
              :src="MEDIA_API + '/image/' + variation.sku.image_url"
              crossorigin="anonymous"
              width="100"
              height="100"
            />
          </div>
        </div>
        <div class="form-input">
          <input
            type="text"
            required
            v-on:change="(e) => setSkuValueOnChange(e, v_index)"
            :value="variation.sku.sku"
          />
          <label>SKU</label>
        </div>
      </div>
      <div class="flex pl-2 gap-6 mt-6">
        <div class="flex gap-2 items-start">
          <input type="checkbox" :id="`enabled${v_index}`" :checked="true" />
          <label :for="`enabled${v_index}`" class="font-extralight"
            >Enabled</label
          >
        </div>
        <div class="flex gap-2 items-start">
          <input type="checkbox" :id="`manage${v_index}`" />
          <label :for="`manage${v_index}`" class="font-extralight"
            >Manage stock?</label
          >
        </div>
      </div>
      <div class="flex w-full justify-end">
        <div class="flex gap-2">
          <input type="checkbox" :id="`schedule${v_index}`" />
          <label :for="`schedule${v_index}`" class="font-extralight"
            >Schedule</label
          >
        </div>
      </div>
      <div class="flex gap-3">
        <div class="form-input">
          <input type="text" v-on:change="" required />
          <label>Normal Price</label>
        </div>
        <div class="form-input">
          <input type="text" required />
          <label>Special Price</label>
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <label class="font-extralight text-sm" :for="`stock_status${v_index}`"
          >Stock status</label
        >
        <div class="form-dropdown">
          <select :id="`stock_status${v_index}`">
            <option>In stock</option>
            <option>Out of stock</option>
          </select>
          <div class="dropdown__icon">
            <v-icon name="fa-angle-down" scale="1" />
          </div>
        </div>
      </div>
      <div class="flex gap-3">
        <div class="form-input">
          <input type="text" v-on:change="" required />
          <label>Weight (kg)</label>
        </div>
        <div class="flex gap-1 w-full">
          <div class="form-input">
            <input type="text" v-on:change="" required />
            <label>Length (cm)</label>
          </div>
          <div class="form-input">
            <input type="text" v-on:change="" required />
            <label>Width (cm)</label>
          </div>
          <div class="form-input">
            <input type="text" v-on:change="" required />
            <label>Height (cm)</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IProductOption, IProductAttr } from '@/types/ProductType';
import { useDispath, useSelector } from '../../../../../redux/helper';
import { onMounted, ref, watch } from 'vue';
import {
  getProductAttr,
  addImageSku,
  setActivatedSelect,
  setSkuValue,
} from 'store/Store';
import { MEDIA_API } from 'main/Config';
import * as Theme from 'main/Styles';

const dispatch = useDispath();

const add_product_state = useSelector((state) => state.product.add_product);
const product_attr_state = useSelector((state) => state.product.product_attr);
const select_image_state = useSelector((state) => state.media.select_image);

const variation_sku = ref<Array<IProductOption>>([]);
const attr_value_name = ref<string[][]>([]);

const manage_stock = ref<boolean[]>([]);

const media_state_name = 'sku_image';

watch(
  [add_product_state, variation_sku, product_attr_state, select_image_state],
  () => {
    if (
      add_product_state.value.options.length &&
      product_attr_state.value.length
    ) {
      const add_product: Array<IProductOption> =
        add_product_state.value.options;
      const product_attr: Array<IProductAttr> = product_attr_state.value;

      let allow = false;

      add_product.forEach((option, attr_index) => {
        const attr_value_string: string[] = [];
        if (option.attr_value_id.length) {
          allow = true;
        }
        option.attr_value_id.forEach((attr_id, opt_index) => {
          product_attr.forEach((attr) => {
            attr.value.forEach((value) => {
              if (value.id === attr_id) {
                attr_value_string.push(value.value);
              }
            });
          });
        });

        attr_value_name.value[attr_index] = attr_value_string;
      });

      if (allow) {
        variation_sku.value = add_product_state.value.options;
      }
    }

    if (select_image_state) {
      const select_image_value = select_image_state.value;

      if (select_image_value.activated && select_image_value.single.length) {
        const sku_index = parseInt(
          select_image_value.state_name.replace(media_state_name, '')
        );
        if (sku_index || sku_index === 0) {
          dispatch(
            addImageSku({
              index: sku_index,
              image_url: select_image_value.single,
            })
          );
          dispatch(setActivatedSelect(false));
        }
      }
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (add_product_state.value.options.length > 1) {
    variation_sku.value = add_product_state.value.options;
  }

  if (!product_attr_state.value.length) {
    dispatch(getProductAttr());
  }
});

function selectSkuImageOnClick(sku_index: number) {
  dispatch(
    setActivatedSelect({
      state_name: `${media_state_name}${sku_index}`,
      is_single: true,
    })
  );
}

function setSkuValueOnChange(e: Event, sku_index: number) {
  const target = e.target as HTMLInputElement;
  const value = target.value;
  dispatch(setSkuValue({ index: sku_index, value: value }));
}
</script>

<style lang="scss" scoped>
.sku-image {
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  border-radius: v-bind('Theme.borderRadius');
  overflow: hidden;

  .image-icon {
    width: 100%;
    height: 100%;
  }
}
</style>
