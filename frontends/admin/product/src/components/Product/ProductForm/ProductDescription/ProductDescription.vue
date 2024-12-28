<template>
  <div class="card">
    <h6>Product Description</h6>
    <div class="form-input text-area height mt-2">
      <textarea
        :value="description"
        v-on:change="(e) => setProductDescriptionOnChange(e)"
        required
      ></textarea>
      <label>Description</label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, watchEffect } from 'vue';
import { useSelector, useDispath } from '../../../../redux/helper';

import { setProductInformation } from 'store/Store';

interface IProductTranslate {
  locale: string;
  title: string;
  information: string;
  description: string;
}

const dispath = useDispath();
const add_product_state = useSelector((state) => state.product.add_product);

const description = ref<string>('');
const selected_locale = ref<string>('en');

watch(
  [add_product_state],
  () => {
    const add_product_value = add_product_state.value;
    if (add_product_value.locale) {
      selected_locale.value = add_product_value.locale;
    }

    if (add_product_state.value.translate.length) {
      const translate_index = add_product_state.value.translate.findIndex(
        (translate: IProductTranslate) =>
          translate.locale === selected_locale.value
      );

      description.value =
        add_product_value.translate[translate_index].information;
    }
  },
  { immediate: true }
);

function setProductDescriptionOnChange(e: Event) {
  const target = e.target as HTMLTextAreaElement;
  dispath(
    setProductInformation({
      locale: selected_locale.value,
      information: target.value.toString(),
    })
  );
}
</script>
