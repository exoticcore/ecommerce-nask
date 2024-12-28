<template>
  <div class="select-product-attribute">
    <div class="flex w-full justify-between">
      <span>Attribute</span>
      <button v-on:click="addAttrAction">Add Attribute</button>
    </div>
    <div v-for="(count, index) in attr_count">
      <button v-on:click="(e) => removeAttrAction(index)">remove</button>
      <div class="form-group">
        <label
          for="countries"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Select an attribute</label
        >
        <select
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-on:change="(e) => handleSelect(e, index)"
        >
          <option :selected="!count" class="text-gray-400">
            Choose Attribute
          </option>
          <option
            v-for="(attr, index) in attr_list"
            :key="index"
            :value="index"
            :selected="count === index"
          >
            {{ attr.name }} ({{ attr.value.length }})
          </option>
        </select>
      </div>
      <div v-if="count !== null" class="flex flex-col gap-2 py-2">
        <div class="flex" v-for="id_selected in attr_list[count].value">
          <input
            type="checkbox"
            :checked="checkboxStatusAttrvalue(id_selected.id)"
            v-on:change="(e) => handleCheckAttrValue(e, index, id_selected.id)"
          />{{ id_selected.value }} ({{ id_selected.id }})
        </div>
      </div>
    </div>
    <div v-if="attr_count.length > 0" class="mt-3">
      <button :class="buttonClass" v-on:click="generateSkuAction">
        Generate SKU
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { useSelector, useDispath } from '../../../redux/helper';
import { computed, onMounted, ref, watch } from 'vue';
import { getProductAttr, generateSKU } from 'store/Store';
import { IProductAttr } from '../../../types/ProductType';

export default {
  setup() {
    const dispatch = useDispath();
    const product_attr = useSelector((state) => state.product);

    const attr_count = ref<Array<number | null>>([null]);
    const attr_list = ref<IProductAttr[]>([]);
    const selected_attr = ref<number[][]>([]);

    const handleSelect = (e: Event, select_index: number) => {
      const target = e.target as HTMLSelectElement;
      const selected: string = target.value;
      const selectedIndex = parseInt(selected);

      if (selectedIndex || selectedIndex === 0) {
        if (attr_count.value.includes(selectedIndex)) {
          attr_count.value[select_index] = null;
          selected_attr.value.splice(select_index, 1);
        } else {
          const sel_value_id: number[] = [];

          attr_list.value[selectedIndex].value.forEach((attr_value) => {
            sel_value_id.push(attr_value.id);
          });
          attr_count.value[select_index] = selectedIndex;
          selected_attr.value[select_index] = sel_value_id;
        }
      } else {
        attr_count.value[select_index] = null;
        selected_attr.value.splice(select_index, 1);
      }
    };

    const handleCheckAttrValue = (
      e: Event,
      select_index: number,
      attr_id: number
    ) => {
      const target = e.target as HTMLInputElement;
      const checked = target.checked;

      if (checked) {
        selected_attr.value[select_index].push(attr_id);
      } else {
        selected_attr.value[select_index] = selected_attr.value[
          select_index
        ].filter((id) => id !== attr_id);
      }
    };

    const checkboxStatusAttrvalue = (id_selected: number): boolean => {
      for (const attr of selected_attr.value) {
        if (attr.includes(id_selected)) {
          return true;
        }
      }
      return false;
    };

    const addAttrAction = () => {
      attr_count.value.push(null);
      console.log(selected_attr.value);
    };

    const removeAttrAction = (index: number) => {
      selected_attr.value.splice(index, 1);
      attr_count.value.splice(index, 1);
    };

    const generateSkuAction = () => {
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

      if (selected_attr.value.length > 0) {
        const combinations = generateCombinations(selected_attr.value);
        dispatch(generateSKU(combinations));
      }
    };

    const buttonClass = computed(() => {
      return attr_count.value.every((count) => count !== null)
        ? 'button'
        : 'button --disabled';
    });

    onMounted(() => {
      dispatch(getProductAttr());
    });

    watch([product_attr, selected_attr], () => {
      if (product_attr.value.product_attr.length > 0) {
        attr_list.value = product_attr.value.product_attr;
      }
    });

    return {
      attr_list,
      attr_count,
      handleSelect,
      selected_attr,
      handleCheckAttrValue,
      addAttrAction,
      removeAttrAction,
      generateSkuAction,
      buttonClass,
      checkboxStatusAttrvalue,
    };
  },
};
</script>

<style lang="scss" scoped>
.select-product-attribute {
  position: relative;
  min-height: 10rem;
}
</style>
