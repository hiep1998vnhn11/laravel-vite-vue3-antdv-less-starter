<template>
    <Result
        :class="prefixCls"
        status="403"
        title="403"
        sub-title="You not have permission to access this resource"
    >
    </Result>
</template>
<script lang="ts">
import { onMounted } from 'vue'
import { Result } from 'ant-design-vue'
import { useDesign } from '/@/hooks/web/useDesign'

export default {
    components: {
        Result,
    },
    setup() {
        const { prefixCls } = useDesign('app-exception-page')
        onMounted(() => {})
        return {
            prefixCls,
        }
    },
}
</script>
<style lang="scss" scoped></style>
