<script setup lang="ts">
import { useDispath, useSelector } from '../../../redux/helper';
import * as Theme from 'main/Styles';
import { onMounted, ref, watch } from 'vue';
import {
  getProductAttr,
  createProductAttr,
  deleteProductAttr,
} from 'store/Store';
import SelectProductBrand from './SelectProductBrand.vue';

interface IProductAttr {
  description: string | null;
  id: number;
  name: string;
  type: string;
  value: {
    id: number;
    value: string;
    more: string | null;
  }[];
}

interface ISelected {
  index: number;
  value_id: number[];
}

interface IAddProductAttrForm {
  type: string;
  translate: {
    locale: string;
    name: string;
  }[];
  product_attr_value: { value: string; more?: string | null }[];
}

const dispath = useDispath();
const add_product: any = useSelector((state) => state.product);

const product_attr = ref<IProductAttr[]>([]);
const selected = ref<ISelected[]>([]);

const attr_form = ref<IAddProductAttrForm>({
  type: '',
  translate: [
    {
      locale: 'th',
      name: '',
    },
    {
      locale: 'en',
      name: '',
    },
  ],
  product_attr_value: [],
});
const attr_value_string = ref<string>('');

watch(add_product, () => {
  product_attr.value = add_product.value.product_attr;
});

onMounted(() => {
  dispath(getProductAttr());
});

const selectAttrClick = (e: Event, index: number) => {
  const el = e.target as HTMLInputElement;
  const value = el.checked;

  if (value) {
    selected.value.push({ index, value_id: [1, 2, 3] });
  } else {
    if (selected.value.length) {
      const new_selected: ISelected[] = [];
      selected.value.map((s) => {
        if (s.index !== index) {
          new_selected.push({ index: s.index, value_id: s.value_id });
        }
      });
      selected.value = new_selected;
    }
  }
};

const createAttrClick = () => {
  const attr_data = attr_form.value;
  const string_value = attr_value_string.value;
  if (
    attr_data.translate[0].name.length &&
    attr_data.translate[1].name.length &&
    string_value.length
  ) {
    const attr_value = string_value.split(' | ');
    attr_value.map((value, i) => {
      attr_form.value.product_attr_value.push({ value: value });
    });

    dispath(
      createProductAttr({
        type: attr_form.value.type || 'text',
        translate: [
          {
            locale: 'th',
            name: attr_form.value.translate[0].name,
          },
          {
            locale: 'en',
            name: attr_form.value.translate[1].name,
          },
        ],
        product_attr_value: [...attr_form.value.product_attr_value],
      })
    );

    attr_form.value = {
      type: '',
      translate: [
        {
          locale: 'th',
          name: '',
        },
        {
          locale: 'en',
          name: '',
        },
      ],
      product_attr_value: [],
    };
    attr_value_string.value = '';
  }
};

const deleteProductAttrDoubleClick = (id: number) => {
  dispath(deleteProductAttr(id));
};

const generateSKU = () => {
  const selected_value = selected.value;
  if (selected_value.length) {
  }
};

const checkedAttr = (id: number, index: number) => {
  let accept = false;
  if (selected.value[index].value_id.length && selected.value[index].value_id) {
    selected.value[index].value_id.map((value, i) => {
      if (value === id) {
        accept = true;
      }
    });
  }

  return accept;
};
</script>

<template>
  <div class="card">
    <div class="flex flex-col gap-4">
      <h6>Product Attribute</h6>
      <div class="flex gap-3">
        <div class="form-input">
          <input type="text" required v-model="attr_form.translate[0].name" />
          <label>Attribute name TH</label>
        </div>
        <div class="form-input">
          <input type="text" required v-model="attr_form.translate[1].name" />
          <label>Attribute name EN</label>
        </div>
      </div>
      <div class="form-input">
        <input type="text" required />
        <label>Attribute type</label>
      </div>
      <div class="form-input text-area">
        <textarea v-model="attr_value_string" required></textarea>
        <label>Attribute Value</label>
      </div>
      <button class="button" @click="createAttrClick">Add</button>
    </div>
    <h6 class="pt-5">Select Attribute</h6>
    <!-- <div
      v-if="product_attr.length > 0"
      v-for="(p_attr, index) in product_attr"
      :key="index"
    >
      <div class="flex gap-2">
        <input type="checkbox" @input="(e) => selectAttrClick(e, index)" /><span
          @dblclick="deleteProductAttrDoubleClick(p_attr.id)"
          >{{ p_attr.name }}</span
        >
        <div v-for="(s_value, s_index) in selected" :key="s_index">
          <div
            v-if="s_value.index === index"
            v-for="(attr_value, a_value_index) in p_attr.value"
          >
            <div class="flex">
              <input type="checkbox" :checked="true" />{{ attr_value.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="button">generate</button>
    <h6 class="pt-5">SKU</h6> -->
    <div>
      <SelectProductBrand />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
