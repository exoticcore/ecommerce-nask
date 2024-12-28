<template>
  <div v-if="brand_list" v-for="(brand, index) in brand_list">
    <div class="flex gap-2" :key="index">
      <input
        type="checkbox"
        :checked="selected === brand.slug"
        v-on:click="selectedOnClick(brand.slug)"
      />
      {{ brand.title }}
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useDispath, useSelector } from '../../../redux/helper';
import { getBrandList, addBrandSlug } from 'store/Store';

interface BrandListState {
  slug: string;
  title: string;
  image_url?: string | null;
  product: number;
}

export default {
  setup() {
    const dispatch = useDispath();
    const brand_state = useSelector((state) => state.catalog.brand_list);
    const add_product_state = useSelector((state) => state.product.add_product);

    const brand_list = ref<BrandListState[]>([]);
    const selected = ref<string>('');

    const selectedOnClick = (brand_slug: string) => {
      if (selected.value === brand_slug) {
        dispatch(addBrandSlug(''));
      } else {
        dispatch(addBrandSlug(brand_slug));
      }
    };

    watch([brand_state, add_product_state], () => {
      if (brand_state.value) {
        const brand_value = brand_state.value;
        brand_list.value = brand_value;
      }

      if (add_product_state.value) {
        selected.value = add_product_state.value.ref.brand_slug;
      }
    });

    onMounted(() => {
      dispatch(getBrandList());

      selected.value = add_product_state.value.ref.brand_slug;
    });

    return {
      brand_list,
      selectedOnClick,
      selected,
    };
  },
};
</script>
