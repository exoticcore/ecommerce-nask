<script setup lang="ts">
import * as Theme from 'main/Styles';
import { useDispath, useSelector } from '../../redux/helper';
import { onMounted, ref, watch } from 'vue';
import {
  getAllSubcategory,
  createSubcategory,
  deleteSubcategory,
} from 'store/Store';

interface CategoryList {
  name: string;
  product: number;
  slug: string;
}

const dispatch = useDispath();
const category_list = useSelector((state) => state.catalog.category_list);

const category = ref<CategoryList[]>([]);

const title_th = ref<string>('');
const title_en = ref<string>('');
const slug = ref<string>('');

const deleteCategoryClick = async (slug: string) => {
  await dispatch(deleteSubcategory(slug));
};

const addCategorySubmit = async () => {
  if (title_th.value && title_en.value && slug.value) {
    const data = {
      subcat_attr: {
        slug: slug.value.toString(),
      },
      translate: [
        {
          locale: 'th',
          name: title_th.value.toString(),
        },
        {
          locale: 'en',
          name: title_en.value.toString(),
        },
      ],
    };
    dispatch(createSubcategory(data));
    clearAllInput();
  }
};

const clearAllInput = () => {
  title_th.value = '';
  title_en.value = '';
  slug.value = '';
  return;
};

watch(category_list, () => {
  console.log(category_list.value);
  category.value = category_list.value;
});

onMounted(() => {
  dispatch(getAllSubcategory());
});
</script>

<template>
  <div class="add-category">
    <div class="card">
      <h5>Add Category</h5>
      <div class="flex gap-3">
        <div class="form-input">
          <input type="text" required v-model="title_th" />
          <label>Category Title TH</label>
        </div>
        <div class="form-input">
          <input type="text" required v-model="title_en" />
          <label>Category Title EN</label>
        </div>
        <div class="form-input">
          <input type="text" required v-model="slug" />
          <label>Category Slug</label>
        </div>
        <button class="button" @click="addCategorySubmit">Add</button>
      </div>
    </div>
    <div class="card">
      <h5>Category List</h5>
      <table class="pt-5">
        <tbody>
          <tr>
            <td>Name TH</td>
            <td>Slug</td>
            <td>remove</td>
          </tr>
        </tbody>
        <thead>
          <tr v-for="(item, index) in category" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.slug }}</td>
            <td>
              <button @click="deleteCategoryClick(item.slug)">delete</button>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-category {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .card {
    padding: 1rem;
    border-radius: v-bind('Theme.borderRadius');
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: v-bind('Theme.white');
  }
}
</style>
