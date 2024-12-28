<template>
  <div class="card">
    <h6>Product Gallery</h6>
    <div v-on:click="selectGalleryImage" class="flex">
      <button v-if="!gallery_product.length">add gallery</button>
      <div
        v-if="gallery_product"
        v-for="(image, index) in gallery_product"
        :key="index"
      >
        <img
          :src="MEDIA_API + '/image/' + image"
          crossorigin="anonymous"
          width="100"
          height="100"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useSelector, useDispath } from '../../../../redux/helper';
import { ref, watch } from 'vue';
import { setActivatedSelect, addGalleryProduct } from 'store/Store';
import { MEDIA_API } from 'main/Config';

export default {
  setup() {
    const dispatch = useDispath();
    const select_image_state = useSelector((state) => state.media.select_image);
    const add_product_state = useSelector((state) => state.product.add_product);

    const gallery_product = ref<string[]>([]);

    const media_state_name = 'gallery_image';

    watch(
      [select_image_state, add_product_state],
      () => {
        if (select_image_state) {
          const select_image_value = select_image_state.value;
          if (
            select_image_value.state_name === media_state_name &&
            select_image_value.gallery.length
          ) {
            dispatch(addGalleryProduct(select_image_value.gallery));
            dispatch(setActivatedSelect(null));
          }
        }

        if (add_product_state) {
          const add_product_value = add_product_state.value;
          if (add_product_value.product.gallery.length) {
            gallery_product.value = add_product_value.product.gallery;
          }
        }
      },
      { immediate: true }
    );

    const selectGalleryImage = () => {
      dispatch(
        setActivatedSelect({ state_name: media_state_name, is_single: false })
      );
    };

    return {
      selectGalleryImage,
      gallery_product,
      MEDIA_API,
    };
  },
};
</script>
