<template>
  <div class="card">
    <h6>
      Variations
      <div v-if="variation_sku.length > 0">({{ variation_sku.length }})</div>
    </h6>
    <div v-if="variation_sku.length > 0" class="flex flex-col gap-3">
      <div v-for="(variation, v_index) in variation_sku" class="flex gap-3">
        <div class="select_image" v-on:click="selectSkuImageOnClick(v_index)">
          <button v-if="!variation.sku.image_url">select image</button>
          <img
            v-if="variation.sku.image_url"
            :src="MEDIA_API + '/image/' + variation.sku.image_url"
            crossorigin="anonymous"
            width="100"
            height="100"
          />
        </div>
        <div class="flex gap-3">
          <div class="form-input">
            <input
              type="text"
              required
              v-on:change="(e) => setSkuValueOnChange(e, v_index)"
              :value="variation.sku.sku"
            />
            <label>SKU</label>
          </div>
          <div class="form-input">
            <input type="text" required />
            <label>Stock</label>
          </div>
        </div>
        <div class="text">
          <div
            v-for="(attr_value, a_index) in attr_value_name[v_index]"
            :key="a_index"
          >
            {{ a_index > 0 ? ' ,' + attr_value : attr_value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IProductAttr, IProductOption } from '@/types/ProductType';
import { useDispath, useSelector } from '../../../redux/helper';
import { onMounted, ref, watch } from 'vue';
import {
  setActivatedSelect,
  addImageSku,
  getProductAttr,
  setSkuValue,
} from 'store/Store';
import { MEDIA_API } from 'main/Config';

export default {
  setup() {
    const dispatch = useDispath();
    const add_product_state = useSelector((state) => state.product.add_product);
    const product_attr_state = useSelector(
      (state) => state.product.product_attr
    );
    const select_image_state = useSelector((state) => state.media.select_image);
    const variation_sku = ref<Array<IProductOption>>([]);
    const attr_value_name = ref<string[][]>([]);

    const media_state_name = 'sku_image';

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

    watch([add_product_state, select_image_state], () => {
      if (add_product_state.value.options.length > 1) {
        variation_sku.value = add_product_state.value.options;
      }

      if (
        add_product_state.value.options.length &&
        product_attr_state.value.length
      ) {
        const add_product: Array<IProductOption> =
          add_product_state.value.options;
        const product_attr: Array<IProductAttr> = product_attr_state.value;

        add_product.forEach((option, attr_index) => {
          const attr_value_string: string[] = [];

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
    });

    onMounted(() => {
      if (!product_attr_state.value.length) {
        dispatch(getProductAttr());
      }
    });

    return {
      variation_sku,
      selectSkuImageOnClick,
      MEDIA_API,
      attr_value_name,
      setSkuValueOnChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.select_image {
  display: flex;
  overflow: hidden;
  justify-content: center;
  position: relative;
  height: 8rem;
  width: 9rem;
  img {
    display: flex;
    flex: 0 1 auto;
    object-fit: contain;
  }
}
</style>
