<template>
  <div class="flex flex-col gap-5 p-5">
    <h5>Attribute</h5>
    <div class="attribute-grid">
      <div>
        <div class="card">
          <div class="flex items-center justify-between">
            <h6>Add new attribute</h6>
            <div class="form-dropdown">
              <select>
                <option :selected="true">Thai</option>
                <option>English</option>
              </select>
              <div class="dropdown__icon">
                <v-icon name="fa-angle-down" scale="1" />
              </div>
            </div>
          </div>
          <div class="flex gap-2">
            <div class="form-input">
              <input type="text" v-model="product_attr_form.name" required />
              <label>Name</label>
            </div>
            <div class="form-dropdown w-full">
              <select @change="handleSelectType">
                <option
                  v-for="(type, index) in AttributeTypeList"
                  :selected="type.type === product_attr_form.type"
                  :key="index"
                  :value="type.type"
                >
                  {{ type.title }}
                </option>
              </select>
              <div class="dropdown__icon">
                <v-icon name="fa-angle-down" scale="1" />
              </div>
            </div>
          </div>
          <div class="flex gap-2">
            <div class="form-input">
              <input
                type="text"
                v-model="product_attr_form.translate[0].title"
                required
              />
              <label>Title TH</label>
            </div>
            <div class="form-input">
              <input
                type="text"
                v-model="product_attr_form.translate[1].title"
                required
              />
              <label>Title EN</label>
            </div>
          </div>
          <div
            class="form-input text-area"
            v-if="product_attr_form.type === AttributeType.TEXT"
          >
            <textarea v-model="attr_value_string" required></textarea>
            <label>Values</label>
          </div>
          <div
            v-if="product_attr_form.type === AttributeType.COLOR"
            class="flex flex-col gap-3"
          >
            <div class="flex justify-start my-2">
              <button class="button rounded" v-on:click="addColorOnClick">
                Add color
              </button>
            </div>
            <div
              class="flex gap-2"
              v-for="(value, v_index) in product_attr_form.product_attr_value"
            >
              <div class="relative">
                <div
                  class="form-dropdown content-center justify-center py-1"
                  v-on:click="openColorPicker(v_index)"
                >
                  <div
                    class="color-preview"
                    :style="`background:${value.more || 'transparent'}`"
                  ></div>
                  <div class="dropdown__icon">
                    <v-icon name="fa-angle-down" scale="1" />
                  </div>
                </div>
                <div class="color-picker" v-if="color_picker === v_index">
                  <div class="flex w-full justify-end">
                    <button v-on:click="closeColorPicker">close</button>
                  </div>
                  <ColorPicker
                    is-widget
                    format="hex"
                    v-model:pureColor="picked_color"
                    disable-history
                    disable-alpha
                    lang="En"
                  />
                  <div class="flex w-full justify-end">
                    <button
                      :class="`button ${!picked_color.length && '--disabled'}`"
                      v-on:click="selectColorPicker(v_index)"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
              <div class="form-input">
                <input
                  type="text"
                  v-model="product_attr_form.product_attr_value[v_index].value"
                  required
                />
                <label>Value</label>
              </div>
              <button
                class="font-extralight text-red-800"
                v-on:click="removeColorOnClick(v_index)"
              >
                Remove
              </button>
            </div>
          </div>
          <div class="flex w-full justify-end mt-2">
            <button
              :class="`button ${!allow_save && '--disabled'}`"
              v-on:click="addProductAttrOnClick"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div>
        <div class="card">
          <h6>Attribute list</h6>
          <div class="flex flex-col gap-3">
            <div v-if="!product_attr.length">
              <p class="font-extralight">No attribute found :(</p>
            </div>
            <table v-else>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Attribute</th>
                  <th>Values</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(attr, index) in product_attr" :key="index">
                  <td class="text-center">{{ attr.name }}</td>
                  <td class="text-center">
                    {{ attr.title }}
                  </td>
                  <td class="text-center">{{ attr.value.length }} values</td>
                  <td class="flex gap-2 justify-center">
                    <button>Edit</button>
                    <button v-on:click="deleteAttributeOnClick(attr.id)">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as Theme from 'main/Styles';
import { useSelector, useDispath } from '../../redux/helper';
import { onMounted, ref, watch } from 'vue';
import {
  getProductAttr,
  createProductAttr,
  deleteProductAttr,
} from 'store/Store';

enum AttributeType {
  TEXT = 'text',
  COLOR = 'color',
  IMAGE = 'image',
}

const AttributeTypeList = [
  { type: AttributeType.TEXT, title: 'Text Type' },
  { type: AttributeType.COLOR, title: 'Color Type' },
  { type: AttributeType.IMAGE, title: 'Image Type' },
];

interface IProductAttr {
  id: number;
  description: string | null;
  name: string;
  title: string;
  type: string;
  value: {
    id: number;
    value: string;
    more: string | null;
  }[];
}

interface IProductAttrForm {
  name: string;
  type?: string;
  translate: {
    locale: string;
    title: string;
    description?: string;
  }[];
  product_attr_value: {
    value: string;
    more?: string;
  }[];
}

const dispatch = useDispath();
const product_attr_state = useSelector((state) => state.product.product_attr);

const product_attr_form = ref<IProductAttrForm>({
  name: '',
  type: AttributeType.COLOR,
  translate: [
    {
      locale: 'th',
      title: '',
    },
    {
      locale: 'en',
      title: '',
    },
  ],
  product_attr_value: [
    {
      value: '',
      more: '',
    },
  ],
});
const attr_value_string = ref<string>('');
const product_attr = ref<IProductAttr[]>([]);
const color_picker = ref<number | null>(null);
const picked_color = ref<string>('');
const allow_save = ref<boolean>(false);

watch(
  [product_attr_state, product_attr_form.value, attr_value_string.value],
  () => {
    const product_attr_value = product_attr_state.value;
    if (product_attr_value) {
      product_attr.value = product_attr_value;
    }

    formChecking();
  },
  { immediate: true }
);

onMounted(() => {
  if (!product_attr_state.value.length) {
    dispatch(getProductAttr());
  }
});

function handleSelectType(event: Event) {
  const target = event.target as HTMLSelectElement;
  switch (target.value) {
    case AttributeType.TEXT:
      attr_value_string.value = '';
      product_attr_form.value.product_attr_value = [];
      break;
    case AttributeType.COLOR:
      product_attr_form.value.product_attr_value = [
        {
          value: '',
          more: '',
        },
      ];
      product_attr_form.value.type = AttributeType.COLOR;
      break;
    case AttributeType.IMAGE:
      product_attr_form.value.type = AttributeType.IMAGE;
      break;
  }

  product_attr_form.value.type = target.value;
}

function openColorPicker(index: number) {
  if (color_picker.value === index) {
    color_picker.value = null;
  } else {
    color_picker.value = index;
  }
}

function selectColorPicker(index: number) {
  if (picked_color.value.length) {
    product_attr_form.value.product_attr_value[index].more = picked_color.value;
    picked_color.value = '';
    color_picker.value = null;
  }
}

function closeColorPicker() {
  picked_color.value = '';
  color_picker.value = null;
}

function addColorOnClick() {
  product_attr_form.value.product_attr_value.push({
    value: '',
    more: '',
  });
}

function removeColorOnClick(index: number) {
  product_attr_form.value.product_attr_value.splice(index, 1);
}

function addProductAttrOnClick() {
  const attr_data = product_attr_form.value;
  const string_value = attr_value_string.value;

  if (
    attr_data.translate[0].title.length &&
    attr_data.translate[1].title.length &&
    string_value.length &&
    attr_data.type === AttributeType.TEXT
  ) {
    const attr_value = string_value.split(' | ');
    attr_value.map((value, i) => {
      product_attr_form.value.product_attr_value.push({ value: value });
    });

    dispatch(
      createProductAttr({
        type: product_attr_form.value.type || 'text',
        name: product_attr_form.value.name,
        translate: [
          {
            locale: 'th',
            title: product_attr_form.value.translate[0].title,
          },
          {
            locale: 'en',
            title: product_attr_form.value.translate[1].title,
          },
        ],
        product_attr_value: [...product_attr_form.value.product_attr_value],
      })
    );

    product_attr_form.value = {
      type: '',
      name: '',
      translate: [
        {
          locale: 'th',
          title: '',
        },
        {
          locale: 'en',
          title: '',
        },
      ],
      product_attr_value: [],
    };
    attr_value_string.value = '';
  } else if (allow_save && attr_data.type === AttributeType.COLOR) {
    dispatch(createProductAttr(product_attr_form.value));
    product_attr_form.value = {
      type: '',
      name: '',
      translate: [
        {
          locale: 'th',
          title: '',
        },
        {
          locale: 'en',
          title: '',
        },
      ],
      product_attr_value: [],
    };
  }
}

function formChecking() {
  if (
    product_attr_form.value.translate[0].title.length &&
    product_attr_form.value.translate[1].title.length &&
    product_attr_form.value.name.length
  ) {
    if (
      product_attr_form.value.type === AttributeType.TEXT &&
      attr_value_string.value.length
    ) {
      console.log('eiei');
      allow_save.value = true;
    } else if (
      product_attr_form.value.type === AttributeType.COLOR &&
      product_attr_form.value.product_attr_value.length
    ) {
      let is_allow = true;
      product_attr_form.value.product_attr_value.map((attr_value) => {
        if (attr_value.value.length && attr_value.more && is_allow) {
          is_allow = true;
        } else {
          is_allow = false;
        }
      });

      allow_save.value = is_allow;
    } else {
      allow_save.value = false;
    }
  } else {
    allow_save.value = false;
  }
}

function deleteAttributeOnClick(id: number) {
  dispatch(deleteProductAttr(id));
}
</script>

<style lang="scss" scoped>
.attribute-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  .card {
    background: white;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: v-bind('Theme.borderRadius');
  }
}

.color-preview {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  box-shadow: 0 0 0 1px v-bind('Theme.grey200');
  margin-right: 1.5rem;
  margin-left: 0.5rem;
}

.color-picker {
  position: absolute;
  border-radius: v-bind('Theme.borderRadius');
  background: v-bind('Theme.white');
  box-shadow: v-bind('Theme.shadow3');
  top: 2.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  z-index: 3;
  user-select: none;

  .button {
    padding: 0.3rem 0.8rem;
    font-size: 0.9rem;
    font-weight: 300;
  }
}
</style>
