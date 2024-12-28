<template>
  <div v-on:click="selectImageOnClick()">
    <button v-if="!product_image">add image</button>
    <img
      v-if="product_image"
      :src="MEDIA_API + '/image/' + product_image"
      crossorigin="anonymous"
      width="100"
      height="100"
    />
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { useSelector, useDispath } from '../../../redux/helper';
import { setActivatedSelect, addImageProduct } from 'store/Store';
import { MEDIA_API } from 'main/Config';

export default {
  setup() {
    const dispatch = useDispath();
    const select_image_state = useSelector((state) => state.media.select_image);
    const add_product_state = useSelector((state) => state.product.add_product);
    const media_state_name = 'product_image';

    const product_image = ref<string>('');

    const selectImageOnClick = () => {
      dispatch(
        setActivatedSelect({ state_name: media_state_name, is_single: true })
      );
    };

    watch([select_image_state], () => {
      if (select_image_state) {
        const select_image_value = select_image_state.value;
        if (
          select_image_value.state_name === media_state_name &&
          select_image_value.single.length
        ) {
          dispatch(addImageProduct(select_image_value.single));
          dispatch(setActivatedSelect(null));
        }
      }

      if (add_product_state) {
        const add_product_value = add_product_state.value;
        if (add_product_value.product.image_url) {
          product_image.value = add_product_value.product.image_url;
        }
      }
    });

    return {
      selectImageOnClick,
      product_image,
      MEDIA_API,
    };
  },
};
</script>
