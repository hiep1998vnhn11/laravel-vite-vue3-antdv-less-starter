<template>
  <span :class="[prefixCls, theme]" @click="toggleCollapsed">
    <svg
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1H14"
        stroke="#2D2F3F"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M1 7H14"
        stroke="#2D2F3F"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M1 13H14"
        stroke="#2D2F3F"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  </span>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
import { useDesign } from '/@/hooks/web/useDesign'
import { propTypes } from '/@/utils/propTypes'

export default defineComponent({
  name: 'HeaderTrigger',
  props: {
    theme: propTypes.oneOf(['light', 'dark']),
  },
  setup() {
    const { toggleCollapsed } = useMenuSetting()
    const { prefixCls } = useDesign('layout-header-trigger')
    return { toggleCollapsed, prefixCls }
  },
})
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-layout-header-trigger';
.@{prefix-cls} {
  padding-left: 1rem;
  padding-right: 1rem;
  color: #000;
}
</style>
