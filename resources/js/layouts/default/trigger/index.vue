<template>
  <div class="app-trigger-container">
    <SiderTrigger v-if="sider" />
    <HeaderTrigger v-else :theme="theme" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent'
import { propTypes } from '/@/utils/propTypes'
import HeaderTrigger from './HeaderTrigger.vue'

export default defineComponent({
  name: 'LayoutTrigger',
  components: {
    SiderTrigger: createAsyncComponent(() => import('./SiderTrigger.vue')),
    HeaderTrigger: HeaderTrigger,
  },
  props: {
    sider: propTypes.bool.def(true),
    theme: propTypes.oneOf(['light', 'dark']),
  },
})
</script>

<style lang="less" scoped>
.app-trigger-container {
  padding-left: 20px;
  padding-right: 20px;
  height: 40px;
}
</style>
