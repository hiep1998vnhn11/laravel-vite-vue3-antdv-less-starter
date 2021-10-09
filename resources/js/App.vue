<template>
    <ConfigProvider>
        <div class="flex">
            <div class="text-primary">123</div>
            <div>123</div>
        </div>
        <router-view />
    </ConfigProvider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import { useTitle } from '/@/hooks/web/useTitle'

export default defineComponent({
    name: 'App',
    components: { ConfigProvider },
    setup() {
        useTitle()
    },
})
</script>
