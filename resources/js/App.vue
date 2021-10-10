<template>
    <ConfigProvider>
        <router-view />
    </ConfigProvider>
</template>

<script lang="ts">
import { defineComponent, watch, unref, onMounted } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import { useTitle } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useMessage } from '/@/hooks/web/useMessage'
export default defineComponent({
    name: 'App',
    components: { ConfigProvider },
    setup() {
        const titleRef = useTitle('HiepTrab')
        const title = 'App'
        const { currentRoute } = useRouter()
        watch(
            () => currentRoute.value.path,
            () => {
                const route = unref(currentRoute)
                const tTitle = route?.meta?.title as string
                titleRef.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`
            },
            { immediate: true }
        )
    },
})
</script>
