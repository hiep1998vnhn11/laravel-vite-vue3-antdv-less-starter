<template>
  <img :src="src" :height="height" :width="width" @error="onError" />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { ErrorImage } from '/@/enums/imageEnum'
export default defineComponent({
  props: {
    src: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
  },
  setup({ src, width, height }) {
    const onError = (e: Event) => {
      console.log(e)
    }
    return {
      src,
      onError,
      width,
      height,
    }
  },
})
</script>
<style lang="scss" scoped></style>
