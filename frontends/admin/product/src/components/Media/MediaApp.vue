<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { mount } from 'media/MediaApp';

const mediaRef = ref(null);

onMounted(() => {
  if (mediaRef.value) {
    mount(mediaRef.value, 'preview');
  }
});
</script>

<template>
  <div ref="mediaRef">eiei</div>
</template>
