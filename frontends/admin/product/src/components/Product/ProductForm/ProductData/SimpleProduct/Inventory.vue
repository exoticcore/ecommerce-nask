<template>
  <div class="form-input">
    <input type="text" v-on:change="" required />
    <label>SKU</label>
  </div>
  <div class="flex gap-2 items-start">
    <input
      type="checkbox"
      id="managed_stock"
      :value="managed_stock"
      v-on:change="() => (managed_stock = !managed_stock)"
    />
    <label for="managed_stock" class="font-extralight">Manage stock?</label>
  </div>
  <div class="form-dropdown" v-if="!managed_stock">
    <select>
      <option>In stock</option>
      <option>Out of stock</option>
    </select>
    <div class="dropdown__icon">
      <v-icon name="fa-angle-down" scale="1" />
    </div>
  </div>
  <div v-else class="flex flex-col gap-3">
    <div class="form-input">
      <input type="text" v-on:change="" required />
      <label>Stock quantity</label>
    </div>
    <div class="form-input">
      <input type="text" v-on:change="" required />
      <label>Low stock threshold</label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const managed_stock = ref<boolean>(false);
</script>

<style lang="scss" scoped></style>
