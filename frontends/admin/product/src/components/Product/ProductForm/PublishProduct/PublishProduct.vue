<template>
  <div class="card">
    <h6>Publish</h6>
    <div class="flex flex-col gap-3 mt-3">
      <div class="publish__edit">
        <div class="flex gap-2">
          <div class="flex gap-2 items-center">
            <v-icon name="fa-eye" scale="0.75" />
            <span>Visibility:</span>
            <div v-if="!visible_allow" class="flex gap-2">
              <b class="capitalize">{{ visibility }}</b>
              <button v-on:click="() => (visible_allow = true)">Edit</button>
            </div>
            <div class="flex gap-2 items-center" v-else>
              <div class="form-dropdown">
                <select v-model="visibility">
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
                <div class="dropdown__icon">
                  <v-icon name="fa-angle-down" scale="1" />
                </div>
              </div>
              <v-icon name="bi-check-lg" scale="1" />
              <v-icon
                name="io-close-sharp"
                scale="1"
                v-on:click="() => (visible_allow = false)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="publish__edit">
        <div class="flex gap-2">
          <div class="flex gap-2 items-center">
            <v-icon name="fa-regular-calendar-alt" scale="0.75" />
            <span>Publish:</span>
            <div v-if="!date_allow" class="flex gap-2">
              <b v-if="!publish_date">Now</b>
              <b v-else>{{ publish_date.substring(0, 10) }}</b>
              <button v-on:click="() => (date_allow = !date_allow)">
                Edit
              </button>
            </div>
            <div v-else class="flex">
              <VueDatePicker
                v-model="publish_date"
                placeholder="Publish Date"
                id="price_start"
                :min-date="new Date()"
                modelType="iso"
                @update:model-value="setStartDateOnChange"
                @cleared="
                  () => {
                    setStartDateOnChange(null);
                  }
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr class="mt-6 mb-2" />
    <div class="flex gap-1 justify-end">
      <div
        :class="publish_allow ? 'button' : 'button --disabled'"
        v-on:click="publishOnClick"
      >
        Publish
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as Theme from 'main/Styles';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import { useDispath, useSelector } from '../../../../redux/helper';
import { ref, watch } from 'vue';
import { setPublishAt, createProduct } from 'store/Store';
import { IProductForm } from '@/types/ProductType';
import { FormType } from '../../../../types/FormType';

const dispatch = useDispath();
const add_prdouct_state = useSelector((state) => state.product.add_product);
const edit_product_state = useSelector((state) => state.product.edit_product);

const visibility = ref<string>('');
const visible_allow = ref<boolean>(false);

const publish_date = ref<string | null>('');
const date_allow = ref<boolean>(false);

const publish_allow = ref<boolean>(true);

const props = defineProps<{
  product_state: FormType;
}>();

watch(
  [add_prdouct_state],
  () => {
    const add_prdouct_value = add_prdouct_state.value;

    visibility.value = add_prdouct_value.product.visibility;
    publish_date.value = add_prdouct_value.product.publish_at;

    checkForm(add_prdouct_value);
  },
  { immediate: true }
);

function setStartDateOnChange(date: string | null) {
  dispatch(setPublishAt(date));
  date_allow.value = false;
}

function checkForm(form: IProductForm) {
  const product = form.product;
  const ref = form.ref;
  const translate = form.translate;
  const options = form.options;

  if (props.product_state === FormType.AddProduct) {
    if (
      !product.slug.length ||
      !product.price ||
      !product.visibility ||
      !ref.subcat_attr_slug.length
    ) {
      publish_allow.value = false;
    } else {
      if (translate.length) {
        let trans_allow = true;
        translate.forEach((trans) => {
          if (!trans.title.length) {
            trans_allow = false;
          }
        });
        if (trans_allow) {
          if (options.length) {
            let opt_allow = true;
            options.forEach((opt) => {
              if (!opt.sku.sku.length) {
                opt_allow = false;
              }
            });
            publish_allow.value = opt_allow;
          } else {
            publish_allow.value = true;
          }
        } else {
          publish_allow.value = false;
        }
      } else {
        publish_allow.value = false;
      }
    }
  } else if (props.product_state === FormType.EditProduct) {
    if (add_prdouct_state.value === edit_product_state.value) {
      publish_allow.value = false;
    } else {
      publish_allow.value = true;
    }
  }
}

function publishOnClick() {
  console.log(add_prdouct_state.value);
  if (publish_allow) {
    dispatch(createProduct(add_prdouct_state.value));
  }
}
</script>

<style lang="scss" scoped>
h6 {
  color: v-bind('Theme.grey400');
  font-weight: 300;
  font-size: 1rem;
}

button {
  color: v-bind('Theme.primary600');
  text-decoration: underline;
  cursor: pointer;
}

span {
  font-weight: 200;
}

b {
  font-weight: 400;
}

.button {
  padding: 0.65rem;
}
</style>
