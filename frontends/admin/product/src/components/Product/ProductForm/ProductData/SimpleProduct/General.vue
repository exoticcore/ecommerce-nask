<template>
  <div class="form-input">
    <input
      type="text"
      :value="normal_price"
      v-on:change="(e) => setNormalPriceOnChange(e)"
      required
    />
    <label>Normal Price</label>
  </div>
  <div class="form-input">
    <input
      type="text"
      :value="special"
      v-on:change="(e) => setSpecialOnChange(e)"
      required
    />
    <label class="capitalize">Special Price</label>
  </div>
  <div class="flex gap-2 items-start">
    <input
      type="checkbox"
      id="s_price_date"
      :value="is_schedule"
      v-on:change="() => (is_schedule = !is_schedule)"
    />
    <label for="s_price_date" class="font-extralight">Schedule</label>
  </div>
  <div class="flex gap-3 w-full" v-if="is_schedule">
    <VueDatePicker
      v-model="start_date"
      placeholder="Start Date"
      id="price_start"
      :min-date="new Date()"
      modelType="iso"
      @update:model-value="setStartDateOnChange"
    />
    <VueDatePicker
      v-model="end_date"
      placeholder="End Date"
      id="price_end"
      :min-date="new Date()"
      modelType="iso"
      @update:model-value="setEndDateOnChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { useDispath, useSelector } from '../../../../../redux/helper';
import {
  setNormalPrice,
  setSpecialPrice,
  setSpecialPriceStart,
  setSpecialPriceEnd,
} from 'store/Store';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { onMounted, ref, watch } from 'vue';

const normal_price = ref();
const special = ref();

const start_date = ref();
const end_date = ref();
const is_schedule = ref(false);

const dispatch = useDispath();
const add_product_state = useSelector((state) => state.product.add_product);

function setNormalPriceOnChange(event: Event) {
  const target = event.target as HTMLInputElement;
  dispatch(setNormalPrice(parseFloat(target.value)));
}

function setSpecialOnChange(event: Event) {
  const target = event.target as HTMLInputElement;
  dispatch(setSpecialPrice(parseFloat(target.value)));
}

function setStartDateOnChange(date: Date) {
  dispatch(setSpecialPriceStart(date));
}

function setEndDateOnChange(date: Date) {
  dispatch(setSpecialPriceEnd(date));
}

watch([add_product_state, start_date], () => {
  if (add_product_state.value) {
    const add_product_value = add_product_state.value;
    if (add_product_value.product.price !== null) {
      normal_price.value = add_product_value.product.price;
    }

    if (add_product_value.product.special_price !== null) {
      special.value = add_product_value.product.s_price;
    }

    if (add_product_value.product.s_price_start !== null) {
      start_date.value = add_product_value.product.s_price_start;
    }

    if (add_product_value.product.s_price_end !== null) {
      end_date.value = add_product_value.product.s_price_end;
    }
  }
});

onMounted(() => {
  if (add_product_state.value) {
    const add_product_value = add_product_state.value;
    if (add_product_value.product.price !== null) {
      normal_price.value = add_product_value.product.price;
    }

    if (add_product_value.product.special_price !== null) {
      special.value = add_product_value.product.s_price;
    }
  }
});

watch([], () => {});
</script>
