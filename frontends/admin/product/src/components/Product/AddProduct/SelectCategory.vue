<template>
  <div v-if="category_list" v-for="(category, index) in category_list">
    <div class="flex gap-2" :key="index">
      <input
        type="checkbox"
        v-on:click="selectedOnClick(category.slug)"
        :checked="selected === category.slug"
      />
      {{ category.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useDispath, useSelector } from '../../../redux/helper';
import { getAllSubcategory, addSubcatAttrSlug } from 'store/Store';

interface CategoryList {
  name: string;
  product: number;
  slug: string;
}

export default {
  setup() {
    const dispatch = useDispath();
    const category_state = useSelector((state) => state.catalog.category_list);

    const ref_state = useSelector((state) => state.product.add_product.ref);

    const category_list = ref<CategoryList[]>([]);
    const selected = ref<string>('');

    const selectedOnClick = (category_slug: string) => {
      if (selected.value === category_slug) {
        dispatch(addSubcatAttrSlug(''));
      } else {
        dispatch(addSubcatAttrSlug(category_slug));
      }
    };

    watch([category_state, ref_state], () => {
      if (category_state.value) {
        const category_value = category_state.value;
        category_list.value = category_value;
      }

      if (ref_state.value) {
        selected.value = ref_state.value.subcat_attr_slug;
      }
    });

    onMounted(() => {
      dispatch(getAllSubcategory());

      selected.value = ref_state.value.subcat_attr_slug;
    });

    return {
      category_list,
      selected,
      selectedOnClick,
    };
  },
};
</script>
