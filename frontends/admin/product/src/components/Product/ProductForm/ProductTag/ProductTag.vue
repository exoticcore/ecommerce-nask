<template>
  <div class="card">
    <h6>Tags</h6>
    <div class="flex gap-2 flex-wrap" v-if="tags.length">
      <span
        class="font-extralight cursor-default"
        v-for="(tag, t_index) in tags"
        :key="t_index"
        v-on:click="removeTagOnClick(t_index)"
        >{{ tag }}</span
      >
    </div>
    <div class="flex gap-2 content-center justify-center mt-2">
      <div class="form-input">
        <input type="text" v-model="tag_form" required />
        <label>Add tags</label>
      </div>
      <div
        class="button rounded content-center justify-center"
        v-on:click="addTagOnClick"
      >
        Add
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSelector, useDispath } from '../../../../redux/helper';
import { ref, watch } from 'vue';
import { setTag } from 'store/Store';

const dispatch = useDispath();
const add_product_state = useSelector((state) => state.product.add_product);

const tags = ref<string[]>([]);

const tag_form = ref<string>('');

watch(
  [add_product_state],
  () => {
    const add_product_value = add_product_state.value;
    if (add_product_value.tag) {
      tags.value = [...add_product_value.tag];
    }
  },
  { immediate: true }
);

function addTagOnClick() {
  if (tag_form.value.length && typeof tag_form.value === 'string') {
    tags.value.push(tag_form.value.toString());
    tag_form.value = '';
    dispatch(setTag(tags.value));
  }
}

function removeTagOnClick(index: number) {
  tags.value.splice(index, 1);
  dispatch(setTag(tags.value));
}
</script>

<style lang="scss" scoped>
.card {
  overflow: visible;
}
</style>
