<template>
  <config-provider :locale="getAntdLocale">
    <app-provider>
      <router-view />
    </app-provider>
  </config-provider>
</template>

<script lang="ts">
import { defineComponent, watch, unref } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import { useTitle } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useLocale } from '/@/locales/useLocale'
import { AppProvider } from '/@/components/Application'

export default defineComponent({
  name: 'App',
  components: { ConfigProvider, AppProvider },
  setup() {
    const titleRef = useTitle('HiepTrab')
    const title = 'App'
    const { currentRoute } = useRouter()
    const { getAntdLocale } = useLocale()
    watch(
      () => currentRoute.value.path,
      () => {
        const route = unref(currentRoute)
        const tTitle = route?.meta?.title as string
        titleRef.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`
      },
      { immediate: true }
    )
    return {
      getAntdLocale,
    }
  },
})
</script>
