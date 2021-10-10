<template>
  <transition>
    <div :class="prefixCls">
      <Login sessionTimeout />
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import Login from './Login.vue'

import { useDesign } from '/@/hooks/web/useDesign'
import { useStore } from 'vuex'
import { PermissionModeEnum } from '/@/enums/appEnum'
export default defineComponent({
  name: 'SessionTimeoutLogin',
  components: { Login },
  setup() {
    const { prefixCls } = useDesign('st-login')
    const store = useStore()
    const userId = ref<Nullable<number | string>>(0)

    const isBackMode = () => {
      return (
        store.getters['app/getProjectConfig'].permissionMode ===
        PermissionModeEnum.BACK
      )
    }

    onMounted(() => {
      userId.value = store.getters['user/getUserInfo']?.userId
      console.log('Mounted', store.getters['user/getUserInfo'])
    })

    onBeforeUnmount(() => {
      if (
        userId.value &&
        userId.value !== store.getters['user/getUserInfo'].userId
      ) {
        document.location.reload()
      } else if (
        isBackMode() &&
        store.getters['permission/getLastBuildMenuTime'] === 0
      ) {
        document.location.reload()
      }
    })

    return { prefixCls }
  },
})
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-st-login';

.@{prefix-cls} {
  position: fixed;
  z-index: 9999999;
  width: 100%;
  height: 100%;
  background: @component-background;
}
</style>
