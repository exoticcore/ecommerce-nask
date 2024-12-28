<template>
  <div class="product-form__basic-information card">
    <h6>Product Information</h6>
    <div class="flex gap-3">
      <div class="form-input">
        <input
          type="text"
          :value="title"
          v-on:change="(e) => setProductTitleOnChange(e)"
          required
        />
        <label>Product Title</label>
      </div>
    </div>
    <div class="form-input">
      <input
        type="text"
        :value="slug"
        v-on:change="(e) => setProductSlugOnChange(e)"
        required
      />
      <label>Slug</label>
    </div>
    <div class="form-input text-area">
      <textarea
        :value="short_description"
        v-on:change="(e) => setProductDescriptionOnChange(e)"
        required
      ></textarea>
      <label>Short Description</label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useSelector, useDispath } from '../../../../redux/helper';
import {
  setProductDescription,
  setProductTitle,
  setProductSlug,
} from 'store/Store';
import { FormType } from '../../../../types/FormType';

interface IProductTranslate {
  locale: string;
  title: string;
  information: string;
  description: string;
}

const dispath = useDispath();

const add_product_state = useSelector((state) => state.product.add_product);

const title = ref<string>('');
const slug = ref<string>('');
const short_description = ref<string>('');

const selected_locale = ref<string>('en');

const props = defineProps<{
  product_state: FormType;
}>();

watch(
  add_product_state,
  () => {
    if (props.product_state == FormType.AddProduct) {
      console.log('add product state');
    } else {
      console.log('edit product state');
    }

    const add_product_value = add_product_state.value;
    if (add_product_value.locale) {
      selected_locale.value = add_product_value.locale;
    }

    if (add_product_value.translate.length) {
      const translate_index = add_product_value.translate.findIndex(
        (translate: IProductTranslate) =>
          translate.locale === selected_locale.value
      );

      short_description.value =
        add_product_value.translate[translate_index].description;

      title.value = add_product_value.translate[translate_index].title;
    }

    if (add_product_value.product.slug) {
      slug.value = add_product_value.product.slug;
    }
  },
  { immediate: true }
);

function setProductDescriptionOnChange(e: Event) {
  const target = e.target as HTMLInputElement;
  dispath(
    setProductDescription({
      locale: selected_locale.value,
      description: target.value,
    })
  );
}

function setProductTitleOnChange(e: Event) {
  const target = e.target as HTMLInputElement;
  dispath(
    setProductTitle({
      locale: selected_locale.value,
      title: target.value,
    })
  );
}

function setProductSlugOnChange(e: Event) {
  const target = e.target as HTMLInputElement;
  dispath(setProductSlug(target.value));
}
</script>
