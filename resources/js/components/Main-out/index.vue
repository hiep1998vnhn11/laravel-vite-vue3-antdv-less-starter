<template>
  <div
    class="
      fixed
      h-full
      w-full
      flex flex-col
      justify-center
      items-center
      text-4xl
    "
  >
    <div class="">Trang không tồn tại hoặc đã dừng hoạt động!</div>
    <a-button @click="$router.go(-1)" class="mt-10" type="primary">
      Quay lại
    </a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MainOut',
  setup() {},
})
</script>
