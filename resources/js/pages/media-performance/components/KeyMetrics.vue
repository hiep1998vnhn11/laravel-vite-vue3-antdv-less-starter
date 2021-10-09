<template>
    <div class="key-metrics">
        <a-row :gutter="16">
            <a-col :span="8" class="mb-2" v-for="n in 10" :key="n">
                <div class="key-metrics__card">
                    <div class="key-metrics__card__title">Spent</div>
                    <div class="key-metrics__card__content">$101.1K</div>
                </div>
            </a-col>
        </a-row>
    </div>
</template>
<script lang="ts">
import { onMounted, ref, defineComponent } from 'vue'
export default defineComponent({
    name: 'KeyMetrics',
    setup() {
        onMounted(() => {})
        return {}
    },
})
</script>
<style lang="less" scoped>
.key-metrics {
    &__card {
        border-radius: 8px;
        border: solid 1px rgba(0, 0, 0, 0.1);
        padding: 15px 18px;
        &__title {
            font-weight: 500;
            font-size: 12px;
            line-height: 15px;
            /* identical to box height */

            letter-spacing: -0.02em;

            color: #a6a9bf;
        }

        &__content {
            margin-top: 8px;
            font-weight: 600;
            font-size: 16px;
            line-height: 19px;
            letter-spacing: -0.02em;

            color: #2d2f3f;
        }
    }
}
</style>
