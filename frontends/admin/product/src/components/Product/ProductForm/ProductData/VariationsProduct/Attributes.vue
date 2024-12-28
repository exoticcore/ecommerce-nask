<template>
  <div class="flex gap-2">
    <button class="button rounded" v-on:click="addNewAttributeOnClick">
      Add new
    </button>
    <div class="form-dropdown">
      <select :value="selected_option" @change="handleSelectChange">
        <option :value="null" :selected="true">Add existing</option>
        <option
          v-for="(attr, attr_index) in product_attr"
          :key="attr_index"
          :value="attr_index"
        >
          {{ attr.name }}
        </option>
      </select>
      <div class="dropdown__icon">
        <v-icon name="fa-angle-down" scale="1" />
      </div>
    </div>
  </div>
  <div v-if="selected.length > 0" class="flex flex-col gap-4 mt-3">
    <div v-for="(select, sel_index) in selected">
      <div v-if="typeof select === 'number'" class="flex flex-col gap-5">
        <hr />
        <div class="flex w-full justify-between items-center">
          <h6>Add new attribute</h6>
          <button
            class="font-extralight text-red-800"
            v-on:click="
              () => {
                selected.splice(sel_index, 1);
                new_attr.splice(select, 1);
              }
            "
          >
            Remove
          </button>
        </div>
        <div class="attribute-form">
          <div class="flex flex-col gap-2">
            <div class="form-input">
              <input
                type="text"
                v-model="new_attr[select].translate[0].name"
                required
              />
              <label>Name</label>
            </div>
            <div class="form-dropdown">
              <select>
                <option :selected="true">Text Type</option>
                <option>Color Type</option>
              </select>
              <div class="dropdown__icon">
                <v-icon name="fa-angle-down" scale="1" />
              </div>
            </div>
          </div>
          <div class="form-input text-area">
            <textarea
              v-model="new_attr[select].product_attr_value"
              required
            ></textarea>
            <label>values</label>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col gap-5">
        <hr />
        <div class="flex w-full justify-between items-center">
          <h6>{{ product_attr[select.attr_index].title }}</h6>
          <button
            class="font-extralight text-red-800"
            v-on:click="() => removeSelected(sel_index)"
          >
            Remove
          </button>
        </div>
        <div class="attribute-form">
          <div class="flex flex-col">
            <div class="flex gap-2">
              <span class="font-extralight">Name:</span>
              <b>{{ product_attr[select.attr_index].name }}</b>
            </div>
          </div>
          <div class="flex flex-col gap-3 font-extralight text-sm">
            <div class="select-value">
              <div class="selected-value">
                <div
                  v-for="(value, value_index) in select.value_id"
                  :key="value_index"
                  class="value"
                  v-on:click="removeAttrValue(sel_index, value_index)"
                >
                  <v-icon name="io-close-sharp" scale="1" />
                  <span>{{
                    product_attr[select.attr_index]?.value.find(
                      (val) => val.id === value
                    )?.value
                  }}</span>
                </div>
              </div>
              <label>Value</label>
            </div>
            <div
              class="flex w-full flex-wrap justify-between items-center gap-2"
            >
              <div class="flex gap-2">
                <div
                  class="button rounded none-color"
                  v-on:click="selectAllValue(sel_index)"
                >
                  Select all
                </div>
                <div
                  class="button rounded none-color"
                  v-on:click="selectNoneValue(sel_index)"
                >
                  Select none
                </div>
              </div>
              <div class="button rounded none-color">Create value</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col gap-2">
    <hr class="mt-5" />
    <div class="flex w-full justify-end">
      <div class="flex">
        <button
          :class="`button ${!accept_save ? ' --disabled' : ''}`"
          v-on:click="saveAttribute()"
        >
          Save attributes
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDispath, useSelector } from '../../../../../redux/helper';
import { onMounted, ref, watch } from 'vue';
import { getProductAttr, generateSKU } from 'store/Store';
import * as Theme from 'main/Styles';

interface IProductAttr {
  description: string | null;
  id: number;
  name: string;
  title: string;
  type: string;
  value: {
    id: number;
    value: string;
    more: string | null;
  }[];
}

interface ISelected {
  attr_index: number;
  value_id: number[];
}

interface IAddProductAttrForm {
  type: string;
  translate: {
    locale: string;
    name: string;
  }[];
  product_attr_value: string;
}

interface IProductOption {
  sku: {
    sku: string;
    stock: number | null;
    is_primary: boolean;
    image_url: string | null;
    media?: string | null;
  };
  attr_value_id: number[];
}

const dispath = useDispath();
const add_product: any = useSelector((state) => state.product);
const product_attr = ref<IProductAttr[]>([]);
const selected_option = ref('Add existing');

const selected = ref<Array<ISelected | number>>([]);
const new_attr = ref<IAddProductAttrForm[]>([]);

const accept_save = ref<boolean>(false);

watch(
  [add_product, selected.value, new_attr],
  () => {
    product_attr.value = add_product.value.product_attr;

    if (
      add_product.value.add_product.options &&
      product_attr.value.length &&
      selected.value.length === 0
    ) {
      const sku_options: IProductOption[] =
        add_product.value.add_product.options;

      if (sku_options.length > 0 && sku_options[0].attr_value_id.length > 0) {
        const sku_length = sku_options[0].attr_value_id.length;

        for (let i = 0; i < sku_length; i++) {
          const value_id = sku_options[0].attr_value_id[i];
          const attr_index = product_attr.value.findIndex((attr) =>
            attr.value.some((value) => value.id === value_id)
          );
          const value_id_list = sku_options.map(
            (option) => option.attr_value_id[i]
          );

          selected.value.push({
            attr_index,
            value_id: [...new Set(value_id_list)],
          });
        }
      }
    }

    acceptSave();
  },
  { immediate: true }
);

onMounted(() => {
  dispath(getProductAttr());
});

function addNewAttributeOnClick() {
  new_attr.value.push({
    type: '',
    translate: [
      {
        locale: 'th',
        name: '',
      },
    ],
    product_attr_value: '',
  });
  selected.value.push(new_attr.value.length - 1);
}

function handleSelectChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  const selectedIndex = target.value ? parseInt(target.value) : null;
  if (selectedIndex !== null) {
    const value_id = product_attr.value[selectedIndex].value.map(
      (value) => value.id
    );
    selected.value.push({ attr_index: selectedIndex, value_id });
  }
  selected_option.value = 'Add existing';
}

function removeSelected(select_index: number) {
  if (selected.value.length === 1) {
    selected.value = [];
  } else {
    selected.value.splice(select_index, 1);
  }
}

function removeAttrValue(select_index: number, value_index: number) {
  if (typeof selected.value[select_index] !== 'number') {
    selected.value[select_index].value_id.splice(value_index, 1);
  }
}

function selectAllValue(select_index: number) {
  if (typeof selected.value[select_index] !== 'number') {
    selected.value[select_index].value_id = product_attr.value[
      selected.value[select_index].attr_index
    ].value.map((value) => value.id);
  }
}

function selectNoneValue(select_index: number) {
  if (typeof selected.value[select_index] !== 'number') {
    selected.value[select_index].value_id = [];
  }
}

function acceptSave() {
  if (selected.value.length > 0) {
    let accept = true;
    selected.value.forEach((select) => {
      if (typeof select === 'number') {
        if (
          !new_attr.value[select].translate[0].name.length ||
          !new_attr.value[select].product_attr_value.length
        ) {
          accept = false;
        } else {
          accept = true;
        }
      } else {
        if (select.value_id.length === 0) {
          accept = false;
        } else {
          accept = true;
        }
      }
    });

    accept_save.value = accept;
  } else {
    accept_save.value = false;
  }
}

function saveAttribute() {
  if (accept_save.value === true) {
    const generateCombinations = (
      arrays: number[][],
      prefix: number[] = []
    ): number[][] => {
      if (arrays.length === 0) return [prefix];

      const result: number[][] = [];
      const firstArray = arrays[0];
      const remainingArrays = arrays.slice(1);

      for (const value of firstArray) {
        result.push(
          ...generateCombinations(remainingArrays, [...prefix, value])
        );
      }

      return result;
    };

    if (selected.value.length > 0) {
      const selected_value = selected.value as ISelected[];
      const combinations = generateCombinations(
        selected_value.map((select) => select.value_id)
      );
      dispath(generateSKU(combinations));
    } else {
      dispath(generateSKU([]));
    }
  }
}
</script>

<style lang="scss" scoped>
.attribute-form {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 0.5rem;
  cursor: default;
  .select-value {
    position: relative;

    .selected-value {
      border-radius: v-bind('Theme.borderRadius');
      box-shadow: 0 0 0 1px v-bind('Theme.grey300');
      padding: 0.8rem 0.5rem;
      /* min-height: 5rem; */
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      .value {
        border-radius: v-bind('Theme.borderRadius');
        padding: 0.4rem;
        background: v-bind('Theme.grey100');
        display: flex;
        gap: 0.25rem;
        cursor: pointer;

        &:hover {
          box-shadow: 0 0 0 1px v-bind('Theme.primary500');
        }
      }
    }

    label {
      position: absolute;
      top: -0.7rem;
      left: 0.5rem;
      padding: 0 0.35rem;
      background: v-bind('Theme.white');
      color: v-bind('Theme.grey500');
    }
  }
}
h6 {
  color: v-bind('Theme.grey400');
  font-weight: 400;
  cursor: default;
}
</style>
