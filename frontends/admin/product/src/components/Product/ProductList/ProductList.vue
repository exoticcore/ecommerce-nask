<template>
  <div class="product-form">
    <h6>Product Lists</h6>
    <div class="product-list">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Special Price</th>
            <th>edit</th>
            <th>remove</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in product_list" :key="product.slug">
            <td>
              <img
                :src="product.image_url"
                alt="product image"
                crossorigin="anonymous"
                width="100"
                height="100"
              />
            </td>
            <td>{{ product.translate[0].title }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.s_price }}</td>
            <td>
              <router-link :to="`/catalog/edit/${product.slug}`">
                <button>edit</button>
              </router-link>
            </td>
            <td>
              <button class="button" v-on:click="removeProduct(product.slug)">
                remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useDispath, useSelector } from '../../../redux/helper';
import { getProductList, deleteProduct } from 'store/Store';

export default {
  setup() {
    const dispatch = useDispath();
    const product_state = useSelector((state) => state.product.product_list);

    interface IProductList {
      image_url: string;
      price: number;
      s_price: number | null;
      slug: string;
      subcat_attr: {
        slug: string;
        translate: {
          title: string;
        }[];
      };
      translate: {
        title: string;
      }[];
    }

    const product_list = ref<IProductList[]>([]);

    function removeProduct(slug: string) {
      dispatch(deleteProduct(slug));
    }

    onMounted(() => {
      dispatch(getProductList());
    });

    watch(product_state, () => {
      if (product_state.value) {
        const product_value = product_state.value;
        product_list.value = product_value.products;
        console.log(product_list.value);
      }
    });

    return {
      product_list,
      removeProduct,
    };
  },
};
</script>

<style lang="scss" scoped></style>
