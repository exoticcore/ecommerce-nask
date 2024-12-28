<template>
  <div class="product-form__data select-none">
    <div class="flex items-center justify-between gap-2 p-3">
      <h6>Product Data</h6>
      <div class="form-dropdown">
        <select
          v-on:change="(e: Event) => {
          const el = e.target as HTMLSelectElement;
          const value = parseInt(el.value);
          product_type = value;
        }"
        >
          <option
            :value="index"
            v-for="(menu, index) in menu_list"
            :key="index"
            :selected="product_type === index"
          >
            {{ menu.type }}
          </option>
        </select>
        <div class="dropdown__icon">
          <v-icon name="fa-angle-down" scale="1" />
        </div>
      </div>
    </div>
    <div class="product-form__data__menu">
      <div class="menu__sidebar">
        <div
          :class="
            'menu__sidebar__option' +
            (selected_component === opt_index ? ' --active' : '')
          "
          v-for="(option, opt_index) in menu_list[product_type].selection"
          :key="opt_index"
          v-on:click="selected_component = opt_index"
        >
          <v-icon :name="option.icon" scale="1" class="mr-3" />
          <span class="font-extralight">{{ option.name }}</span>
          <span v-if="variation_count > 0 && option.name === 'Variations'">{{
            ` (${variation_count})`
          }}</span>
        </div>
      </div>
      <div class="menu__form">
        <component
          :is="menu_list[product_type].selection[selected_component].component"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as Theme from 'main/Styles';

import { useSelector } from '../../../../redux/helper';

import { ref, watch } from 'vue';
import General from './SimpleProduct/General.vue';
import Inventory from './SimpleProduct/Inventory.vue';
import Shipment from './SimpleProduct/Shipment.vue';
import Wholesale from './SimpleProduct/Wholesale.vue';
import Attributes from './VariationsProduct/Attributes.vue';
import Variations from './VariationsProduct/Variations.vue';

const add_product_state = useSelector((state) => state.product.add_product);

const product_type = ref<number>(0);
const selected_component = ref<number>(0);

const variation_count = ref<number>(0);

const menu_list = [
  {
    type: 'Simple Product',
    selection: [
      {
        name: 'General',
        component: General,
        icon: 'fa-wrench',
      },
      {
        name: 'Inventory',
        component: Inventory,
        icon: 'fa-boxes',
      },
      {
        name: 'Shipment',
        component: Shipment,
        icon: 'fa-truck',
      },
      {
        name: 'Wholesale',
        component: Wholesale,
        icon: 'fa-hand-holding-usd',
      },
    ],
  },
  {
    type: 'Variable Product',
    selection: [
      {
        name: 'General',
        component: General,
        icon: 'fa-wrench',
      },
      {
        name: 'Attributes',
        component: Attributes,
        icon: 'la-pager-solid',
      },
      {
        name: 'Variations',
        component: Variations,
        icon: 'fa-list-ul',
      },
      {
        name: 'Wholesale',
        component: Wholesale,
        icon: 'fa-hand-holding-usd',
      },
    ],
  },
];

watch([add_product_state], () => {
  const add_product_value = add_product_state.value;
  // console.log('product data:', add_product_value);
  if (add_product_value.options.length) {
    variation_count.value = add_product_value.options.length;
    if (
      variation_count.value > 0 &&
      add_product_value.options[0].attr_value_id.length
    ) {
      product_type.value = 1;
      selected_component.value = 2;
    }
  }
});
</script>

<style lang="scss" scoped>
.product-form__data {
  background: v-bind('Theme.white');
  border-radius: v-bind('Theme.borderRadius');
  display: flex;
  flex-direction: column;
  box-shadow: v-bind('Theme.shadow');

  .product-form__data__menu {
    display: grid;
    grid-template-columns: 1fr 3.5fr;
    width: 100%;

    .menu__sidebar {
      display: flex;
      flex-direction: column;
      border-radius: 0 v-bind('Theme.borderRadius') 0
        v-bind('Theme.borderRadius');
      overflow: hidden;

      .menu__sidebar__option {
        padding: 1rem 0.5rem;
        display: flexbox;
        cursor: pointer;
        border-radius: 0 v-bind('Theme.borderRadius')
          v-bind('Theme.borderRadius') 0;

        &:hover {
          background-color: v-bind('Theme.grey100');
        }

        &.--active {
          background-color: v-bind('Theme.grey100');
          color: v-bind('Theme.primary600');
          cursor: default;
        }
      }
    }

    .menu__form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }
  }
}
</style>
